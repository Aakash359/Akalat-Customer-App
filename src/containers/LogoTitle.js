import React, {useState, useEffect} from 'react'
import {
  TouchableOpacity,
  PermissionsAndroid,
  Text,
  Dimensions,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Scale, iOSMapAPIKey, androidMapAPIKey} from '../CommonConfig'

import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'
import {useSelector} from 'react-redux'

Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey)

const {width} = Dimensions.get('window')

export default function LogoTitle(props) {
  const [currentAddress, setAddress] = useState('Location')
  const [showAdd, setShowAdd] = useState(true)

  const {
    Cart: {addressId, selectedAddress},
    addressList,
  } = useSelector(({Cart, Setting: {addressListResponse}}) => ({
    Cart,
    addressList: addressListResponse?.data?.addressList || [],
  }))
  console.log('====================================')
  console.log({addressId, selectedAddress, addressList})
  console.log('====================================')

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse')
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
        console.log('====================================')
        console.log('location', position)
        console.log('====================================')
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
      (error) => {
        console.log('====================================')
        console.log('location', error)
        console.log('====================================')
      },
    )
  }
  const {navigate} = useNavigation()
  const redirectToNotification = () => {
    navigate('SelectLocation')
  }
  return (
    <TouchableOpacity
      onPress={redirectToNotification}
      style={{width: width - 120}}>
      <Text
        onPress={redirectToNotification}
        numberOfLines={1}
        style={{
          height: Scale(20),
          // textAlignVertical: 'center',
          color: '#fff',

          fontSize: Scale(16),
        }}>
        {showAdd &&
        selectedAddress !== null &&
        addressList?.length &&
        selectedAddress + 1 <= addressList?.length
          ? `${addressList[selectedAddress]?.house_name_and_no}, ${addressList[selectedAddress]?.area_name}`
          : currentAddress}
      </Text>
    </TouchableOpacity>
  )
}
