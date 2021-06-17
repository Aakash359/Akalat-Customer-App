import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { CustomButton, FormInput } from '../../Component';
import { useNavigation } from '@react-navigation/native';
import { changePasswordRequest } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux';

function ChangePassword() {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [conPass, setConPass] = useState('');
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const  user = useSelector((state) => state.Auth.user);
    const redirectToSettings = () => {
        navigate('Settings');
    };

    const  onSubmit = () =>{
        if(oldPass == '') {
            alert("Please enter old password")
        }
        else if(newPass == '') {
            alert("please enter new password")
        }
        else if(conPass == '' ) {
            alert("please enter confirm password")
        }
        else if(newPass != conPass) {
            alert("Password & confirm password don't match")
        }
        else
        {
            const data = { 
                '_id': user?._id,
                'old_password':oldPass,
                'password':newPass,
                'confirm_password':conPass,
                }
              
              navigate('MyAccount')
              dispatch(changePasswordRequest(data));
              alert("Your Password has been changed successfully!")
              
        }
      }
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
            <Text style={styles.headerText}>Change Password </Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
                <KeyboardAvoidingView style={styles.keyboardStyle} behavior={Platform.OS == 'android' ? '' : 'padding'}
                    enabled>
                    <ScrollView indicatorStyle='white'>
                        <FormInput
                            placeholder="Old Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            maxLength={30}
                            value={oldPass}
                            onChangeText={(text) => setOldPass(text )}
                        />
                        <FormInput
                            placeholder="New Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            maxLength={30}
                            value={newPass}
                            onChangeText={(text) => setNewPass(text )}
                        />
                        <FormInput
                            placeholder="Confirm Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            maxLength={30}
                            value={conPass}
                            onChangeText={(text) => setConPass(text )}
                        />
                        <View style={{marginTop:Scale(20)}}>
                        <CustomButton title="Save" isSecondary={true} onSubmit={onSubmit} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>

        </View>
    );
}
export default ChangePassword;
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
