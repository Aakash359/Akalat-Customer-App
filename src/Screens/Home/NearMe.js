import React, { useState, useEffect } from 'react'
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
import { Icon } from 'native-base'
import { Colors, Scale, ImagesPath } from '../../CommonConfig'
import { Searchbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch, connect } from 'react-redux'
import { offercardRequest, restroListRequest, addfavouriteRequest } from '../../redux/actions'
import { API_BASE } from '../../apiServices/ApiService'
import axios from 'axios'

function NearMe(props) {

    const { navigate } = useNavigation()
    const navigation = useNavigation()
    const offercardResponse = useSelector(
        (state) => state.Home.offercardResponse
    )
    const  user = useSelector((state) => state.Auth.user);
    const [offercard, setofferCard] = React.useState(
        offercardResponse?.data || []
    )
   const [data, setdata] = React.useState({
        restroList: [],
        isLoading: true,
    })
    
    const [search, setSearch] = React.useState('')

    const onSearch = async () => {
        setdata({ ...data, isLoading: true })
        const url = `${API_BASE}/restro/search`
        const payload = {
            searchKey: search,
        }
        try {
            const res = await axios.post(url, payload)
            console.log("Data",res)
            setdata({
                ...data,
                restroList: res?.data?.data?.restro,
                isLoading: false,
            })
            
           
        } catch (error) {
            
        }
    }
    React.useEffect(() => {
        onSearch()
    }, [])

    React.useEffect(() => {
        onSearch()
    }, [search])

    const redirectToHomeMaker = (item) => {
        navigate('HomeMaker', { restroId: item?._id, restroDetails: item })
    }

    const onFavorite = (item) => {
      
           const data = { 
            'userid'  : user?._id,
            'restro_id' : item?._id,
            'is_favourited_restro':true
             
         }
      
         dispatch(addfavouriteRequest(data));
         alert("Added to favourite list succesfully")
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

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(offercardRequest())
            dispatch(restroListRequest())
        }, 1000)
    }, [])
