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
import {useSelector, useDispatch} from 'react-redux'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {Searchbar} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import {API_BASE} from '../../apiServices/ApiService'
import {addfavouriteRequest} from '../../redux/actions'
import {LoadWheel} from '../../CommonConfig/LoadWheel'
import axios from 'axios'

function Explore() {
  const [check, setChecked] = useState(false)
  const [search, setSearch] = React.useState('')
  const user = useSelector((state) => state.Auth.user)
  const addFavouriteStatus = useSelector(
    (state) => state.Home.addFavouriteStatus,
  )
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [data, setdata] = React.useState({
    restroList: [],
    isLoading: true,
  })
  const redirectTocheck = async () => {
    setChecked(!check)
    let Datatype = ''
    if (check == true) {
      Datatype = 'restaurant'
    } else {
      Datatype = 'Dishes'
    }

    setdata({...data, isLoading: true})
    const url = `${API_BASE}/restro/search`

    const payload = {
      searchKey: search,
      type: Datatype,
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
  const redirectToHomeMaker = (item) => {
    navigate('HomeMaker', {restroId: item?._id, restroDetails: item})
  }
  const redirectToRating = (item) => {
    navigate('Rating')
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

  const renderItems = ({item}) => (
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
      <View
        style={{
          paddingBottom: Scale(10),
          paddingHorizontal: Scale(20),
          alignItems: 'center',
          backgroundColor: Colors.APPCOLOR,
        }}>
        <Searchbar
          style={styles.searchView}
          onIconPress={clearImmediate}
          onChangeText={(text) => setSearch(text)}
          value={search}
          inputStyle={{fontSize: Scale(14), marginLeft: Scale(-15)}}
          placeholder="Search here..."
        />
      </View>
      <View style={styles.filterContainer}>
        <View style={check ? styles.leftContainer : styles.leftContainer1}>
          <TouchableOpacity onPress={redirectTocheck}>
            <Text style={check ? styles.normalText : styles.normalText1}>
              Restaurant
            </Text>
          </TouchableOpacity>
        </View>
        <View style={check ? styles.leftContainer1 : styles.leftContainer}>
          <TouchableOpacity onPress={redirectTocheck}>
            <Text style={check ? styles.normalText1 : styles.normalText}>
              Dishes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <ScrollView style={{marginBottom: Scale(10)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: Scale(25),
              paddingTop: Scale(10),
            }}>
            <Text
              style={{
                color: '#AB8F8E',
                fontSize: Scale(16),
                fontWeight: '700',
              }}>
              Near By
            </Text>
            <TouchableOpacity onPress={redirectToRating}>
              <Text style={{color: Colors.DARK_RED, fontSize: Scale(16)}}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data?.restroList}
            renderItem={renderItems}
            keyExtractor={(item, i) => `${i}`}
            ListEmptyComponent={() => {
              return <Text style={{textAlign: 'center'}}>No data found</Text>
            }}
          />
          {/* <LoadWheel visible={data.isLoading} /> */}
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default Explore
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
    paddingTop: Scale(20),
  },
  loginInputCont: {
    top: Scale(-20),
    paddingTop: Scale(10),
    paddingBottom: Scale(50),
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
    marginTop: -12,
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
  normalText: {
    fontSize: Scale(12),
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  normalText1: {
    fontSize: Scale(12),
    color: Colors.APPCOLOR,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: Scale(50),
    backgroundColor: Colors.APPCOLOR,
    width: '100%',
    alignSelf: 'center',
  },
  leftContainer: {
    borderRadius: Scale(30),
    marginLeft: Scale(20),
    borderColor: 'grey',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.WHITE,
    height: Scale(45),
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer1: {
    borderRadius: Scale(30),
    backgroundColor: Colors.WHITE,
    marginLeft: Scale(18),
    borderColor: 'grey',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.WHITE,
    height: Scale(45),
    width: '30%',
    justifyContent: 'center',
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
    height: Scale(230),

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
