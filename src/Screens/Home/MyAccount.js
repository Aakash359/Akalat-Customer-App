import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, StatusBar, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { useNavigation } from '@react-navigation/native';
function Explore() {
  const [check, setChecked] = useState(false);
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const redirectToNotification = () => {
    navigate('Notification');
  };
  const [data, setData] = React.useState([
    { name: 'My Profile', screenName: 'Profile' },
    { name: 'My Orders', screenName: 'MyOrders' },
    { name: 'Favorites', screenName: 'Favorites' },
    { name: 'Offers', screenName: 'Offers' },
    { name: 'Refer a Friend', screenName: 'Share' },
    { name: 'Settings', screenName: 'Settings' },
    { name: 'Help & Support', screenName: 'HelpSupport' },
    { name: 'About Us', screenName: 'AboutUs' },
    { name: 'Privacy Policy', screenName: 'PrivacyPolicy' },
    { name: 'Terms and Conditions', screenName: 'TermCondition' },
    { name: 'FAQs', screenName: 'FAQs' },
  ]);
  const redirectTocheck = () => {
    setChecked(!check);
  };
  const renderItems = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigate(item.screenName)}>      
    <View  style={styles.cardStyle}>
      <Text style={styles.normalText}>{item.name}</Text>
      <Image source={ImagesPath.right_new} />      
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />
      
      <View style={styles.filterContainer} />
      <ImageBackground source={ImagesPath.background} style={[styles.loginInputCont, { flex: 1, marginBottom: Scale(-50) }]}>
        <FlatList
          data={data}
          renderItem={renderItems}
        />
      </ImageBackground>
    </View>
  );
}
export default Explore;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
    paddingTop:Scale(20)
  },
  loginInputCont: {
    top: Scale(-50),
    paddingVertical: Scale(20),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Scale(25),
    height: Scale(60),
    borderBottomWidth: Scale(2),
    borderBottomColor: '#ABBFBE'
  },
  normalText: {
    fontSize: Scale(16),
    color: "#202020"
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: Scale(50),
    backgroundColor: Colors.APPCOLOR,
    width: '100%',
    alignSelf: 'center'
  },
  notificationStyle: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
    alignSelf: 'flex-end',
  },
  bottomHeader: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1
  },
  headerContainer: {    
    paddingTop:Scale(20),
    flexDirection: 'row',
    backgroundColor: Colors.APPCOLOR,
    height: Scale(100),
    // paddingTop: Scale(35),
    alignItems: 'center',
    paddingHorizontal: Scale(25),
  },
  location: {
    marginRight: Scale(10),
    width: Scale(25),
    height: Scale(25),
    resizeMode: 'contain',
    tintColor: Colors.WHITE
  },
});