///Aakasgjdjdjhjkhj
    const renderItems = ({ item, is_favourited_restro }) => (
     
       
        <View style={styles.cardStyle}>
            <TouchableOpacity onPress={() => redirectToHomeMaker(item)}>
                <ImageBackground
                    source={{ uri: item?.image }}
                    style={styles.backgroundStyle}
                >
                    <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingBottom: Scale(10),
                                alignItems: 'center',
                                paddingHorizontal: Scale(10),
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: Scale(12),
                                    color: Colors.WHITE,
                                    marginLeft: Scale(7),
                                    paddingHorizontal: Scale(7),
                                    paddingVertical: Scale(5),
                                    backgroundColor: 'green',
                                }}
                            >
                              {item?.rating_from_user}
                            </Text>

                            <Icon
                                name="star"
                                type="FontAwesome"
                                style={styles.iconStyle}
                            />
                            <Icon
                                name="star"
                                type="FontAwesome"
                                style={styles.iconStyle}
                            />
                            <Icon
                                name="star"
                                type="FontAwesome"
                                style={styles.iconStyle}
                            />
                            <Icon
                                name="star"
                                type="FontAwesome"
                                style={styles.iconStyle}
                            />
                            <Icon
                                name="star"
                                type="FontAwesome"
                                style={[
                                    styles.iconStyle,
                                    { color: Colors.WHITE },
                                ]}
                            />

                            <View
                                style={{ justifyContent: 'flex-end', flex: 1 }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        textAlign: 'right',
                                        fontSize: Scale(16),
                                    }}
                                >
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
                        }}
                    >
                        <Text
                        numberOfLines={1}
                            style={{ fontSize: Scale(15), fontWeight: 'bold',width:'40%', }}
                        >
                            {item?.restro_name}
                        </Text>
                        <Text
                            style={{
                                color: '#AB8F8E',
                                fontSize: Scale(12),
                                fontWeight: 'normal',
                                marginRight: Scale(25),
                            }}
                        >
                            {' '}
                            (11:00 am - 10:00 pm)
                        </Text>
                          {
                            is_favourited_restro!=true? 
                            <TouchableOpacity  onPress = {()=>onFavorite(item)} >
                            <Icon
                            name="heart"
                            type="FontAwesome"
                            style={{
                                color: '#AB8F8E',
                                fontSize: Scale(16),
                                
                            }}
                          />
                          
                        </TouchableOpacity>: <TouchableOpacity  onPress = {()=>onFavorite(item)} >
                            <Icon
                            name="heart"
                            type="FontAwesome"
                            style={{
                                color: Colors.DARK_RED,
                                fontSize: Scale(16),
                                
                            }}
                          />
                          
                        </TouchableOpacity>
                        }
                       

                       
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            flex: 1,
                            marginTop: 5,
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: Scale(12.5),
                                fontWeight: 'normal',
                                paddingBottom: 20,
                                paddingLeft: 12,
                            }}
                        >
                            {item?.street_name}, {item?.area_name},{' '}
                            {item?.region}, {item?.state}...
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
    const renderItem = ({ item, index }) => (
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
            }}
        >
            <ImageBackground
                source={{ uri: item.image }}
                style={[styles.backgroundStyle, { borderRadius: Scale(10) }]}
            >
                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <View
                        style={{
                            paddingBottom: Scale(10),
                            alignItems: 'flex-start',
                            paddingHorizontal: Scale(10),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: Scale(12),
                                color: Colors.WHITE,
                                marginLeft: Scale(7),
                                paddingHorizontal: Scale(7),
                                paddingVertical: Scale(5),
                                backgroundColor: 'green',
                            }}
                        >
                            Price
                        </Text>
                        <Text
                            style={{
                                textShadowColor: 'rgb(255,255,255)',
                                textShadowOffset: { width: 0.1, height: 0.1 },
                                textShadowRadius: 5,
                                fontSize: Scale(18),
                                color: Colors.WHITE,
                                marginLeft: Scale(7),
                                paddingVertical: Scale(5),
                            }}
                        >
                            Spicy Mozzorella{'\n'}Italian Pizza
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
    const renderItem1 = ({ item, index }) => (
        <View
            style={{
                width: Scale(170),
                height: Scale(55),
                marginVertical: Scale(15),
                alignSelf: 'center',
            }}
        >
            <TouchableOpacity onPress={() => navigate('Coupon')}>
                <ImageBackground
                    source={ImagesPath.coupon}
                    style={{
                        width: '95%',
                        height: Scale(55),
                        resizeMode: 'cover',
                        borderTopLeftRadius: Scale(30),
                        borderTopRightRadius: Scale(30),
                    }}
                >
                    <View
                        style={{
                            paddingBottom: Scale(10),
                            alignItems: 'flex-start',
                            paddingHorizontal: Scale(10),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: Scale(12),
                                color: 'grey',
                                fontWeight: 'bold',
                                paddingTop: Scale(5),
                            }}
                        >
                            COUPON
                        </Text>
                        <Text
                            style={{
                                fontSize: Scale(14),
                                color: Colors.WHITE,
                                marginTop: Scale(3),
                                fontWeight: 'bold',
                            }}
                        >
                            40% OFF{' '}
                            <Text
                                style={{
                                    fontSize: Scale(12),
                                    color: 'grey',
                                    marginLeft: Scale(30),
                                }}
                            >
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
                inputStyle={{ fontSize: Scale(12), marginLeft: Scale(-15) }}
                backgroundColor={Colors.APPCOLOR}
                barStyle="light-content"
            />

            <View
                style={{
                    paddingVertical: Scale(12),
                    paddingHorizontal: Scale(20),
                    alignItems: 'center',
                    backgroundColor: Colors.APPCOLOR,
                }}
            >
                <Searchbar
                    style={styles.searchView}
                    onIconPress={clearImmediate}
                    inputStyle={{ fontSize: Scale(14), marginLeft: Scale(-15) }}
                    placeholder="Search restaurant, dishes(or food) here..."
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
                    data={[0, 1, 2, 3, 4]}
                    renderItem={renderItem1}
                />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={{ marginHorizontal: Scale(12) }}
                    data={offercard}
                    renderItem={renderItem}
                />
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={styles.leftContainer}
                        onPress={redirectToSortBy}
                    >
                        <Text style={styles.normalText}>Sort By</Text>
                        <Image source={ImagesPath.up} style={styles.UP} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.leftContainer}
                        onPress={redirectToFilter}
                    >
                        <Text style={styles.normalText}>Filters</Text>
                        <Image
                            source={ImagesPath.filter}
                            style={styles.Filter}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={data?.restroList}
                    renderItem={renderItems}
                    keyExtractor={(item, i) => `${i}`}
                    ListEmptyComponent={() => {
                        return <Text>No data found</Text>
                    }}
                />
            </ScrollView>
        </View>
    )
}

const mapStateToProps = ({ Auth: { user } }) => {
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
        fontSize: 12,
        marginTop: -12,
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
        color: '#FFBB00',
        fontSize: Scale(15),
        marginLeft: Scale(8),
    },
})
