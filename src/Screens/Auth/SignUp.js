import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Scale, Colors, ImagesPath } from '../../CommonConfig';
import { FormInput, CustomButton } from '../../Component';
import { Icon } from 'native-base';
function SignUp() {
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToHome = () => {
        navigate('Home');
    };
    return (
        <ImageBackground source={ImagesPath.background} style={styles.imageBachgroundStyle}>
            <KeyboardAvoidingView style={styles.keyboardStyle} behavior={Platform.OS == 'android' ? '' : 'padding'}
                enabled>
                <ScrollView indicatorStyle={Colors.WHITE}>
                    <View style={styles.container}>
                        <Icon name="arrowleft" type="AntDesign" style={styles.logoStyle} onPress={() => navigation.goBack()} />
                        <Text style={styles.primaryText}>Signup</Text>
                        <FormInput
                            placeholder="First Name"
                            autoCapitalize="none"
                            maxLength={30}
                        />
                        <FormInput
                            placeholder="Last Name"
                            autoCapitalize="none"
                            maxLength={30}
                        />
                        <FormInput
                            placeholder="Mobile Number"
                            autoCapitalize="none"
                            keyboardType={'numeric'}
                            maxLength={30}
                        />
                        <FormInput
                            placeholder="Email Address"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            maxLength={30}
                        />

                        <FormInput
                            placeholder="Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            maxLength={30}
                        />
                        <FormInput
                            placeholder="Confirm Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            maxLength={30}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Scale(10) }}>
                            <Icon name="check-box" type="MaterialIcons" style={{ color: Colors.DARK_RED }} />
                            <Text style={styles.forgotButton}>I accept <Text style={{ color: Colors.APPCOLOR }}>Privary Policy</Text> and <Text style={{ color: Colors.APPCOLOR }}>Terms &{'\n'}Conditions </Text></Text>

                        </View>
                        <View style={{ marginTop: Scale(10) }}>
                            <CustomButton title="Signup" onSubmit={redirectToHome} isSecondary={true} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </ImageBackground>

    );
}
export default SignUp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Scale(25),
        paddingTop: Scale(50),
    },
    imageBachgroundStyle: {
        height: '100%',
        width: '100%'
    },
    forgotButton: {
        marginTop: Scale(5),
        fontSize: Scale(16),
        marginLeft: Scale(15),
        color: Colors.BORDERCOLOR,
    },
    logoStyle: {
        fontSize: Scale(25),
        color: Colors.DARK_RED,
        height: Scale(20),
        width: Scale(45),
    },
    primaryText: {
        marginVertical: Scale(30),
        fontSize: Scale(30),
        fontWeight: 'bold',
        textAlign: 'left',
    },
    normalText: {
        fontSize: Scale(16),
        color: Colors.BLACK,
        textAlign: "left",
    },
});
