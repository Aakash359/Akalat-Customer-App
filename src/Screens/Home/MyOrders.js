import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {useNavigation} from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {connect} from 'react-redux'
import {API_BASE} from '../../apiServices/ApiService'
import {orderList} from '../../redux/actions/OrderAction'
import moment from 'moment'
import {LoadWheel} from '../../CommonConfig/LoadWheel'
import {changeOrderStatusRequest} from '../../redux/actions/SettingActions'
import {reOrder} from '../../redux/actions/CartActions'
import {LogoutAlert} from '../../CommonConfig'

function MyOrders(props) {
  const [checked, setChecked] = useState(false)
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [modal, setModal] = useState({
    visible: false,
    item: null,
  })

  const data = props.orderList
  console.log("Data=====>",data);



  const redirectToHomeMaker = (item) => {
    navigate('OrderDetails', item)
  }
  
  React.useEffect(() => {
    props?.getOrderList()
  }, [])

  const onPressChecked = () => {
    setChecked(!checked)
  }

  const productRender = (productList) => {
    return productList?.map((product) => {
      return <Text style={styles.itemText}>
        {`${product?.qty} x ${product?.product_detail?.name}`}</Text>
    })
  }

  const cancelOrder = (order) => {
    const {_id} = order
    const payload = {
      _id,
      status: 'CC',
    }
    props?.changeOrderStatusRequest(payload, (res) => {
      if (!res?.data?.error) {
        dispatch({type: 'ORDER_LIST'})
        
        setModal({...modal, visible: false})
      }
    })
  }

  const renderItemsActive = ({item, index}) => (
    <View style={styles.cardStyle}>
      <TouchableOpacity onPress={() => redirectToHomeMaker(item)}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item?.restro_detail?.building_front_img}}
          style={styles.backgroundStyle1}
        />
        <View>
          <Text style={styles.primaryText}>
            {item?.restro_detail.restro_name}
          </Text>
          <Text style={styles.normatText}>
            {item?.restro_detail.street_name}, {item?.restro_detail.area_name},
            {'\n'}
            {item?.restro_detail.region}, {item?.restro_detail.state}
          </Text>
        </View>
      </View>
      <View style={styles.borderStyle} />
      <Text style={[styles.seconderyText, {marginTop: Scale(-10)}]}>Items</Text>
      {productRender(item?.product_list)}
      <Text style={styles.seconderyText}>Ordered on</Text>
      <Text style={styles.itemText}>
        {moment(item?.order_date_placed).format('MMM D, LT')}
      </Text>
      <Text style={styles.seconderyText}>Total Amount</Text>
      <Text style={styles.itemText}>$ {item?.total_price}</Text>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => setModal({...modal, visible: true, item})}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.DARK_RED,
            paddingHorizontal: 25,
            paddingVertical: 10,
            borderRadius: 25,
          }}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Cancel Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('TrackOrder', {restroDetails: item?.restro_detail, orderDetails: item})}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.APPCOLOR,
            paddingHorizontal: 25,
            paddingVertical: 10,
            borderRadius: 25,
            marginRight: 10,
            marginLeft: 10,
          }}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Track Order
          </Text>
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
    </View>
  )
  const renderItemPast = ({item, index}) => {
    return (
      <View style={styles.cardStyle}>
        <TouchableOpacity onPress={() => redirectToHomeMaker(item)}>
          <View style={{flexDirection: 'row'}}>
            <Image 
            source={{uri: item?.restro_detail?.building_front_img}}
            style={styles.backgroundStyle1} />
            <View>
              <Text style={styles.primaryText}>
                {item?.restro_detail.restro_name}
              </Text>
              <Text style={styles.normatText}>
                {item?.restro_detail.street_name},{' '}
                {item?.restro_detail.area_name},{'\n'}
                {item?.restro_detail.region}, {item?.restro_detail.state}
              </Text>
            </View>
          </View>
          <View style={styles.borderStyle} />
          <Text style={[styles.seconderyText, {marginTop: Scale(-10)}]}>
            Items
          </Text>
          {productRender(item?.product_list)}
          <Text style={styles.seconderyText}>Ordered on</Text>
          <Text style={styles.itemText}>
            {moment(item?.order_date_placed).format('MMM D, LT')}
          </Text>
          <Text style={styles.seconderyText}>Total Amount</Text>
          <Text style={styles.itemText}>$ {item?.total_price}</Text>
          <View style={styles.heading}>
            <TouchableOpacity
              onPress={() => {
                props.reOrder({
                  restroDetails: item?.restro_detail,
                  products: item?.product_list,
                })
                navigate('Card')
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.APPCOLOR,
                paddingHorizontal: 35,
                paddingVertical: 10,
                borderRadius: 25,
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
                Re-Order
              </Text>
            </TouchableOpacity>
            {['CC', 'RC'].includes(item?.status) && (
              <Text
                style={{
                  color: 'red',
                  marginRight: 10,
                  fontSize: 20,
                  marginTop: 5,
                }}>
                Cancelled
              </Text>
            )
            
            }
            {['OD'].includes(item?.status) && (
              <Text
                style={{
                  color: 'green',
                  marginRight: 10,
                  fontSize: 20,
                  marginTop: 5,
                }}>
                Delivered
              </Text>
            )
            
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  let active = ['P', 'RPL', 'OPU', 'AD', 'RCH', 'PR', 'PRD']
  let past = ['RC', 'OD', 'CC']
  let activeOrders = props?.orderList.filter((i) => active.includes(i.status))
  let pastOrders = props?.orderList.filter((i) => past.includes(i.status))

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrowleft"
          type="AntDesign"
          style={styles.logoStyle}
        />
      </View>
      <View style={styles.buttonHeader}>
        <Text style={styles.headerText}>My Orders </Text>
        <View style={[styles.buttonContainer, {alignItems: 'center'}]}>
          <Text
            onPress={onPressChecked}
            style={checked ? styles.inActiveStyle : styles.textStyle}>
            Active
          </Text>
          <Text
            onPress={onPressChecked}
            style={checked ? styles.textStyle : styles.inActiveStyle}>
            Past
          </Text>
        </View>
      </View>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <FlatList
          style={{paddingHorizontal: Scale(20)}}
          data={checked ? pastOrders : activeOrders}
          renderItem={checked ? renderItemPast : renderItemsActive}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <Text style={{alignSelf: 'center', marginTop: 300, fontSize: 15}}>
                You don't have any orders
              </Text>
            )
          }}
        />
        {/* <LoadWheel visible={orderDetail?.isLoading} /> */}
      </ImageBackground>
      <LogoutAlert
        visible={modal?.visible}
        title={'Cancel Order'}
        alertTitle={'Are you sure you want to cancel this order?'}
        rightButtonText={'Yes'}
        leftButtonText={'No'}
        onPressRightButton={() => cancelOrder(modal?.item)}
        onPressLeftButton={() => setModal({...modal, visible: false})}
      />
    </View>
  )
}

