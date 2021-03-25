import React, { useState } from 'react';
import { Text, View, StyleSheet, Modal,Switch, StatusBar,TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Colors, Scale, ImagesPath ,Fonts} from '../../CommonConfig';
import { FlatGrid } from 'react-native-super-grid';
function HomeMaker() {
  const { navigate } = useNavigation();
  const [check , setCheck] = useState(false);
  const navigation = useNavigation(); 
  const [isEnabled, setIsEnabled] = useState(false);
  const[addItem, SetAddItem] = useState(0);
  const [customizeModal ,setCustomizeModal] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);
const addItemCount = () => {SetAddItem( addItem + 1);}
const decrement = () => {
  if (addItem < 1)
  {
    SetAddItem(addItem);
  }
  else{SetAddItem(addItem - 1);}
}
const checked = () =>{
  setCheck(!check);
}
const renderCustomizeModal = () =>  {
  return (
      <Modal visible={customizeModal} style={{backgroundColor:'red'}} transparent>
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.7)',flex:1}}>
          <TouchableOpacity activeOpacity={1} onPress={() => setCustomizeModal(false)} style={{ flex: 1, backgroundColor: Colors.TRANSPARENT, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <TouchableOpacity activeOpacity={1} onPress={() => { }} style={{ width: '85%', borderRadius: Scale(10), backgroundColor: Colors.WHITE }}>
                  <View style={{ height: Scale(80), justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: '#202020', fontSize: Scale(20), fontFamily: Fonts.Bold }}>Jumbo Cheese Burger </Text>
                  </View>

                  {/* SUGAR */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Scale(50), alignItems: 'center', paddingHorizontal: Scale(20) }}>
                      <Text style={{ color: "#AB8F8E", fontSize: Scale(16), fontFamily: Fonts.Regular }}>Cheese</Text>
                      <Image source={ImagesPath.downArrow} resizeMode={'contain'} style={{ height: Scale(15), tintColor: "#AB8F8E", width: Scale(15) }} />
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: "#00000029", alignItems: 'center', borderBottomWidth: 0.6, height: Scale(45), marginHorizontal: Scale(20) }}>
                      <Text style={{ color: Colors.MATEBLACK1, fontSize: Scale(14), fontFamily: Fonts.Regular }}>Extra Cheese <Text style={{color:'#AF9163'}}> | </Text><Text style={{ color: Colors.DARK_RED }}>$5</Text></Text>
                     <TouchableOpacity  onPress={checked}>
                      <Image source={check ? ImagesPath.check1 : ImagesPath.uncheck} resizeMode={'contain'} style={{ height: Scale(15), width: Scale(15) }} />
                      </TouchableOpacity>
                  </View>


                  {/* MILK */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Scale(50), alignItems: 'center', paddingHorizontal: Scale(20) }}>
                      <Text style={{ color: "#AB8F8E", fontSize: Scale(16), fontFamily: Fonts.Regular }}>Make it a combo</Text>
                      <Image source={ImagesPath.downArrow} resizeMode={'contain'} style={{ height: Scale(15), tintColor: "#AB8F8E", width: Scale(15) }} />
                  </View>                  

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: "#00000029", alignItems: 'center', borderBottomWidth: 0.6, height: Scale(45), marginHorizontal: Scale(20) }}>
                      <Text style={{ color: Colors.MATEBLACK1, fontSize: Scale(14), fontFamily: Fonts.Regular }}>Regular Fries + Pepsi [ 330 Ml]<Text style={{color:'#AB8F8E'}}> | </Text><Text style={{ color: Colors.DARK_RED }}> $10</Text></Text>
                      <TouchableOpacity onPress={checked}>
                      <Image source={check ? ImagesPath.check1 : ImagesPath.uncheck} resizeMode={'contain'} style={{ height: Scale(15), width: Scale(15) }} />
                      </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: "#00000029", alignItems: 'center', borderBottomWidth: 0.6, height: Scale(45), marginHorizontal: Scale(20) }}>
                      <Text style={{ color: Colors.MATEBLACK1, fontSize: Scale(14), fontFamily: Fonts.Regular }}>Medium Fries + Pepsi [ 330 Ml]<Text style={{color:'#AB8F8E'}}> | </Text><Text style={{ color: Colors.DARK_RED }}>$15</Text></Text>
                      <TouchableOpacity onPress={checked}>
                      <Image source={check ? ImagesPath.check1 : ImagesPath.uncheck} resizeMode={'contain'} style={{ height: Scale(15), width: Scale(15) }} />
                      </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: "#00000029", alignItems: 'center', borderBottomWidth: 0.6, height: Scale(45), marginHorizontal: Scale(20) }}>
                      <Text style={{ color: Colors.MATEBLACK1, fontSize: Scale(14), fontFamily: Fonts.Regular }}>King Fries + Pepsi [ 330 Ml]<Text style={{color:'#AB8F8E'}}> | </Text><Text style={{ color: Colors.DARK_RED }}>$ 20</Text></Text>
                      <TouchableOpacity onPress={checked}>
                      <Image source={check ? ImagesPath.check1 : ImagesPath.uncheck} resizeMode={'contain'} style={{ height: Scale(15), width: Scale(15) }} />
                      </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={() => {
                    setCustomizeModal(false),
                    navigate('Order',{orderCount : addItem})}} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Scale(45), backgroundColor: Colors.APPCOLOR, borderRadius: Scale(35), marginBottom:Scale(20),marginTop: Scale(35), marginHorizontal: Scale(20) }}>
                      <Text style={{ color: Colors.WHITE, fontSize: Scale(15), fontFamily: Fonts.Bold }}>Add To Cart</Text>
                  </TouchableOpacity>


              </TouchableOpacity>
          </TouchableOpacity>
          </View>
      </Modal>
  )
}

