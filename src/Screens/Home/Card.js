import React, {useState} from 'react'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {FormArea, CustomButton} from '../../Component'
import {useNavigation} from '@react-navigation/native'
import {scale} from '../../CommonConfig/HelperFunctions/functions'
import {connect} from 'react-redux'
import {
  addToCart,
  setInstruction,
  subToCart,
  setAddressId,
  setSelectedAddress,
} from '../../redux/actions/CartActions'
import axios from 'axios'
import {API_BASE} from '../../apiServices/ApiService'
import {AddressListResquest} from '../../redux/actions/SettingActions'

function Card(props) {
  const [count, setIsPopupVisible] = useState(1)
  const [det, setDet] = useState({
    dis: 0,
    tax: 0,
    dc: 0,
    delivery: 0,
  })
  const [address, setAddress] = useState({
    id: null,
    selectedId: props?.selectedAddress || 0,
  })

  React.useEffect(() => {
    props?.AddressListResquest({created_by: props?.user?._id})

    props?.navigation.setOptions({headerShown: false})
  }, [])

  const increment = () => {
    setIsPopupVisible(count + 1)
  }
  const decrement = () => {
    setIsPopupVisible(count - 1)
  }
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const redirectToNotification = () => {
    navigate('Notification')
  }
  const redirectToPayment = () => {
    props?.setSelectedAddress(address?.selectedId)
    props?.setAddressId(props?.addressList[address?.selectedId]?._id)

    const totalCartAmt = props?.cartProducts?.reduce(
      (sum, i) => (sum += i?.final_price * i?.qty || i?.price || i?.qty),
      0,
    )

    const data = {
      totalCartAmt,
      det,
    }

    if (props?.addressList?.length) {
      navigate('Payment', data)
    } else {
      Alert.alert('', 'Please add an address')
    }
  }

  const addToCart = (item) => {
    const {cartRestroDetails, addToCart} = props
    addToCart({restroDetails: cartRestroDetails, product: item})
  }

  const subToCart = (item) => {
    const {subToCart} = props
    subToCart(item)
  }

  const {cartRestroDetails, cartProducts} = props
  const totalCartAmt = cartProducts?.reduce(
    (sum, i) => (sum += i?.final_price * i?.qty || i?.price || i?.qty),
    0,
  )

  if (!cartProducts?.length) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={{fontSize: 20, fontWeight: '500'}}>
          Your cart is empty
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />

      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <ScrollView>
          <View
            style={[
              styles.cardStyle,
              {
                justifyContent: 'center',
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Image source={ImagesPath.reset} style={styles.backgroundStyle} />
              <View>
                <Text style={styles.primaryText2}>
                  {cartRestroDetails?.restro_name}
                </Text>
                <Text style={styles.normatText}>
                  {cartRestroDetails?.street_name},{' '}
                  {cartRestroDetails?.area_name}, {'\n'}
                  {cartRestroDetails?.region},{cartRestroDetails?.state}...
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.cardStyle,
              {
                justifyContent: 'space-between',
              },
            ]}>
            {cartProducts?.map((item, i) => {
              return (
                <>
                  <View style={styles.itemContainer} key={`${i}`}>
                    <Text style={styles.itemText}>{item?.name}</Text>
                    <View style={styles.rightContainer}>
                      <Icon
                        onPress={() => subToCart(item)}
                        type="AntDesign"
                        name="minussquareo"
                        style={styles.iconStyles}
                      />
                      <Text style={styles.countText}>{item?.qty}</Text>
                      <Icon
                        onPress={() => addToCart(item)}
                        type="AntDesign"
                        name="plussquareo"
                        style={styles.iconStyles}
                      />
                    </View>
                  </View>
                  {i < cartProducts?.length - 1 && (
                    <View
                      style={{
                        height: Scale(2),
                        backgroundColor: '#E0E0E0',
                        marginVertical: 17,
                      }}
                    />
                  )}
                </>
              )
            })}
          </View>
          <View style={{marginHorizontal: scale(20), marginVertical: -20}}>
            <FormArea
              placeholder="Any Instructions..."
              autoCapitalize="none"
              value={props?.instruction}
              onChangeText={(instruction) => props.setInstruction(instruction)}
              // maxLength={30}
            />
          </View>
          <View
            style={{
              height: Scale(50),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: Scale(10),
              width: '90%',
              borderWidth: Scale(1),
              alignSelf: 'center',
              borderRadius: Scale(30),
              borderColor: Colors.GRAY,
              marginTop: 30,
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
              placeholder="Coupon code"
            />
            <View style={styles.addButton}>
              <TouchableOpacity
                onPress={() =>
                  global.dropDownAlertRef.alertWithType(
                    'error',
                    'Error',
                    'Enter coupon code',
                  )
                }>
                <Text
                  style={{
                    fontSize: Scale(16),
                    color: Colors.WHITE,
                  }}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.cardStyle,
              {
                height: Scale(330),
              },
            ]}>
            <Text style={styles.primaryText}>
              {cartRestroDetails?.restro_name}
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
              <Text style={styles.itemText1}>Delivery charges</Text>
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
              <Text style={styles.primaryText1}>Total Amount</Text>
              <Text
                style={[
                  styles.normatText1,
                  {color: Colors.BLACK, fontWeight: '700'},
                ]}>
                ${totalCartAmt - det?.dis + det?.tax}
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
              <Text style={[styles.itemText, {color: 'green'}]}>
                You have saved $5 on this order
              </Text>
            ) : null}
          </View>
          {props?.addressList && props?.addressList?.length ? (
            <View
              style={[
                styles.cardStyle,
                {
                  justifyContent: 'center',
                },
              ]}>
              <View style={styles.bottomContainer}>
                <Text style={styles.itemText3}>Delivery Address</Text>
                <TouchableOpacity>
                  <Text style={styles.countText}>change</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.itemText2}>
                {props?.addressList[address?.selectedId]?.house_name_and_no}
                {'\n'}
                {props?.addressList[address?.selectedId]?.area_name}
              </Text>
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigate('AddNewAddress')}>
                <Text>Add address</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={{paddingHorizontal: '5%'}}>
            <CustomButton
              title="Proceed to pay"
              isSecondary={true}
              onSubmit={redirectToPayment}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const mapStateToProps = ({
  Cart: {restroDetails, products, instruction, selectedAddress},
  Setting: {addressListResponse},
  Auth: {user},
}) => {
  return {
    cartRestroDetails: restroDetails,
    cartProducts: products,
    addressList: addressListResponse?.data?.addressList || [],
    instruction,
    selectedAddress,
    user,
  }
}

