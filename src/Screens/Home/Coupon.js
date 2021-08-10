import React, {useState, useEffect} from 'react'
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
  Modal,
  Switch,
} from 'react-native'
import {Icon} from 'native-base'
import {CustomButton} from '../../Component'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {useNavigation} from '@react-navigation/native'
import {API_BASE} from '../../apiServices/ApiService'
import {useSelector, useDispatch, connect} from 'react-redux'
import {
  offercardRequest,
  addfavouriteRequest,
  couponRequest,
} from '../../redux/actions'
import Slider from '@react-native-community/slider'
import {LoadWheel} from '../../CommonConfig/LoadWheel'
import axios from 'axios'

function Coupon(props) {
  const [restro, setRestro] = React.useState({
    restroList: [],
    isLoading: true,
    errorMsg: '',
    error: false,
  })
  const [isEnabled, setIsEnabled] = useState()
  const [activeTab, setActiveTab] = useState(0)
  const [currentAddress, setAddress] = useState('')
  const [modal, setModal] = React.useState(false)
  const [modal2, setModal2] = React.useState(false)
  const [value, setValue] = useState(0)
  const [value1, setValue1] = useState(0)
  const [location, setLocation] = useState(null)
  const user = useSelector((state) => state.Auth.user)

  const setCheckedSwitch = () => {
    setIsEnabled(!isEnabled)
  }
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

  const addFavouriteStatus = useSelector(
    (state) => state.Home.addFavouriteStatus,
  )

  const dispatch = useDispatch()

  const onFavorite = (item) => {
    const payload = {
      userid: user?._id,
      restro_id: item?._id,
      is_favourited_restro: !item?.is_favourited,
    }
    dispatch(addfavouriteRequest(payload))
  }

  const onSortBy = async () => {
    setRestro({...restro, isLoading: true})
    const url = `${API_BASE}/couponSortFilter`
    var payload = {}
    if (activeTab == 0) {
      payload = {
        userid: user?._id,
        coupon_discount_in_percentage: `${couponDetails?.coupon_discount_in_percentage}`,
        relevance: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    } else if (activeTab == 1) {
      payload = {
        userid: user?._id,
        coupon_discount_in_percentage: `${couponDetails?.coupon_discount_in_percentage}`,
        rating_high_to_low: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    } else if (activeTab == 2) {
      payload = {
        userid: user?._id,
        coupon_discount_in_percentage: `${couponDetails?.coupon_discount_in_percentage}`,
        rating_low_to_high: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    } else if (activeTab == 3) {
      payload = {
        userid: user?._id,
        coupon_discount_in_percentage: `${couponDetails?.coupon_discount_in_percentage}`,
        delivery_time: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    }
    try {
      const res = await axios.post(url, payload)
      setRestro({
        ...restro,
        isLoading: false,
        restroList: res?.data?.data?.restroNewList,
      })
      setModal(false)
      navigate('Coupon')
    } catch (error) {}
  }

  const onSortByReset = async () => {
    setRestro({...restro, isLoading: true})
    const url = `${API_BASE}/listRestroWithOffer`
    const payload = {
      coupon_discount_in_percentage: `${couponDetails?.coupon_discount_in_percentage}`,
    }
    try {
      const res = await axios.post(url, payload)
      setRestro({
        ...restro,
        isLoading: false,
        restroList: res?.data?.data?.restroNewArrayList,
      })
      setActiveTab(0)
      setValue(0)
      setValue1(0)
      setIsEnabled(false)
      setModal2(false)
      setModal(false)
      navigate('Coupon')
    } catch (error) {}
  }

  const onFilter = async () => {
    var restro_type = ''
    if (isEnabled) {
      restro_type = 'non_veg'
    } else {
      restro_type = 'veg'
    }
    if (value1) {
      var payload = {}
      setRestro({...restro, isLoading: true})
      const url = `${API_BASE}/couponSortFilter`
      payload = {
        userid: user?._id,
        distance: value1.toFixed(1) + '',
        coupon_discount_in_percentage: `${couponDetails?.coupon_discount_in_percentage}`,
        is_sort: `${false}`,
        is_filter: `${true}`,
        restaurent_type: restro_type,
        rating_from_user: undefined,
      }
      try {
        const res = await axios.post(url, payload)
        setRestro({
          ...restro,
          isLoading: false,
          restroList: res?.data?.data?.restroNewList,
        })
        console.log('====================================');
        console.log("Aakash====>",res?.data?.data?.restroNewList);
        console.log('====================================');
        setModal2(false)
        navigate('Coupon')
      } catch (error) {
        alert('Error', error)
      }
    } else if (value) {
      setRestro({...restro, isLoading: true})
      const url = `${API_BASE}/couponSortFilter`
      var payload = {}
      payload = {
        userid: user?._id,
        coupon_discount_in_percentage: `${couponDetails?.coupon_discount_in_percentage}`,
        distance: undefined,
        rating_from_user: value.toFixed(1) + '',
        is_sort: `${false}`,
        is_filter: `${true}`,
        restaurent_type: restro_type,
      }
      try {
        const res = await axios.post(url, payload)
        setRestro({
          ...restro,
          isLoading: false,
          restroList: res?.data?.data?.restroNewList,
        })
        setModal2(false)
        navigate('Coupon')
      } catch (error) {
        alert('Error', error)
      }
    } else {
      setRestro({...restro, isLoading: true})
      const url = `${API_BASE}/couponSortFilter`
      const payload = {
        userid: user?._id,
        coupon_discount_in_percentage: `${couponDetails?.coupon_discount_in_percentage}`,
        distance: value1.toFixed(1) + '',
        rating_from_user: value.toFixed(1) + '',
        is_sort: `${true}`,
        is_filter: `${true}`,
        restaurent_type: restro_type,
      }
      try {
        const res = await axios.post(url, payload)
        setRestro({
          ...restro,
          isLoading: false,
          restroList: res?.data?.data?.restroNewList,
        })
        
        setModal2(false)
        navigate('Coupon')
      } catch (error) {}
    }
  }

  const renderItems = ({item, index}) => (
    <View style={styles.cardStyle}>
      <TouchableOpacity onPress={() => redirectToHomeMaker(item)}>
        <ImageBackground
          source={{uri: item?.building_front_img}}
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
                  paddingHorizontal: Scale(10),
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
                  {item.distance} Km
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
                onPress={() => setModal(true)}>
                <Text style={styles.normalText}>Sort By</Text>
                <Image source={ImagesPath.up} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.leftContainer}
                onPress={() => setModal2(true)}>
                <Text style={styles.normalText}>Filters</Text>
                <Image source={ImagesPath.filter} />
              </TouchableOpacity>
            </View>
            <FlatList data={restro?.restroList} renderItem={renderItems} />
            <LoadWheel visible={restro.isLoading} />
          </ScrollView>

          <Modal visible={modal} animationType="slide">
            <View style={styles.modalHeader}>
              <Icon
                onPress={() => setModal(false)}
                name="arrowleft"
                type="AntDesign"
                style={styles.backlogo}
              />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerText1}>SortBy</Text>
            </View>

            <ImageBackground
              source={ImagesPath.background}
              style={styles.loginInputCont1}>
              <View
                style={{
                  marginTop: Scale(20),
                  justifyContent: 'center',
                  paddingVertical: Scale(15),
                  borderRadius: 10,
                  borderWidth: Scale(2),
                  width: '109%',
                  borderColor: Colors.LIGHT_GRAY,
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: Scale(15),
                    alignItems: 'center',
                  }}>
                  <Text>Relevance</Text>
                  <Icon
                    type="FontAwesome"
                    style={[
                      activeTab == 0
                        ? {color: Colors.DARK_RED}
                        : {color: Colors.LIGHT_GRAY},
                      {fontSize: 25},
                    ]}
                    name={activeTab == 0 ? 'dot-circle-o' : 'circle-o'}
                    onPress={() => setActiveTab(0)}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: Scale(20),
                  justifyContent: 'center',
                  paddingVertical: Scale(15),
                  borderRadius: 10,
                  borderWidth: Scale(2),
                  width: '109%',
                  borderColor: Colors.LIGHT_GRAY,
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: Scale(15),
                    alignItems: 'center',
                  }}>
                  <Text>Rating: High to Low</Text>
                  <Icon
                    type="FontAwesome"
                    style={[
                      activeTab == 1
                        ? {color: Colors.DARK_RED}
                        : {color: Colors.LIGHT_GRAY},
                      {fontSize: 25},
                    ]}
                    name={activeTab == 1 ? 'dot-circle-o' : 'circle-o'}
                    onPress={() => setActiveTab(1)}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: Scale(20),
                  justifyContent: 'center',
                  paddingVertical: Scale(15),
                  borderRadius: 10,
                  borderWidth: Scale(2),
                  width: '109%',
                  borderColor: Colors.LIGHT_GRAY,
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: Scale(15),
                    alignItems: 'center',
                  }}>
                  <Text>Rating: Low to High</Text>
                  <Icon
                    type="FontAwesome"
                    style={[
                      activeTab == 2
                        ? {color: Colors.DARK_RED}
                        : {color: Colors.LIGHT_GRAY},
                      {fontSize: 25},
                    ]}
                    name={activeTab == 2 ? 'dot-circle-o' : 'circle-o'}
                    onPress={() => setActiveTab(2)}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: Scale(20),
                  justifyContent: 'center',
                  paddingVertical: Scale(15),
                  borderRadius: 10,
                  borderWidth: Scale(2),
                  width: '109%',
                  borderColor: Colors.LIGHT_GRAY,
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: Scale(15),
                    alignItems: 'center',
                  }}>
                  <Text>Delivery Time</Text>
                  <Icon
                    type="FontAwesome"
                    style={[
                      activeTab == 3
                        ? {color: Colors.DARK_RED}
                        : {color: Colors.LIGHT_GRAY},
                      {fontSize: 25},
                    ]}
                    name={activeTab == 3 ? 'dot-circle-o' : 'circle-o'}
                    onPress={() => setActiveTab(3)}
                  />
                </View>
              </View>
              <View style={{justifyContent: 'flex-end', flex: 1}}>
                <View
                  style={{
                    marginTop: Scale(50),
                    flexDirection: 'row',
                    marginVertical: 30,
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      marginRight: Scale(10),
                    }}>
                    <CustomButton title="Reset All" onSubmit={onSortByReset} />
                  </View>
                  <View style={{flex: 1}}>
                    <CustomButton
                      title="Apply"
                      isSecondary={true}
                      onSubmit={onSortBy}
                    />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </Modal>

          <Modal visible={modal2} animationType="slide">
            <View style={styles.modalHeader}>
              <Icon
                onPress={() => setModal2(false)}
                name="arrowleft"
                type="AntDesign"
                style={styles.backlogo}
              />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerText1}>Filters </Text>
            </View>
            <ImageBackground
              source={ImagesPath.background}
              style={styles.loginInputCont1}>
              <View
                style={{
                  marginTop: Scale(20),
                  justifyContent: 'center',
                  height: Scale(100),
                  paddingVertical: Scale(20),
                  borderRadius: 10,
                  borderWidth: Scale(2),
                  width: '100%',
                  borderColor: Colors.LIGHT_GRAY,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: Scale(15),
                  }}>
                  <Text>Distance</Text>
                  <Text
                    style={{
                      fontSize: Scale(14),
                      color: Colors.DARK_RED,
                    }}>
                    {value1.toFixed(1)} Miles
                  </Text>
                </View>
                <Slider
                  style={{marginTop: Scale(20)}}
                  minimumValue={0}
                  maximumValue={5}
                  value={value1}
                  step={0.1}
                  onValueChange={(value) => setValue1(value)}
                  thumbTintColor={Colors.APPCOLOR}
                  minimumTrackTintColor={Colors.APPCOLOR}
                  maximumTrackTintColor="#000000"
                />
              </View>
              <View
                style={{
                  marginTop: Scale(25),
                  justifyContent: 'center',
                  height: Scale(100),
                  paddingVertical: Scale(20),
                  borderRadius: 10,
                  borderWidth: Scale(2),
                  width: '100%',
                  borderColor: Colors.LIGHT_GRAY,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: Scale(15),
                  }}>
                  <Text>Rating</Text>
                  <Text
                    style={{
                      fontSize: Scale(14),
                      color: Colors.DARK_RED,
                    }}>
                    {value.toFixed(1)}
                  </Text>
                </View>
                <Slider
                  style={{marginTop: Scale(20)}}
                  minimumValue={0}
                  maximumValue={5}
                  value={value}
                  step={0.1}
                  onValueChange={(value) => setValue(value)}
                  thumbTintColor={Colors.APPCOLOR}
                  minimumTrackTintColor={Colors.APPCOLOR}
                  maximumTrackTintColor="#000000"
                />
              </View>
              <View
                style={{
                  marginTop: Scale(25),
                  justifyContent: 'center',
                  paddingVertical: Scale(15),
                  borderRadius: 10,
                  borderWidth: Scale(2),
                  width: '100%',
                  borderColor: Colors.LIGHT_GRAY,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: Scale(15),
                  }}>
                  <Text style={{fontSize: 18}}>Veg only</Text>
                  <Switch
                    trackColor={{
                      false: Colors.GRAY,
                      true: Colors.RED,
                    }}
                    style={{
                      transform: [{scaleX: 1.1}, {scaleY: 1.1}],
                    }}
                    thumbColor={isEnabled ? Colors.WHITE : Colors.WHITE}
                    ios_backgroundColor={Colors.GREEN}
                    onValueChange={setCheckedSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  flex: 1,
                  marginVertical: 30,
                }}>
                <View style={{marginTop: Scale(50), flexDirection: 'row'}}>
                  <View style={{flex: 1, marginRight: Scale(15)}}>
                    <CustomButton title="Reset All" onSubmit={onSortByReset} />
                  </View>
                  <View style={{flex: 1}}>
                    <CustomButton
                      title="Apply"
                      isSecondary={true}
                      onSubmit={onFilter}
                    />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </Modal>
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
  backlogo: {
    marginTop: Scale(15),
    fontSize: Scale(25),
    color: Colors.WHITE,
  },
  modalHeader: {
    paddingTop: Scale(20),
    height: Scale(80),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.APPCOLOR,
    paddingHorizontal: Scale(25),
  },
  headerText: {
    backgroundColor: Colors.APPCOLOR,
    width: '100%',
  },
  headerText1: {
    fontSize: Scale(20),
    fontWeight: 'bold',
    marginHorizontal: Scale(25),
    marginBottom: Scale(25),
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
    paddingTop: Scale(10),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  loginInputCont1: {
    flex: 1,
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
    paddingHorizontal: Scale(30),
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
