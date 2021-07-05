import React, { useState, useEffect } from 'react';
import { Text, View, PermissionsAndroid, StyleSheet, StatusBar, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale,ImagesPath, iOSMapAPIKey, androidMapAPIKey } from '../../CommonConfig';
import { CustomButton, FormInput,LocationInput } from '../../Component';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { AddAddressResquest } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey);

function AddNewAddress() {
    const [activeTab, setActiveTab] = useState(0);
    const [value, setValue]=useState(false);
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const [currentAddress,setAddress] = useState('');
    const [house_name_and_no ,setHouseName] = useState('');
    const [area_name ,setAreaName] = useState('');
    const [nearby,setNearby] = useState('');
    const addAddressResponse = useSelector((state) => state.Setting);
    const dispatch = useDispatch();
    const [currentLongitude,setCurrentLatitude] = useState(['unknown']);
    const [currentLatitude,setCurrentLatitude] = useState('unknown');
    // const redirectToMyAccount = () => {
    //     navigate('ManageAddress');
    // };

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                //subscribeLocationLocation();
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
                        console.log("=============================================json data", json.results[1].formatted_address, "================================Flat no")
                        // var addressComponent = json.results[0].address_components[1].long_name+ ' ' +json.results[0].address_components[2].long_name 
                        let addressComponent = json.results[1].formatted_address;
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
    const checked = () => (
        setValue(!value)
    )

    const onSubmit = async() => { 
      
        if(house_name_and_no == '') {
          alert("Please enter House No")
         }
        else if(area_name == '') {
          alert("Please enter area ")
        }
        else if(nearby == '') {
          alert("Please enter nearby")
        }
         
          const data = { 

            "address_type": activeTab==0 ? 'HOME' : (activeTab==1)? 'WORK' : 'OTHER',
            'lng': "20.25264",
            "lat": "21.02023",
            'house_name_and_no': house_name_and_no,
            'area_name':area_name,
            'nearby': nearby,
            'address_type': "HOME",
            'created_by' : "6062f7e6fc29943ec00c5952"
            }
          dispatch(AddAddressResquest(data));
          
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
                <Icon onPress={() => navigation.goBack()} name="arrowleft" type="AntDesign" style={styles.logoStyle} />
            </View>
            <Text style={styles.headerText}>Add New Address </Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
            <KeyboardAvoidingView style={styles.keyboardStyle} behavior={Platform.OS == 'android' ? '' : 'padding'}
                enabled>
           
                <ScrollView indicatorStyle='white' >
                <Icon name="arrowleft" type="AntDesign" style={styles.logoStyle} onPress={() => navigation.goBack()} />
                        <LocationInput
                            placeholder="Current Location"
                            autoCapitalize="none"                            
                            value={currentAddress}
                            onChangeText={(val) => setAddress(val)}
                            maxLength={30} />
                            <Text style={{fontSize:Scale(16),textAlign:'center',color:Colors.BORDERCOLOR,marginVertical:Scale(10)}}>or</Text>
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
                        <View style={{  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Scale(10) }}>
                            <Text onPress={() => setActiveTab(0)} style={activeTab == 0 ? styles.forgotButton1 : styles.forgotButton}>Home</Text>
                            <Text onPress={() => setActiveTab(1)} style={activeTab == 1 ? styles.forgotButton1 : styles.forgotButton}>Work</Text>
                            <Text  onPress={() => setActiveTab(2)} style={activeTab == 2 ? styles.forgotButton1 : styles.forgotButton}>Other</Text>
                        </View>
                    <View style={{ marginTop: Scale(20) }}>
                        <CustomButton title="Save" isSecondary={true} onSubmit={onSubmit} />
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>

        </View>
    );
}
export default AddNewAddress;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APPCOLOR
    },
    textStyle: {
        color: Colors.BORDERCOLOR,
        fontSize: Scale(14),
        marginTop: Scale(10)
    },
    forgotButton: {
       
        paddingHorizontal: Scale(23),
        paddingVertical: Scale(14),
        borderRadius: Scale(30),
        fontSize: Scale(16),
        borderWidth: 1,
        borderColor: Colors.BORDERCOLOR,
        color: Colors.BORDERCOLOR,
    },
    forgotButton1: {
        
        backgroundColor: Colors.DARK_RED,
        paddingHorizontal: Scale(23),
        paddingVertical: Scale(14),
        borderRadius: Scale(30),
        fontSize: Scale(16),
        color: Colors.WHITE,
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
        color: Colors.WHITE
    },
    headerContainer: {
        height: Scale(80),
        alignItems: 'center',
        paddingTop:Scale(20),
        flexDirection: 'row',
        backgroundColor: Colors.APPCOLOR,
        paddingHorizontal: Scale(25),
    },

    logoStyle: {
        marginTop: Scale(15),
        fontSize: Scale(25),
        color: Colors.WHITE,
    },
});
