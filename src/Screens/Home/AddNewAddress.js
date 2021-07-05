import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  PermissionsAndroid,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import {Icon} from 'native-base'
import {
  Colors,
  Scale,
  ImagesPath,
  iOSMapAPIKey,
  androidMapAPIKey,
} from '../../CommonConfig'
import {CustomButton, FormInput, LocationInput} from '../../Component'
import {useNavigation} from '@react-navigation/native'
import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'
import {AddAddressRequest} from '../../redux/actions'
import {useSelector, useDispatch} from 'react-redux'
import {LoadWheel} from '../../CommonConfig/LoadWheel'
import {withTranslation, useTranslation} from 'react-i18next'

Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey)

function AddNewAddress(props) {
  const [activeTab, setActiveTab] = useState(null)
  const [value, setValue] = useState(false)
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const [currentAddress, setAddress] = useState('')
  const [house_name_and_no, setHouseName] = useState('')
  const [area_name, setAreaName] = useState('')
  const [id, setid] = useState(props)
  const [nearby, setNearby] = useState('')
  const addAddressResponse = useSelector((state) => state.Setting)
  const user = useSelector((state) => state.Auth.user)
  const dispatch = useDispatch()
  const [location, setLocation] = useState(null)

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
      Geolocation.clearWatch()
    }
  }, []) //jyoti

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
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
      (error) => {},
      {
        timeout: 30000,
        maximumAge: 1000,
      },
    )
  }
  const checked = () => setValue(!value)

  const onSubmit = async () => {
    if (house_name_and_no == '') {
      alert('Please enter House No')
    } else if (area_name == '') {
      alert('Please enter area')
    } else {
      let lat = ''
      let lng = ''

      Geocoder.from([{house_name_and_no} + ' ', {area_name} + '', {nearby}])
        .then((json) => {
          var location = json.results[0].geometry.location
          lat = parseFloat(location.lat)
          lng = parseFloat(location.lng)
          console.log('lat Na log ', lat, lag)
        })
        .catch((error) => console.warn(error))
      const data = {
        address_type:
          activeTab == 0 ? 'HOME' : activeTab == 1 ? 'WORK' : 'OTHER',
        lng: location?.latitude,
        lat: location?.longitude,
        house_name_and_no: house_name_and_no,
        area_name: area_name,
        nearby: nearby,
        created_by: user?._id,
      }
      console.log('Data--', data)
      dispatch(AddAddressRequest(data))
      navigate('ManageAddress')

      alert('Address added succesfully')
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />
      <View style={styles.headerContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrowleft"
          type="AntDesign"
          style={styles.logoStyle}
        />
      </View>
      <Text style={styles.headerText}>Add New Address </Text>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <KeyboardAvoidingView
          style={styles.keyboardStyle}
          behavior={Platform.OS == 'android' ? '' : 'padding'}
          enabled>
          <ScrollView indicatorStyle="white">
            <Icon
              name="arrowleft"
              type="AntDesign"
              style={styles.logoStyle}
              onPress={() => navigation.goBack()}
            />
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
            <FormInput
              placeholder="House No/Flat No"
              autoCapitalize="words"
              maxLength={30}
              value={house_name_and_no}
              onChangeText={(text) => setHouseName(text)}
            />
            <FormInput
              placeholder="Area"
              autoCapitalize="words"
              maxLength={30}
              value={area_name}
              onChangeText={(text) => setAreaName(text)}
            />
            <FormInput
              placeholder="Nearby"
              autoCapitalize="words"
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
            <View style={{marginTop: Scale(20)}}>
              <CustomButton
                title="Save"
                isSecondary={true}
                onSubmit={onSubmit}
              />
            </View>
          </ScrollView>
         
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  )
}
export default AddNewAddress
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
  },
  textStyle: {
    color: Colors.BORDERCOLOR,
    fontSize: Scale(14),
    marginTop: Scale(10),
  },
  forgotButton: {
    paddingHorizontal: Scale(30),
    paddingVertical: Scale(14),
    borderRadius: Scale(25),
    fontSize: Scale(16),
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    color: Colors.BORDERCOLOR,
  },
  forgotButton1: {
    backgroundColor: Colors.DARK_RED,
    paddingHorizontal: Scale(30),
    paddingVertical: Scale(14),
    borderRadius: Scale(25),
    fontSize: Scale(16),
    color: Colors.WHITE,
  },
  forgotButton2: {
    color: Colors.WHITE,
  },
  forgotButton3: {
    color: Colors.BLACK,
  },

  loginInputCont: {
    flex: 1,
    //paddingTop: Scale(-10),
    paddingBottom: Scale(10),
    paddingHorizontal: Scale(30),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  headerText: {
    fontSize: Scale(20),
    marginHorizontal: Scale(25),
    marginBottom: Scale(25),
    color: Colors.WHITE,
  },
  headerContainer: {
    height: Scale(80),
    alignItems: 'center',
    paddingTop: Scale(20),
    flexDirection: 'row',
    backgroundColor: Colors.APPCOLOR,
    paddingHorizontal: Scale(25),
  },

  logoStyle: {
    marginTop: Scale(15),
    fontSize: Scale(25),
    color: Colors.WHITE,
  },
})