import React from 'react';
import {View, StyleSheet, PermissionsAndroid, Platform} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
console.disableYellowBox = true;
export default class Location extends React.Component {
  state = {
    currentLongitude: 'unknown',
    currentLatitude: 'unknown',
  };
  componentDidMount() {
    var that = this;
    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
           
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.callLocation(that);
          } else {
          }
        } catch (err) {
          alert('err', err);
        }
      }
      requestLocationPermission();
    }
  }
  callLocation(that) {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
       
        const currentLatitude = JSON.stringify(position.coords.latitude);
      
        that.setState({currentLongitude: currentLongitude});
       
        that.setState({currentLatitude: currentLatitude});
       
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    that.watchID = Geolocation.watchPosition(position => {
      const currentLongitude = JSON.stringify(position.coords.longitude);
      
      const currentLatitude = JSON.stringify(position.coords.latitude);

      that.setState({currentLongitude: currentLongitude});
      
      that.setState({currentLatitude: currentLatitude});
     
    });
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }
  render() {
    return <View />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 16,
    backgroundColor: 'white',
  },
  boldText: {
    fontSize: 30,
    color: 'red',
  },
});
