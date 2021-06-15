import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    FlatList,
    ImageBackground,
} from 'react-native'
import { Icon } from 'native-base'
import { Colors, Scale, ImagesPath } from '../../CommonConfig'
import { useNavigation } from '@react-navigation/native'
import { myOrderListRequest } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { connect } from 'react-redux'
import { API_BASE } from '../../apiServices/ApiService'

function MyOrders(props) {
    const [checked, setChecked] = useState(false)
    const { navigate } = useNavigation()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const myOrderListResponse = useSelector(
        (state) => state.Setting.myOrderListResponse
    )
    const [orderList, setOrderList] = React.useState(
        myOrderListResponse?.data || []
    )
    const [orderDetail, setOrderDetail] = React.useState({
        orderDetailList: [],
        isLoading: true,
    })

    const onOrderDetails = async () => {
        setOrderDetail({ ...orderDetail, isLoading: true })
        const url = `${API_BASE}/order/orderDetail`
        const payload = {
            _id: props?.user?._id,
        }
        try {
            const res = await axios.post(url, payload)
            console.log(' Order Details data ', res)
            setCreateOrder({
                ...orderDetail,
                setOrderDetail: res?.data?.data,
                isLoading: false,
            })
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        onOrderDetails()
    }, [])

    const redirectToEditProfile = () => {
        navigate('EditProfile')
    }
    const onPressChecked = () => {
        setChecked(!checked)
    }

    console.log('Aakash====>', orderList)

    useEffect(() => {
        const data = {
            userid: '5fab6d5a0414c7042f745caa',
        }

        setTimeout(() => {
            dispatch(myOrderListRequest(data))
        }, 5000)
    }, [])
    const renderItemsActive = ({ item, index }) => (
        <View style={styles.cardStyle}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={ImagesPath.reset}
                    style={styles.backgroundStyle1}
                />
                <View>
                    <Text style={styles.primaryText}>Fire & Grill</Text>
                    <Text style={styles.normatText}>
                        Sector 29, Cyber hub{'\n'}Gurgoan
                    </Text>
                </View>
            </View>
            <View style={styles.borderStyle} />
            <Text style={[styles.seconderyText, { marginTop: Scale(-10) }]}>
                Items
            </Text>
            <Text style={styles.itemText}>1 x Jambo Burger</Text>
            <Text style={styles.itemText}>2 x Sahi Paneer</Text>
            <Text style={styles.seconderyText}>Ordered on</Text>
            <Text style={styles.itemText}>Apr 20. 8:10am</Text>
            <Text style={styles.seconderyText}>Total Amount</Text>
            <Text style={styles.itemText}>$ 37</Text>
            <View style={styles.heading}>
                <Text style={styles.cancelButton}>Cancel Order</Text>
                <Text
                    style={[
                        styles.cancelButton,
                        { backgroundColor: Colors.APPCOLOR },
                    ]}
                >
                    Track Order
                </Text>
            </View>
        </View>
    )
    const renderItemPast = ({ item, index }) => (
        <View style={styles.cardStyle}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={ImagesPath.reset}
                    style={styles.backgroundStyle1}
                />
                <View>
                    <Text style={styles.primaryText}>Fire & Grill</Text>
                    <Text style={styles.normatText}>
                        Sector 29, Cyber hub{'\n'}Gurgoan
                    </Text>
                </View>
            </View>
            <View style={styles.borderStyle} />
            <Text style={[styles.seconderyText, { marginTop: Scale(-10) }]}>
                Items
            </Text>
            <Text style={styles.itemText}>1 x Jambo Burger</Text>
            <Text style={styles.itemText}>2 x Sahi Paneer</Text>
            <Text style={styles.seconderyText}>Ordered on</Text>
            <Text style={styles.itemText}>Apr 20. 8:10am</Text>
            <Text style={styles.seconderyText}>Total Amount</Text>
            <Text style={styles.itemText}>$ 37</Text>
            <View style={styles.heading}>
                <Text
                    style={[
                        styles.cancelButton,
                        { backgroundColor: Colors.APPCOLOR },
                    ]}
                >
                    Re-Order
                </Text>
            </View>
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
                <Text style={styles.headerText}>My Orders </Text>
                <View style={styles.buttonContainer}>
                    <Text
                        onPress={onPressChecked}
                        style={
                            checked ? styles.inActiveStyle : styles.textStyle
                        }
                    >
                        Active
                    </Text>
                    <Text
                        onPress={onPressChecked}
                        style={
                            checked ? styles.textStyle : styles.inActiveStyle
                        }
                    >
                        Past
                    </Text>
                </View>
            </View>
            <ImageBackground
                source={ImagesPath.background}
                style={styles.loginInputCont}
            >
                <FlatList
                    style={{ paddingHorizontal: Scale(20) }}
                    data={orderDetail.orderDetailList}
                    renderItem={checked ? renderItemPast : renderItemsActive}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => {
                        return (
                            <Text style={{ alignSelf: 'center' }}>
                                You don't have any orders
                            </Text>
                        )
                    }}
                />
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = ({ Auth: { user } }) => {
    return {
        user,
    }
}

const mapDispatchToProps = {}

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
        width: Scale(100),
        height: Scale(40),
        textAlignVertical: 'center',
        textAlign: 'center',
        color: Colors.APPCOLOR,
        fontSize: Scale(15),
        fontWeight: 'bold',
    },
    inActiveStyle: {
        width: Scale(100),
        height: Scale(40),
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
