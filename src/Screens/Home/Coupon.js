import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {Searchbar} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import {API_BASE} from '../../apiServices/ApiService'
import {useSelector, useDispatch, connect} from 'react-redux'
import {
  offercardRequest,
  addfavouriteRequest,
  couponRequest,
} from '../../redux/actions'
import {LoadWheel} from '../../CommonConfig/LoadWheel'
import axios from 'axios'

function Coupon(props) {
  const [restro, setRestro] = React.useState({
    restroList: [],
    isLoading: true,
    errorMsg: '',
    error: false,
  })

  const onRestro = async () => {
    setRestro({...restro, isLoading: true})
    const url = `${API_BASE}/listRestroWithOffer`
    const payload = {
      coupon_discount_in_percentage: `${couponDetails?.coupon_discount_in_percentage}`,
    }
    try {
      const res = await axios.post(url, payload)

      if (res?.data?.data) {
        setRestro({
          ...restro,
          restroList: res?.data?.data?.restroNewArrayList,
          isLoading: false,
          errorMsg: res?.data?.message,
          error: false,
        })
      } else {
        setRestro({
          ...restro,
          isLoading: false,
          errorMsg: res?.data?.message,
          error: true,
        })
      }
    } catch (error) {
      setRestro({
        ...restro,
        isLoading: true,
        errorMsg: res?.data?.message,
        error: true,
      })
    }
  }

  React.useEffect(() => {
    onRestro()
  }, [])

  const {navigate} = useNavigation()
  const navigation = useNavigation()

  const redirectToHomeMaker = (item) => {
    navigate('HomeMaker', {restroId: item?._id, restroDetails: item})
  }
  const redirectToFilter = () => {
    navigate('Filter')
  }
  const redirectToSortBy = () => {
    navigate('SortBy')
  }
  const redirectToNotification = () => {
    navigate('Notification')
  }

  const addFavouriteStatus = useSelector(
    (state) => state.Home.addFavouriteStatus,
  )
  const user = useSelector((state) => state.Auth.user)
  const dispatch = useDispatch()

  const onFavorite = (item) => {
    console.log('====================================')
    console.log(item, restro?.restroList)
    console.log('====================================')
    // const restro = [...restro?.restroList]
    // const index = restro.findIndex((i) => i?._id === item?._id)
    // restro[index] = {...restro[index], is_favourited: !item?.is_favourited || false}
    // setRestro({...restro, restroList: restro})
    const payload = {
      userid: user?._id,
      restro_id: item?._id,
      is_favourited_restro: !item?.is_favourited,
    }
    dispatch(addfavouriteRequest(payload))
  }

  const renderItems = ({item, index}) => (
    <View style={styles.cardStyle}>
      <TouchableOpacity onPress={() => redirectToHomeMaker(item)}>
        <ImageBackground
          source={{uri: item?.profile_image}}
          style={styles.backgroundStyle}>
          <View style={{justifyContent: 'flex-end', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: Scale(10),
                alignItems: 'center',
                paddingHorizontal: Scale(10),
              }}>
              <Text
                style={{
                  fontSize: Scale(12),
                  color: Colors.WHITE,
                  marginLeft: Scale(7),
                  paddingHorizontal: Scale(7),
                  paddingVertical: Scale(5),
                  backgroundColor: 'green',
                }}>
                {item?.rating_from_user}
              </Text>
              <Icon
                name="star"
                type="FontAwesome"
                style={[styles.iconStyle, {paddingLeft: 10}]}
              />
              <Icon
                name="star"
                type="FontAwesome"
                style={[styles.iconStyle, {paddingLeft: 3}]}
              />
              <Icon
                name="star"
                type="FontAwesome"
                style={[styles.iconStyle, {paddingLeft: 3}]}
              />
              <Icon
                name="star"
                type="FontAwesome"
                style={[styles.iconStyle, {paddingLeft: 3}]}
              />
              <Icon
                name="star"
                type="FontAwesome"
                style={[
                  styles.iconStyle,
                  {color: Colors.WHITE, paddingLeft: 3},
                ]}
              />
              <View style={{justifyContent: 'flex-end', flex: 1}}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'right',
                    fontSize: Scale(15),
                  }}>
                  1.5km
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: Scale(15),
              alignItems: 'center',
              paddingHorizontal: Scale(10),
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: Scale(16), fontWeight: 'bold'}}>
              {item?.restro_name}{' '}
            </Text>
            <Text
              style={{
                color: '#AB8F8E',
                fontSize: Scale(12),
                fontWeight: 'normal',
                marginRight: Scale(25),
              }}>
              (11:00am - 10:00pm)
            </Text>

            <TouchableOpacity onPress={() => onFavorite(item)}>
              <Icon
                name="heart"
                type="FontAwesome"
                style={{
                  color: item?.is_favourited ? Colors.DARK_RED : '#AB8F8E',
                  fontSize: Scale(16),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              marginTop: 5,
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: Scale(12.5),
                fontWeight: 'normal',
                paddingBottom: 20,
                paddingLeft: 12,
              }}>
              {item?.categoryNameArray}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
  const {couponDetails = {}} = props.route.params || {}

  // const {restroDetails: couDet} = list
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        inputStyle={{fontSize: Scale(14), marginLeft: Scale(-15)}}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />
      <ImageBackground
        source={{uri: couponDetails?.offer_image}}
        style={styles.backgroundStyle1}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrowleft"
          type="AntDesign"
          style={styles.logoStyle}
        />
        <Text style={styles.headingText}>
          {couponDetails?.coupon_discount_in_percentage} % OFF{' '}
        </Text>
        <Text style={styles.bottomText}>{couponDetails?.coupon_detail}</Text>
        <ImageBackground
          source={ImagesPath.background}
          style={styles.loginInputCont}>
          <ScrollView>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={styles.leftContainer}
                onPress={redirectToSortBy}>
                <Text style={styles.normalText}>Sort By</Text>
                <Image source={ImagesPath.up} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.leftContainer}
                onPress={redirectToFilter}>
                <Text style={styles.normalText}>Filters</Text>
                <Image source={ImagesPath.filter} />
              </TouchableOpacity>
            </View>
            <FlatList data={restro?.restroList} renderItem={renderItems} />
            <LoadWheel visible={restro.isLoading} />
          </ScrollView>
        </ImageBackground>
      </ImageBackground>
    </View>
  )
}
export default Coupon
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoStyle: {
    marginHorizontal: Scale(20),
    fontSize: Scale(25),
    color: Colors.WHITE,
  },
  headingText: {
    color: Colors.WHITE,
    fontSize: Scale(20),
    marginHorizontal: Scale(25),
    marginTop: Scale(40),
    fontWeight: 'bold',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    textShadowColor: 'rgba(0,0,0,0.9)',
  },
  bottomText: {
    color: Colors.WHITE,
    fontSize: Scale(16),
    marginHorizontal: Scale(25),
    marginTop: Scale(3),
    marginBottom: Scale(30),
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    textShadowColor: 'rgba(0,0,0,0.9)',
  },
  loginInputCont: {
    flex: 1,
    // top: Scale(-20),
    paddingTop: Scale(10),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  searchView: {
    borderRadius: 10,
    height: 50,
    borderColor: Colors.GRAY_LINES,
    borderWidth: 0,
    width: '100%',
    fontSize: 12,
    backgroundColor: Colors.WHITE,
  },
  backgroundStyle1: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: Scale(70),
  },
  backgroundStyle: {
    width: '100%',
    height: Scale(150),
    resizeMode: 'stretch',
    borderTopLeftRadius: Scale(10),
    borderTopRightRadius: Scale(10),
    overflow: 'hidden',
  },
  normalText: {
    fontSize: Scale(16),
    color: Colors.BORDERCOLOR,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Scale(10),
    width: '90%',
    alignSelf: 'center',
  },
  leftContainer: {
    paddingHorizontal: Scale(10),
    borderRadius: Scale(5),
    borderColor: 'grey',
    flexDirection: 'row',
    borderWidth: 1,
    height: Scale(45),
    width: '45%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    justifyContent: 'flex-end',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.APPCOLOR,
    paddingVertical: Scale(35),
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
    elevation: 3,
    shadowOpacity: 3,
    height: Scale(225),
    width: '90%',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginVertical: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(10),
  },
  iconStyle: {
    color: Colors.APPCOLOR,
    fontSize: Scale(15),
    marginHorizontal: Scale(3),
  },
})
