import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image,KeyboardAvoidingView,ScrollView } from 'react-native';
import { useNavigation,CommonActions  } from '@react-navigation/native';
import { Scale, Colors, ImagesPath } from '../../CommonConfig';
import { FormInput,CustomButton ,PasswordInput} from '../../Component';
import {Icon} from 'native-base';
function Login() {
    const { navigate } = useNavigation();  
    const navigation = useNavigation();  
    const redirectToHome = () => {
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'HomeStack',
                  params: { user: 'jane' },
                },
              ],
            }))
     //   navigate('HomeStack');
    };
    const redirectToForgotPassword = () => {
        navigate('ForgotPassword');
    };
    const [hidePassword, setHidePasswordl] = useState(true);
   
    const setPasswordVisibility = () => {
        setHidePasswordl(!hidePassword);
    };

    let data = [{
        value: 'India +91',
        id:'+91'
    }, {
        value: 'United States +1',
        id:'+1'
    }, {
        value: 'Canada +234',
        id:'+234'
    }];

    return (
        <ImageBackground source={ImagesPath.background} style={styles.imageBachgroundStyle}>
            <KeyboardAvoidingView style={styles.keyboardStyle} behavior={Platform.OS == 'android' ? '' : 'padding'}
                        enabled>
               <ScrollView indicatorStyle={Colors.WHITE}>
               <View style={styles.container}>
                   <Icon onPress={() => navigation.goBack()} name="arrowleft" type="AntDesign" style={styles.logoStyle}/>
               <Text style={styles.primaryText}>Hello!</Text>               
                <Text style={styles.normalText}>Welcome back</Text>
               
                <PasswordInput
                    placeholder="Mobile Number"
                    autoCapitalize="none"
                    keyboardType={'numeric'}
                    maxLength={30}
                />
                <FormInput
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    maxLength={30}
                />
                    <Text onPress={redirectToForgotPassword} style={styles.forgotButton}>Forgot Password?</Text>                
                <View style={{marginTop:Scale(30)}}>
                <CustomButton title="Login" onSubmit={redirectToHome} isSecondary={true} />
                
                </View>
                  </View>
                  </ScrollView>
           </KeyboardAvoidingView>    
            
        </ImageBackground>

    );
}
export default Login;
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
        marginTop:Scale(30),
        fontSize: Scale(24),
        fontWeight:'bold',
        textAlign: 'left',      
    },
    normalText:{
fontSize:Scale(16),
color:Colors.BLACK,
textAlign:"left",
marginBottom:Scale(25)
    },
});
