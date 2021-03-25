import React, { useState,useEffect } from 'react';
import { Text, View,PermissionsAndroid,Platform, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Scale, Colors, ImagesPath,LocationAlert,androidMapAPIKey,iOSMapAPIKey } from '../../CommonConfig';
import { FormInput, FormInput1,CustomButton, LocationInput } from '../../Component';
import Location from "../../Component/Location";
import { Icon } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey);
function Address() {
    const { navigate } = useNavigation();    
    const [logoutModal, setLogoutModal] = useState(false);
    const [activeTab,setActiveTab]=useState(0);
    const navigation = useNavigation();
    const [
        currentAddress,
        setAddress
      ] = useState('');

    const redirectToMyAccount = () => {
        navigate('SavedCard');
    };
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
                //To Check, If Permission is granted
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
                      console.log("=============================================json data",json.results[1].formatted_address,"================================Flat no")
                     // var addressComponent = json.results[0].address_components[1].long_name+ ' ' +json.results[0].address_components[2].long_name 
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
    
    const redirectToHome = () => {
        navigate('HomeStack');
    };
    return (
        <ImageBackground source={ImagesPath.background} style={styles.imageBachgroundStyle}>
            <KeyboardAvoidingView style={styles.keyboardStyle} behavior={Platform.OS == 'android' ? '' : 'padding'}
                enabled>
                <ScrollView indicatorStyle={Colors.WHITE}>
                    <View style={styles.container}>
                        <Icon name="arrowleft" type="AntDesign" style={styles.logoStyle} onPress={() => navigation.goBack()} />
                        <Text style={styles.primaryText}>Address</Text>
                        <LocationInput
                            placeholder="Current Location"
                            autoCapitalize="none"                            
                            value={currentAddress}
                       onChangeText={(val) => setAddress(val)}
                            maxLength={30} />
                            <Text style={{fontSize:Scale(16),textAlign:'center',color:Colors.BORDERCOLOR,marginVertical:Scale(10)}}>or</Text>
                        <FormInput1
                            placeholder="House No/Flat No"
                            lable="EX- HN 256"
                            autoCapitalize="none"
                            maxLength={30}
                        />
                        <FormInput
                            placeholder="Area"
                            autoCapitalize="none"
                            maxLength={30}
                        />
                        <FormInput
                            placeholder="Nearby"
                            autoCapitalize="none"
                            maxLength={30}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Scale(10) }}>
                        <Text onPress={() => setActiveTab(0)} style={activeTab == 0 ? styles.forgotButton1 : styles.forgotButton}>Home</Text>
                            <Text onPress={() => setActiveTab(1)} style={activeTab == 1 ? styles.forgotButton1 : styles.forgotButton}>Work</Text>
                            <Text  onPress={() => setActiveTab(2)} style={activeTab == 2 ? styles.forgotButton1 : styles.forgotButton}>Other</Text>
                       
                        </View>
                        <View style={{ marginTop: Scale(10) }}>
                            <CustomButton title="Save & Continue" onSubmit={redirectToHome} isSecondary={true} />
                        </View>
                        <LocationAlert
                visible={logoutModal}
                rightButtonText="Allow"
                leftButtonText="Reject"
                onPressRightButton={() => {
                    setLogoutModal(false);
                }}
                onPressLeftButton={() => {
                    setLogoutModal(false)
                    setTimeout(() => {
                        setLogoutModal(false)
                       // setRootTo('Login')
                    }, 1500);
                }}
            />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <Location/>
        </ImageBackground>

    );
}
export default Address;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Scale(25),
        paddingTop: Scale(50),
    },
    imageBachgroundStyle: {
        height: '100%',
        width: '100%'
    },
    forgotButton: {
        // backgroundColor:Colors.DARK_RED,
        paddingHorizontal: Scale(30),
        paddingVertical: Scale(15),
        borderRadius: Scale(30),
        fontSize: Scale(16),
        borderWidth: 1,
        borderColor: Colors.BORDERCOLOR,
        color: Colors.BORDERCOLOR,
    },
    forgotButton1: {
        backgroundColor: Colors.DARK_RED,
        paddingHorizontal: Scale(30),
        paddingVertical: Scale(15),
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
        textAlign: "left",
    },
});
