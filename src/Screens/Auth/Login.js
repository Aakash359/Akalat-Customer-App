import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground,KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Scale, Colors, ImagesPath } from '../../CommonConfig';
import { FormInput, CustomButton, PasswordInput, NumberInput } from '../../Component';
import { Icon } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { loginRequest, loaderRequest, } from '../../redux/actions'
import { LoadWheel } from '../../CommonConfig/LoadWheel'

function Login(props) {
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const  user = useSelector((state) => state.Auth);
    const  {isLoading} = useSelector((state) => state.Auth);
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');


      if(user.loginStatus==true)
      {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'HomeStack',
                        params: { user: 'jane' }
                    },
                ],
            }))
      }

    const  onSubmit = () =>{
        if(phone == '') {
        alert("Please enter Mobile Number")
        }
        else if(password == '') {
          alert("Please enter Password")
        }
        else
        {
            const data = { 
                'phone': parseInt(phone),
                'password':password,
         }
        dispatch(loaderRequest(true))

        setTimeout(() => {

            dispatch(loginRequest(data));

                }, 1000);
        }
        
      }

    
    const redirectToForgotPassword = () => {
        navigate('ForgotPassword');
    };
    const [hidePassword, setHidePasswordl] = useState(true);

    const setPasswordVisibility = () => {
        setHidePasswordl(!hidePassword);
    };

   

    console.log('ISLOADING: ', isLoading);

    return (
        <ImageBackground source={ImagesPath.background} style={styles.imageBachgroundStyle}>
            <KeyboardAvoidingView style={styles.keyboardStyle} behavior={Platform.OS == 'android' ? '' : 'padding'}
                enabled>

             <Icon onPress={() => navigation.goBack()} name="arrowleft" type="AntDesign" style={styles.logoStyle} />
                <ScrollView indicatorStyle='white'>
                  
                    <View style={styles.container}>
                    
                        <Text style={styles.primaryText}>Hello !</Text>

                        <Text style={styles.normalText}>Welcome back</Text>

                        <FormInput
                            placeholder="Mobile Number"
                            autoCapitalize="none"
                            keyboardType={'numeric'}
                            maxLength={10}
                            value={phone}
                            onChangeText={(text) => setphone(text )}
                        />
                        <FormInput
                            placeholder="Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            maxLength={30}
                            value={password}
                            onChangeText={(text) => setpassword(text)}
                        />
                        <Text onPress={redirectToForgotPassword} style={styles.forgotButton}>Forgot Password?</Text>
                        <View style={{ marginVertical: '60%' }}>

                        <CustomButton isSecondary={true}  title="Login" onSubmit={onSubmit}  />

                        </View>
                    </View>
                </ScrollView>
                <LoadWheel visible={isLoading} />
            </KeyboardAvoidingView>

        </ImageBackground>

    );
}



export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Scale(25),
        paddingTop: Scale(10),
    },
    imageBachgroundStyle: {
        height: '100%',
        width: '100%'
    },
    forgotButton: {
        alignSelf: 'center',
        fontSize: Scale(15),
        textAlign: 'center',
        marginTop: Scale(15),
        color: Colors.DARK_RED,
    },
    logoStyle: {
        fontSize: Scale(25),
        color: Colors.DARK_RED,
        marginTop:Scale(40),
        marginLeft:Scale(25),
    },
    primaryText: {
        marginTop: Scale(30),
        fontSize: Scale(24),
        fontWeight: 'bold',
        textAlign: 'left',
    },
    normalText: {
        fontSize: Scale(16),
        color: Colors.BLACK,
        textAlign: "left",
        marginTop:Scale(5),
        marginBottom: Scale(25)
    },
});
