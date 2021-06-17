import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, FlatList, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import Accordion from '../../Component/Accordion';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { FAQRequest } from '../../redux/actions'
import { Menu } from 'react-native-paper';


function FAQs() {
    const navigation = useNavigation();  
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const faqResponse = useSelector((state) => state.Setting.faqResponse);  
    const [items, setItems] = useState(faqResponse?.data?.faq || []);

    
    
    
   
   
    useEffect(() => {
      setTimeout(() => {

        dispatch(FAQRequest());

      }, 1000);
        
       },[items]); 

   

 const renderItems = ({ item, title  }) => (
      
      <Accordion item={item} />
  );
      
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
       <Text style={styles.headerText}>FAQs </Text>
     
        <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}
          data={items}
          // renderItem={({item}) => (<Accordion  item={item} />)}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
         


        />
       

        </ImageBackground>
    
    </View>
  );
}
export default FAQs;
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
