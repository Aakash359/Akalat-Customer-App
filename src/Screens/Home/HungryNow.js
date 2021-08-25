import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, FlatList, StatusBar, ScrollView,TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { Colors, Scale, ImagesPath ,Fonts} from '../../CommonConfig';
import { Icon } from 'native-base';
import {useSelector, useDispatch,connect} from 'react-redux'
import {hungryNowListRequest, hungryNowListLoader} from '../../redux/actions'
import { addToCart, subToCart } from '../../redux/actions/CartActions';
import { LoadWheel } from '../../CommonConfig/LoadWheel'


function HungryNow(props) {
    
    const hungryNowListResponse = useSelector((state) => state.Home.hungryNowListResponse)
    const dispatch = useDispatch()
    const product_list = hungryNowListResponse?.data?.product_list || []
    const user = useSelector((state) => state.Auth.user)
    const  {setHungryNowListLoader} = useSelector((state) => state.Home);
    
    let a = product_list

    let res = [...new Set(a?.map(i => i?.restro_details?._id))]

    
    let data = res.reduce((data, item) => {
        let p = a?.filter(i => i?.restro_details?._id === item)
        data.push(p)
        return data
    }, [])

    
    const renderProduct = ({item, index })=>{
       return (
           <View style={styles.cardStyle}>
               <View style={{justifyContent:'space-between',flexDirection:'row',}}>
               <Text style={styles.headingText}>{item[0]?.restro_name}</Text>
         <Text style={styles.headingText}>{item[0]?.restro_details?.distance} Km</Text>
               </View>
               
               { item?.map((product, i) => {
                   
                    let inCart = cartProducts?.find(i => i?._id === product?._id)
                    
                    return(
         
         <View >
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: Scale(10), marginVertical:Scale(-8),marginTop:Scale(2)}}>
         
         </View>
         <View style={{ flexDirection: 'row' ,marginTop:Scale(8) }}>
         <Image source={{ uri: product?.image}} style={styles.backgroundStyle}/>
         <View >
            <View style={{ flexDirection: 'row', alignItems: 'center' , marginLeft:Scale(10)}}>
                { product.product_type==='veg'? <Image 
                style={{height:Scale(20),width:Scale(20)}}
                source={ImagesPath.veg}
                />:<Image 
                style={{height:Scale(20),width:Scale(20)}}
                source={ImagesPath.non_veg}/>
                }
               <Text style={{ color: Colors.BLACK, fontSize: Scale(18), }}>  {product.name}</Text>
               
            </View>
            <Text style={{ color: 'grey', fontSize: Scale(13), marginTop:Scale(8), fontWeight: 'normal',marginLeft:Scale(10) }}>{product.description}</Text>
         </View>
         </View>
         <View style={{ flexDirection: 'row', paddingVertical: Scale(10), alignItems: 'center',  justifyContent: 'space-between' }}>
         <Text style={styles.headingText}>${product.final_price}<Text style={{ color: 'grey', fontSize: Scale(18), fontWeight: 'normal',textDecorationLine:'line-through',}}> ${product.price}</Text>
         </Text>
         {inCart ?
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Icon onPress={() => subToCart(product)} type="AntDesign" name="minussquareo" style={{fontSize:Scale(20),color:Colors.APPCOLOR}}/>
            <Text style={[styles.textStyle,{color:Colors.APPCOLOR}]}> {inCart?.qty} </Text>
            <Icon onPress={() => addToCart(product)} type="AntDesign" name="plussquareo" style={{fontSize:Scale(20),color:Colors.APPCOLOR}}/>
            
          </View> 
          
         : <View style={styles.addButton}>
          <Text onPress={() =>addToCart(product)} style={[styles.Add,{color:Colors.APPCOLOR}]}>ADD</Text>
         </View>}
         </View>
        <View style={{ flexDirection: 'row', justifyContent:'flex-end', marginBottom:Scale(30),}}>
         <Text style={{ color: 'grey', fontSize: Scale(13), fontWeight: 'normal',textAlign:'right' }}>Available Quantity: </Text>
         <Text style={{ color: Colors.BLACK, fontSize: Scale(13), marginLeft:Scale(5)}}>{product.qty}</Text>
     
         </View>
         {
             index===res.length-1 ? null :<View
             style={{
                 backgroundColor: '#00000029',
                 height: Scale(2),
                 marginTop:Scale(-15),
                 marginBottom:Scale(18)
             }}
          />
         }
         
         </View>
         
                    )
               }
               
               )}
           </View>
       )
       }
    
    
      
    useEffect(() => {
        
        const data = {
            userid: user?._id,
           }
        
          dispatch(hungryNowListRequest(data))
          dispatch(hungryNowListLoader(true));
        
       },[])

      const addToCart = (item) => {
        
        const {cartRestroDetails, addToCart} = props
        const {restroDetails = {}} = props.route?.params || {}
        if(cartRestroDetails && cartRestroDetails?._id !== item?.restro_details?._id) 
        {
          return Alert.alert('You have another other in your cart')
        }
        else {
            addToCart({restroDetails: item?.restro_details, product: item, })
        }
      } 
      const increment = () => {
        if (addItem > 8)
        {
          SetAddItem( addItem);
        }
        else{SetAddItem(addItem + 1);}
        
      };  
      const subToCart = (item) => {
        const {subToCart} = props
        subToCart(item)
      }
      const {cartProducts} = props
      const totalCartAmt =  cartProducts?.reduce((sum, i) => sum += i?.final_price * i?.qty || i?.price || i?.qty, 0)
      const {cartRestroDetails} = props
    return (
        <View style={styles.container}>
            <StatusBar
                translucent={true}
                backgroundColor={Colors.APPCOLOR}
                barStyle="light-content"
            />
            
                <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
                    <FlatList
                        data={data}
                        renderItem={renderProduct}
                    />
                        {cartProducts?.length ?
                            <View style = {{height:'15%',paddingHorizontal:'5%',flexDirection:'row',padding:10, justifyContent:'space-between', maxHeight:'15%',backgroundColor: Colors.APPCOLOR}}>
                                <View style ={{alignItems:'flex-start'}}>
                                    <Text style={{ color: Colors.WHITE, fontSize: Scale(14), fontFamily: Fonts.Regular }}>{`$ ${totalCartAmt}`}</Text>
                                    <Text style={{ color: Colors.WHITE, fontSize: Scale(11), fontFamily: Fonts.Regular }}>{cartProducts?.length +' items in cart'}</Text>
                                </View>
                                <TouchableOpacity onPress={() => props.navigation.navigate('Card',cartRestroDetails )}
                                
                                style={{ borderRadius: Scale(25), borderWidth: 1, borderColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center', width: '30%', height: Scale(30),marginRight:Scale(5) }}>
                                    <Text style={{ color: Colors.WHITE, fontSize: Scale(11), }}>{'Go To Cart'}</Text>
                                </TouchableOpacity>

                            </View>
                        :null}
                         <LoadWheel visible={setHungryNowListLoader} />
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
    headingText:{ 
        fontSize: Scale(18), 
        fontWeight: 'bold' 
    },
  addButton:{                  
    height: Scale(33),
    width: Scale(75),
    borderColor: Colors.APPCOLOR,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
                },
 
  textStyle: { 
      color: Colors.BLACK, 
      fontSize: Scale(16), 
      
    },
   Add: { 
        color: Colors.BLACK, 
        fontSize: Scale(16), 
        
      },  
   loginInputCont: {
        flex:1,
        marginTop:Scale(20),
        paddingTop: Scale(10),
        borderTopLeftRadius: Scale(25),
        borderTopRightRadius: Scale(25),
        backgroundColor: Colors.WHITE,
    },
    backgroundStyle: {
        width: Scale(120),
        height: Scale(90),
        resizeMode: 'stretch',
        borderRadius: Scale(8),
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
        padding: 15,  
        borderRadius: 10, 
        margin: 10,
        elevation: 3,
        shadowOpacity: 3,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: "#E0E0E0",
    },
    iconStyle: {
        color: Colors.APPCOLOR,
        fontSize: Scale(15),
        marginHorizontal: Scale(3)
    },
});
