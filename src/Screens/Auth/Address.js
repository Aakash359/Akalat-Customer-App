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
  TouchableOpacity,
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

// Geolocation.setRNConfiguration({
//   authorizationLevel: 'whenInUse',
//   skipPermissionRequests: false,
// })
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
  const user = useSelector((state) => state.Auth.signupResponse.data)

  const [addAddress, setaddAddress] = React.useState({
    addUserAddress: [],
    isLoading: true,
  })

  const dispatch = useDispatch()

  const redirectToMyAccount = () => {
    navigate('SavedCard')
  }

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        const grant = await Geolocation.requestAuthorization('whenInUse')

        if (grant === 'granted') {
          console.log('====================================')
          console.log(grant)
          console.log('====================================')
          getOneTimeLocation()
        }
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
          }
        } catch (err) {}
      }
    }
    requestLocationPermission()
    return () => {
      Geolocation.clearWatch()
    }
  }, [])

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('====================================')
        console.log(position)
        console.log('====================================')
        setLocation(position.coords)
        Geocoder.from(position.coords.latitude, position.coords.longitude).then(
          (json) => {
            var addressComponent =
              json.results[0].address_components[1].long_name +
              ' ' +
              json.results[0].address_components[2].long_name
            setAddress(addressComponent)
          },
        )
      },
      (error) => {
        console.log('====================================')
        console.log(error)
        console.log('====================================')
      },
    )
  }

  const onSubmit = async () => {
    if (house_name_and_no == '') {
      alert('Please enter House No')
    } else if (area_name == '') {
      alert('Please enter area')
    } else {
      let data = {
        // address_type: activeTab == 0 ? 'HOME' : activeTab == 1 ? 'WORK' : 'OTHER',
        address_type: activeTab,
        lng: location?.latitude,
        lat: location?.longitude,
        house_name_and_no,
        area_name,
        nearby,
        created_by: user?._id,
        signUp: true,
      }
      if (!nearby) {
        data = {
          // address_type: activeTab == 0 ? 'HOME' : activeTab == 1 ? 'WORK' : 'OTHER',
          address_type: activeTab,
          lng: location?.latitude,
          lat: location?.longitude,
          house_name_and_no,
          area_name,
          created_by: user?._id,
          signUp: true,
        }
      }
      dispatch(AddAddressRequest(data))
      navigate('NearMe')
      alert('Address added succesfully')
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
              <TouchableOpacity onPress={() => setActiveTab('HOME')}>
                <View
                  style={
                    activeTab == 'HOME'
                      ? styles.forgotButton1
                      : styles.forgotButton
                  }>
                  <Text
                    style={
                      activeTab == 'HOME'
                        ? styles.forgotButton2
                        : styles.forgotButton3
                    }>
                    Home
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('WORK')}>
                <View
                  style={
                    activeTab == 'WORK'
                      ? styles.forgotButton1
                      : styles.forgotButton
                  }>
                  <Text
                    style={
                      activeTab == 'WORK'
                        ? styles.forgotButton2
                        : styles.forgotButton3
                    }>
                    Work
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('OTHER')}>
                <View
                  style={
                    activeTab == 'OTHER'
                      ? styles.forgotButton1
                      : styles.forgotButton
                  }>
                  <Text
                    style={
                      activeTab == 'OTHER'
                        ? styles.forgotButton2
                        : styles.forgotButton3
                    }>
                    Other
                  </Text>
                </View>
              </TouchableOpacity>
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
  forgotButton2: {
    color: Colors.WHITE,
    fontWeight: '700',
  },
  forgotButton3: {
    color: Colors.BORDERCOLOR,
    fontWeight: '700',
  },
  forgotButton: {
    // backgroundColor:Colors.DARK_RED,
    paddingHorizontal: Scale(30),
    paddingVertical: Scale(13),
    borderRadius: Scale(30),
    fontSize: Scale(16),
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    color: Colors.BORDERCOLOR,
    fontWeight: 'bold',
  },
  forgotButton1: {
    backgroundColor: Colors.DARK_RED,
    paddingHorizontal: Scale(30),
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
