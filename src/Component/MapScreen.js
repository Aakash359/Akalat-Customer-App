import React, { Component } from 'react';
import {StyleSheet, View, Linking, Platform ,Image, PermissionsAndroid, ToastAndroid} from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker} from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service';
import {bool, func} from 'prop-types'

const markers = [
  {
      coordinate: {
          latitude: 30.7335,
          longitude: 76.7794,
      },
      image:
          'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg',
      title: '',
  },
]
export class MapScreen extends Component {
    constructor () {
        super()        
        this.state = {
            forceLocation: true,
            highAccuracy: true,
            loading: false,
            showLocationDialog: true,           
            location: undefined,
        }
    }

    async componentDidMount () {
        const hasLocationPermission = await this.hasLocationPermission();    
        if (!hasLocationPermission) {
          return;
        }else {
            this.getLocation()
        }
    }

    hasLocationPermissionIOS = async () => {
        const openSetting = () => {
          Linking.openSettings().catch(() => {
            Alert.alert('Unable to open settings');
          });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');
    
        if (status === 'granted') {
          return true;
        }
    
        if (status === 'denied') {
          Alert.alert('Location permission denied');
        }
    
        if (status === 'disabled') {
          Alert.alert(
            `Turn on Location Services to allow "Lavena Coffee" to determine your location.`,
            '',
            [
              { text: 'Go to Settings', onPress: openSetting },
              { text: "Don't Use Location", onPress: () => {} },
            ],
          );
        }
    
        return false;
      };
    
      hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          const hasPermission = await this.hasLocationPermissionIOS();
          return hasPermission;
        }
    
        if (Platform.OS === 'android' && Platform.Version < 23) {
          return true;
        }
    
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    
        if (hasPermission) {
          return true;
        }
    
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        }
    
        if (status === PermissionsAndroid.RESULTS.DENIED) {
          ToastAndroid.show(
            'Location permission denied by user.',
            ToastAndroid.LONG,
          );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          ToastAndroid.show(
            'Location permission revoked by user.',
            ToastAndroid.LONG,
          );
        }
    
        return false;
      };

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();
    
        if (!hasLocationPermission) {
          return;
        }
    
        this.setState({ loading: true }, () => {
          Geolocation.getCurrentPosition(
            (position) => {
              this.setState({ location: position, loading: false });
              console.log(position);
              
            },
            (error) => {
              this.setState({ loading: false });
              console.log(error);
            },
            {
              enableHighAccuracy: this.state.highAccuracy,
              timeout: 15000,
              maximumAge: 10000,
              distanceFilter: 0,
              forceRequestLocation: this.state.forceLocation,
              showLocationDialog: this.state.showLocationDialog,
            },
          );
        });
      };

    render() {
      const {onMarkerPress,} = this.props
        return (
              <View style = {{flex:1}}>
                    <MapView
                    style={StyleSheet.absoluteFillObject}
                      region={{
                        latitude: this.state.location != undefined ?this.state.location.coords.latitude :21.192572,
                        longitude: this.state.location != undefined ?this.state.location.coords.longitude :72.799736,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                        
                      }}
                      loadingEnabled = {true}
                      loadingIndicatorColor="#666666"
                      loadingBackgroundColor="#eeeeee"
                      moveOnMarkerPress = {false}
                      showsUserLocation={true}
                      showsCompass={true}
                      provider={PROVIDER_GOOGLE}
                      ref={c => this.mapView = c}
                      
                  /> 
                  {markers.map((marker, index) => (
                    <Marker
                        key={`marker-${index}`}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                        onPress={onMarkerPress}>
                        <View style={{height:50,width:50}}>
                        <Image
                            source={{uri: marker.image}}
                            style={{height:50,width:50}}
                        />
                        </View>
                    </Marker>
                ))}
                     
                       
</View>
                        
        );
    }
}

MapScreen.propTypes = {
  
  onMarkerPress: func.isRequired,
  
}
export default MapScreen;
