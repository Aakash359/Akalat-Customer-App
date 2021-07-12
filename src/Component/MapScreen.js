import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Linking,
  Platform,
  Image,
  PermissionsAndroid,
  ToastAndroid,
  Text
} from 'react-native'
import {
  androidMapAPIKey,} from '../CommonConfig';
import MapView, {PROVIDER_GOOGLE, Marker,Callout,Polyline} from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import {bool, func} from 'prop-types'
import MapViewDirections from 'react-native-maps-directions';

const markers = [
  {
    coordinate: {
      latitude: 21.192572,
      longitude: 76.7794,
    },
    image: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg',
    title: '',
  },
]

const LATITUDE = 70.5017317;
const LONGITUDE =  77.083698;

export class MapScreen extends Component {
  constructor() {
    super()
    this.state = {
      forceLocation: true,
      highAccuracy: true,
      loading: false,
      showLocationDialog: true,
      location: undefined,
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],

    }
  }

  async componentDidMount() {
   
    const hasLocationPermission = await this.hasLocationPermission()
    
    
    if (!hasLocationPermission) {
      return
    } else {
      this.getLocation()
    }
  }


  hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings')
      })
    }
    const status = await Geolocation.requestAuthorization('whenInUse')

    if (status === 'granted') {
      return true
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied')
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "Lavena Coffee" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      )
    }

    return false
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasLocationPermissionIOS()
      return hasPermission
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )

    if (hasPermission) {
      return true
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      )
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      )
    }

    return false
  }

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission()

    if (!hasLocationPermission) {
      return
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({location: position, loading: false})
          console.log(position)
        },
        (error) => {
          this.setState({loading: false})
          console.log(error)
        },
        {
          enableHighAccuracy: this.state.highAccuracy,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
        },
      )
    })
  }

  render() {
    const {onMarkerPress} = this.props
    return (
      <View style={{flex: 1}}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={{
            latitude:
              this.state.location != undefined
                ? this.state.location.coords.latitude
                : 21.192572,
            longitude:
              this.state.location != undefined
                ? this.state.location.coords.longitude
                : 72.799736,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          moveOnMarkerPress={false}
          showsUserLocation={true}
          showsCompass={true}
          provider={PROVIDER_GOOGLE}
          
        >
        
          <Marker
            
            coordinate={{latitude:  26.4640454,
              longitude: 80.3261518,}}

              
            
              source={require('../Assets/Images/bell.png')}
                style={{height: 180, width: 180, justifyContent: 'center'}}
              >
              <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>Favourite Restaurant</Text>
             
                  <Image 
                    style={styles.image}
                    source={require('../Assets/Images/back.png')}
                  />
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
           
            </Marker>

            <Marker
            
            coordinate={{latitude:  26.4640454,
              longitude: 80.32,}}

              
            
              source={require('../Assets/Images/bell.png')}
                style={{height: 180, width: 180, justifyContent: 'center'}}
              >
              <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>Favourite Restaurant</Text>
             
                  <Image 
                    style={styles.image}
                    source={require('../Assets/Images/back.png')}
                  />
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
           
            </Marker>
            <Polyline
          coordinates={[
            {latitude:
              this.state.location != undefined
                ? this.state.location.coords.latitude
                : 21.192572,
            longitude:
              this.state.location != undefined
                ? this.state.location.coords.longitude
                : 72.799736,},
            { latitude: 26.4640454, longitude: 80.32 }]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={['#7F0000']}
          strokeWidth={6}
        />
            
         
     
        </MapView>
      </View>
    )
  }
}

MapScreen.propTypes = {
  onMarkerPress: func.isRequired,
}
export default MapScreen

const styles = StyleSheet.create({
  map: {
    height: '100%'
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },

  name: {
    fontSize: 16,
    marginBottom: 5,
  },

  image: {
    width: "100%",
    height: 100,
  },
});

