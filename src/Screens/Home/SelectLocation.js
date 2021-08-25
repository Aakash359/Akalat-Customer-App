import React, {useState, useEffect,useRef} from 'react'
import {
  Text,
  View,
  FlatList,
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
import {CustomButton} from '../../Component'
import {useNavigation} from '@react-navigation/native'
import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {AddressListRequest} from '../../redux/actions'
import {useSelector, useDispatch} from 'react-redux'
import {setAddressId, setSelectedAddress} from '../../redux/actions/CartActions'
Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey)

function SelectLocation(props) {
  const [value, setValue] = useState(false)
  const [addressText, setAddressText] = useState(false)
  const [show, setShow] = React.useState(false)
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const selectedAddress = useSelector(
    ({Cart: {selectedAddress}}) => selectedAddress,
  )
  const [currentAddress, setAddress] = useState({
    d: null,
    selectedId: selectedAddress || 0,
  })
  const addressListResponse = useSelector(
    (state) => state.Setting.addressListResponse,
  )
  const addressList = addressListResponse?.data?.addressList || []
  const user = useSelector(({Auth: {user}}) => user)

  const redirectToMyAccount = () => {
    navigate('HungryNow')
  }
  const redirectToAddress = () => {
    navigate('AddNewAddress')
  }

  const ref = useRef();

  useEffect(() => {
    const data = {
      created_by: user?._id,
    }
    
    dispatch(AddressListRequest(data))
  }, [])
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
        const currentLongitude = JSON.stringify(position.coords.longitude)

        const currentLatitude = JSON.stringify(position.coords.latitude)
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

  const manageAddress = (details) => {
    console.log("Datata====>",details)
   let params ={
       "latitude": details?.geometry?.location?.lat,
       "location": details?.formatted_address,
       "longitude": details?.geometry?.location?.lng
     }
     console.log("location",params)
    //  setLocation(params)
     ref.current?.setAddressText(addressText);
 
   }
  const checked = () => setValue(!value)
  const renderItems = ({item, index}) => (
    <TouchableOpacity
      style={styles.cardStyle}
      onPress={() => {
        setAddress({...currentAddress, selectedId: index})
        dispatch(setAddressId(item?._id))
        dispatch(setSelectedAddress(index))
      }}>
      <View style={styles.cardHeader}>
        <Text style={styles.placeText}>{item?.address_type}</Text>
        <Icon
          type="FontAwesome"
          style={[
            {
              color: selectedAddress === index ? Colors.RED : Colors.LIGHT_GRAY,
            },
            {fontSize: 23},
          ]}
          name={selectedAddress === index ? 'dot-circle-o' : 'circle-o'}
        />
      </View>
      <Text style={styles.placeText}>
        {item?.house_name_and_no},{item?.area_name},{item?.nearby}
      </Text>
    </TouchableOpacity>
  )

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
      <Text style={styles.headerText}>Select Location </Text>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <ScrollView indicatorStyle="white">
          <View style={styles.locationHeader}>
            <Icon
              name="my-location"
              type="MaterialIcons"
              style={styles.buttonImage}
            />
            <Text onPress={getOneTimeLocation} style={styles.locationStyle}>
              {' '}
              Use current location
            </Text>
          </View>
        
          <GooglePlacesAutocomplete
            ref={ref}
            fetchDetails={true}
            styles={{
              
              textInput: {
                borderWidth: Scale(2),
                borderColor: '#AB8F8E',
                height: Scale(50),
                width: '100%',
                paddingHorizontal: Scale(15),
                paddingVertical: Scale(15),
                alignSelf: 'center',
                borderRadius: Scale(10),
                color: Colors.BLACK,
                fontSize: 16,
              },
             
            }}
           
            // onChangeText={(text) => setAddressText(text)}
            placeholder='Search location...'
          //   onPress={(data, details = null) => {
          //     console.log('====================================');
          //     console.log("Aakash====>",data);
          //     console.log('====================================');
          //     manageAddress(details)
          // }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
            query={{
              types: "geocode",
              fields:'geometry',
              key: androidMapAPIKey,
              language: 'en',
            }}
          />
          <View style={styles.heading}>
            <Text style={styles.savedStyle}>Saved Addresses</Text>
            <TouchableOpacity onPress={redirectToAddress}>
              <View style={styles.addStyle}>
                <Text style={styles.addStyle1}>Add New Address</Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList data={addressList} renderItem={renderItems} />
          <View style={{marginTop: Scale(80)}}>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}
export default SelectLocation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
  },
  addStyle1: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    padding: 14,
    paddingLeft: 18,
    alignSelf: 'center',
  },
  textStyle: {
    color: Colors.BORDERCOLOR,
    fontSize: Scale(14),
    marginTop: Scale(10),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Scale(10),
  },
  placeText: {
    fontSize: Scale(16),
    color: Colors.BLACK,
  },
  cardStyle: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: Scale(2),
    borderColor: '#AB8F8E',
    marginVertical: Scale(15),
    paddingHorizontal: Scale(15),
    paddingVertical: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(10),
  },

  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Scale(30),
    marginBottom: Scale(10),
  },
  locationStyle: {fontSize: Scale(16), color: Colors.APPCOLOR},
  savedStyle: {color: '#AB8F8E', 
  fontSize: Scale(16),
  fontWeight:'bold'
},
  heading: {
    marginTop:Scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addStyle: {
    fontSize: Scale(12),
    color: Colors.WHITE,
    width: Scale(150),
    justifyContent: 'center',
    height: Scale(45),
    textAlignVertical: 'center',
    backgroundColor: Colors.APPCOLOR,
    textAlign: 'center',
    borderRadius: Scale(30),
  },
  buttonImage: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: Scale(25),
    color: '#F7A00D',
  },
  inputStyle: {
    color: Colors.BLACK,
    fontSize: Scale(16),
    marginBottom: Scale(15),
    fontWeight: 'bold',
  },
  searchView: {
    borderRadius: 10,
    backgroundColor:'red',
    height: 50,
    borderColor: '#AB8F8E',
    borderWidth: Scale(2),
    width: '100%',
    marginVertical: Scale(15),
    fontSize: 12,
    backgroundColor: Colors.WHITE,
  },
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
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
  notificationStyle: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
    alignSelf: 'flex-end',
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
