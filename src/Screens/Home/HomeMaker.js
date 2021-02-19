import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch, StatusBar, ScrollView, Image, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { FlatGrid } from 'react-native-super-grid';
function HomeMaker() {
  const { navigate } = useNavigation();
  const navigation = useNavigation(); 
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

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
                <Text style={styles.textStyle}>$10.00{'\n'}<Text style={styles.normalText}>$15.00</Text></Text>
                <View style={styles.addButton}>
                <Text style={[styles.textStyle,{color:Colors.APPCOLOR}]}>Add</Text>
              </View>
                </View>                
                </View>

              )}
            />
            </ScrollView>
          
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
