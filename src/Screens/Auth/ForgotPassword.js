import React, { useState } from 'react';
import {View,Text,TouchableOpacity,Image,KeyboardAvoidingView,ScrollView,Platform,StyleSheet,ImageBackground,} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import {screenWidth,screenHeight,ImagesPath, Colors,Scale,Fonts,} from '../../CommonConfig';
import { AuthStyle } from './AuthStyle';
import { useNavigation } from '@react-navigation/native';
import { CustomButton, FormInput } from '../../Component';
function ForgotPassword() {
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
                            <Image source={ImagesPath.loginBg} style={{ width: screenWidth, flex: 1 }} />
                        </View>
                        <ImageBackground source={ImagesPath.background} style={AuthStyle.loginInputCont}>
                            <View style={{ paddingHorizontal: Scale(25), }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}>
                                    <Image
                                        source={ImagesPath.backArrow}
                                        style={styles.arrowStyle} />
                                </TouchableOpacity>
                                <Text style={styles.primaryText}>Forgot Password</Text>
                                <Text style={styles.normalText}>Please enter your registered mobile number to reset password</Text>
                                <FormInput
                                    placeholder="Mobile Number"
                                    autoCapitalize="none"
                                    keyboardType={'numeric'}
                                    maxLength={30}
                                />
                                <CustomButton title="Submit" onSubmit={() => navigate('Otp')} isSecondary={true} />
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
        marginTop: Scale(15),
    },
})
