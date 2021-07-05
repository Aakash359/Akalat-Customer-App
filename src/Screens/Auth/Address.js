import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {
  Scale,
  Colors,
  ImagesPath,
  LocationAlert,
  androidMapAPIKey,
  iOSMapAPIKey,
} from '../../CommonConfig'
import {
  FormInput,
  FormInput1,
  CustomButton,
  LocationInput,
} from '../../Component'
import Location from '../../Component/Location'
import {Icon} from 'native-base'
import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'
import {AddAddressRequest} from '../../redux/actions'
import {useSelector, useDispatch} from 'react-redux'

Geolocation.setRNConfiguration({authorizationLevel: 'whenInUse'})
Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey)

function Address() {
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const [logoutModal, setLogoutModal] = useState(false)
  const [activeTab, setActiveTab] = useState('HOME')
  const [nearby, setNearby] = useState('')
  const [house_name_and_no, setHouseName] = useState('')
  const [area_name, setAreaName] = useState('')
  const [location, setLocation] = useState(null)
  const [currentAddress, setAddress] = useState('')

  const [addAddress, setaddAddress] = React.useState({
    addUserAddress: [],
    isLoading: true,
  })

  const dispatch = useDispatch()

  const redirectToMyAccount = () => {
    navigate('SavedCard')
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      // Geolocation.requestAuthorization()
      getOneTimeLocation()
      // //subscribeLocationLocation();
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
          getOneTimeLocation()
        } else {
          console.log('====================================')
          console.log(granted)
          console.log('====================================')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    requestLocationPermission()
    return () => {
      Geolocation.clearWatch()
    }
  }, [])

  const getOneTimeLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('====================================')
          console.log(position)
          console.log('====================================')
          setLocation(position.coords)

          Geocoder.from(
            position.coords.latitude,
            position.coords.longitude,
          ).then((json) => {
            console.log(
              '=============================================json data',
              json.results[1].formatted_address,
              '================================Flat no',
            )
            let addressComponent = json.results[1].formatted_address
            console.log(addressComponent, 'addressComponent')
            setAddress(addressComponent)
          })
        },
        (error) => {
          console.log('====================================')
          console.log(error)
          console.log('====================================')
        },
      )
    } catch (error) {
      console.log('====================================')
      console.log(error)
      console.log('====================================')
    }
  }

  const redirectToHome = () => {
    // navigate('HomeStack')
  }

  const onSubmit = async () => {
    if (house_name_and_no == '') {
      alert('Please enter House No')
    } else if (area_name == '') {
      alert('Please enter area')
    } else {
      let lat = ''
      let lng = ''

      await Geocoder.from([
        {house_name_and_no} + ' ',
        {area_name} + '',
        {nearby},
      ])
        .then((json) => {
          var location = json.results[0].geometry.location
          lat = parseFloat(location.lat)
          lng = parseFloat(location.lng)
          console.log('lat Na log ', lat, lag)
        })
        .catch((error) => console.warn(error))
      const data = {
        address_type: activeTab,
        lng: location?.latitude,
        lat: location?.longitude,
        house_name_and_no: house_name_and_no,
        area_name: area_name,
        nearby: nearby,
        created_by: '6093b6eb8db4690de06c5c21',
      }
      console.log('Data--', data)
      dispatch(AddAddressRequest(data))
      navigate('NearMe')
    }
  }

  return (
    <ImageBackground
      source={ImagesPath.background}
      style={styles.imageBachgroundStyle}>
      <KeyboardAvoidingView
        style={styles.keyboardStyle}
        behavior={Platform.OS == 'android' ? '' : 'padding'}
        enabled>
        <ScrollView indicatorStyle="white">
          <View style={styles.container}>
            <Icon
              name="arrowleft"
              type="AntDesign"
              style={styles.logoStyle}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.primaryText}>Address</Text>
            <LocationInput
              placeholder="Current Location"
              autoCapitalize="none"
              value={currentAddress}
              onChangeText={(val) => setAddress(val)}
              maxLength={30}
            />
            <Text
              style={{
                fontSize: Scale(16),
                textAlign: 'center',
                color: Colors.BORDERCOLOR,
                marginVertical: Scale(10),
              }}>
              or
            </Text>
            <FormInput1
              placeholder="House No/Flat No"
              lable="EX- HN 256"
              autoCapitalize="none"
              maxLength={30}
              value={house_name_and_no}
              onChangeText={(text) => setHouseName(text)}
            />
            <FormInput
              placeholder="Area"
              autoCapitalize="none"
              maxLength={30}
              value={area_name}
              onChangeText={(text) => setAreaName(text)}
            />
            <FormInput
              placeholder="Nearby"
              autoCapitalize="none"
              maxLength={30}
              value={nearby}
              onChangeText={(text) => setNearby(text)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: Scale(10),
              }}>
              <Text
                onPress={() => setActiveTab('HOME')}
                style={
                  activeTab == 'HOME'
                    ? styles.forgotButton1
                    : styles.forgotButton
                }>
                Home
              </Text>
              <Text
                onPress={() => setActiveTab('WORK')}
                style={
                  activeTab == 'WORK'
                    ? styles.forgotButton1
                    : styles.forgotButton
                }>
                Work
              </Text>
              <Text
                onPress={() => setActiveTab('OTHER')}
                style={
                  activeTab == 'OTHER'
                    ? styles.forgotButton1
                    : styles.forgotButton
                }>
                Other
              </Text>
            </View>
            <View style={{marginTop: Scale(10)}}>
              <CustomButton
                title="Save & Continue"
                onSubmit={onSubmit}
                isSecondary={true}
              />
            </View>
            <LocationAlert
              visible={logoutModal}
              rightButtonText="Allow"
              leftButtonText="Reject"
              onPressRightButton={() => {
                setLogoutModal(false)
              }}
              onPressLeftButton={() => {
                setLogoutModal(false)
                setTimeout(() => {
                  setLogoutModal(false)
                  // setRootTo('Login')
                }, 1500)
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Location />
    </ImageBackground>
  )
}
export default Address
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Scale(25),
    paddingTop: Scale(50),
  },
  imageBachgroundStyle: {
    height: '100%',
    width: '100%',
  },
  forgotButton: {
    // backgroundColor:Colors.DARK_RED,
    paddingHorizontal: Scale(25),
    paddingVertical: Scale(13),
    borderRadius: Scale(30),
    fontSize: Scale(16),
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    color: Colors.BORDERCOLOR,
  },
  forgotButton1: {
    backgroundColor: Colors.DARK_RED,
    paddingHorizontal: Scale(25),
    paddingVertical: Scale(13),
    borderRadius: Scale(30),
    fontSize: Scale(16),
    color: Colors.WHITE,
  },
  logoStyle: {
    fontSize: Scale(25),
    color: Colors.DARK_RED,
    height: Scale(20),
    width: Scale(45),
  },
  primaryText: {
    marginVertical: Scale(30),
    fontSize: Scale(30),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  normalText: {
    fontSize: Scale(16),
    color: Colors.BLACK,
    textAlign: 'left',
  },
})
