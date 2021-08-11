import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Scale, Colors, ImagesPath } from '../../CommonConfig';
import { CustomButton } from '../../Component';
import { useDispatch } from 'react-redux';
import { setSignupStatus } from '../../redux/actions';
import {
    SafeAreaInsetsContext,
} from 'react-native-safe-area-context';



function SelectLoginSignup() {
   const dispatch = useDispatch()
    const { navigate } = useNavigation();    
    const redirectToLogin = () => {
        navigate('Login');
    };
    const redirectToSignUp = () => {
        navigate('SignUp');
    };


    useEffect(() => {
        dispatch(setSignupStatus(false))
      }, [])
    
    return (
        <SafeAreaInsetsContext.Consumer>
        {(insets) => (
            <View style={{ flex: 1 ,}}>
                <StatusBar translucent backgroundColor="transparent"
                barStyle="dark-content" />
        <ImageBackground source={ImagesPath.bg} style={styles.imageBachgroundStyle}>            
             <View style={styles.container}>
               <View style={{marginTop:Scale(30),justifyContent:'center',flex:1}}>
               <Image source={ImagesPath.app_logo} style={styles.logoStyle1} />
                 <Text style={styles.primaryText}>Delicious Food{'\n'} Any Where Any Time</Text>                     
                <CustomButton title="Login" onSubmit={redirectToLogin}  />
                <View style={{marginTop:Scale(-25)}}>
                <CustomButton title="Signup"  isSecondary={true} onSubmit={redirectToSignUp} />
                </View>
                </View>
                  </View>            
        </ImageBackground>
        </View>
                )}
    </SafeAreaInsetsContext.Consumer>
    );
}
export default SelectLoginSignup;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Scale(25),
        paddingTop:Scale(50),
    },
    imageBachgroundStyle: {
         height: '100%',
          width: '100%'
         },
         logoStyle1: {
            marginBottom: Scale(15),
            height: Scale(120),
            width: Scale(120),
            resizeMode: "stretch",
            alignSelf: 'center'
        },
    forgotButton:{
        alignSelf:'center',
        height:Scale(25),
        width:Scale(120),
        textAlign:'center',
        marginTop:Scale(15),
        color:Colors.DARK_RED,
    },     
    logoStyle: {
        
        fontSize:Scale(25),
        color:Colors.DARK_RED,
    },
    primaryText: {
        marginTop:Scale(10),
        marginBottom:Scale(30),
        fontSize: Scale(24),
        fontWeight:'bold',
        textAlign: "center",      
    },
normalText:{
 fontSize:Scale(16),
 color:Colors.BLACK,
 textAlign:"left",
 marginBottom:Scale(25)
    },
});
