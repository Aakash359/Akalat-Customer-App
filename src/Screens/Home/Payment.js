import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {CustomButton} from '../../Component'
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux'
import {createOrder} from '../../redux/actions/CartActions'

function Payment(props) {
  const [check, setCheck] = React.useState(null)
  const {navigate} = useNavigation()
  const navigation = useNavigation()

  const checked = (method) => {
    setCheck(method)
  }

  const productConverter = (data) => {
    return data?.reduce((res, item) => {
      res?.push({
        price_without_tax: item?.final_price || item?.price,
        product_id: item?._id,
        qty: item?.qty,
      })
      return res
    }, [])
  }

  const createOrder = () => {
    const {restroDetails, products, user, instruction, addressId} = props
    const {totalCartAmt, det} = props?.route?.params
    const payload = {
      restro_id: restroDetails?._id,
      userid: user?._id,
      total_price: totalCartAmt,
      instruction,
      address_id: addressId,
      payment_mode: check,
      qty: products?.length,
      products: productConverter(products),
      total_price_without_tax: totalCartAmt,
      delivery_charge: det?.delivery,
      gst_charge_total: 0,
      discounted_price: det?.dis,
      transaction_id: '123',
    }
    if (check) {
      props?.createOrder(payload, (res) => {
        navigate('PlaceOrder', {orderDetails :res?.data} )
      })
    } else {
      Alert.alert('', 'Select payment method')
    }
  }

  const {totalCartAmt, det} = props?.route?.params

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />
      <View style={styles.headerContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrowleft"
          type="AntDesign"
          style={styles.logoStyle}
        />
      </View>
      <Text
        style={{
          fontSize: Scale(20),
          fontWeight: 'bold',
          marginHorizontal: Scale(25),
          marginBottom: Scale(25),
          color: Colors.WHITE,
        }}>
        Payment
      </Text>

      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <ScrollView>
          <View
            style={[
              styles.cardStyle,
              {
                height: Scale(320),
              },
            ]}>
            <Text style={[styles.primaryText, {color: '#AB8F8E'}]}>
              {props?.restroDetails?.restro_name}
            </Text>
            <View style={[styles.bottomContainer, {marginTop: Scale(20)}]}>
              <Text style={styles.itemText1}>Item Total</Text>
              <Text style={styles.normatText1}>${totalCartAmt}</Text>
            </View>
            <View style={styles.bottomContainer}>
              <Text style={styles.itemText1}>Total Discount</Text>
              <Text style={styles.normatText1}>${det?.dis}</Text>
            </View>
            <View style={styles.bottomContainer}>
              <Text style={styles.itemText1}>Tax</Text>
              <Text style={styles.normatText1}>${det?.tax}</Text>
            </View>
            <View style={styles.bottomContainer}>
              <Text style={styles.itemText1}>Delivery Charges</Text>
              <Text style={styles.normatText1}>
                {det?.delivery ? `$${det?.delivery}` : `free`}
              </Text>
            </View>
            <View
              style={{
                marginVertical: Scale(10),
                borderStyle: 'dotted',
                borderWidth: 1,
                borderRadius: 1,
              }}
            />
            <View style={styles.bottomContainer}>
              <Text style={styles.primaryText}>Total Amount</Text>
              <Text
                style={[
                  styles.normatText1,
                  {color: Colors.BLACK, fontWeight: '700'},
                ]}>
                ${totalCartAmt - det?.dis + (det?.tax + det?.delivery || 0)}
              </Text>
            </View>
            <View
              style={{
                marginVertical: Scale(10),
                borderStyle: 'dotted',
                borderWidth: 1,
                borderRadius: 1,
              }}
            />
            {det?.dis ? (
              <Text
                style={[
                  styles.itemText,
                  {color: 'green', fontSize: Scale(16)},
                ]}>
                You have saved $5 on this order
              </Text>
            ) : null}
          </View>
          <View
            style={[
              styles.cardStyle,
              {
                justifyContent: 'center',
              },
            ]}>
            <Text style={[styles.primaryText, {color: '#AB8F8E'}]}>
              Payment Method
            </Text>

            <View style={[styles.bottomContainer, {alignItems: 'center'}]}>
              <Text style={styles.itemText1}>Cash on delivery </Text>
              <Icon
                onPress={() => checked('cod')}
                type="FontAwesome"
                name={check === 'cod' ? 'dot-circle-o' : 'circle-o'}
                style={
                  check === 'cod' ? styles.buttonImage : {color: Colors.GRAY}
                }
              />
            </View>
            <View style={{height: 2, backgroundColor: '#E0E0E0'}}></View>
            <View style={styles.bottomContainer}>
              <Text style={styles.itemText1}>Online Payment </Text>
              <Icon
                onPress={() => checked('online')}
                type="FontAwesome"
                name={check === 'online' ? 'dot-circle-o' : 'circle-o'}
                style={
                  check === 'online' ? styles.buttonImage : {color: Colors.GRAY}
                }
              />
            </View>
          </View>
          <View style={{paddingHorizontal: '5%'}}>
            <CustomButton
              title="Place Order"
              isSecondary={true}
              onSubmit={createOrder}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const mapStateToProps = ({
  Cart: {restroDetails, products, isLoading, error, instruction, addressId},
  Auth: {user},
}) => ({
  restroDetails,
  products,
  isLoading,
  error,
  user,
  instruction,
  addressId,
})

const mapDispatchToProps = {
  createOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
  },

  addButton: {
    height: '95%',
    width: Scale(100),
    backgroundColor: Colors.APPCOLOR,
    borderRadius: Scale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    color: Colors.DARK_RED,
  },
  primaryText: {
    color: Colors.BLACK,
    fontSize: Scale(18),
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Scale(5),
    alignItems: 'center',
  },
  itemText1: {color: Colors.GRAY, fontSize: Scale(18)},
  normatText1: {color: Colors.GRAY, fontSize: Scale(18)},
  itemContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  rightContainer: {flexDirection: 'row', alignItems: 'center'},
  countText: {
    fontSize: Scale(18),
    color: Colors.APPCOLOR,
    marginHorizontal: Scale(5),
  },

  itemText: {color: Colors.BLACK, fontSize: Scale(18)},
  textStyle: {color: Colors.BLACK, fontSize: Scale(16), fontWeight: 'bold'},
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
    marginRight: Scale(10),
  },
  normatText: {
    color: Colors.BLACK,
    fontSize: Scale(16),
    marginTop: Scale(7),
  },
  iconStyles: {fontSize: Scale(22), color: Colors.APPCOLOR},
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
    flex: 1,
  },
  headerContainer: {
    paddingTop: Scale(20),
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
  cardStyle: {
    height: Scale(120),
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: Scale(1),
    borderColor: Colors.GRAY,
    marginVertical: Scale(15),
    padding: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(5),
  },
  iconStyle: {
    color: Colors.APPCOLOR,
    fontSize: Scale(15),
    marginHorizontal: Scale(3),
  },
})
