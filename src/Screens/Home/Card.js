import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image, TextInput, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { FormArea, CustomButton } from '../../Component';
import { useNavigation } from '@react-navigation/native';
function Card() {
  const [count, setIsPopupVisible] = useState(1);
  const increment = () => {
    setIsPopupVisible(count + 1);
  };
  const decrement = () => {
    setIsPopupVisible(count - 1);
  };
  const { navigate } = useNavigation();
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
        <Image source={ImagesPath.location} style={styles.location} />
        <Text style={{ color: Colors.WHITE }}>NH 28,C block DLF Phase 3...</Text>
        <View style={styles.bottomHeader}>
          <TouchableOpacity onPress={redirectToNotification}>
            <Image source={ImagesPath.notification} style={styles.notificationStyle} />
          </TouchableOpacity>
        </View>
      </View>
       <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
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
                <Text style={styles.countText}>{count}</Text>
                <Icon onPress={increment} type="AntDesign" name="plussquareo" style={styles.iconStyles} />
              </View>
            </View>
            <View style={{ height: Scale(2), backgroundColor: '#E0E0E0' }} />
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Sahi Paneer</Text>
              <View style={styles.rightContainer}>
                <Icon onPress={decrement} type="AntDesign" name="minussquareo" style={styles.iconStyles} />
                <Text style={styles.countText}>{count}</Text>
                <Icon onPress={increment} type="AntDesign" name="plussquareo" style={styles.iconStyles} />
              </View>
            </View>
          </View>
          <FormArea
            placeholder="Any Instructions..."
            autoCapitalize="none"
          // maxLength={30}

          />
          <View style={{
            height: Scale(50), flexDirection: 'row', justifyContent: 'space-between',
            marginVertical: Scale(15), width: '90%', borderWidth: Scale(1), alignSelf: 'center', borderRadius: Scale(30)
          }}>
            <TextInput
              style={{
                marginVertical: Scale(10),
                height: Scale(50),
                fontSize: Scale(18),
                color: Colors.BORDERCOLOR,
                paddingLeft: Scale(20),
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              placeholder="Coupon code" />
            <View style={styles.addButton}>
              <Text style={{ fontSize: Scale(16), color: Colors.WHITE }}>Apply</Text>
            </View>
          </View>
          <View style={[styles.cardStyle, {
            height: Scale(330)
          }]}>
            <Text style={styles.primaryText}>Fire & Grill</Text>
            <View style={[styles.bottomContainer, { marginTop: Scale(20) }]}>
              <Text style={styles.itemText1}>Item Total</Text>
              <Text style={styles.normatText1}>$32</Text>
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
              <Text style={styles.itemText1}>Dilivery charges</Text>
              <Text style={styles.normatText1}>free</Text>
            </View>
            <View style={{
              marginVertical: Scale(10),
              borderStyle: 'dotted',
              borderWidth: 1,
              borderRadius: 1,
            }} />
            <View style={styles.bottomContainer}>
              <Text style={styles.primaryText}>Total Amount</Text>
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
              <Text style={styles.itemText1}>Delivery Address </Text>
              <Text style={styles.countText}>charges</Text>
            </View>
            <Text style={styles.itemText1}>Sector 29, Cyber hub{'\n'}Gurgoan</Text>
          </View>
          <View style={{ paddingHorizontal: '5%' }}>
            <CustomButton title="Proceed to pay" isSecondary={true} onSubmit={redirectToPayment} />
          </View>
          </ScrollView>
        </ImageBackground>
     
    </View>
  );
}
export default Card;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR
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
  itemText1: { color: Colors.GRAY, fontSize: Scale(18), },
  normatText1: { color: Colors.GRAY, fontSize: Scale(18), },
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  rightContainer: { flexDirection: 'row', alignItems: 'center' },
  countText: { fontSize: Scale(18), color: Colors.APPCOLOR, marginHorizontal: Scale(5) },
  primaryText: { color: Colors.BLACK, fontSize: Scale(18), fontWeight: 'bold' },
  itemText: { color: Colors.BLACK, fontSize: Scale(18), },
  textStyle: { color: Colors.BLACK, fontSize: Scale(16), fontWeight: 'bold' },
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    paddingBottom: Scale(50),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  backgroundStyle: {
    width: Scale(100),
    height: Scale(100),
    borderWidth: 1,
    resizeMode: 'stretch',
    borderRadius: Scale(20),
    marginRight: Scale(10)
  },
  normatText: { color: Colors.BLACK, fontSize: Scale(16), marginTop: Scale(7) },
  iconStyles: { fontSize: Scale(22), color: Colors.APPCOLOR },
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
  headerContainer: {
    height: Scale(100),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.APPCOLOR,
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
    height: Scale(120),
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: Scale(1),
    borderColor: Colors.GRAY,
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
