import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Switch,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
} from 'react-native'
import {Icon, List} from 'native-base'
import {useNavigation} from '@react-navigation/native'
import {Colors, Scale, ImagesPath, Fonts,screenWidth,screenHeight,
    } from '../../CommonConfig'
import {FlatGrid} from 'react-native-super-grid'
import {useDispatch, connect} from 'react-redux'
import axios from 'axios'
import {API_BASE} from '../../apiServices/ApiService'
import {addToCart, subToCart} from '../../redux/actions/CartActions'
import {LoadWheel} from '../../CommonConfig/LoadWheel'

function HomeMaker(props) {
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const [check, setCheck] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [addItem, SetAddItem] = useState(0)
  const [customizeModal, setCustomizeModal] = useState(false)
  const toggleSwitch = () => setIsEnabled(!isEnabled)
  const addItemCount = () => {
    SetAddItem(addItem + 1)
  }

  const dispatch = useDispatch()

  const [list, setList] = React.useState({
    restroDetails: {},
    productList: [],
    filterData:[],
    isLoading: true,
    error: '',
  })

  

  const getRestoDetails = async () => {
    setList({...list, isLoading: true})
    const url = `${API_BASE}/restro/restaurantDetailWithProducts`
    const payload = {
      _id: props?.route.params?.restroId,
    }
    try {
      const res = await axios.post(url, payload)
     
     

  if (res?.status === 200) {
        setList({
          ...list,
          restroDetails: res?.data?.data?.restro_detail,
          productList: res?.data?.data?.product_list,
          productCategory: res?.data?.data?.product_list?.product_categories,
          isLoading: false,
        })
       
       } else {
        setList({...list, isLoading: false, error: res?.data?.message})
      }
    } catch (error) {
      setList({...list, isLoading: false, error: error?.message})
    }
  }
  React.useEffect(() => {
    getRestoDetails()
  }, [])

  const decrement = () => {
    if (addItem < 1) {
      SetAddItem(addItem)
    } else {
      SetAddItem(addItem - 1)
    }
  }
  const checked = () => {
    setCheck(!check)
  }

  
      
 
  const increment = () => {
    if (addItem > 8) {
      SetAddItem(addItem)
    } else {
      SetAddItem(addItem + 1)
    }
  }

  const addToCart = (item) => {
    const {cartRestroDetails, addToCart} = props
    const {restroDetails = {}} = props.route?.params || {}
    if (cartRestroDetails && cartRestroDetails?._id !== restroDetails?._id) {
      return Alert.alert('You have another order in your cart')
    } else {
      addToCart({restroDetails, product: item})
    }
  }

  const subToCart = (item) => {
    const {subToCart} = props
    subToCart(item)
  }

  const {restroDetails = {}} = props.route.params || {}

  const {restroData = {}} = props.route.params || {}
  
  console.log('====================================');
  console.log("RestriDetails=======>",restroData);
  console.log('====================================');

  const {restroDetails: resDet} = list



  const {cartProducts} = props
  const totalCartAmt = cartProducts?.reduce(
    (sum, i) => (sum += i?.final_price * i?.qty || i?.price || i?.qty),
    0,
  )

  const allData = list.productList
  const veg =  allData.filter(function(item){
    return item.product_type == 'veg';
 })



  

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />
      <ImageBackground
        resizeMode="cover"
        source={{uri: restroDetails?.building_front_img}}
        style={styles.backgroundStyle}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrowleft"
          type="AntDesign"
          style={styles.logoStyle}
        />
        <Text style={styles.headingText}>{restroDetails?.restro_name}</Text>
        <Text style={styles.bottomText}>
          {restroDetails?.street_name}, {restroDetails?.area_name},{' '}
          {restroDetails?.region}, {restroDetails?.state}
        </Text>
        <ImageBackground
          source={ImagesPath.background}
          style={styles.loginInputCont}>
          <ScrollView>
            <View style={styles.ratingContainer}>
              <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>{resDet?.rating_from_user}</Text>
                <Text style={styles.normalText}>Ratings</Text>
              </View>
              <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>
                  {restroDetails?.delivery_time}
                </Text>
                <Text style={styles.normalText}>Delivery Time</Text>
              </View>
              <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>{restroDetails?.distance} Km </Text>
                <Text style={styles.normalText} numberOfLines={1}>Distance</Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                marginHorizontal: Scale(25),
                paddingHorizontal: Scale(10),
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: Scale(50),
                alignItems: 'center',
                borderRadius: Scale(5),
                marginTop: Scale(20),
                borderColor: 'grey',
              }}>
              <Text
                style={[
                  styles.normalText,
                  {fontSize: Scale(17), color: Colors.BLACK},
                ]}>
                Veg Only
              </Text>
              <Switch
                trackColor={{false: '#AB8F8E', true: Colors.GREEN}}
                thumbColor={isEnabled ? Colors.WHITE : Colors.WHITE}
                ios_backgroundColor={Colors.GREEN}
                style={{transform: [{scaleX: 0.9}, {scaleY: 0.8}]}}
                onValueChange={toggleSwitch}
                value={isEnabled}
               />
            </View>
            <Text style={styles.categoryText}>Recommended food</Text>
            <FlatGrid
              itemDimension={130}
              data={!isEnabled? allData:veg}
              style={styles.gridView}
              spacing={Scale(12)}
              renderItem={({item}) => {
                let inCart = cartProducts?.find((i) => i?._id === item?._id)
                return (
                  <View style={styles.itemContainer}>
                    <Image
                      source={{uri: item?.image}}
                      style={{
                        resizeMode: 'stretch',
                        height: Scale(100),
                        width: '100%',
                        borderRadius: Scale(10),
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: Scale(5),
                        alignItems: 'center',
                      }}>
                        { 
                          item.product_type==='veg'? 
                           <Image source={ImagesPath.veg}/> 
                         : <Image source={ImagesPath.non_veg}/>
                        }
                      
                      <Text
                        style={{
                          fontSize: Scale(16),
                          color: Colors.BLACK,
                          marginLeft: Scale(5),
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text onPress={increment} style={styles.textStyle}>
                        ${item.final_price}
                        {'\n'}
                        <Text
                          style={[
                            styles.priceText,
                            {
                              textDecorationLine: 'line-through',
                              
                            },
                          ]}>
                          ${item?.price}
                        </Text>
                      </Text>

                      {inCart ? (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon
                            onPress={() => subToCart(item)}
                            type="AntDesign"
                            name="minussquareo"
                            style={{
                              fontSize: Scale(20),
                              color: Colors.APPCOLOR,
                            }}
                          />
                          <Text
                            style={[
                              styles.textStyle,
                              {color: Colors.APPCOLOR},
                            ]}>
                            {' '}
                            {inCart?.qty}{' '}
                          </Text>
                          <Icon
                            onPress={() => addToCart(item)}
                            type="AntDesign"
                            name="plussquareo"
                            style={{
                              fontSize: Scale(20),
                              color: Colors.APPCOLOR,
                            }}
                          />
                        </View>
                      ) : (
                        <View style={styles.addButton}>
                          <Text
                            onPress={() => addToCart(item)}
                            style={[
                              styles.textStyle,
                              {color: Colors.APPCOLOR},
                            ]}>
                            ADD
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                )
              }}
            />
            <LoadWheel visible={list.isLoading} />

            <Modal
        visible={customizeModal}
        style={{backgroundColor: 'red'}}
        transparent>
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', flex: 1}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setCustomizeModal(false)}
            style={{
              flex: 1,
              backgroundColor: Colors.TRANSPARENT,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{
                width: '85%',
                borderRadius: Scale(10),
                backgroundColor: Colors.WHITE,
              }}>
              <View
                style={{
                  height: Scale(80),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#202020',
                    fontSize: Scale(20),
                    fontFamily: Fonts.Regular,
                  }}>
                  Jumbo Cheese Burger{' '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: Scale(50),
                  alignItems: 'center',
                  paddingHorizontal: Scale(20),
                }}>
                <Text
                  style={{
                    color: '#AB8F8E',
                    fontSize: Scale(16),
                    fontFamily: Fonts.Regular,
                    fontWeight: 'bold',
                  }}>
                  Cheese
                </Text>
                <Image
                  source={ImagesPath.downArrow}
                  resizeMode={'contain'}
                  style={{
                    height: Scale(15),
                    tintColor: '#AB8F8E',
                    width: Scale(15),
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomColor: '#00000029',
                  alignItems: 'center',
                  borderBottomWidth: 0.6,
                  height: Scale(45),
                  marginHorizontal: Scale(20),
                }}>
                <Text
                  style={{
                    color: Colors.MATEBLACK1,
                    fontSize: Scale(14),
                    fontFamily: Fonts.Regular,
                  }}>
                  Extra Cheese <Text style={{color: '#AF9163'}}> | </Text>
                  <Text style={{color: Colors.DARK_RED}}>$5</Text>
                </Text>
                <TouchableOpacity onPress={checked}>
                  <Image
                    source={check ? ImagesPath.check1 : ImagesPath.uncheck}
                    resizeMode={'contain'}
                    style={{height: Scale(15), width: Scale(15)}}
                  />
                </TouchableOpacity>
              </View>

             
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: Scale(50),
                  alignItems: 'center',
                  paddingHorizontal: Scale(20),
                }}>
                <Text
                  style={{
                    color: '#AB8F8E',
                    fontSize: Scale(16),
                    fontFamily: Fonts.Regular,
                    fontWeight: 'bold',
                  }}>
                  Make it a combo
                </Text>
                <Image
                  source={ImagesPath.downArrow}
                  resizeMode={'contain'}
                  style={{
                    height: Scale(15),
                    tintColor: '#AB8F8E',
                    width: Scale(15),
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomColor: '#00000029',
                  alignItems: 'center',
                  borderBottomWidth: 0.6,
                  height: Scale(45),
                  marginHorizontal: Scale(20),
                }}>
                <Text
                  style={{
                    color: Colors.MATEBLACK1,
                    fontSize: Scale(14),
                    fontFamily: Fonts.Regular,
                  }}>
                  Regular Fries + Pepsi [ 330 Ml]
                  <Text style={{color: '#AB8F8E'}}> | </Text>
                  <Text style={{color: Colors.DARK_RED}}>$10</Text>
                </Text>
                <TouchableOpacity onPress={checked}>
                  <Image
                    source={check ? ImagesPath.check1 : ImagesPath.uncheck}
                    resizeMode={'contain'}
                    style={{height: Scale(15), width: Scale(15)}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomColor: '#00000029',
                  alignItems: 'center',
                  borderBottomWidth: 0.6,
                  height: Scale(45),
                  marginHorizontal: Scale(20),
                }}>
                <Text
                  style={{
                    color: Colors.MATEBLACK1,
                    fontSize: Scale(14),
                    fontFamily: Fonts.Regular,
                  }}>
                  Medium Fries + Pepsi [ 330 Ml]
                  <Text style={{color: '#AB8F8E'}}> | </Text>
                  <Text style={{color: Colors.DARK_RED}}>$15</Text>
                </Text>
                <TouchableOpacity onPress={checked}>
                  <Image
                    source={check ? ImagesPath.check1 : ImagesPath.uncheck}
                    resizeMode={'contain'}
                    style={{height: Scale(15), width: Scale(15)}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomColor: '#00000029',
                  alignItems: 'center',
                  borderBottomWidth: 0.6,
                  height: Scale(45),
                  marginHorizontal: Scale(20),
                }}>
                <Text
                  style={{
                    color: Colors.MATEBLACK1,
                    fontSize: Scale(14),
                    fontFamily: Fonts.Regular,
                  }}>
                  King Fries + Pepsi [ 330 Ml]
                  <Text style={{color: '#AB8F8E'}}> | </Text>
                  <Text style={{color: Colors.DARK_RED}}>$20</Text>
                </Text>
                <TouchableOpacity onPress={checked}>
                  <Image
                    source={check ? ImagesPath.check1 : ImagesPath.uncheck}
                    resizeMode={'contain'}
                    style={{height: Scale(15), width: Scale(15)}}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setCustomizeModal(false),
                    navigate('Order', {orderCount: addItem})
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: Scale(45),
                  backgroundColor: Colors.APPCOLOR,
                  borderRadius: Scale(35),
                  marginBottom: Scale(20),
                  marginTop: Scale(35),
                  marginHorizontal: Scale(20),
                }}>
                <Text
                  style={{
                    color: Colors.WHITE,
                    fontSize: Scale(15),
                    fontFamily: Fonts.Regular,
                  }}>
                  Add To Cart
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>
          
          </ScrollView>
          {cartProducts?.length ? (
            <View
              style={{
                height: '15%',
                paddingHorizontal: '5%',
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between',
                maxHeight: '15%',
                backgroundColor: Colors.APPCOLOR,
              }}>
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{
                    color: Colors.WHITE,
                    fontSize: Scale(14),
                    fontFamily: Fonts.Regular,
                    fontWeight: 'bold',
                  }}>{`$${totalCartAmt}`}</Text>
                <Text
                  style={{
                    color: Colors.WHITE,
                    fontSize: Scale(11),
                    fontFamily: Fonts.Regular,
                    marginTop: 5,
                  }}>
                  {cartProducts?.length + ' items in cart'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setCustomizeModal(true)}
                style={{
                  borderRadius: Scale(25),
                  borderWidth: 1,
                  borderColor: Colors.WHITE,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                  height: Scale(30),
                  marginRight: Scale(5),
                }}>
                <Text style={{color: Colors.WHITE, fontSize: Scale(11)}}>
                  {'Customization'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Card')}
                style={{
                  borderRadius: Scale(25),
                  borderWidth: 1,
                  borderColor: Colors.WHITE,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                  height: Scale(30),
                  marginRight: Scale(5),
                }}>
                <Text style={{color: Colors.WHITE, fontSize: Scale(11)}}>
                  {'Go To Cart'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ImageBackground>
      </ImageBackground>
    </View>
  )
}

const mapStateToProps = ({Cart: {restroDetails, products}}) => {
  return {
    cartRestroDetails: restroDetails,
    cartProducts: products,
  }
}

const mapDispatchToProps = {
  addToCart: addToCart,
  subToCart: subToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMaker)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundStyle: {
    flex: 1,
    height: screenHeight/2.5,
    width:'100%',
    paddingTop: Scale(70),
    backgroundColor: '#ccc',
  },
  headingText: {
    color: Colors.WHITE,
    fontSize: Scale(22),
    marginHorizontal: Scale(25),
    marginTop: Scale(40),
    fontWeight: 'bold',
  },
  bottomText: {
    textShadowColor: 'rgb(255,255,255)',
    textShadowOffset: {width: 0.1, height: 0.1},
    textShadowRadius: 1,
    color: Colors.WHITE,
    fontSize: Scale(16),
    marginHorizontal: Scale(25),
    marginTop: Scale(3),
    marginBottom: Scale(30),
  },
  ratingContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Scale(25),
    paddingTop: Scale(10),
  },
  buttonStyle: {
    height: Scale(50),
    width: Scale(92),
    borderColor: '#E0E0E0',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    height: Scale(33),
    width: Scale(70),
    borderColor: Colors.APPCOLOR,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: Colors.BLACK,
    fontSize: Scale(16),
    fontWeight: 'bold',
  },
  normalText: {
    color: '#AB8F8E',
    fontSize: Scale(12),
  },
  priceText: {
    color: Colors.BORDERCOLOR,
    fontSize: Scale(16),
    fontWeight:'100'
    
  },
  categoryText: {
    color: '#AB8F8E',
    fontSize: Scale(18),
    marginLeft: Scale(30),
    marginTop: Scale(10),
  },
  logoStyle: {
    marginHorizontal: Scale(20),
    fontSize: Scale(25),
    color: Colors.WHITE,
  },
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  gridView: {
    marginHorizontal: Scale(13),
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    height: Scale(200),
  },
})
