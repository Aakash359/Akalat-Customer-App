import React, { useState } from 'react';
import {View,Text,TouchableOpacity,
Image,KeyboardAvoidingView,ScrollView,Platform,StyleSheet,ImageBackground,StatusBar} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import {screenWidth,screenHeight,ImagesPath,COUNTRY, Colors,Scale,Fonts,} from '../../CommonConfig';
import { AuthStyle } from './AuthStyle';
import { useNavigation } from '@react-navigation/native';
import {useSelector,useDispatch} from 'react-redux'
import { CustomButton,FormInput} from '../../Component';
import { OTPRequest } from '../../redux/actions'

function ForgotPassword() {
    const otpResponse = useSelector((state) => state.Auth);

    // console.log('================================OTP data',otpResponse);
    const [phone, setphone] = useState('');
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const  onSubmit = () =>{
      if(phone == '') {

        alert("Please enter phone number")
        }
        else
        {
            const data = { 
                'phone': phone,
                'role' : 'customer',
                'country_code' : COUNTRY == "IN" ? '971' : '91'
     
                }
                console.log("Data",data)
              navigate('Otp', data)
              dispatch(OTPRequest(data));
        }
      }

    return (
        <SafeAreaInsetsContext.Consumer>
            {(insets) => (
                <KeyboardAvoidingView
                    style={AuthStyle.keyboardAware}
                    behavior={Platform.OS == 'android' ? '' : 'padding'}
                    enabled>
                    <ScrollView
                        bounces={false}
                        keyboardShouldPersistTaps={'handled'}
                        showsVerticalScrollIndicator={false}>
                    <StatusBar translucent backgroundColor="transparent" />
                        <View style={styles.container}>
                            <Image source={ImagesPath.bug} 
                            style={{ width: screenWidth, flex: 1 }} 
                            />
                        </View>
                        <ImageBackground source={ImagesPath.background} style={[AuthStyle.loginInputCont,{top:-20}]}>
                            <View style={{ paddingHorizontal: Scale(25), }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}>
                                    <Image
                                        source={ImagesPath.backArrow}
                                        style={styles.arrowStyle} />
                                </TouchableOpacity>
                                <Text style={styles.primaryText}>Forgot Password</Text>
                                <Text style={styles.normalText}>Please enter your registered mobile number to reset password</Text>
                                <View style={{marginVertical:Scale(8)}}>
                                  <FormInput
                                    placeholder="Mobile Number"
                                    autoCapitalize="none"
                                    keyboardType={'numeric'}
                                    maxLength={30}
                                    value={parseInt(phone)}
                                    onChangeText={(text) => setphone(text )}
                                    />
                                </View>
                              
                                <CustomButton title="Submit" onSubmit={onSubmit} isSecondary={true} />
                            </View>
                        </ImageBackground>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </SafeAreaInsetsContext.Consumer>
    );
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: { 
        height: screenHeight/2, alignItems: 'center' 
    },
    mainContainer: { justifyContent: 'space-between', paddingBottom: Scale(10) },
    normalText: {
        fontSize: Scale(16),
        fontFamily: Fonts.Medium,
        marginTop: Scale(5),
        textAlign: 'left',
        width: '90%',
        color: Colors.GRAY,
    },
    heading: {
        flexDirection: 'row',
        marginHorizontal: Scale(30),
        marginTop: Scale(10),
    },
    arrowStyle: {
        tintColor: Colors.DARK_RED,
        width: Scale(20),
        height: Scale(20),
        marginTop: Scale(20),
        resizeMode: 'contain',
    },
    primaryText: {
        textAlign: 'left',
        fontSize: Scale(24),
        fontWeight: 'bold',
        color: Colors.BLACK,
        fontFamily: Fonts.Light,
        marginTop: Scale(22),
    },
})
