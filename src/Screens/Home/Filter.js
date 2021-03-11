import React, { useState, useEffect } from 'react';
import { Switch, Text, View, StyleSheet, PermissionsAndroid, StatusBar, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath, iOSMapAPIKey, androidMapAPIKey } from '../../CommonConfig';
import { CustomButton, FormInput } from '../../Component';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
function Filter() {
    const [value, setValue] = useState('0')
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToRating = () => {
        navigate('Rating');
    };
    const [isEnabled, setIsEnabled] = useState(true);
    
    const setCheckedSwitch = () => {
      setIsEnabled(!isEnabled)
    };


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
            <Text style={styles.headerText}>Filters </Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
                
                    <View style={{ marginTop:Scale(20),justifyContent:'center',height:Scale(100),paddingVertical:Scale(20),borderRadius:10 ,borderWidth:Scale(2),width:'100%',borderColor:Colors.LIGHT_GRAY}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:Scale(15),}}>
                        <Text>Distance</Text>
                        <Text>8 Miles</Text>
                        </View>
                        <Slider
                            style={{ marginTop:Scale(20)  }}
                            minimumValue={10}
                            maximumValue={100}
                            value={40}                        
                            minimumTrackTintColor={Colors.APPCOLOR}
                            maximumTrackTintColor="#000000"
                        />
                    </View>
                    <View style={{ marginTop:Scale(25),justifyContent:'center',height:Scale(100),paddingVertical:Scale(20),borderRadius:10 ,borderWidth:Scale(2),width:'100%',borderColor:Colors.LIGHT_GRAY}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:Scale(15),}}>
                        <Text>Distance</Text>
                        <Text>8 Miles</Text>
                        </View>
                        <Slider
                            style={{ marginTop:Scale(20)  }}
                            minimumValue={10}
                            maximumValue={100}
                            value={40}                        
                            minimumTrackTintColor={Colors.APPCOLOR}
                            maximumTrackTintColor="#000000"
                        />
                    </View>
                    <View style={{ marginTop:Scale(25),justifyContent:'center',paddingVertical:Scale(20),borderRadius:10 ,borderWidth:Scale(2),width:'100%',borderColor:Colors.LIGHT_GRAY}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:Scale(15),}}>
                        <Text>Veg only</Text>
                        <Switch
              trackColor={{ false: Colors.DARK_RED, true: Colors.DARK_RED }}
              style={{transform: [{scaleX: 1.1}, {scaleY: 1.1}]}}
              thumbColor={isEnabled ? Colors.WHITE : Colors.WHITE}
              ios_backgroundColor={Colors.GREEN}
              onValueChange={setCheckedSwitch}
              value={isEnabled}
            />
                        </View>
                       
                    </View>
                    <View style={{justifyContent:'flex-end',flex:1}}>
                    <View style={{marginTop:Scale(50),flexDirection:'row'}}>
                        <View style={{flex:1,marginRight:Scale(10)}}>
                        <CustomButton title="Reset All"   />
                        </View>
                        <View style={{flex:1}}>
                        <CustomButton title="Apply" isSecondary={true} onSubmit={redirectToRating} />
                        </View>
                        </View>
                        </View>
            </ImageBackground>

        </View>
    );
}
export default Filter;
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
    inputStyle: {
        color: Colors.BLACK,
        fontSize: Scale(16),
        marginBottom: Scale(15),
        fontWeight: 'bold'
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
