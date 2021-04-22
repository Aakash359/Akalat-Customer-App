import React, { useState } from 'react';
import {View,Text,TouchableOpacity,Image,KeyboardAvoidingView,ScrollView,Platform,StyleSheet,ImageBackground,} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import {screenWidth,screenHeight,ImagesPath, Colors,Scale,Fonts,} from '../../CommonConfig';
import { AuthStyle } from './AuthStyle';
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { CustomButton,} from '../../Component';

function Otp() {
    const { navigate } = useNavigation();
    const navigation = useNavigation();

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
                        <View style={styles.container}>
                            <Image source={ImagesPath.otp} 
                            style={{ width: screenWidth, flex: 1 }} />
                        </View>
                        <ImageBackground source={ImagesPath.background} style={AuthStyle.loginInputCont}>
                            <View style={{ paddingHorizontal: Scale(25), }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}>
                                    <Image
                                        source={ImagesPath.backArrow}
                                        style={styles.arrowStyle} />
                                </TouchableOpacity>
                                <Text style={styles.primaryText}>OTP Verification</Text>
                                <Text style={styles.normalText}>Enter the verification code send to 9876785670</Text>
                                <View style={{ justifyContent: 'space-between', paddingTop: Scale(15) }}>                                
                                <OTPInputView
                                        style={styles.otpContainer}
                                        pinCount={4}
                                        keyboardType="number-pad"
                                        
                                        autoFocusOnLoad
                                        codeInputFieldStyle={{
                                            backgroundColor: Colors.WHITE,
                                            borderWidth: 1,
                                            borderColor:Colors.BORDERCOLOR,
                                            borderRadius: Scale(5),
                                        }}
                                        editable={true}
                                       // code={this.state.otp}
                                        codeInputHighlightStyle={{
                                            color: Colors.BLACK,
                                            fontSize: Scale(16),
                                        }}
                                        onCodeFilled={(code) => {
                                           // this.setState({ otp: code })
                                            console.log(`Code is ${code}, you are good to go!`);
                                        }}
                                    />
                                    </View>
                                <CustomButton title="Submit" onSubmit={() => navigate('ResetPassword')} isSecondary={true} />
                           <Text style={styles.normalText1}>Didn't get the code?<Text style={{color:Colors.DARK_RED}}> Resend OTP</Text></Text>
                            </View>
                        </ImageBackground>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </SafeAreaInsetsContext.Consumer>
    );
}

export default Otp;

const styles = StyleSheet.create({
    container: { height: screenHeight / 2, alignItems: 'center' },
    mainContainer: { justifyContent: 'space-between', paddingBottom: Scale(10) },
    normalText: {
        fontSize: Scale(16),
        fontFamily: Fonts.Medium,
        marginTop: Scale(5),
        textAlign: 'left',
        width: '80%',
        color: Colors.GRAY,
    },
    normalText1: {
        fontSize: Scale(16),
        fontFamily: Fonts.Medium,
        marginTop: Scale(5),
        textAlign: 'center',
        color: Colors.BLACK,
    },
    otpContainer: {
        width: '70%',
        height: Scale(60),
        alignSelf: 'center',
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
        marginTop: Scale(20),
    },
})
