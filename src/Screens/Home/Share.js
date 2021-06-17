import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image, Share, ImageBackground } from 'react-native';
import { Icon, Left } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { CustomButton, FormInput } from '../../Component';
import { useNavigation } from '@react-navigation/native';

function ShareScreen() {
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToMyAccount = () => {
        navigate('Favorites');
    };
    const shareAppLink=() =>{
        Share.share({
          message: "Share Application Link." 
    })}
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
            <Text style={styles.headerText}>Referral Code</Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>               
               <Image source={ImagesPath.refer} style={{alignSelf:'center',marginTop:Scale(100)}}/>
               <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:Scale(10)}}>
               <Text style={{fontSize:Scale(20),color:'#202020',}}>Irshad_hussain_2605  </Text> 
               <Image source={ImagesPath.copy} style={{left:15}}/>
               </View>
               <Text style={{textAlign:'center',fontSize:Scale(16),marginTop:Scale(20)}}>On the other hand, we denounce with righteous 
                   indignation and dislike men who are so beguiled</Text>                       
                        <View style={{justifyContent:'flex-end',flex:1,marginBottom:Scale(30)}}>
                        <CustomButton title="Invite Friends" isSecondary={true} onSubmit={shareAppLink} />
                        </View>
            </ImageBackground>

        </View>
    );
}
export default ShareScreen;
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
      //  justifyContent:'center',
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
