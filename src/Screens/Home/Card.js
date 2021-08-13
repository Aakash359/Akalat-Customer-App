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
  Modal,
  FlatList,
  Dimensions,
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
  createOrderSuccess,
} from '../../redux/actions/CartActions'
import axios from 'axios'
import {API_BASE} from '../../apiServices/ApiService'
import {AddressListRequest} from '../../redux/actions/SettingActions'
import {
  applyCoupon,
  removeCoupon,
  setApplyCouponError,
} from '../../redux/actions/CouponActions'
import {useSelector, useDispatch} from 'react-redux'

function Card(props) {
  const [count, setIsPopupVisible] = useState(1)
  const [coupon, setCoupon] = useState(props?.couponCode || '')
  const [modal, setModal] = React.useState(false)
  const product_list = props.route.params

  const [det, setDet] = useState({
    dis: props?.applyCoupon?.discount_amount || 0,
    tax: 0,
    dc: 0,
    delivery: 0,
  })
  const [address, setAddress] = useState({
    id: null,
    selectedId: props?.selectedAddress || 0,
  })
  const dispatch = useDispatch()

  React.useEffect(() => {
    props?.AddressListRequest({created_by: props?.user?._id})

    props?.navigation.setOptions({headerShown: false})
  }, [])

  const addressListResponse = useSelector(
    (state) => state.Setting.addressListResponse,
  )

  const addressList = addressListResponse?.data?.addressList || []
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

  const apply = () => {
    if (coupon) {
      dispatch(
        applyCoupon({coupon_code: coupon, total_price: `${totalCartAmt}`}),
      )
    } else {
      global.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'Please enter coupon code',
      )
    }
  }

  React.useEffect(() => {
    if (!props?.couponCode) {
      setCoupon('')
      setDet({...det, dis: 0})
    } else {
      setCoupon(props?.couponCode)
      setDet({...det, dis: props?.applyCoupon?.discount_amount || 0})
    }
  }, [props.couponCode])

  const remove = () => {
    dispatch(removeCoupon())
  }
  

  const renderItems = ({item, index}) => (
    <TouchableOpacity
      onPress={() => setAddress({...address, selectedId: index})}
      style={styles.cardStyle}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{maxWidth: '70%'}}>
          <View style={[styles.cardHeader, {maxWidth: '100%'}]}>
            <Text style={[styles.placeText, {marginBottom: 10}]}>
              {item?.address_type}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.placeText}>
              {item?.house_name_and_no}, {item?.area_name}, {item?.nearby}
            </Text>
          </View>
        </View>
        <Icon
          type="FontAwesome"
          style={[
            {
              color:
                address?.selectedId === index ? Colors.RED : Colors.LIGHT_GRAY,
            },
            {fontSize: 25},
          ]}
          name={address?.selectedId === index ? 'dot-circle-o' : 'circle-o'}
        />
      </View>
    </TouchableOpacity>
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
          Your cart is empty !
        </Text>
      </View>
    )
  } else {
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
                <Image
                  source={{uri: cartRestroDetails?.building_front_img}}
                  style={styles.backgroundStyle}
                />
                <View>
                  <Text style={styles.primaryText2}>
                    {cartRestroDetails?.restro_name}
                  </Text>
                  <Text style={styles.normatText}>
                    {cartRestroDetails?.street_name},{' '}
                    {cartRestroDetails?.area_name}, {'\n'}
                    {cartRestroDetails?.region},{cartRestroDetails?.state}
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
            <View
              style={{
                marginHorizontal: scale(20),
                marginVertical: -20,
              }}>
              <FormArea
                placeholder="Any Instructions..."
                autoCapitalize="none"
                value={props?.instruction}
                onChangeText={(instruction) =>
                  props.setInstruction(instruction)
                }
                height={100}
                style={{paddingTop: 10}}
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
                value={coupon}
                onChangeText={(text) => setCoupon(text)}
              />
              <TouchableOpacity
                onPress={() => (props.couponCode ? remove() : apply())}>
                <View
                  style={[
                    styles.addButton,
                    props.couponCode && {backgroundColor: 'red'},
                  ]}>
                  <Text
                    style={{
                      fontSize: Scale(16),
                      color: Colors.WHITE,
                      fontWeight: '600',
                    }}>
                    {props.couponCode ? 'Remove' : 'Apply'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.cardStyle,
                
                {
                  height: Scale(250),
                }
                ,
              ]}>
              <Text style={[styles.primaryText, {marginLeft: Scale(-5)}]}>
                {cartRestroDetails?.restro_name}
              </Text>
              <View style={[styles.bottomContainer, {marginTop: Scale(20)}]}>
                <Text style={styles.itemText1}>Item Total</Text>
                <Text style={styles.normatText1}>${totalCartAmt}</Text>
              </View>
              {
                det?.dis ? (
                <View style={styles.bottomContainer}>
                <Text style={styles.itemText1}>Total Discount</Text>
                <Text style={styles.normatText1}>-${det?.dis}</Text>
              </View>):null
              }
              
              <View style={styles.bottomContainer}>
                <Text style={styles.itemText1}>Tax</Text>
                <Text style={styles.normatText1}>${det?.tax}</Text>
              </View>
              <View style={styles.bottomContainer}>
                <Text style={styles.itemText1}>Delivery charges</Text>
                <Text style={styles.normatText1}>
                  {det?.delivery ? `$${det?.delivery}` : `Free`}
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
                <Text style={[styles.itemText, {color: 'green',textAlign:'center',marginTop:Scale(6)}]}>
                  You have saved ${det?.dis} on this order
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
                  <TouchableOpacity onPress={() => setModal(true)}>
                    <Text style={[styles.countText, {fontWeight: 'bold'}]}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemText2}>
                  {props?.addressList[address?.selectedId]?.house_name_and_no},
                  {''}
                  {props?.addressList[address?.selectedId]?.area_name},{''}
                  {props?.addressList[address?.selectedId]?.nearby}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => navigate('AddNewAddress')}>
                  <Text style={{marginTop: Scale(10), fontSize: 15}}>
                    Add address
                  </Text>
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
        <Modal visible={modal} transparent={true} animationType="slide">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModal(false)}
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={null}
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: Dimensions.get('screen').height / 1.5,
                position: 'absolute',
                bottom: 0,
                paddingBottom: 20,
              }}>
              <View style={styles.headerContainer}>
                <Icon
                  onPress={() => setModal(false)}
                  name="arrowleft"
                  type="AntDesign"
                  style={styles.logoStyle}
                />
                <Text
                  style={{
                    fontSize: Scale(18),
                    fontWeight: 'bold',
                    marginHorizontal: Scale(25),
                    color: Colors.WHITE,
                  }}>
                  Change Address
                </Text>
              </View>

              <FlatList
                data={addressList}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = ({
  Cart: {restroDetails, products, instruction, selectedAddress},
  Setting: {addressListResponse},
  Auth: {user},
  coupon: {applyCoupon, couponCode,applyCouponStatus},
}) => {
  return {
    cartRestroDetails: restroDetails,
    cartProducts: products,
    addressList: addressListResponse?.data?.addressList || [],
    instruction,
    selectedAddress,
    user,
    applyCoupon,
    couponCode,
    applyCouponStatus,
  }
}

const mapDispatchToProps = {
  addToCart: addToCart,
  subToCart: subToCart,
  setInstruction,
  setAddressId,
  setSelectedAddress,
  AddressListRequest,
  createOrderSuccess,
}
export default connect(mapStateToProps, mapDispatchToProps)(Card)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
    paddingTop: Scale(40),
  },

  addButton: {
    height: '93%',
    width: Scale(100),
    backgroundColor: Colors.APPCOLOR,
    borderRadius: Scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 2,
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
    marginTop:Scale(-21),
    paddingTop: Scale(10),
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
  headerContainer: {
    paddingTop: Scale(0),
    height: Scale(40),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.APPCOLOR,
    paddingHorizontal: Scale(25),
  },

  logoStyle: {
    fontSize: Scale(25),
    color: Colors.WHITE,
  },
})