const mapStateToProps = ({
  Auth: {user},
  order: {orderList, isLoading, error},
}) => {
  return {
    user,
    orderList,
    isLoading,
    error,
  }
}

const mapDispatchToProps = {
  getOrderList: orderList,
  changeOrderStatusRequest,
  reOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
  },
  backgroundStyle1: {
    width: Scale(80),
    height: Scale(80),
    borderWidth: 1,
    resizeMode: 'stretch',
    borderRadius: Scale(20),
    marginRight: Scale(15),
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Scale(20),
    marginBottom: Scale(10),
  },
  seconderyText: {
    color: '#AB8F8E',
    fontSize: Scale(14),
    marginTop: Scale(10),
  },
  itemText: {
    color: '#202020',
    fontSize: Scale(16),
    marginTop: 5,
  },
  primaryText: {
    color: Colors.BLACK,
    fontSize: Scale(20),
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: Scale(1),
    borderColor: Colors.WHITE,
    borderRadius: Scale(26),
    overflow: 'hidden',
  },
  cancelButton: {
    width: '45%',
    height: Scale(40),
    backgroundColor: Colors.DARK_RED,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: Scale(20),
    fontSize: Scale(16),
    color: Colors.WHITE,
    
  },
  borderStyle: {
    height: Scale(2),
    backgroundColor: '#00000029',
    marginVertical: Scale(20),
  },
  cardStyle: {
    paddingVertical: Scale(20),
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: Scale(2),
    borderColor: '#00000029',
    marginVertical: Scale(15),
    paddingHorizontal: Scale(15),
    paddingVertical: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(5),
  },
  normatText: {
    color: Colors.BLACK,
    fontSize: Scale(16),
    marginTop: Scale(7),
    
  },
  buttonStyle: {
    borderRadius: Scale(20),
    height: Scale(40),
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: Scale(30),
    paddingHorizontal: Scale(30),
  },
  buttonHeader: {
    height: Scale(40),
    marginBottom: Scale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Scale(25),
  },
  activeButton: {
    borderRadius: Scale(20),
    height: Scale(40),
    justifyContent: 'center',
    borderRadius: Scale(30),
    paddingHorizontal: Scale(30),
  },
  textStyle: {
    backgroundColor: Colors.WHITE,
    borderRadius: Scale(20),
    width: Scale(90),
    paddingVertical: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: Colors.APPCOLOR,
    fontSize: Scale(15),
    fontWeight: 'bold',
    zIndex: 1,
  },
  inActiveStyle: {
    width: Scale(90),
    borderRadius: Scale(20),
    textAlignVertical: 'center',
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: Scale(15),
    fontWeight: 'bold',
  },
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  headerText: {
    fontSize: Scale(20),
    fontWeight: 'bold',
    color: Colors.WHITE,
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
})
