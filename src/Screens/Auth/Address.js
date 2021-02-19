import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Scale, Colors, ImagesPath,LocationAlert } from '../../CommonConfig';
import { FormInput, CustomButton, LocationInput } from '../../Component';
import Location from "../../Component/Location";
import { Icon } from 'native-base';
function Address() {
    const { navigate } = useNavigation();    
    const [logoutModal, setLogoutModal] = useState(false);
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
                        <Text style={styles.primaryText}>Address</Text>
                        <LocationInput
                            placeholder="Current Location"
                            autoCapitalize="none"
                            maxLength={30} />
                            <Text style={{fontSize:Scale(16),textAlign:'center',color:Colors.BORDERCOLOR,marginVertical:Scale(10)}}>or</Text>
                        <FormInput
                            placeholder="House No/Flat No"
                            autoCapitalize="none"
                            maxLength={30}
                        />
                        <FormInput
                            placeholder="Area"
                            autoCapitalize="none"
                            maxLength={30}
                        />
                        <FormInput
                            placeholder="Near by"
                            autoCapitalize="none"
                            maxLength={30}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Scale(10) }}>
                            <Text onPress={() => setLogoutModal(true)} style={styles.forgotButton1}>Home</Text>
                            <Text style={styles.forgotButton}>Work</Text>
                            <Text style={styles.forgotButton}>Other</Text>
                        </View>
                        <View style={{ marginTop: Scale(10) }}>
                            <CustomButton title="Save & Continue" onSubmit={redirectToHome} isSecondary={true} />
                        </View>
                        <LocationAlert
                visible={logoutModal}
                rightButtonText="Allow"
                leftButtonText="Reject"
                onPressRightButton={() => {
                    setLogoutModal(false);
                }}
                onPressLeftButton={() => {
                    setLogoutModal(false)
                    setTimeout(() => {
                        setLogoutModal(false)
                       // setRootTo('Login')
                    }, 1500);
                }}
            />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <Location/>
        </ImageBackground>

    );
}
export default Address;
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
        // backgroundColor:Colors.DARK_RED,
        paddingHorizontal: Scale(30),
        paddingVertical: Scale(15),
        borderRadius: Scale(30),
        fontSize: Scale(16),
        borderWidth: 1,
        borderColor: Colors.BORDERCOLOR,
        color: Colors.BORDERCOLOR,
    },
    forgotButton1: {
        backgroundColor: Colors.DARK_RED,
        paddingHorizontal: Scale(30),
        paddingVertical: Scale(15),
        borderRadius: Scale(30),
        fontSize: Scale(16),
        color: Colors.WHITE,
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