const increment = () => {
  if (addItem > 8)
  {
    SetAddItem( addItem);
  }
  else{SetAddItem(addItem + 1);}
  
};
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />
      <ImageBackground source={ImagesPath.reset} style={styles.backgroundStyle}>
        <Icon onPress={() => navigation.goBack()} name="arrowleft" type="AntDesign" style={styles.logoStyle} />
        <Text style={styles.headingText}>Fire & Grill</Text>
          <Text style={styles.bottomText}>Sector 29, Cyber hub, Gurgoan</Text>
          <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
           <ScrollView>
            <View style={styles.ratingContainer}>
              <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>4.7</Text>
                <Text style={styles.normalText}>Rating</Text>
              </View>
              <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>25Min</Text>
                <Text style={styles.normalText}>Delivery Time</Text>
              </View>
              <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>2.7km</Text>
                <Text style={styles.normalText}>Distance</Text>
              </View>
            </View>
            <View style={{
              borderWidth: 1, marginHorizontal: Scale(25), paddingHorizontal: Scale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: Scale(50),
              alignItems: 'center',
              borderRadius: Scale(5),
              marginTop: Scale(20),
              borderColor: 'grey'
            }}>
              <Text style={[styles.normalText, { fontSize: Scale(17) }]}>Veg Only</Text>
              <Switch
                trackColor={{ false: Colors.GRAY, true: Colors.GRAY }}
                thumbColor={isEnabled ? Colors.WHITE : Colors.WHITE}
                ios_backgroundColor={Colors.GREEN}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />


            </View>
            <FlatGrid
              itemDimension={130}
              data={[0,1,2,3]}
              style={styles.gridView}
              // staticDimension={300}
              // fixed
              spacing={Scale(12)}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Image source={ImagesPath.reset} style={{resizeMode:'stretch',height:Scale(100),width:'100%',borderRadius:Scale(10),}}/>
                <View style={{flexDirection:'row',marginVertical:Scale(5),alignItems:'center'}}>
                <Image source={ImagesPath.veg}/>
                <Text style={{fontSize:Scale(16),color:Colors.BLACK}}> Burger</Text>
                </View>
                <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                <Text onPress={increment} style={styles.textStyle}>$10.00{'\n'}<Text style={styles.normalText}>$15.00</Text></Text>
                
                {addItem> 0?
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Icon onPress={decrement} type="AntDesign" name="minussquareo" style={{fontSize:Scale(20),color:Colors.APPCOLOR}}/>
                  <Text style={[styles.textStyle,{color:Colors.APPCOLOR}]}> {addItem} </Text>
                  <Icon onPress={increment} type="AntDesign" name="plussquareo" style={{fontSize:Scale(20),color:Colors.APPCOLOR}}/>
                  
                </View> 
                
             :  <View style={styles.addButton}>
                <Text onPress={addItemCount} style={[styles.textStyle,{color:Colors.APPCOLOR}]}>Add</Text>
              </View>}
                </View>                
                </View>
              )}
            />
            {renderCustomizeModal()}
            </ScrollView>
            {addItem> 0?
                         <View style = {{height:'15%',paddingHorizontal:'5%',flexDirection:'row',padding:10, justifyContent:'space-between', maxHeight:'15%',backgroundColor: Colors.APPCOLOR}}>
                            <View style ={{alignItems:'flex-start'}}>
                                <Text style={{ color: Colors.WHITE, fontSize: Scale(14), fontFamily: Fonts.Bold }}>{'$ 10'}</Text>
                                <Text style={{ color: Colors.WHITE, fontSize: Scale(11), fontFamily: Fonts.Bold }}>{addItem +' items in cart'}</Text>
                            </View>
                             <TouchableOpacity onPress={() => setCustomizeModal(true)}
                              //navigate('Order',{orderCount : addItem})
                               style={{ borderRadius: Scale(25), borderWidth: 1, borderColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center', width: '23%', height: Scale(30),marginRight:Scale(25) }}>
                                <Text style={{ color: Colors.WHITE, fontSize: Scale(11), }}>{'Go to cart'}</Text>
                            </TouchableOpacity>
                        </View>
                        :null}
          </ImageBackground>
        
      </ImageBackground>
    </View>
  );
}
export default HomeMaker;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundStyle: {
    flex:1,
    width: "100%",
    height: "100%",
    paddingTop: Scale(70)
  },
  headingText: {
    color: Colors.WHITE,
    fontSize: Scale(22),
    marginHorizontal: Scale(25),
    marginTop: Scale(40),
    fontWeight: 'bold'
  },
  bottomText: {
    color: Colors.WHITE,
    fontSize: Scale(22),
    marginHorizontal: Scale(25),
    marginTop: Scale(3),
    marginBottom: Scale(30)
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Scale(25),
    paddingTop: Scale(10)
  },
  buttonStyle: {
    height: Scale(50),
    width: Scale(100),
    borderColor: "#E0E0E0",
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  normalText: { color: 'grey', fontSize: Scale(12) },
  logoStyle: {
    marginHorizontal: Scale(20),
    fontSize: Scale(25),
    color: Colors.WHITE,
  },
  loginInputCont: {
    flex:1,
    // top: Scale(-20),
     paddingTop: Scale(10),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  gridView: {
    marginTop: Scale(10),
    marginHorizontal:Scale(13),
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    height: Scale(200),
  },
});
