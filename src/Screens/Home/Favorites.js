import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, StatusBar, Image, FlatList, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { useNavigation } from '@react-navigation/native';
import { favouriteListRequest, } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux';
import { LoadWheel } from '../../CommonConfig/LoadWheel'
function Favorites() {
  const [checked, setChecked] = useState(false)
  const { navigate } = useNavigation();
  const navigation = useNavigation();  
  const dispatch = useDispatch();
  const  favouriteListResponse = useSelector((state) => state.Setting.favouriteListResponse);
  const  favouriteList = favouriteListResponse?.data?.restroList || []
 
  const  user = useSelector((state) => state.Auth.user);
  const  {isLoading} = useSelector((state) => state.Auth);
  const onPressChecked = () => {
    setChecked(!checked);
  };

  useEffect(() => {

    const data = { 
         "userid": user?._id
         }
        
        dispatch(favouriteListRequest(data));
     }, 
  []); 
  const renderItems = ({ item, index }) => (
    <View style={styles.cardStyle}>
      <View style={styles.imageContainer}>
        <Image  source={{ uri: item?.image }} style={styles.backgroundStyle1} />
        <View style={styles.heading}>
          <View style={styles.textContainer}>
            <Text style={styles.primaryText}>{item?.restro_name}</Text>
            <Icon onPress={onPressChecked} type="FontAwesome" name={checked ? "heart" : 'heart-o'}
              style={styles.heartIconStyle} />
          </View>
          <Text style={styles.normatText}>{item?.street_name}, {item?.area_name},{' '}
                            {item?.region}, {item?.state}...</Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.buttonStyle1}>
          <Text style={styles.textStyle1}>{item?.rating_from_user}</Text>
          <Text style={styles.normalText}>Ratings</Text>
        </View>
        <View style={styles.buttonStyle1}>
          <Text style={styles.textStyle1}>25 Min</Text>
          <Text style={styles.normalText}>Delivery Time</Text>
        </View>
        <View style={styles.buttonStyle1}>
          <Text style={styles.textStyle1}>2.7 km</Text>
          <Text style={styles.normalText}>Distance</Text>
        </View>
        <LoadWheel visible={isLoading} />
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
      <View style={styles.headerContainer}>
        <Icon onPress={() => navigation.goBack()} name="arrowleft" type="AntDesign"
          style={styles.logoStyle} />
      </View>
      <View style={{
        marginBottom: Scale(20),
        marginHorizontal: Scale(25),
      }}>
        <Text style={styles.headerText}>Favorites </Text>
      </View>
      <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
        <FlatList
          data={favouriteList}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
                <Text style={{ alignSelf: 'center' }}>
                    You don't have any favourite list
                </Text>
            )
        }}
        />
      </ImageBackground>
    </View>
  );
}
export default Favorites;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  heading: {
    flex: 1,
    marginTop: Scale(-10)
  },
  backgroundStyle1: {
    width: Scale(100),
    height: Scale(100),
    borderWidth: 1,
    resizeMode: 'stretch',
    borderRadius: Scale(20),
    marginRight: Scale(10)
  },
  primaryText: { 
    color: Colors.BLACK, 
    fontSize: Scale(18), 
    fontWeight: 'bold' 
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Scale(15)
  },
  buttonStyle1: {
    height: Scale(50),
    width: '31%',
    borderColor: Colors.LIGHTGREY,
    borderRadius: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle1: { 
    color: Colors.BLACK, 
    fontSize: Scale(16), 
    fontWeight: 'bold' 
  },
  normalText: { 
    color: 'grey', 
    fontSize: Scale(12) 
  },
  cardStyle: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: Scale(2),
    borderColor: Colors.LIGHTGREY,
    marginVertical: Scale(15),
    paddingHorizontal: Scale(10),
    paddingVertical: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(10)
  },
  normatText: { 
    color: Colors.BLACK, 
    fontSize: Scale(16), 
    marginTop: Scale(7) 
  },
  buttonStyle: {
    borderRadius: Scale(20),
    height: Scale(40),
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: Scale(30),
    paddingHorizontal: Scale(15)
  },
  activeButton: {
    borderRadius: Scale(20),
    height: Scale(40),
    justifyContent: 'center',
    borderRadius: Scale(30),
    paddingHorizontal: Scale(15)
  },
  heartIconStyle: {
    fontSize: Scale(25),
    color: Colors.DARK_RED
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: Colors.APPCOLOR,
    fontSize: Scale(15),
    fontWeight: 'bold'
  },
  inActiveStyle: {
    color: Colors.WHITE,
    fontSize: Scale(15),
    fontWeight: 'bold'
  },
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  headerText: {
    fontSize: Scale(20),
    fontWeight: 'bold',
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
