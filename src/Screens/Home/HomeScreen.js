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
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {useNavigation} from '@react-navigation/native'
import {useSelector, useDispatch, connect} from 'react-redux'
import {LoadWheel} from '../../CommonConfig/LoadWheel'
import StarRating from 'react-native-star-rating';
import axios from 'axios'
import {addfavouriteRequest} from '../../redux/actions'

function HomeScreen(props) {
  const user = useSelector((state) => state.Auth.user)
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const [starCount, setStarCount] = useState(5)
  const addFavouriteStatus = useSelector(
    (state) => state.Home.addFavouriteStatus,
  )

  const redirectToNotification = () => {
    navigate('Notification')
  }
  const {viewallData} = props.route.params

  const dispatch = useDispatch()

  const restroResponse = useSelector((state) => state.Home.restroResponse)

  const [restroItems, setrestroItems] = React.useState(
    restroResponse?.data || [],
  )
  const [cartList, setcartList] = useState([])

  const [data, setdata] = React.useState({
    restroList: [],
    isLoading: true,
    resetStatus: false,
  })

  const redirectToHomeMaker = (item) => {
    navigate('HomeMaker', {restroId: item?._id, restroDetails: item})
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
  const onBack = (res) => {
    setdata({
      ...data,
      restroList: res.restro,
    })
  }

  const renderItems = ({item, is_favourited_restro}) => (
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
              <StarRating
                  disabled={false}
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
            style={{fontSize: Scale(15), fontWeight: 'bold'}}>
            {item?.restro_name}
          </Text>
          <Text
            style={{
              color: '#AB8F8E',
              fontSize: Scale(12),
              fontWeight: 'normal',
            }}>
            {' '}
            ({item?.opening_time} - {item?.closing_time})
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
      </TouchableOpacity>
    </View>
  )

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
      <Text style={styles.headerText}>View All</Text>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <FlatList
          data={viewallData}
          renderItem={renderItems}
          keyExtractor={(item, i) => `${i}`}
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  marginTop: 200,
                  marginHorizontal: 50,
                }}>
                Sorry, online ordering isn't available at your location
              </Text>
            )
          }}
        />
        {/* <LoadWheel visible={viewallData.isLoading} /> */}
      </ImageBackground>
    </View>
  )
}

const mapStateToProps = ({Auth: {user}}) => {
  return {
    user,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
  },
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  logoStyle: {
    marginTop: Scale(15),
    fontSize: Scale(25),
    color: Colors.WHITE,
  },

  backgroundStyle: {
    width: '100%',
    height: Scale(150),
    resizeMode: 'stretch',
    borderTopLeftRadius: Scale(10),
    borderTopRightRadius: Scale(10),
    overflow: 'hidden',
  },
  headerText: {
    fontSize: Scale(20),
    marginHorizontal: Scale(25),
    marginBottom: Scale(25),
    color: Colors.WHITE,
    fontWeight: 'bold',
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
    paddingTop: Scale(20),
    height: Scale(80),
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
  UP: {
    height: Scale(25),
    width: Scale(25),
  },
  Filter: {
    height: Scale(25),
    width: Scale(25),
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
})
