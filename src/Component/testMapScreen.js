import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  PermissionsAndroid
} from "react-native";
import {
  ImagesPath,
  Colors,
  GOOGLE_MAPS_APIKEY
} from '../../CommonConfig';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import Location from '../../CommonConfig/Location';
// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = 0.0;
const LATITUDE = 70.5017317;
const LONGITUDE =  77.083698;
const lat2 =28.504800
const long2 =77.079960
class MapScreenDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
       latitudeDelta: 0,
       longitudeDelta: 0.05,
      })
    };
  }

    componentDidMount() {
       Geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
           console.log("dtaaaaaaa",initialRegion)
            this.setState({latitude: lat,
                longitude: long,})
        })

      
    const { coordinate } = this.state;

    this.watchID = Geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
   Geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({   
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          //zoomEnabled={true}
          //zoomTapEnabled={true}
          region={this.getMapRegion()}
        >
         <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />                  
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
                >
                     <Image
                       source={ImagesPath.location}
                       style={{
                         tintColor:Colors.DARK_RED,
                      transform: [
                    { scaleX: -1 }
                    ]
                     }}
                      resizeMode='contain'
                                        />
                    </Marker.Animated>
                          <MapView.Marker coordinate={{
                      latitude: lat2,
                      longitude:long2,
                  }}>
                                    <View>
                                        <Image
                                            source={ImagesPath.location}
                                             style={{ tintColor:Colors.DARK_RED }}
                                            resizeMode='contain'
                                        />

                                    </View>
                                </MapView.Marker>
                  <MapViewDirections
                    destination={{latitude: this.state.latitude, longitude:this.state.longitude}}
                    origin={{latitude: lat2, longitude:long2}}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeColor={Colors.DARK_RED}
                    strokeWidth={3}
                   
                    mode="DRIVING"
                    waypoints ={this.routeCoordinates}
                    onReady={result => {
                    
                    console.log(`Distance: ${result.distance} km`)
                    console.log(`Duration: ${result.duration} min.`)
                                                              
                    }}
                    onStart={result => {                      
                    console.log(`data: ${JSON.stringify(result)} `)
                    }}
                    onError={(errorMessage) => {
                    console.log("eroorMESSGE",errorMessage);
                    }}
                    />
        </MapView>
        <View style={styles.buttonContainer}>
          
        </View>
        <Location/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    //...StyleSheet.absoluteFill,
   // justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    height:'50%',
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

export default MapScreenDemo;
