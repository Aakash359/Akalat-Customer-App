import React, {useState, useEffect} from 'react'
import {
  Platform,
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  TextInput
} from 'react-native'
import {Icon} from 'native-base'
import {
  Colors,
  Scale,
  ImagesPath,
  iOSMapAPIKey,
  androidMapAPIKey,
} from '../../CommonConfig'
import {CustomButton, FormInput} from '../../Component'
import {useNavigation} from '@react-navigation/native'
import Geolocation from 'react-native-geolocation-service'

import Geocoder from 'react-native-geocoding'
Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey)
function AddNewCard() {
  const [currentAddress, setAddress] = useState('')

  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const redirectToMyAccount = () => {
    navigate('SavedCard')
  }
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation()
        //subscribeLocationLocation();
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
          
        }
      }
    }
    requestLocationPermission()
    return () => {
      Geolocation.clearWatch()
    }
  }, [])

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude)

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude)
        Geocoder.from(position.coords.latitude, position.coords.longitude).then(
          (json) => {
            console.log(
              '=============================================json data',
              json.results[1].formatted_address,
              '================================Flat no',
            )
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
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    )
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
      <Text style={styles.headerText}>Add New Card </Text>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <KeyboardAvoidingView
          style={styles.keyboardStyle}
          behavior={Platform.OS == 'android' ? '' : 'padding'}
          enabled>
          <ScrollView indicatorStyle="white">
            <Text style={styles.textStyle}> 
              Name On Card
            </Text>
            <TextInput 
              style={styles.textInputContainer}
              placeholder="Ex: John"
              autoCapitalize="none"
              maxLength={30}
            />
             <Text style={styles.textStyle}> 
              Card Number
             </Text>
    
            <TextInput 
              style={styles.textInputContainer}
              placeholder="Ex: 1234 5657 9012 3456"
              autoCapitalize="none"
              
              maxLength={30}
            />
            <Text style={styles.textStyle}> 
              Expiry Date
             </Text>
             <TextInput 
              style={styles.textInputContainer}
              placeholder="Ex: 04/26"
              autoCapitalize="none"
              maxLength={30}
            />
            <Text style={styles.textStyle}> 
              CVV Number
             </Text>
             
             <TextInput 
              style={styles.textInputContainer}
              placeholder="Ex: 04/26"
              autoCapitalize="none"
              maxLength={30}
            />
            <View style={{marginTop: Scale(20)}}>
              <CustomButton
                title="Add Card"
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
export default AddNewCard
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
  },
 
  textInputContainer: {
    marginVertical: Scale(8),
    height: Scale(50),
    fontSize: Scale(16),
    color: Colors.BLACK, 
    fontWeight:'bold', 
    paddingHorizontal: Scale(10),
    borderWidth: Scale(1),
    borderColor: "#AB8F8E",
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius:Scale(5),
  },
  textStyle:{
    color: Colors.BORDERCOLOR,
    fontSize:Scale(14),
    marginBottom:Scale(2),
    marginTop:Scale(8)
  },
  inputStyle: {
    color: Colors.BLACK,
    fontSize: Scale(16),
    marginBottom: Scale(15),
    fontWeight: 'bold',
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
