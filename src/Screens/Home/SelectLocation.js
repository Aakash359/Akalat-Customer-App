import React, { useState, useEffect } from 'react';
import { Text, View, FlatList,PermissionsAndroid, StyleSheet, StatusBar, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, Fonts,ImagesPath, iOSMapAPIKey, androidMapAPIKey } from '../../CommonConfig';
import { CustomButton, FormInput } from '../../Component';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { Searchbar } from 'react-native-paper';
Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey);
function SelectLocation() {
    const [value, setValue]=useState(false);
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const [
        currentAddress,
        setAddress
    ] = useState('');
    const [items, setItems] = React.useState([
        {id:'2',place: 'Home', address: 'HN-256, C block, DLF phase 3, Gurgaon-122016',  },
        {id:'2', place: 'Work', address: 'HN-256, C block, DLF phase 3, Gurgaon-122016', },
    
      ]);
    const redirectToMyAccount = () => {
        navigate('SavedCard');
    };
    const redirectToAddress = () =>{
        navigate('AddNewAddress');
    }
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
    const renderItems = ({ item, index }) => (
      
        <View style={styles.cardStyle}>
            <View style={styles.cardHeader}>             
                    <Text style={styles.placeText}>{item.place}</Text>                
                   <Icon style={{fontSize:Scale(25),color:value ? Colors.DARK_RED :'#AF9163'}} onPress={checked} type='FontAwesome' name={value ? 'dot-circle-o' : "circle-o"}/>
            </View>
            <Text style={styles.placeText}>
                {item.address}
                </Text>
        </View>
    );

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
            <Text style={styles.headerText}>Select Location </Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
                <ScrollView indicatorStyle={Colors.WHITE}>
                    <View style={styles.locationHeader}>
                        <Icon
                            name='my-location'
                            type='MaterialIcons'
                            style={styles.buttonImage}
                        />
                        <Text onPress={getOneTimeLocation} style={styles.locationStyle} >   Use current location</Text>
                    </View>

                    <Searchbar
                        style={styles.searchView}
                        onIconPress={clearImmediate}
                        inputStyle={{ fontSize: Scale(16), marginLeft: Scale(-15) }}
                        placeholder="Search location..."
                    />
                    <View style={styles.heading}>
                        <Text style={styles.savedStyle}>Saved Addresses</Text>
                        <Text onPress={redirectToAddress} style={styles.addStyle}>Add New Address</Text>
                    </View>
                    <FlatList
                            data={items}
                            renderItem={renderItems}
                        />
                    <View style={{ marginTop: Scale(20) }}>
                        <CustomButton title="Save" isSecondary={true} onSubmit={redirectToMyAccount} />
                    </View>
                </ScrollView>
            </ImageBackground>

        </View>
    );
}
export default SelectLocation;
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
    cardHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:Scale(10)
    },
    placeText:{
        fontSize:Scale(16),
        fontFamily:Fonts.Bold,
        color:Colors.BLACK
    },
    cardStyle: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderWidth: Scale(2),
        borderColor: "#AB8F8E",
        marginVertical: Scale(15),
        paddingHorizontal: Scale(15),
        paddingVertical: Scale(15),
        alignSelf: 'center',
        borderRadius: Scale(10)
      },
   
    locationHeader: { flexDirection: 'row', alignItems: 'center', marginTop: Scale(30), marginBottom: Scale(10) },
    locationStyle: { fontSize: Scale(16), color: Colors.APPCOLOR },
    savedStyle: { color: '#AB8F8E', fontSize: Scale(16) },
    heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    addStyle: {
        fontSize: Scale(12),
        color: Colors.WHITE,
        width: Scale(150),
        height: Scale(45),
        textAlignVertical: 'center',
        backgroundColor: Colors.APPCOLOR,
        textAlign: 'center',
        borderRadius: Scale(30)
    },
    buttonImage: {
        textAlign: 'center',
        textAlignVertical: 'center',
        // paddingLeft:Scale(5),
        fontSize: Scale(25),
        color: "#F7A00D",
    },
    inputStyle: {
        color: Colors.BLACK,
        fontSize: Scale(16),
        marginBottom: Scale(15),
        fontWeight: 'bold'
    },
    searchView: {
        borderRadius: 10,
        height: 50,
        borderColor: "#AB8F8E",
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
        color: Colors.WHITE
    },
    notificationStyle: {
        width: Scale(25),
        height: Scale(25),
        resizeMode: 'contain',
        tintColor: Colors.WHITE,
        alignSelf: 'flex-end',
    },
    headerContainer: {        
        paddingTop:Scale(20),
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
});
