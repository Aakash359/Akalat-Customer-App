import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {useNavigation} from '@react-navigation/native'
import {couponRequest,OfferListLoader} from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux';

function Offers() {
  const [checked, setChecked] = useState(false)
  const couponResponse = useSelector((state) => state.Home.couponResponse)
  const  user = useSelector((state) => state.Auth.user);
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const redirectToEditProfile = () => {
    navigate('EditProfile')
  }
  const onPressChecked = () => {
    setChecked(!checked)
  }

  console.log('====================================');
  console.log("Aakash=====>",couponResponse);
  console.log('====================================');

  useEffect(() => {
   
      dispatch(couponRequest())
  
  }, [])

  const renderItemStore = ({item, index}) => (
    <View style={styles.cardStyle}>
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri:item.offer_image}} style={styles.backgroundStyle1} />
        <View>
          <Text style={styles.primaryText}>{item?.title}</Text>
          <Text style={styles.normatText}
          numberOfLines={1}>
            {item?.restro_address?.street_name},{' '}
            {item?.restro_address?.area_name}, 
          </Text>
          <Text style={styles.normatText}
               numberOfLines={1}>
            {item?.restro_address?.region},{' '}
            {item?.restro_address?.state}
          </Text>
        </View>
      </View>
      <View style={styles.borderStyle} 
      />
      <View style={styles.heading}>
        <Icon
          type="Ionicons"
          name="settings-sharp"
          style={{fontSize: Scale(20), color: Colors.DARK_RED}}
        />
        <Text style={styles.itemText1}>
          {' '} {item.coupon_discount_in_percentage} off | Use code{' '}
          <Text style={{color: Colors.DARK_RED}}>{item.coupon_code}</Text>
        </Text>
      </View>
    </View>
  )
  const renderItemPayment = ({item, index}) => (
    <View style={styles.cardStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={ImagesPath.icici} />
        <Text style={styles.primaryText}>
          Flat $ 10 Off cashback {'\n'}using ICICI credit card
        </Text>
      </View>
      <View style={styles.borderStyle} />
      <Text style={styles.itemText}>Applicable on order above $ 50</Text>
      <Text style={styles.seconderyText}>Terms & Conditions Apply</Text>
      <View style={styles.iconsStyle}>
        <Icon
          name="dot-single"
          type="Entypo"
          style={{color: Colors.APPCOLOR}}
        />
        <Text style={styles.itemText}>
          Get flat SR 10 off on all orders above SR 50.
        </Text>
      </View>
      <View style={styles.iconsStyle}>
        <Icon
          name="dot-single"
          type="Entypo"
          style={{color: Colors.APPCOLOR}}
        />
        <Text style={styles.itemText}>Valid on your first app order.</Text>
      </View>
      <View style={styles.iconsStyle}>
        <Icon
          name="dot-single"
          type="Entypo"
          style={{color: Colors.APPCOLOR}}
        />
        <Text style={styles.itemText}>Applicable from 11 AM to 11 PM.</Text>
      </View>
      <View style={styles.iconsStyle}>
        <Icon
          name="dot-single"
          type="Entypo"
          style={{color: Colors.APPCOLOR}}
        />
        <Text style={styles.itemText}>
          Not applicable on everyday value orders, combos, or pizza mania
        </Text>
      </View>
      <View style={styles.iconsStyle}>
        <Icon
          name="dot-single"
          type="Entypo"
          style={{color: Colors.APPCOLOR}}
        />
        <Text style={styles.itemText}>orders.</Text>
      </View>
      <View style={styles.iconsStyle}>
        <Icon
          name="dot-single"
          type="Entypo"
          style={{color: Colors.APPCOLOR}}
        />
        <Text style={styles.itemText}>
          Cannot be combined with other offers/coupons.
        </Text>
      </View>
      <Text style={[styles.itemText, {color: Colors.DARK_RED}]}>
        {' '}
        - View Less
      </Text>
    </View>
  )
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
        <Text style={styles.headerText}>Offers </Text>
        <View style={[styles.buttonContainer, {alignItems: 'center'}]}>
          <Text
            onPress={onPressChecked}
            style={checked ? styles.inActiveStyle : styles.textStyle}>
            Store Offer
          </Text>
          <Text
            onPress={onPressChecked}
            style={checked ? styles.textStyle : styles.inActiveStyle}>
            Payment Offer
          </Text>
        </View>
      </View>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <FlatList
          style={{paddingHorizontal: Scale(20)}}
          data={checked ? couponResponse?.data : couponResponse?.data}
          renderItem={checked ? renderItemPayment : renderItemStore}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <Text style={{alignSelf: 'center', marginTop: 300, fontSize: 15}}>
                You don't have any offers
              </Text>
            )
          }}
        />
      </ImageBackground>
    </View>
  )
}
export default Offers
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
  },
  backgroundStyle1: {
    width: Scale(80),
    height: Scale(80),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'stretch',
    borderRadius: Scale(15),
    marginRight: Scale(15),
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Scale(5),
  },
  seconderyText: {
    textAlignVertical: 'center',
    color: '#AB8F8E',
    fontSize: Scale(12),
    marginVertical: Scale(5),
  },
  iconsStyle: {
    flexDirection: 'row',
    marginRight: Scale(10),
    marginLeft: Scale(-8),
  },
  itemText: {
    color: '#202020',
    fontSize: Scale(14),
  },
  itemText1: {
    color: '#202020',
    fontSize: Scale(16),
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
    width: Scale(120),
    textAlignVertical: 'center',
    textAlign: 'center',
    color: Colors.APPCOLOR,
    fontSize: Scale(14),
    fontWeight: 'bold',
    paddingVertical: 10,
    zIndex: 1,
  },
  inActiveStyle: {
    width: Scale(120),
    borderRadius: Scale(20),
    textAlignVertical: 'center',
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: Scale(14),
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
