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
import {color} from 'react-native-reanimated'
import {AddAddressRequest,AddAddressLoader,} from '../../redux/actions'
import {useSelector, useDispatch} from 'react-redux'

Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey)
function EditAddress(props) {
  const {address} = props.route.params
  const [activeTab, setActiveTab] = useState(address?.address_type)
  const [value, setValue] = useState(false)
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const [currentAddress, setAddress] = useState('')
  const [house_name_and_no, setHouseName] = useState(address?.house_name_and_no)
  const [area_name, setAreaName] = useState(address?.area_name)
  const [nearby, setNearby] = useState(address?.nearby)
  const user = useSelector((state) => state.Auth.user)
  const dispatch = useDispatch()
  const [location, setLocation] = useState(null)
   console.log("Aakash===>",address);  
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation()
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
        setLocation(position.coords)
        Geocoder.from(position.coords.latitude, position.coords.longitude).then(
          (json) => {
           
            let addressComponent = json.results[1].formatted_address
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
 
  const checked = () => setValue(!value)

  const redirectToMyAccount = async () => {
    const regMatch = /^[^!:-@\[-`{-~]+$/;
    if (house_name_and_no == '') {
      alert('Please enter House No')
    } else if (regMatch.test(house_name_and_no)==false){
      alert('Special character are not allowed')
    } else if (area_name == ''){
      alert('Please enter area')
    } else if (activeTab == undefined) {
      alert('Address type must be selected')
    }
    else if (nearby) {
      let data = {
        address_type: activeTab + '',
        lng: location?.longitude,
        lat: location?.latitude,
        house_name_and_no,
        area_name,
        nearby,
        created_by: user?._id,
        _id: address?._id,
      }
      dispatch(AddAddressRequest(data))
      dispatch(AddAddressLoader(true))
      navigate('ManageAddress')
    }
    else if (!nearby) {
        let data = {
          address_type: activeTab + '',
          lng: location?.longitude,
          lat: location?.latitude,
          house_name_and_no,
          area_name,
          created_by: user?._id,
          _id: address?._id,
        }
        
        dispatch(AddAddressRequest(data))
        dispatch(AddAddressLoader(true))
        navigate('ManageAddress')
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
      <Text style={styles.headerText}>Edit Address </Text>
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
            <View style={{marginTop: Scale(20)}}>
              <CustomButton
                title="Save"
                isSecondary={true}
                onSubmit={redirectToMyAccount}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  )
}
export default EditAddress
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
    paddingHorizontal: Scale(25),
    paddingVertical: Scale(14),
    borderRadius: Scale(25),
    fontSize: Scale(16),
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    color: Colors.BORDERCOLOR,
    fontWeight: '700',
  },
  forgotButton1: {
    backgroundColor: Colors.DARK_RED,
    paddingHorizontal: Scale(25),
    paddingVertical: Scale(14),
    borderRadius: Scale(25),
    fontSize: Scale(16),
    color: Colors.BORDERCOLOR,
    fontWeight: '700',
  },
  forgotButton2: {
    color: Colors.WHITE,
    fontWeight: '700',
  },
  forgotButton3: {
    color: Colors.BORDERCOLOR,
    fontWeight: '700',
  },

  loginInputCont: {
    flex: 1,
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
    paddingTop: Scale(20),
    height: Scale(80),
    alignItems: 'center',
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
