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
import {Searchbar} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import {useSelector, useDispatch, connect} from 'react-redux'
import {LoadWheel} from '../../CommonConfig/LoadWheel'
import {API_BASE} from '../../apiServices/ApiService'
import axios from 'axios'

function HomeScreen(props) {
  const user = useSelector((state) => state.Auth.user)
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const addFavouriteStatus = useSelector(
    (state) => state.Home.addFavouriteStatus,
  )

  const redirectToNotification = () => {
    navigate('Notification')
  }

  const dispatch = useDispatch()

  const restroResponse = useSelector((state) => state.Home.restroResponse)

  const [restroItems, setrestroItems] = React.useState(
    restroResponse?.data || [],
  )
  const [cartList, setcartList] = useState([])

  const [data, setdata] = React.useState({
    restroList: [],
    isLoading: true,
  })

  const [search, setSearch] = React.useState('')

  const onSearch = async () => {
    setdata({...data, isLoading: true})
    const url = `${API_BASE}/restro/search`
    const payload = {
      searchKey: search,
    }
    try {
      const res = await axios.post(url, payload)
      setdata({
        ...data,
        restroList: res?.data?.data?.restro,
        isLoading: false,
      })
    } catch (error) {}
  }
  React.useEffect(() => {
    onSearch()
  }, [])

  React.useEffect(() => {
    onSearch()
  }, [search])

  const redirectToHomeMaker = (item) => {
    navigate('HomeMaker', {restroId: item?._id, restroDetails: item})
  }

  const onFavorite = (item) => {
    const data = {
      userid: user?._id,
      restro_id: item?._id,
      is_favourited_restro: true,
    }

    dispatch(addfavouriteRequest(data))
    alert('Added to favourite list succesfully')
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
                  paddingHorizontal: Scale(7),
                  paddingVertical: Scale(5),
                  backgroundColor: 'green',
                }}>
                {item?.rating_from_user}
              </Text>
              <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
              <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
              <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
              <Icon name="star" type="FontAwesome" style={styles.iconStyle} />
              <Icon
                name="star"
                type="FontAwesome"
                style={[styles.iconStyle, {color: Colors.WHITE}]}
              />
              <View style={{justifyContent: 'flex-end', flex: 1}}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'right',
                    fontSize: Scale(16),
                  }}>
                  1.5 km
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
            (11:00 am - 10:00 pm)
          </Text>
          {addFavouriteStatus == true ? (
            <TouchableOpacity onPress={() => onFavorite(item)}>
              <Icon
                name="heart"
                type="FontAwesome"
                style={{
                  color: Colors.DARK_RED,
                  fontSize: Scale(16),
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onFavorite(item)}>
              <Icon
                name="heart"
                type="FontAwesome"
                style={{
                  color: '#AB8F8E',
                  fontSize: Scale(16),
                }}
              />
            </TouchableOpacity>
          )}
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

      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <FlatList
          data={data?.restroList}
          renderItem={renderItems}
          keyExtractor={(item, i) => `${i}`}
          ListEmptyComponent={() => {
            return <Text style={{textAlign: 'center'}}>No data found</Text>
          }}
        />
        <LoadWheel visible={data?.isLoading} />
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
  },
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },

  backgroundStyle: {
    width: '100%',
    height: Scale(150),
    resizeMode: 'stretch',
    borderTopLeftRadius: Scale(10),
    borderTopRightRadius: Scale(10),
    overflow: 'hidden',
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
