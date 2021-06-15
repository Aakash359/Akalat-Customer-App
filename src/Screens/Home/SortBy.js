import React, { useState,} from 'react';
import {Text, View, StyleSheet,StatusBar, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath, } from '../../CommonConfig';
import { CustomButton, } from '../../Component';
import { useNavigation } from '@react-navigation/native';
 
function SortBy() {
    const [value, setActiveTab] = useState(null)
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToHome = () => {
        navigate('Home');
    };
    const [isEnabled, setIsEnabled] = useState(false);
    
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
            <Text style={styles.headerText}>Sort By </Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
                
                    <View style={{ marginTop:Scale(25),justifyContent:'center',paddingVertical:Scale(15),borderRadius:10 ,borderWidth:Scale(2),width:'100%',borderColor:Colors.LIGHT_GRAY}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:Scale(15),alignItems:'center'}}>
                        <Text>Relevance</Text>
                        <Icon type="FontAwesome"  style={value == 0 ? {color:Colors.DARK_RED} : {color:Colors.LIGHT_GRAY}} name={ value == 0 ? "dot-circle-o" : "circle-o"} onPress={() => setActiveTab(0)}/>
                        </View>                       
                    </View>
                    <View style={{ marginTop:Scale(25),justifyContent:'center',paddingVertical:Scale(15),borderRadius:10 ,borderWidth:Scale(2),width:'100%',borderColor:Colors.LIGHT_GRAY}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:Scale(15),alignItems:'center'}}>
                        <Text>Rating High to Low</Text>
                        <Icon type="FontAwesome" style={value == 1 ? {color:Colors.DARK_RED} : {color:Colors.LIGHT_GRAY}} name={ value == 1 ? "dot-circle-o" : "circle-o"} onPress={() => setActiveTab(1)}/>
                        </View>                       
                    </View>
                    <View style={{ marginTop:Scale(25),justifyContent:'center',paddingVertical:Scale(15),borderRadius:10 ,borderWidth:Scale(2),width:'100%',borderColor:Colors.LIGHT_GRAY}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:Scale(15),alignItems:'center'}}>
                        <Text>Rating Low to High</Text>
                        <Icon type="FontAwesome" style={value == 2 ? {color:Colors.DARK_RED} : {color:Colors.LIGHT_GRAY}} name={ value == 2 ? "dot-circle-o" : "circle-o"} onPress={() => setActiveTab(2)} />
                        </View>                       
                    </View>
                    <View style={{ marginTop:Scale(25),justifyContent:'center',paddingVertical:Scale(15),borderRadius:10 ,borderWidth:Scale(2),width:'100%',borderColor:Colors.LIGHT_GRAY}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:Scale(15),alignItems:'center'}}>
                        <Text>Delivery Time</Text>
                        <Icon type="FontAwesome" style={value == 3 ? {color:Colors.DARK_RED} : {color:Colors.LIGHT_GRAY}} name={ value == 3 ? "dot-circle-o" : "circle-o"} onPress={() => setActiveTab(3)}/>
                        </View>                       
                    </View>
                    <View style={{justifyContent:'flex-end',flex:1}}>
                    <View style={{marginTop:Scale(50),flexDirection:'row'}}>
                        <View style={{flex:1,marginRight:Scale(10)}}>
                        <CustomButton title="Reset All"   />
                        </View>
                        <View style={{flex:1}}>
                        <CustomButton title="Apply" isSecondary={true} onSubmit={redirectToHome} />
                        </View>
                        </View>
                        </View>
            </ImageBackground>

        </View>
    );
}
export default SortBy;
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
