import * as React from 'react';
import { Text, View, StyleSheet, FlatList,StatusBar, ScrollView,TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
function HomeScreen() {
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const redirectToHomeMaker = () => {
      navigate('HungryNow');
  };
  const redirectToFilter = () => {
    navigate('Filter');
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
            <Text style={{ fontSize: Scale(16), color: Colors.WHITE, marginLeft: Scale(7), paddingHorizontal: Scale(7), paddingVertical: Scale(5), backgroundColor: 'green', }}>4.0</Text>
            <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
            <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
            <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
            <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
            <Icon name="star" type="FontAwesome" style={[styles.iconStyle, { color: Colors.WHITE }]} />
            <View style={{ justifyContent: 'flex-end', flex: 1, }}>
              <Text style={{ color: '#fff', textAlign: 'right' }}>1.5km</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={{ flexDirection: 'row', paddingVertical: Scale(10), alignItems: 'center', paddingHorizontal: Scale(10), justifyContent: 'space-between' }}>
        <Text style={{fontSize:Scale(18),fontWeight:'bold'}}>Fire & Orill <Text style={{color:'grey',fontSize:Scale(14),fontWeight:'normal'}}>(11:00am - 10:00pm)</Text>
        <Text style={{fontSize:Scale(16),fontWeight:'normal'}}>{'\n'}Cafe,Europoan,Contrental, Bearage</Text> </Text>
        <Icon name="heart" type="FontAwesome" style={{ color: Colors.BORDERCOLOR, fontSize: Scale(20), marginHorizontal: Scale(2), }} />

      </View>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item, index }) => (
    <View style={{width:Scale(330),
      height: Scale(150),      
      backgroundColor: '#ffffff',
      borderWidth:2,
      borderColor:"#E0E0E0",
      marginVertical: Scale(15),
      marginHorizontal:Scale(10),
      alignSelf: 'center',
      borderRadius: Scale(10)}}>
      <ImageBackground source={ImagesPath.reset} style={styles.backgroundStyle}>
        <View style={{ justifyContent: 'flex-end', flex: 1, }}>
          <View style={{  paddingBottom: Scale(10), alignItems: 'flex-start', paddingHorizontal: Scale(10) }}>
            <Text style={{ fontSize: Scale(16), color: Colors.WHITE, marginLeft: Scale(7), paddingHorizontal: Scale(7), paddingVertical: Scale(5), backgroundColor: 'green', }}>$9.0</Text>
            <Text style={{ fontSize: Scale(16), color: Colors.WHITE, marginLeft: Scale(7), paddingHorizontal: Scale(7), paddingVertical: Scale(5),}}>
              Spicy Mozzorella{'\n'}Italian Pizza
            </Text>
          </View>
        </View>
      </ImageBackground>   
      
    </View>
  );
  const renderItem1 = ({ item, index }) => (
    <View style={{width:Scale(180),
      height: Scale(55),      
      backgroundColor: '#ffffff',
      borderWidth:2,
      borderColor:"#E0E0E0",
      marginVertical: Scale(15),
      marginHorizontal:Scale(10),
      alignSelf: 'center',
      borderRadius: Scale(10)}}>
      <ImageBackground source={ImagesPath.coupon} style={{
         width: '100%',
         height: Scale(55),
         resizeMode: 'stretch',
         borderTopLeftRadius: Scale(30),
         borderTopRightRadius: Scale(30),
      }}>
         <View style={{  paddingBottom: Scale(10), alignItems: 'flex-start', paddingHorizontal: Scale(10) }}>
            <Text style={{ fontSize: Scale(14), color: 'grey',   paddingTop: Scale(5),}}>
           COUPON
            </Text>
            <Text style={{ fontSize: Scale(16), color: Colors.WHITE,  }}>
           40% off <Text style={{ fontSize: Scale(14), color: 'grey', marginLeft:Scale(30) }}> All Items</Text>
            </Text>
          </View>
      
      </ImageBackground>   
      
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
      <View style={styles.headerContainer}>
        <Image source={ImagesPath.location} style={styles.location} />
        <Text style={{color:Colors.WHITE}}>NH 28,C block DLF Phase 3...</Text>
        <View style={styles.bottomHeader}>
          <TouchableOpacity  onPress={redirectToNotification}>
          <Image source={ImagesPath.notification} style={styles.notificationStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingBottom:Scale(20),paddingHorizontal: Scale(20), alignItems: 'center',backgroundColor:Colors.APPCOLOR }}>
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
        data={[0,1,2,3,4]}
        renderItem={renderItem}
      />
      <View style={styles.filterContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.normalText}>Sort By</Text>
          <Image source={ImagesPath.up} />
        </View>
        
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
    backgroundColor: Colors.WHITE,
},
  backgroundStyle: {
    width: '100%',
    height: Scale(150),
    resizeMode: 'stretch',
    borderTopLeftRadius: Scale(30),
    borderTopRightRadius: Scale(30),
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
    height: Scale(220),
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
