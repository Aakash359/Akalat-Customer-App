import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image, TextInput, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { FormArea, CustomButton } from '../../Component';
import { scale } from '../../CommonConfig/HelperFunctions/functions';
import { useNavigation } from '@react-navigation/native';
function Order(props) {
    const { navigate } = useNavigation();
    const {orderCount} = props.route.params;
    const[addItem, SetAddItem] = useState(orderCount);
    const[coupon, setCoupon] = useState('Cdlvnsvx');
    const[addCoupon, setAddCoupon] = useState(true);
    const decrement = () => {
        if (addItem < 1)
        {
          SetAddItem(addItem);
        }
        else{SetAddItem(addItem - 1);}
      }
      const increment = () => {
        if (addItem > 8)
        {
          SetAddItem( addItem);
        }
        else{SetAddItem(addItem + 1);}
        
      };
    const navigation = useNavigation();
    const redirectToNotification = () => {
      navigate('Notification');
    };
    const redirectToPayment = () => {
      navigate('Payment');
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
            <Text style={styles.headerText}>Place Order </Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
             
    {addItem > 0 ?  <View>
        <ScrollView>
               <View style={[styles.cardStyle, {
         justifyContent: 'center',
       }]}>
         <View style={{ flexDirection: 'row', }}>
           <Image source={ImagesPath.reset} style={styles.backgroundStyle} />
           <View >
             <Text style={styles.primaryText}>Fire & Grill</Text>
             <Text style={styles.normatText}>Sector 29, Cyber hub{'\n'}Gurgoan</Text>
           </View>
         </View>
       </View>
       <View style={[styles.cardStyle, {
         justifyContent: 'space-between',
       }]}>
         <View style={styles.itemContainer}>
           <Text style={styles.itemText}>Burger</Text>
           <View style={styles.rightContainer}>
             <Icon onPress={decrement} type="AntDesign" name="minussquareo" style={styles.iconStyles} />
             <Text style={styles.countText}>{addItem}</Text>
             <Icon onPress={increment} type="AntDesign" name="plussquareo" style={styles.iconStyles} />
           </View>
         </View>
         <View style={{ height: Scale(1), backgroundColor: '#E0E0E0' }} />
         <View style={styles.itemContainer}>
           <Text style={styles.itemText}>Sahi Paneer</Text>
           <View style={styles.rightContainer}>
             <Icon onPress={decrement} type="AntDesign" name="minussquareo" style={styles.iconStyles} />
             <Text style={styles.countText}>{addItem}</Text>
             <Icon onPress={increment} type="AntDesign" name="plussquareo" style={styles.iconStyles} />
           </View>
         </View>
       </View>
      <View style={{marginHorizontal:'5%'}}>
       <FormArea
         placeholder="Any Instructions..."
         autoCapitalize="none"
         

       />
       </View>
     {addCoupon ?  <View style={{
         height: Scale(50), flexDirection: 'row', justifyContent: 'space-between',
         marginVertical: Scale(15), width: '90%', borderColor:'#AB8F8E',borderWidth: Scale(1),
          alignSelf: 'center', borderRadius: Scale(30),alignItems:'center'
       }}>
         <TextInput
           style={{
             marginVertical: Scale(10),
             height: Scale(50),
             fontSize: Scale(18),
             color: "#AB8F8E",
             paddingLeft: Scale(20),
             flex: 1,
             justifyContent: 'center',
             alignSelf: 'center',
           }}
           placeholder="Coupon code" />
         <TouchableOpacity onPress={() => setAddCoupon(false)} style={styles.addButton}>
           <Text style={{ fontSize: Scale(16), color: Colors.WHITE }}>Apply</Text>
         </TouchableOpacity>
       </View>  : <View style={{
         height: Scale(50), flexDirection: 'row', justifyContent: 'space-between',
         marginVertical: Scale(15), width: '90%', alignItems:'center',borderColor:'#AB8F8E',borderWidth: Scale(1), alignSelf: 'center', borderRadius: Scale(30)
       }}>
         <TextInput
           style={{
             marginVertical: Scale(10),
             height: Scale(50),
             fontSize: Scale(18),
             color: "#AB8F8E",
             paddingLeft: Scale(20),
             flex: 1,
             justifyContent: 'center',
             alignSelf: 'center',
           }}
           
           value={coupon}
           placeholder="Coupon code" />
         <TouchableOpacity onPress={() => setAddCoupon(true)} style={[styles.addButton,{backgroundColor:Colors.DARK_RED}]}>
           <Text style={{ fontSize: Scale(16), color: Colors.WHITE }}>Remove</Text>
         </TouchableOpacity>
       </View>}
       <View style={[styles.cardStyle, {
         height: Scale(330)
       }]}>
         <Text style={[styles.primaryText, {color:"#AB8F8E"}]}>Fire & Grill Bill</Text>
         <View style={[styles.bottomContainer, { marginTop: Scale(20) }]}>
           <Text style={styles.itemText1}>Item Total</Text>
           <Text style={[styles.normatText1]}>$32</Text>
         </View>
         <View style={styles.bottomContainer}>
           <Text style={styles.itemText1}>Total Discount</Text>
           <Text style={styles.normatText1}>$2</Text>
         </View>
         <View style={styles.bottomContainer}>
           <Text style={styles.itemText1}>Tax</Text>
           <Text style={styles.normatText1}>$5</Text>
         </View>
         <View style={styles.bottomContainer}>
           <Text style={styles.itemText1}>Delivery Charges</Text>
           <Text style={styles.normatText1}>Free</Text>
         </View>
         <View style={{
           marginVertical: Scale(10),
           borderStyle: 'dotted',
           borderWidth: 1,
           borderRadius: 1,
         }} />
         <View style={styles.bottomContainer}>
           <Text style={[styles.primaryText]}>Total Amount</Text>
           <Text style={[styles.normatText1, { color: Colors.BLACK }]}>$35</Text>
         </View>
         <View style={{
           marginVertical: Scale(10),
           borderStyle: 'dotted',
           borderWidth: 1,
           borderRadius: 1,
         }} />
         <Text style={[styles.itemText, { color: "green" }]}>You have saved $5 on this order</Text>
       </View>
       <View style={[styles.cardStyle, {
         justifyContent: 'center',
       }]}>
         <View style={styles.bottomContainer}>
           <Text style={[styles.itemText1,{color:"#AB8F8E"},{fontWeight:'bold'}]}>Delivery Address </Text>
           <Text style={[styles.countText,{fontWeight:'bold'}]}>Change</Text>
         </View>
         <Text style={styles.itemText1}>Sector 29, Cyber hub{'\n'}Gurgoan</Text>
       </View>
       <View style={{ paddingHorizontal: '5%' }}>
         <CustomButton title="Proceed to pay" isSecondary={true} onSubmit={redirectToPayment} />
       </View>
       </ScrollView>
       </View>
      : <Text style={{textAlign:'center',textAlignVertical:'center',flex:1}}>Order is empty</Text> }
          
          </ImageBackground>

        </View>
    );
}
export default Order;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APPCOLOR
    },
   
    loginInputCont: {
        flex: 1,
        //paddingTop: Scale(-10),
        paddingBottom: Scale(10),
        //paddingHorizontal: Scale(30),
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
    addButton: {
        height: '95%',
        width: Scale(100),
        backgroundColor: Colors.APPCOLOR,
        borderRadius: Scale(30),
        alignItems: 'center',
        justifyContent: 'center'
      },
      bottomContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: Scale(5), alignItems: 'center' },
      itemText1: 
      { 
        color: Colors.GRAY, 
        fontSize: Scale(18), 
      },
      normatText1: { color: Colors.GRAY, fontSize: Scale(18), },
      itemContainer: { flexDirection: 'row', justifyContent: 'space-between' },
      rightContainer: { flexDirection: 'row', alignItems: 'center' },
      countText: { fontSize: Scale(18), color: Colors.APPCOLOR, marginHorizontal: Scale(5) },
      primaryText: { color: Colors.BLACK, fontSize: Scale(18), fontWeight: 'bold' },
      itemText: { color: Colors.BLACK, fontSize: Scale(18), },
      textStyle: { color: Colors.BLACK, fontSize: Scale(16), fontWeight: 'bold' },
      backgroundStyle: {
        width: Scale(100),
        height: Scale(100),
        borderWidth: 1,
        resizeMode: 'stretch',
        borderRadius: Scale(20),
        marginRight: Scale(10)
      },
      normatText: { color: Colors.BLACK, fontSize: Scale(16), marginTop: Scale(7) },
      iconStyles: { 
        fontSize: Scale(20), 
        color: Colors.APPCOLOR 
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
        justifyContent: 'flex-start',
        flex: 1
      },
      location: {
        marginRight: Scale(10),
        width: Scale(25),
        height: Scale(25),
        resizeMode: 'contain',
        tintColor: Colors.WHITE
      },
      cardStyle: {
        height: Scale(120),
        width: '90%',
        backgroundColor: '#ffffff',
        borderWidth: Scale(1),
        borderColor: "#AB8F8E",
        marginVertical: Scale(15),
        padding: Scale(15),
        alignSelf: 'center',
        borderRadius: Scale(5)
      },
      iconStyle: {
        color: Colors.APPCOLOR,
        fontSize: Scale(15),
        marginHorizontal: Scale(3)
      },
    
      
});
