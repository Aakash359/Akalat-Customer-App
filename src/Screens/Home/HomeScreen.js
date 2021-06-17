import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, FlatList,StatusBar, ScrollView,TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { offercardRequest,restroListRequest  } from '../../redux/actions'


function HomeScreen() {

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

const dispatch = useDispatch();

const offercardResponse = useSelector((state) => state.Home.offercardResponse); 
const restroResponse = useSelector((state) => state.Home.restroResponse); 
const [offercard, setofferCard] = React.useState(offercardResponse?.data || []);
const [restroItems, setrestroItems] = React.useState(restroResponse?.data || []);
const [cartList, setcartList] = useState([]);

useEffect(() => {

  setTimeout(() => {

    dispatch(offercardRequest());
    dispatch(restroListRequest());

  }, 1000);
  
 
 },[]); 


  
  const renderItems = ({ item, index }) => (
    <View style={styles.cardStyle}>
      <TouchableOpacity 
      onPress={redirectToHomeMaker} 
         
         
         >
      <ImageBackground source={{uri: item.image }}  style={styles.backgroundStyle}>
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
      <View style={{ flexDirection: 'row',paddingTop: Scale(15),paddingVertical: Scale(10),alignItems: 'center', paddingHorizontal: Scale(10), justifyContent: 'space-between' }}>
        <Text style={{fontSize:Scale(16),fontWeight:'bold'}}>{item.name}
        <Text style={{color:'#AB8F8E',fontSize:Scale(12),fontWeight:'normal'}}>{' '}(11:00 am - 10:00 pm)</Text>
        <Text style={{fontSize:Scale(12),fontWeight:'normal'}}>{'\n'}{item.address}</Text> </Text>
        <Icon name="heart" type="FontAwesome" style={{ color:"#AB8F8E", fontSize: Scale(16),  marginBottom:Scale(25)}} />

      </View>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item, index }) => (
    <View style={{
      width: Scale(310),
      height: Scale(150),      
      backgroundColor: '#ffffff',
      borderWidth:2,
      borderColor:"#E0E0E0",
      marginVertical: Scale(15),
      marginHorizontal:Scale(10),
      alignSelf: 'center',
      borderRadius: Scale(10)}}>
      <ImageBackground source={{uri: item.image }} style={[styles.backgroundStyle,{borderRadius:Scale(10)}]}>
        <View style={{ justifyContent: 'flex-end', flex: 1, }}>
          <View style={{  paddingBottom: Scale(10), alignItems: 'flex-start', paddingHorizontal: Scale(10) }}>
            <Text style={{ fontSize: Scale(12), color: Colors.WHITE, marginLeft: Scale(7), paddingHorizontal: Scale(7), paddingVertical: Scale(5), backgroundColor: 'green', }}>Price</Text>
            <Text style={{textShadowColor: 'rgb(255,255,255)', textShadowOffset: {width: 0.1, height: 0.1}, textShadowRadius: 5, fontSize: Scale(18), color: Colors.WHITE, marginLeft: Scale(7),  paddingVertical: Scale(5),}}>Spicy Mozzorella{'\n'}Italian Pizza
            </Text>
          </View>
        </View>
      </ImageBackground>   
      
    </View>
  );
  const renderItem1 = ({ item, index }) => (
    <View style={{width:Scale(170),
      height: Scale(55),      
      marginVertical: Scale(15),
      alignSelf: 'center',
      }}>
        
    <TouchableOpacity onPress={() => navigate('Coupon')}>
      <ImageBackground source={ImagesPath.coupon} style={{
         width: '95%',
         height: Scale(55),
         resizeMode: 'stretch',
         borderTopLeftRadius: Scale(30),
         borderTopRightRadius: Scale(30),
      }}>
         <View style={{  paddingBottom: Scale(10), alignItems: 'flex-start', paddingHorizontal: Scale(10) }}>
            <Text style={{ fontSize: Scale(12), color: 'grey',   paddingTop: Scale(5),}}>
            COUPON
            </Text>
            <Text style={{ fontSize: Scale(14), color: Colors.WHITE,marginTop:Scale(3)  }}>
             40% OFF <Text style={{ fontSize: Scale(12), color: 'grey', marginLeft:Scale(30) }}>All Items</Text>
            </Text>
          </View>
      
      </ImageBackground>   
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        inputStyle={{ fontSize: Scale(14),marginLeft:Scale(-15) }}                   
        backgroundColor={Colors.APPCOLOR}   
        barStyle="light-content"
      />
     
      <View style={{ paddingVertical:Scale(20),paddingHorizontal: Scale(20), alignItems: 'center',backgroundColor:Colors.APPCOLOR }}>
                <Searchbar
                    style={styles.searchView}
                    onIconPress={clearImmediate}
                    inputStyle={{ fontSize: Scale(14),marginLeft:Scale(-15) }}        
                    placeholder="Search restaurant, dishes(or food) here..."
                />
            </View>
      <ScrollView>
      <FlatList
       showsHorizontalScrollIndicator={false}                 
      horizontal
      style={{marginHorizontal:Scale(12)}}
        data={[0,1,2,3,4]}
        renderItem={renderItem1}
      />
      <FlatList
       showsHorizontalScrollIndicator={false}                 
      horizontal
      style={{marginHorizontal:Scale(12)}}
        data={offercard}
        renderItem={renderItem}
      />
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
        data={restroItems}
        renderItem={renderItems}
      />
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  searchView: {
    borderRadius: 10,
    height: 50,
    borderColor: Colors.GRAY_LINES,
    borderWidth: 0,
    width: '100%',
    fontSize: 12,
    marginTop:-12,
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
  normalText:{
    fontSize:Scale(14),
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
    color: "#FFBB00",
    fontSize: Scale(15),
    marginLeft:Scale(8),
  },
});
