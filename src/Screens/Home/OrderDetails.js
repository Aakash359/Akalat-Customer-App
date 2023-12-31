import React, {useState} from 'react'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {CustomButton} from '../../Component'
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import axios from 'axios'
import {API_BASE} from '../../apiServices/ApiService'
import {connect} from 'react-redux'
import {reOrder} from '../../redux/actions/CartActions'
import StarRating from 'react-native-star-rating';
import {LoadWheel} from '../../CommonConfig/LoadWheel'
import {LogoutAlert} from '../../CommonConfig'
import {changeOrderStatusRequest} from '../../redux/actions/SettingActions'
import {useSelector, useDispatch} from 'react-redux'

function OrderDetail(props) {
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [starCount, setStarCount] = useState(5)
  const applyCoupon = useSelector((state) => state.coupon.applyCoupon)
  const [modal, setModal] = useState({
    visible: false,
    item: null,
  })
  const [orderDetail, setOrderDetail] = useState({
    order: {},
    isLoading: true,
    errorMsg: '',
  })
 

    const ratingRes = props?.route?.params?.ratingRes;
    // console.log("Aakash====>",ratingRes);
    const RestroDetails =props?.route?.params?.restro_detail
    const products =props?.route?.params?.product_list || []
    const {totalCartAmt, det} = props?.route?.params

   

    const getOrderDetails = async () => {
    setOrderDetail({...orderDetail, isLoading: true})
    const url = `${API_BASE}/order/orderDetail`
    const payload = {
      _id: props?.route?.params?._id
    }
   
   try {
      const res = await axios.post(url, payload)

      setOrderDetail({
        ...orderDetail,
        order: res?.data?.data[0],
        isLoading: false,
      })
      // console.log("OrderDearils=====>",orderDetail);
    
      } catch (error) {
      setOrderDetail({
        ...orderDetail,
        isLoading: false,
        errorMsg: error.message,
      })
   
    }
  }

  React.useEffect(() => {
    getOrderDetails()
    
  }, [])


  const onPress = async () => {
    navigate('Card', 
    props.reOrder({ products:props?.route?.params?.product_list,
      restroDetails:props?.route?.params?.restro_detail})
    )
  }

  const cancelOrder = () => {

    const payload = {
      _id:orderDetail?.order?._id,
      status: 'CC',
    }
    props?.changeOrderStatusRequest(payload, (res) => {
  
      if (!res?.data?.error) {
        
        dispatch({type: 'ORDER_LIST'})
        
        setModal({...modal, visible: false})
        
      }
    })
    navigate('MyOrders')
  }

  const productRender = (productList) => {
    return productList?.map((product) => {
      return <Text style={{marginTop: 5, fontSize: 18}}>{`${product?.qty} x ${product?.product_detail?.name}`}</Text>
    })
  }


  
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
        Order Details
      </Text>

      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <ScrollView>
        <LoadWheel visible={orderDetail.isLoading} />
          <View
            style={[
              styles.cardStyle,
              {
                justifyContent: 'center',
              },
            ]}>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{color: '#AB8F8E', fontSize: 17}}>
              Transaction ID :
            </Text>
            <Text style={{color: Colors.BLACK, fontSize: 17,}}>
              123ZYGDSW
            </Text>
            </View>
            <Text style={{marginTop: 5, fontSize: 18}}>
              {moment(orderDetail?.order?.order_date_placed).format(
                'MMM D, LT',
              )}{' '}
            </Text>
            <Text style={{color: '#AB8F8E', fontSize: 17, marginTop: 15}}>
              Delivery Items
            </Text>
            
              {productRender(orderDetail?.order?.product_list)}
           
          </View>
          <View style={[styles.cardStyle1]}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              {orderDetail?.order?.restro_detail?.restro_name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{marginTop: 10,fontSize: 18, 
              }}>
              {orderDetail?.order?.restro_detail?.street_name},{' '}
              {orderDetail?.order?.restro_detail?.area_name},{' '}
              {orderDetail?.order?.restro_detail?.region},{' '}
              
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{fontSize: 18, }}>
              
              {orderDetail?.order?.restro_detail?.state}
            </Text>
          </View>
          {
             orderDetail?.order?.status=='OD' ? 
             <View style={[styles.cardStyle2]}>
            <Text
              style={{
                color: '#AB8F8E',
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 3,
              }}>
              Rating and Reviews
            </Text>

            
            <>
           {
             ratingRes?.data?.status == 1 ?

             <View style={{justifyContent:'flex-start'}}>
               <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize= {20}
                  starStyle={{
                    marginTop:Scale(10),
                    marginHorizontal:Scale(5),
                    marginLeft:Scale(1)
                    
                    }}
                  containerStyle={{width:Scale(50)}}
                  rating={starCount}
                  halfStarColor={'#FBFBFB'}
                  fullStarColor	={'#FFBE33'}
                  emptyStarColor={'#FBFBFB'}
                  starSize={25}
                  selectedStar={(rating) => setStarCount(rating)}
                />
                <Text
             style={{
               color: Colors.BLACK,
               fontWeight: 'bold',
               fontSize: 16,
               marginLeft: 3,
               marginTop:Scale(10)
             }}>
             You have rated successfully 
           </Text>
             </View>
             
             :
             <TouchableOpacity onPress={() => navigate('Rating', orderDetail)}>
             <View
               style={{
                 height: '65%',
                 width: Scale(290),
                 backgroundColor: Colors.APPCOLOR,
                 borderRadius: Scale(30),
                 alignItems: 'center',
                 justifyContent: 'center',
                 alignSelf: 'center',
                 marginTop: 13,
               }}>
               <Text
                 style={{
                   color: Colors.WHITE,
                   fontSize: 18,
                   fontWeight: '600',
                 }}>
                 Rating and Reviews
               </Text>
             </View>
           </TouchableOpacity>
           }
            </>
          </View>: null 

          }
          
          <View
            style={[styles.cardStyle,
              [orderDetail?.order?.discounted_price ? {height: Scale(325)}:{height: Scale(250)}]]}
            >
            <Text style={[styles.primaryText, {marginLeft: Scale(-5)}]}>
              {props?.route?.params?.restro_detail.restro_name}
            </Text>
            <View style={[styles.bottomContainer, {marginTop: Scale(20)}]}>
              <Text style={styles.itemText1}>Item Total</Text>
              <Text style={styles.normatText1}>
                ${orderDetail?.order?.total_price}
              </Text>
            </View>

            {
              orderDetail?.order?.discounted_price ? ( 
                <View style={styles.bottomContainer}>
                <Text style={styles.itemText1}>Total Discount</Text>
                <Text style={styles.normatText1}>
                  -${orderDetail?.order?.discounted_price}
                </Text>
              </View>
              ): null
            }
            
            <View style={styles.bottomContainer}>
              <Text style={styles.itemText1}>Tax</Text>
              <Text style={styles.normatText1}>
                ${orderDetail?.order?.gst_charge_total}
              </Text>
            </View>
            <View style={styles.bottomContainer}>
              <Text style={styles.itemText1}>Delivery charges</Text>
              <Text style={styles.normatText1}>
                {orderDetail?.order?.delivery_charge
                  ? `${orderDetail?.order?.delivery_charge}`
                  : `${orderDetail?.order?.delivery_charge}`}
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
                $
                { 
                 orderDetail?.order?.total_price
                }
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
            {orderDetail?.order?.discounted_price? (
              <Text style={[styles.itemText, {color: 'green',textAlign:'center',marginTop:Scale(6)}]}>
                You have saved ${orderDetail?.order?.discounted_price} on this
                order
              </Text>
            ) : null}
          </View>

          <View style={[styles.cardStyle3]}>
            <View style={styles.bottomContainer}>
              <Text style={styles.itemText3}>Delivery Address</Text>
            </View>

            <Text style={styles.itemText2}>
              
              {orderDetail?.order?.order_delivery_address?.house_name_and_no},{' '}{orderDetail?.order?.order_delivery_address?.area_name},{' '}{orderDetail?.order?.order_delivery_address?.nearby}
            </Text>
          </View>

          <View style={{paddingHorizontal: '5%', 
          marginBottom: Scale(50),flexDirection:'column',
          }}>{
            ['P', 'RPL', 'OPU', 'AD', 'RCH', 'PR', 'PRD'].includes(orderDetail?.order?.status)?
           <TouchableOpacity
           onPress={() => setModal({...modal, visible: true})}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical:Scale(30),
            backgroundColor: Colors.DARK_RED,
            paddingHorizontal: 35,
            paddingVertical: 14,
            borderRadius: 25,
            
          }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Cancel Order
            </Text>
          </TouchableOpacity>
             
             
             :
             <View style={{marginTop:Scale(22)}}>
              <CustomButton 
             title="Re-Order" isSecondary={true} 
             onPress={onPress}
             />

             </View>
            
            
          }

            
            <View style={{marginTop:Scale(-22)}}>
            {
              !['RC', 'CC', 'OD'].includes(orderDetail?.order?.status)?
              <TouchableOpacity
          onPress={() => navigate('TrackOrder',{restroDetails: props?.route?.params?.restro_detail, orderDetails: orderDetail?.order})}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical:Scale(10),
            backgroundColor: Colors.APPCOLOR,
            paddingHorizontal: 35,
            paddingVertical: 14,
            borderRadius: 25,
            
          }}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Track Order
          </Text>
        </TouchableOpacity>:null
            }
            
            </View>
            
          </View>
         
        </ScrollView>
        <LogoutAlert
        visible={modal?.visible}
        title={'Cancel Order'}
        alertTitle={'Are you sure you want to cancel this order?'}
        rightButtonText={'Yes'}
        leftButtonText={'No'}
        onPressRightButton={() => cancelOrder(modal?.orderDetail?.order)}
        onPressLeftButton={() => setModal({...modal, visible: false})}
      />
      </ImageBackground>
    </View>
  )
}

const mapDispatchToProps = {
  reOrder,
  changeOrderStatusRequest,
}
export default connect(null, mapDispatchToProps)(OrderDetail)


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
  itemText3: {
    color: '#AB8F8E',
    fontSize: Scale(18),
    fontWeight: 'bold',
    marginBottom: 8,
  },
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
    fontSize: Scale(17),
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
  itemText2: {
    color: Colors.BLACK,
    fontSize: Scale(18),
     
  },
  textStyle: {
    color: Colors.BLACK, 
    fontSize: Scale(16), 
    fontWeight: 'bold'
  },
  loginInputCont: {
    flex: 1,
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
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: Scale(1),
    borderColor: Colors.GRAY,
    marginTop: Scale(10),
    padding: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(5),
  },
  cardStyle1: {
    height: 'auto',
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: Scale(1),
    borderColor: Colors.GRAY,
    marginTop: Scale(20),
    padding: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(5),
  },
  cardStyle3: {
    height: 'auto',
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: Scale(1),
    borderColor: Colors.GRAY,
    marginTop: Scale(20),
    padding: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(5),
  },
  cardStyle2: {
    height: Scale(120),
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
