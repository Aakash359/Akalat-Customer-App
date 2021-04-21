import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, FlatList, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { CustomButton } from '../../Component';
import { useNavigation } from '@react-navigation/native';
function Profile() {
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const redirectToEditProfile = () => {
    navigate('EditProfile');
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
      <Text style={styles.headerText}>My Profile </Text>
      <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
        <Text style={styles.textStyle}>Name</Text>
        <Text style={styles.inputStyle}>Jmaes jon</Text>
        <Text style={styles.textStyle}>Mobile Number</Text>
        <Text style={styles.inputStyle}>+91 7839445015</Text>
        <Text style={styles.textStyle}>Email Address</Text>
        <Text style={styles.inputStyle}>james@gmail.com</Text>
        <View style={{ justifyContent: 'flex-end', flex: 1 }}>
          <CustomButton title="Edit Profile" isSecondary={true} onSubmit={redirectToEditProfile} />
        </View>
      </ImageBackground>

    </View>
  );
}
export default Profile;
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
