import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, FlatList, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import Accordion from '../../Component/Accordion';
import { useNavigation } from '@react-navigation/native';

function Notification() {
  const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToPlaceOrder = () => {
        navigate('PlaceOrder');
    };
    
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />
      <View style={styles.headerContainer}>
      <Icon onPress={() => navigation.goBack()} name="arrowleft" type="AntDesign" style={styles.logoStyle}/>              
       </View>
       <Text style={styles.headerText}>Notification </Text>
     
        <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}
          // data={[0,1,2]}
          // renderItem={({item}) => (<Accordion  item={item} />)}
          keyExtractor={(item, index) => index.toString()}
        />
        </ImageBackground>
    
    </View>
  );
}
export default Notification;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR
  },  
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
    paddingHorizontal:Scale(15),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  headerText:{
      fontSize:Scale(20),
      marginHorizontal:Scale(25),
      marginBottom:Scale(25),
      color:Colors.WHITE
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
      marginTop:Scale(15),
    fontSize:Scale(25),
    color:Colors.WHITE,
},
});