const mapDispatchToProps = {
  addToCart: addToCart,
  subToCart: subToCart,
  setInstruction,
  setAddressId,
  setSelectedAddress,
  AddressListResquest,
}
export default connect(mapStateToProps, mapDispatchToProps)(Card)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
    paddingTop: Scale(40),
  },

  addButton: {
    height: '97%',
    width: Scale(100),
    backgroundColor: Colors.APPCOLOR,
    borderRadius: Scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Scale(5),
    alignItems: 'center',
  },

  itemText1: {color: Colors.BLACK, fontSize: Scale(18)},
  itemText3: {color: '#AB8F8E', fontSize: Scale(18), fontWeight: 'bold'},
  normatText1: {color: Colors.BLACK, fontSize: Scale(18)},
  itemContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  rightContainer: {flexDirection: 'row', alignItems: 'center'},
  countText: {
    fontSize: Scale(18),
    color: Colors.APPCOLOR,
    marginHorizontal: Scale(5),
  },
  primaryText: {
    color: '#AB8F8E',
    fontSize: Scale(18),
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingTop: 10,
  },
  primaryText1: {
    color: Colors.BLACK,
    fontSize: Scale(18),
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingTop: 10,
  },
  primaryText2: {
    color: Colors.BLACK,
    fontSize: Scale(18),
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingTop: 10,
  },

  itemText: {color: Colors.BLACK, fontSize: Scale(18)},
  itemText2: {color: Colors.BLACK, fontSize: Scale(18)},
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
    paddingLeft: 5,
    paddingTop: 5,
  },
  iconStyles: {fontSize: Scale(20), color: Colors.APPCOLOR},
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
    tintColor: Colors.WHITE,
  },
  cardStyle: {
    // height: Scale(120),
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: Scale(1),
    borderColor: Colors.GRAY,
    marginTop: Scale(20),
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
