import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, FlatList, StatusBar, ScrollView, Image, ImageBackground } from 'react-native';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import {useNavigation} from '@react-navigation/native'
import {useSelector, useDispatch,connect} from 'react-redux'
import {hungryNowListRequest,hungryNowListLoader} from '../../redux/actions'
import { addToCart, subToCart } from '../../redux/actions/CartActions';



function HungryNow(props) {

    const hungryNowListResponse = useSelector((state) => state.Home.hungryNowListResponse)
    const dispatch = useDispatch()
    const product_list = hungryNowListResponse?.data?.product_list || []
    
    
    useEffect(() => {
    
        dispatch(hungryNowListRequest())
     
      }, [])

      const addToCart = (item) => {
        const {cartRestroDetails, addToCart} = props
        const {restroDetails = {}} = props.route?.params || {}
        if(cartRestroDetails && cartRestroDetails?._id !== restroDetails?._id ) {
          return Alert.alert('You have another other in your cart')
        }
        else {
            addToCart({restroDetails, product: item})
        }
      } 
      const increment = () => {
        if (addItem > 8)
        {
          SetAddItem( addItem);
        }
        else{SetAddItem(addItem + 1);}
        
      };  
      const {cartProducts} = props
      const totalCartAmt =  cartProducts?.reduce((sum, i) => sum += i?.final_price * i?.qty || i?.price || i?.qty, 0)
      const renderItems = ({ item, index }) => (
          
        <View style={styles.cardStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: Scale(10) }}>
                <Text style={styles.headingText}>{item.restro_name}</Text>
                <Text style={styles.headingText}>1.5 km</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Image source={ImagesPath.reset} style={styles.backgroundStyle} />
                <View >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: item?.image }}/>
                        <Text style={{ color: Colors.BLACK, fontSize: Scale(18), fontWeight: 'normal' }}>  {item.name}</Text>
                    </View>
                    <Text style={{ color: 'grey', fontSize: Scale(16), fontWeight: 'normal' }}>{item.description}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: Scale(10), alignItems: 'center',  justifyContent: 'space-between' }}>
                <Text style={styles.headingText}>$ {item.price}<Text style={{ color: 'grey', fontSize: Scale(14), fontWeight: 'normal',textDecorationLine:'line-through', }}>$100.00</Text>
                </Text>
                <View style={styles.addButton}>
                <Text style={[styles.textStyle,{color:Colors.APPCOLOR}]}>Add</Text>
              </View></View>
              <Text style={{ marginRight:Scale(7),color: 'grey', fontSize: Scale(16), fontWeight: 'normal',textAlign:'right' }}>Available Quantity: {item.qty}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',height:Scale(2), marginVertical:Scale(15) ,backgroundColor:"#E0E0E0"}}>
                
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Image source={ImagesPath.reset} style={styles.backgroundStyle} />
                <View >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image  source={{ uri: item?.image }}/>
                         <Text style={{ color: Colors.BLACK, fontSize: Scale(18), fontWeight: 'normal' }}> Chichen Tikka</Text>
                    </View>
                    <Text style={{ color: 'grey', fontSize: Scale(16), fontWeight: 'normal' }} >{item.description}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: Scale(10), alignItems: 'center',  justifyContent: 'space-between' }}>
                <Text style={styles.headingText}>$ {item.price}<Text style={{ color: 'grey', fontSize: Scale(14), fontWeight: 'normal', textDecorationLine:'line-through', }}>$100.00</Text>
                </Text>
                <View style={styles.addButton}>
                <Text style={[styles.textStyle,{color:Colors.APPCOLOR}]}>Add</Text>
              </View></View>
              <Text style={{ marginRight:Scale(7),color: 'grey', fontSize: Scale(16), fontWeight: 'normal',textAlign:'right' }}>Available Quantity: {item.qty}</Text>
       
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar
                translucent={true}
                backgroundColor={Colors.APPCOLOR}
                barStyle="light-content"
            />
            
                <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
                    <FlatList
                        data={product_list}
                        renderItem={renderItems}
                    />
                </ImageBackground>
           
        </View>
    );
}

const mapStateToProps = ({Cart: {restroDetails, products}}) => {
    return {
    cartRestroDetails: restroDetails,
    cartProducts: products
    }
}

const mapDispatchToProps = {
    addToCart: addToCart,
    subToCart: subToCart
 }

export default connect(mapStateToProps, mapDispatchToProps)(HungryNow);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APPCOLOR
    },
    headingText:{ fontSize: Scale(18), fontWeight: 'bold' },
  addButton:{                  
    height: Scale(33),
    width: Scale(70),
    borderColor: Colors.APPCOLOR,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
                },
 
  textStyle: { color: Colors.BLACK, fontSize: Scale(16), fontWeight: 'bold' },
    loginInputCont: {
        flex:1,
        paddingTop: Scale(10),
        borderTopLeftRadius: Scale(25),
        borderTopRightRadius: Scale(25),
        backgroundColor: Colors.WHITE,
    },
    backgroundStyle: {
        width: Scale(100),
        height: Scale(100),
        resizeMode: 'stretch',
        borderRadius: Scale(30),
        marginRight: Scale(10)
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
        justifyContent: 'flex-start',
        flex: 1
    },
    headerContainer: {        
        paddingTop:Scale(20),
        height: Scale(100),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.APPCOLOR,
        // paddingVertical: Scale(35),
        paddingHorizontal: Scale(25),
    },
    location: {
        marginRight: Scale(10),
        width: Scale(25),
        height: Scale(25),
        resizeMode: 'contain',
        tintColor: Colors.WHITE
    },
    cardStyle: {
        elevation: 3,
        shadowOpacity: 3,
        height: Scale(480),
        width: '90%',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: "#E0E0E0",
        marginVertical: Scale(15),
        padding: Scale(15),
        alignSelf: 'center',
        borderRadius: Scale(10)
    },
    iconStyle: {
        color: Colors.APPCOLOR,
        fontSize: Scale(15),
        marginHorizontal: Scale(3)
    },
});
