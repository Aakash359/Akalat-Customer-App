import * as React from 'react';
import { Text, View, StyleSheet, FlatList,StatusBar, ScrollView,TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function Coupon(props) {
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const redirectToHomeMaker = () => {
      navigate('HomeMaker');
  };
  const redirectToFilter = () => {
    navigate('Filter');
};
const redirectToSortBy = () => {
  navigate('SortBy');
};
  const redirectToNotification = () => {
    navigate('Notification');
};


  
  const renderItems = ({ item, index }) => (
    <View style={styles.cardStyle}>
      <TouchableOpacity onPress={redirectToHomeMaker}>
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
              <Text style={{ color: '#fff', textAlign: 'right',fontSize:Scale(16) }}>1.5km</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={{ flexDirection: 'row', paddingVertical: Scale(10), alignItems: 'center', paddingHorizontal: Scale(10), justifyContent: 'space-between' }}>
        <Text style={{fontSize:Scale(16),fontWeight:'bold'}}>Fire & Orill <Text style={{color:'#AB8F8E',fontSize:Scale(12),fontWeight:'normal'}}>(11:00am - 10:00pm)</Text>
        <Text style={{fontSize:Scale(12),fontWeight:'normal'}}>{'\n'}Cafe,Europoan,Contrental, Bearage</Text> </Text>
        <Icon name="heart" type="FontAwesome" style={{ color: "#AB8F8E", fontSize: Scale(20), marginHorizontal: Scale(2), }} />

      </View>
      </TouchableOpacity>
    </View>
  );
  const {couponDetails ={}} = props.route.params || {}
  console.log("couponDetails",couponDetails)
  // const {restroDetails: couDet} = list
  return (
    <View style={styles.container}>
        
      <StatusBar
        translucent={true}
        inputStyle={{ fontSize: Scale(14),marginLeft:Scale(-15) }}                   
        backgroundColor={Colors.APPCOLOR}   
        barStyle="light-content"
      />
      <ImageBackground source={{uri: couponDetails?.offer_image}} style={styles.backgroundStyle1}>
      <Icon onPress={() => navigation.goBack()} name="arrowleft" type="AntDesign" style={styles.logoStyle} />
        <Text style={styles.headingText}>{couponDetails?.coupon_discount_in_percentage} % OFF{' '}</Text>
          <Text style={styles.bottomText}>{couponDetails?.coupon_detail}</Text>
          <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
           <ScrollView>
          
      <View style={styles.filterContainer}>
      <TouchableOpacity       
         style={styles.leftContainer} onPress={redirectToSortBy}>
          <Text style={styles.normalText}>Sort By</Text>
          <Image source={ImagesPath.up} />
       
        </TouchableOpacity>
          <TouchableOpacity style={styles.leftContainer} onPress={redirectToFilter}>
          <Text style={styles.normalText}>Filters</Text>
          <Image source={ImagesPath.filter} />
          </TouchableOpacity>
        
      </View>
      <FlatList
        data={[0, 1, 2, 3]}
        renderItem={renderItems}
      />
      </ScrollView>
      </ImageBackground>
      </ImageBackground>
    </View>

  );
}
export default Coupon;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  logoStyle: {
    marginHorizontal: Scale(20),
    fontSize: Scale(25),
    color: Colors.WHITE,
  },
  headingText: {
    color: Colors.WHITE,
    fontSize: Scale(20),
    marginHorizontal: Scale(25),
    marginTop: Scale(40),
    fontWeight: 'bold'
  },
  bottomText: {
    color: Colors.WHITE,
    fontSize: Scale(16),
    marginHorizontal: Scale(25),
    marginTop: Scale(3),
    marginBottom: Scale(30)
  },
  loginInputCont: {
    flex:1,
    // top: Scale(-20),
     paddingTop: Scale(10),
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
backgroundStyle1: {
    flex:1,
    width: "100%",
    height: "100%",
    paddingTop: Scale(70)
  },
  backgroundStyle: {
    width: '100%',
    height: Scale(150),
    resizeMode: 'stretch',
    borderTopLeftRadius: Scale(10),
    borderTopRightRadius: Scale(10),
    overflow:'hidden'
  },
  normalText:{
    fontSize:Scale(16),
    color:Colors.BORDERCOLOR
  },  
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Scale(10),
    width: '90%',
    alignSelf: 'center'
  },
  leftContainer: {
    paddingHorizontal: Scale(10),
    borderRadius: Scale(5),
    borderColor: 'grey',
    flexDirection: 'row',
    borderWidth: 1,
    height: Scale(45),
    width: '45%',
    justifyContent: 'space-between',
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
    borderWidth:2,
    borderColor:"#E0E0E0",
    marginVertical: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(10)
  },
  iconStyle: {
    color: Colors.APPCOLOR,
    fontSize: Scale(15),
    marginHorizontal: Scale(3)
  },
});
