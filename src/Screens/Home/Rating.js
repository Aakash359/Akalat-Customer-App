import React, { useState, useEffect } from 'react';
import { Switch, Text, View, StyleSheet, PermissionsAndroid, StatusBar, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath, iOSMapAPIKey, androidMapAPIKey } from '../../CommonConfig';
import { CustomButton, FormInput,FormArea } from '../../Component';
import { useNavigation } from '@react-navigation/native';

function Rating() {
    const [value, setValue] = useState('0')
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToMyAccount = () => {
        navigate('SavedCard');
    };
    const [isEnabled, setIsEnabled] = useState(true);
    
    const setCheckedSwitch = () => {
      setIsEnabled(!isEnabled)
    };


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
            <Text style={styles.headerText}>Rating and Reviews  </Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
                <View style={{marginTop:Scale(20)}}>
                    <Text style={{fontSize:Scale(16)}}>Rate</Text>
                <View style={{flexDirection:'row',marginVertical:Scale(10)}}>
                 <Icon type="FontAwesome" name="star" style={{fontSize:Scale(35),color:Colors.GRAY,marginRight:Scale(2)}}/>                 
                 <Icon type="FontAwesome" name="star" style={{fontSize:Scale(35),color:Colors.GRAY,marginRight:Scale(2)}}/>
                 <Icon type="FontAwesome" name="star" style={{fontSize:Scale(35),color:Colors.GRAY,marginRight:Scale(2)}}/>
                 <Icon type="FontAwesome" name="star" style={{fontSize:Scale(35),color:Colors.GRAY,marginRight:Scale(2)}}/>
                 <Icon type="FontAwesome" name="star" style={{fontSize:Scale(35),color:Colors.GRAY,marginRight:Scale(2)}}/> 
                 </View>
                 <FormArea
                            placeholder="Write your reviews..."
                            label="Reviews"
                            autoCapitalize="none"
                            maxLength={30}
                        />
                        
                    
                        <View style={{marginTop:Scale(30),}}>
                        <CustomButton title="Submit" isSecondary={true} onSubmit={redirectToMyAccount}/>
                        </View>

                 </View>  
            </ImageBackground>

        </View>
    );
}
export default Rating;
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
