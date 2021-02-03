import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Scale, Colors, ImagesPath } from '../../CommonConfig';
import { FormInput, CustomButton } from '../../Component';
import Location from './Location';
import { Icon } from 'native-base';
function Address() {
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToHome = () => {
        navigate('Home');
    };
    return (                 
                    <View style={styles.container}>                    
                        <Icon name="arrowleft" type="AntDesign" style={styles.logoStyle} onPress={() => navigation.goBack()} />
                        <Text style={styles.primaryText}>Signup</Text>
                        <Location/>
                        <View style={{ marginTop: Scale(10) }}>
                            <CustomButton title="Signup" onSubmit={redirectToHome} isSecondary={true} />
                        </View>
                    </View>

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
