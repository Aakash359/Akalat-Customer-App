import React, {useState, useEffect} from 'react'
import {TouchableOpacity, PermissionsAndroid, Text} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Scale, iOSMapAPIKey, androidMapAPIKey} from '../CommonConfig'

import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'
Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey)

export default function LogoTitle(props) {
  const [currentAddress, setAddress] = useState('Location')

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation()
        //subscribeLocationLocation()
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation()
          } else {
          }
        } catch (err) {
          console.warn(err)
        }
      }
    }
    requestLocationPermission()
    return () => {
      getOneTimeLocation()
      Geolocation.clearWatch()
    }
  }, [])

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude)
        const currentLatitude = JSON.stringify(position.coords.latitude)
        Geocoder.from(position.coords.latitude, position.coords.longitude).then(
          (json) => {
           let addressComponent = json.results[1].formatted_address
            console.log(addressComponent, 'addressComponent')
            setAddress(addressComponent)
          },
        )
      },
      (error) => {},
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    )
  }
  const {navigate} = useNavigation()
  const redirectToNotification = () => {
    navigate('SelectLocation')
  }
  return (
    <TouchableOpacity onPress={redirectToNotification}>
      <Text
        onPress={redirectToNotification}
        numberOfLines={1}
        style={{
          height: Scale(20),
          textAlignVertical: 'center',
          color: '#fff',

          fontSize: Scale(16),
        }}>
        {currentAddress}
      </Text>
    </TouchableOpacity>
  )
}
