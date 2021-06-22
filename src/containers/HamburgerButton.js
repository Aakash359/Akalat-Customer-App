import React, {useState,useEffect} from 'react';
import {TouchableOpacity, PermissionsAndroid,Text,View,Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ImagesPath,
  Colors,
  Scale,
  iOSMapAPIKey,androidMapAPIKey
} from '../CommonConfig';

import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey);

function HamburgerButton({}) {
  const navigation = useNavigation();
  const [
    currentAddress,
    setAddress
  ] = useState('Location');

useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         
            getOneTimeLocation();
           } else {
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {

        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);
          Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
                let addressComponent= json.results[1].formatted_address; 
                 console.log(addressComponent, 'addressComponent');
                   setAddress(addressComponent)
                  
          }) 
      },
      (error) => {
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };
  const { navigate } = useNavigation()  
  const redirectToNotification = () => {
  
    navigate('SelectLocation');
};
  return (
    
     <Image
          style={styles.location}
          source={ImagesPath.location}
         />
      
  );
}

export default HamburgerButton;
const styles = StyleSheet.create({
  container: {      
    justifyContent: 'center',
    width: Scale(60),
  },
  location: {
    marginLeft: Scale(25),
    width: Scale(20),
    height: Scale(20),    
    resizeMode: 'contain',
    tintColor: Colors.WHITE
  },  
});
