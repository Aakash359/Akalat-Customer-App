import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, StatusBar, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
function Explore() {
  const [check, setChecked] = useState(false);
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const redirectToNotification = () => {
    navigate('Notification');
  };
  const redirectTocheck = () => {
    setChecked(!check);
  };
  const renderItems = ({ item, index }) => (
    <View style={styles.cardStyle}>
      <ImageBackground source={ImagesPath.reset} style={styles.backgroundStyle}>
        <View style={{ justifyContent: 'flex-end', flex: 1, }}>
          <View style={{ flexDirection: 'row', paddingBottom: Scale(10), alignItems: 'center', paddingHorizontal: Scale(10) }}>
            <Text style={{ fontSize: Scale(12), color: Colors.WHITE, marginLeft: Scale(7), paddingHorizontal: Scale(7), paddingVertical: Scale(5), backgroundColor: 'green', }}>4.0</Text>
            <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
            <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
            <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
            <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
            <Icon name="star" type="FontAwesome" style={[styles.iconStyle, { color: Colors.WHITE }]} />
            <View style={{ justifyContent: 'flex-end', flex: 1, }}>
              <Text style={{ color: '#fff', textAlign: 'right',fontSize:Scale(16) }}>1.5 km</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={{ flexDirection: 'row', paddingVertical: Scale(10), alignItems: 'center', paddingHorizontal: Scale(10), justifyContent: 'space-between' }}>
        <Text style={{ fontSize: Scale(16), fontWeight: 'bold' }}>Fire & Orill <Text style={{ color: '#AB8F8E', fontSize: Scale(12), fontWeight: 'normal' }}>(11:00 am - 10:00 pm)</Text>
          <Text style={{ fontSize: Scale(12), fontWeight: 'normal' }}>{'\n'}Cafe,European,Contrental, Bearage</Text> </Text>
        <Icon name="heart" type="FontAwesome" style={{ color: "#AB8F8E", fontSize: Scale(20), marginHorizontal: Scale(2), }} />

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />
      {/* <View style={styles.headerContainer}>
        <Image source={ImagesPath.location} style={styles.location} />
        <Text style={{ color: Colors.WHITE }}>NH 28,C block DLF Phase 3...</Text>
        <View style={styles.bottomHeader}>
          <TouchableOpacity onPress={redirectToNotification}>
            <Image source={ImagesPath.notification} style={styles.notificationStyle} />
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={{ paddingBottom: Scale(15), paddingHorizontal: Scale(20), alignItems: 'center', backgroundColor: Colors.APPCOLOR }}>
        <Searchbar
          style={styles.searchView}
          onIconPress={clearImmediate}
          inputStyle={{ fontSize: Scale(14), marginLeft: Scale(-15) }}
          placeholder="Search here..."
        />
      </View>
      <View style={styles.filterContainer}>
          <View style={check ? styles.leftContainer : styles.leftContainer1}>
            <TouchableOpacity onPress={redirectTocheck}>
              <Text style={check ? styles.normalText : styles.normalText1}>Restaurant</Text>
            </TouchableOpacity>
          </View>
          <View style={check ? styles.leftContainer1 : styles.leftContainer}>

            <TouchableOpacity onPress={redirectTocheck}>
              <Text style={check ? styles.normalText1 : styles.normalText}>Dishes</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
        <ScrollView>
       
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Scale(25), paddingTop: Scale(10) }}>
            <Text style={{ color: '#AB8F8E', fontSize: Scale(16) }}>Near By</Text>
            <Text style={{ color: Colors.DARK_RED, fontSize: Scale(16) }}>View All</Text>
          </View>
          <FlatList
          style={{paddingBottom:Scale(100)}}
            data={[0, 1, 2, 3]}
            renderItem={renderItems}
          />
           </ScrollView>
       
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
    top: Scale(-20),
    paddingTop: Scale(10),
    paddingBottom: Scale(50),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  searchView: {
    borderRadius: 10,
    height: 50,
    borderColor: Colors.GRAY_LINES,
    borderWidth: 0,
    width: '100%',
    fontSize: 12,
    backgroundColor: Colors.WHITE,
  },
  backgroundStyle: {
    width: '100%',
    height: Scale(150),
    resizeMode: 'stretch',
    borderTopLeftRadius: Scale(10),
    borderTopRightRadius: Scale(10),
    overflow:'hidden',    
  },
  normalText: {
    fontSize: Scale(12),
    color: Colors.WHITE
  },
  normalText1: {
    fontSize: Scale(12),
    color: Colors.APPCOLOR
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: Scale(50),
    backgroundColor: Colors.APPCOLOR,
    width: '100%',
    alignSelf: 'center'
  },
  leftContainer: {
    paddingHorizontal: Scale(10),
    borderRadius: Scale(30),
    marginLeft: Scale(25),
    borderColor: 'grey',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.WHITE,
    height: Scale(50),
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftContainer1: {
    paddingHorizontal: Scale(10),
    borderRadius: Scale(30),
    backgroundColor: Colors.WHITE,
    marginLeft: Scale(25),
    borderColor: 'grey',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.WHITE,
    height: Scale(50),
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center'
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
    flexDirection: 'row',
    backgroundColor: Colors.APPCOLOR,
    paddingVertical: Scale(35),
    paddingHorizontal: Scale(25),
  },
  location: {
    marginRight: Scale(10),
    width: Scale(25),
    height: Scale(25),
    resizeMode: 'contain',
    tintColor: Colors.WHITE
  },
  cardStyle: {
    elevation: 3,
    shadowOpacity: 3,
    height: Scale(225),
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: "#E0E0E0",
    marginVertical: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(10)
  },
  iconStyle: {
    color: '#FFBB00',
    fontSize: Scale(15),
    marginLeft:Scale(8),
  },
});
