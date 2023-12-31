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
  PermissionsAndroid,
  PixelRatio,
} from 'react-native'
import {Icon} from 'native-base'
import {
  Colors,
  Scale,
  ImagesPath,
  iOSMapAPIKey,
  androidMapAPIKey,
  
} from '../../CommonConfig'
import {Searchbar} from 'react-native-paper'
import StarRating from 'react-native-star-rating';
import {useNavigation, useRoute} from '@react-navigation/native'
import Slider from '@react-native-community/slider'
import {useSelector, useDispatch, connect} from 'react-redux'
import {
  offercardRequest,
  couponRequest,
  addfavouriteRequest,
} from '../../redux/actions'
import {CustomButton} from '../../Component'
import {API_BASE} from '../../apiServices/ApiService'
import axios from 'axios'
import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'


Geocoder.init(Platform.OS == 'ios' ? iOSMapAPIKey : androidMapAPIKey)

function NearMe(props) {
  const [activeTab, setActiveTab] = useState(0)
  const [currentAddress, setAddress] = useState('')
  const [search, setSearch] = React.useState('')
  const [starCount, setStarCount] = useState(5)
  const offercardResponse = useSelector((state) => state.Home.offercardResponse)
  const offercard = offercardResponse?.data || []
  const user = useSelector((state) => state.Auth.user)
  const [modal, setModal] = React.useState(false)
  const [modal2, setModal2] = React.useState(false)
  const [value, setValue] = useState(0)
  const [value1, setValue1] = useState(0)
  const [location, setLocation] = useState(null)
  const couponResponse = useSelector((state) => state.Home.couponResponse)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {navigate} = useNavigation()
  const [isEnabled, setIsEnabled] = useState()
  const setCheckedSwitch = () => {
    setIsEnabled(!isEnabled)
  }
  const [data, setdata] = React.useState({
    restroList: [],
    isLoading: true,
    resetStatus: false,
  })

  const onStarRatingPress = (rating) => {
    setStarCount({
      starCount: rating
    });
  }


useEffect(() => {

     const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation()
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation()
          } else {
          }
        } catch (err) {}
      }
    }
    requestLocationPermission()
    return () => {
      Geolocation.clearWatch()
    }
  }, [])


  const getOneTimeLocation = () => {

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords)

        Geocoder.from(position.coords.latitude, position.coords.longitude).then(
          (json) => {
            var addressComponent =
              json.results[0].address_components[1].long_name +
              ' ' +
              json.results[0].address_components[2].long_name
            setAddress(addressComponent)
          },
        )
      },
      (error) => {
        
      },
      {
        timeout: 30000,
        maximumAge: 1000,
      },
    )
  }

 const onSearch = async () => {
    var restro_type = ''
    if (isEnabled) {
      restro_type = 'non_veg'
    } else {
      restro_type = 'veg'
    }
    var data = search
     if (search) {
      setdata({...data, isLoading: true})
      const url = `${API_BASE}/restro/combinedSearchSortFilter`
      const payload = {
        searchKey: search,
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        is_sort: `${false}`,
        is_filter: `${false}`,
      }
      try {
        const res = await axios.post(url, payload)
        setdata({
          ...data,
          restroList: res?.data?.data?.restroNearMe,
        })
        setModal2(false)
        setModal(false)
        navigate('NearMe')
      } catch (error) {
        
      }
    } 
  }

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      onSearch()
      getDefaultRestro()
    })
  }, [])

  React.useEffect(() => {
    onSearch()
  }, [search])

  const getDefaultRestro = async () => {
    setdata({...data, isLoading: true})
    const url = `${API_BASE}/restro/combinedSearchSortFilter`
    const payload = {
      userid: user?._id,
      lat: 28.4922,
      lng: 77.0966,
      is_sort: `${false}`,
      is_filter: `${false}`,
    }
    try {
      const res = await axios.post(url, payload)
      setdata({
        ...data,
        restroList: res?.data?.data?.restroNearMe,
      })
      
      
      
    } catch (error) {
      
    }
  }

  useEffect( () => {
    dispatch(offercardRequest())
    dispatch(couponRequest())
    getDefaultRestro()

    
  }, [])

  const redirectToHomeMaker = (item) => {
    navigate('HomeMaker', {restroId: item?._id, restroDetails: item, restroData:data?.restroList })
  }

  const onFavorite = (item) => {
    const restro = [...data?.restroList]
    const index = restro.findIndex((i) => i?._id === item?._id)
    restro[index] = {...restro[index], is_favourited: !item?.is_favourited}
    setdata({...data, restroList: restro})
    const payload = {
      userid: user?._id,
      restro_id: item?._id,
      is_favourited_restro: !item?.is_favourited,
    }
    dispatch(addfavouriteRequest(payload))
  }

  const onReset = async () => {
    const url = `${API_BASE}/restro/combinedSearchSortFilter`
    const payload = {
      userid: user?._id,
      lat: 28.4922,
      lng: 77.0966,
    }

    try {
      const res = await axios.post(url, payload)
      setdata({
        ...data,
        restroList: res?.data?.data?.restroNearMe,
      })
      setValue(0)
      setValue1(0)
      setActiveTab(0)
      setIsEnabled(false)
      navigate('NearMe')
      setModal2(false)
      setModal(false)
    } catch (error) {
      
    }
  }

 

  const onFilter = async () => {
    var restro_type = ''
    if (!isEnabled) {
      restro_type = 'veg_and_non_veg'
    } else {
      restro_type = 'veg'
    }
    if (value && value1) {
      setdata({...data, isLoading: true})
      var payload = {}
      const url = `${API_BASE}/restro/combinedSearchSortFilter`
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        distance: value1.toFixed(1)+'',
        rating_from_user: value.toFixed(1) + '',
        is_sort: `${false}`,
        is_filter: `${true}`,
        restaurent_type: restro_type,
      }
       try {
        const res = await axios.post(url, payload)
        setdata({
          ...data,
          restroList: res?.data?.data?.restroNearMe,
        })
        setModal2(false)
        setModal(false)
        navigate('NearMe')
      } catch (error) {
        
      }
    }  
   else if (value1) {
      setdata({...data, isLoading: true})
      var payload = {}
      const url = `${API_BASE}/restro/combinedSearchSortFilter`
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        distance: value1.toFixed(1)+'',
        rating_from_user: undefined,
        is_sort: `${false}`,
        is_filter: `${true}`,
        restaurent_type: restro_type,
      }
    
       try {
        const res = await axios.post(url, payload)
        setdata({
          ...data,
          restroList: res?.data?.data?.restroNearMe,
        })
        setModal2(false)
        setModal(false)
        navigate('NearMe')
      } catch (error) {
        
      }
    }  

    else if (value) {
      setdata({...data, isLoading: true})
      var payload = {}
      const url = `${API_BASE}/restro/combinedSearchSortFilter`
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        distance: undefined,
        rating_from_user: value.toFixed(1) + '',
        is_sort: `${false}`,
        is_filter: `${true}`,
        restaurent_type: restro_type,
      }
      
      try {
        const res = await axios.post(url, payload)
        setdata({
          ...data,
          restroList: res?.data?.data?.restroNearMe,
          restroType: res?.data?.data?.restroNearMe?.categoryNameArray
        })
        setModal2(false)
        setModal(false)
        navigate('NearMe')
      } catch (error) {
        
      }
    }else if (isEnabled){
      const isEnabled = 'veg'
      setdata({...data, isLoading: true})
      var payload = {}
      const url = `${API_BASE}/restro/combinedSearchSortFilter`
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        distance: undefined,
        rating_from_user: undefined,
        is_sort: `${false}`,
        is_filter: `${true}`,
        restaurent_type: 'veg',
      }
      
      try {
        const res = await axios.post(url, payload)
        setdata({
          ...data,
          restroList: res?.data?.data?.restroNearMe,
          restroType: res?.data?.data?.restroNearMe?.categoryNameArray
        })
        setModal2(false)
        setModal(false)
        navigate('NearMe')
      } catch (error) {
        
      }
      
    }
    else {
      const isEnabled = 'veg_and_non_veg'
      
      setdata({...data, isLoading: true})
      var payload = {}
      const url = `${API_BASE}/restro/combinedSearchSortFilter`
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        distance: undefined,
        rating_from_user: undefined,
        is_sort: `${false}`,
        is_filter: `${true}`,
        restaurent_type: 'veg_and_non_veg',
      }
      
      try {
        const res = await axios.post(url, payload)
        setdata({
          ...data,
          restroList: res?.data?.data?.restroNearMe,
          restroType: res?.data?.data?.restroNearMe?.categoryNameArray
        })

        setModal2(false)
        setModal(false)
        navigate('NearMe')
      } catch (error) {
        
      }
      
    }
  }


  const onSortBy = async () => {

    setdata({...data, isLoading: true})
    const url = `${API_BASE}/restro/combinedSearchSortFilter`
    var payload = {}
    if (activeTab == 0) {
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        relevance: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    } else if (activeTab == 1) {
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        rating_high_to_low: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    } else if (activeTab == 2) {
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        rating_low_to_high: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    } else if (activeTab == 3) {
      payload = {
        userid: user?._id,
        lat: 28.4922,
        lng: 77.0966,
        delivery_time: true,
        is_sort: `${true}`,
        is_filter: `${false}`,
      }
    }
    try {
      const res = await axios.post(url, payload)
      setdata({
        ...data,
        restroList: res?.data?.data?.restroNearMe,
      })
      setModal2(false)
      setModal(false)
      navigate('NearMe')
    } catch (error) {
      console('Error', error)
    }
  }

  
  
 

  const renderItems = ({item}) => {
    return (
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
                  paddingHorizontal: Scale(4),
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
               
                <StarRating
                  disabled={true}
                  maxStars={item?.rating_from_user}
                  starSize= {20}
                  starStyle={{marginHorizontal:Scale(5)}}
                  rating={starCount}
                  halfStarColor={'#FBFBFB'}
                  fullStarColor	={'#FFBE33'}
                  emptyStarColor={'#FBFBFB'}
                  selectedStar={(rating) => setStarCount(rating)}
                />
               

                <View style={{justifyContent: 'flex-end', flex: 1}}>
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'right',
                      fontSize: Scale(16),
                     
                    }}>
                    {item?.distance} Km
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
              <Text
                numberOfLines={1}
                style={{fontSize: Scale(15), fontWeight: 'bold', width: '40%'}}>
                {item?.restro_name}
              </Text>
              <Text
                style={{
                  color: '#AB8F8E',
                  fontSize: Scale(12),
                  fontWeight: 'normal',
                  marginRight: Scale(25),
                }}>
                {' '}
                ({item?.opening_time} - {item?.closing_time})
              </Text>

              <TouchableOpacity onPress={() => onFavorite(item)}>
              <View style={{height:Scale(50/2),width:Scale(50/2),
                borderRadius:Scale(30)/ PixelRatio.get(),
                alignItems:'center'
                 }}>
                <Icon
                  name="heart"
                  type="FontAwesome"
                  style={{
                    color: item?.is_favourited ? Colors.DARK_RED : '#AB8F8E',
                    marginTop:Scale(6),
                    fontSize: Scale(16),
                  }}
                />
                </View>
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
                {item?.categoryNameArray?.reduce((a,b) => {
                    a += `${b}, `
                return a
                }, '').slice(0, -2)}
              </Text>
            </View>
          </View>
         
        </TouchableOpacity>
      </View>
    )
  }
  const renderItem = ({item, index}) => (
    <View
      style={{
        width: Scale(310),
        height: Scale(150),
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#E0E0E0',
        marginVertical: Scale(15),
        marginHorizontal: Scale(10),
        alignSelf: 'center',
        borderRadius: Scale(10),
      }}>
      <ImageBackground
        source={{uri: item.image}}
        style={[styles.backgroundStyle, {borderRadius: Scale(10)}]}>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <View
            style={{
              paddingBottom: Scale(10),
              alignItems: 'flex-start',
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
              ${item?.price}
            </Text>
            <Text
              style={{
                textShadowColor: 'rgb(255,255,255)',
                textShadowOffset: {width: 0.1, height: 0.1},
                textShadowRadius: 5,
                fontSize: Scale(18),
                color: Colors.WHITE,
                marginLeft: Scale(7),
                paddingVertical: Scale(5),
              }}>
              {item?.baneer_title}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
  const renderItem1 = ({item, index}) => (
    <View
      style={{
        width: Scale(185),
        height: Scale(55),
        marginVertical: Scale(15),
        alignSelf: 'center',
      }}>
      <TouchableOpacity
        onPress={() =>
          navigate('Coupon', {couponId: item?._id, couponDetails: item})
        }>
        <ImageBackground
          source={ImagesPath.coupon}
          style={{
            width: '95%',
            height: Scale(55),
            resizeMode: 'cover',
            borderTopLeftRadius: Scale(30),
            borderTopRightRadius: Scale(30),
          }}>
          <View
            style={{
              paddingBottom: Scale(10),
              alignItems: 'flex-start',
              paddingHorizontal: Scale(10),
            }}>
            <Text
              style={{
                fontSize: Scale(15),
                color: 'grey',
                fontWeight: 'bold',
                paddingTop: Scale(5),
                maxWidth: '95%',
              }}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {item?.title}
            </Text>
            <Text
              style={{
                fontSize: Scale(14),
                color: Colors.WHITE,
                marginTop: Scale(3),
                fontWeight: 'bold',
              }}>
              {item?.coupon_discount_in_percentage}% OFF{' '}
              <Text
                style={{
                  fontSize: Scale(12),
                  color: 'grey',
                  marginLeft: Scale(30),
                }}>
                {' '}
                All Items
              </Text>
            </Text>
          </View>
         
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        inputStyle={{fontSize: Scale(12), marginLeft: Scale(-15)}}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />

      <View
        style={{
          paddingVertical: Scale(12),
          paddingHorizontal: Scale(20),
          alignItems: 'center',
          backgroundColor: Colors.APPCOLOR,
        }}>
        <Searchbar
          style={styles.searchView}
          onIconPress={clearImmediate}
          inputStyle={{fontSize: Scale(14), marginLeft: Scale(-15),
          paddingVertical:Scale(10),}}
          placeholder="Search restaurant, dishes(food)..."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
      </View>
      <ScrollView>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{
            marginHorizontal: Scale(10),
            paddingHorizontal: Scale(10),
          }}
          data={couponResponse?.data}
          keyExtractor={(item, i) => `${i}`}
          renderItem={renderItem1}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{marginHorizontal: Scale(12)}}
          data={offercard}
          renderItem={renderItem}
        />
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={() => setModal(true)}>
            <Text style={styles.normalText}>Sort By</Text>
            <Image source={ImagesPath.up} style={styles.UP} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={() => setModal2(true)}>
            <Text style={styles.normalText}>Filters</Text>
            <Image source={ImagesPath.filter} style={styles.Filter} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data?.restroList}
          renderItem={renderItems}
          keyExtractor={(item, i) => `${i}`}
          ListEmptyComponent={() => {
            return (
              <View>
                  {
                    search?
                    <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      marginTop: Scale(50),
                      marginHorizontal: 50,
                    }}>
                      
                    This restaurant is not available
                   </Text>:<Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      marginTop:Scale(50),
                      marginHorizontal: 50,
                    }}>
                      
                    Sorry, online ordering isn't available at your location
                   </Text>
                  }
                  
                </View>
            )
          }}
        />
       
      </ScrollView>

      <Modal visible={modal} animationType="slide">
        <View style={styles.modalHeader}>
          <Icon
            onPress={() => setModal(false)}
            name="arrowleft"
            type="AntDesign"
            style={styles.logoStyle}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerText1}>SortBy</Text>
        </View>

        <ImageBackground
          source={ImagesPath.background}
          style={styles.loginInputCont}>
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
                <CustomButton title="Reset All" onSubmit={onReset} />
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
        <View style={styles.headerContainer}>
          <Icon
            onPress={() => setModal2(false)}
            name="arrowleft"
            type="AntDesign"
            style={styles.logoStyle}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerText1}>Filters </Text>
        </View>
        <ImageBackground
          source={ImagesPath.background}
          style={styles.loginInputCont}>
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
                  true: Colors.GREEN,
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
                <CustomButton title="Reset All" onSubmit={onReset} />
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
    </View>
  )
}

const mapStateToProps = ({Auth: {user}}) => {
  return {
    user,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NearMe)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchView: {
    borderRadius: 10,
    height: 50,
    borderColor: Colors.GRAY_LINES,
    borderWidth: 0,
    width: '100%',
    marginHorizontal:Scale(-5),
    fontSize: 12,
    marginTop: -12,
    backgroundColor: Colors.WHITE,
  },
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
    paddingHorizontal: Scale(30),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  UP: {
    height: Scale(25),
    width: Scale(25),
  },
  Filter: {
    height: Scale(25),
    width: Scale(25),
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
    fontSize: Scale(14),
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
    color: '#FFBB00',
    fontSize: Scale(15),
    marginLeft: Scale(8),
  },
  modalHeader: {
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
  textStyle: {
    color: Colors.BORDERCOLOR,
    fontSize: Scale(14),
    marginTop: Scale(10),
  },
  inputStyle: {
    color: Colors.BLACK,
    fontSize: Scale(16),
    marginBottom: Scale(15),
    fontWeight: 'bold',
  },
  notificationStyle: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
    alignSelf: 'flex-end',
  },
  headerContainer: {
    paddingTop: Scale(20),
    height: Scale(80),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.APPCOLOR,
    paddingHorizontal: Scale(25),
  },
})
