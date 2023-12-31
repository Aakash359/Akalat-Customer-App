import React, {useState} from 'react'
import {Text, View, StyleSheet, StatusBar, ImageBackground} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {CustomButton} from '../../Component'
import {useNavigation,useRoute} from '@react-navigation/native'
import { useSelector} from 'react-redux';
import {API_BASE} from '../../apiServices/ApiService'
import axios from 'axios'

function SortBy(props) {
  const [value, setActiveTab] = useState(null)
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const route = useRoute(); 
  const  user = useSelector((state) => state.Auth.user);
  const [data, setdata] = React.useState({
    isLoading: true,
  })
  
  
  

  
  const [isEnabled, setIsEnabled] = useState(false)

  const setCheckedSwitch = () => {
    setIsEnabled(!isEnabled)
  }
  
  const onSortBy = async () => {

    
    const url = `${API_BASE}/restro/sortBy`
    const payload = {
        
        'userid': "60dbf51098319623d40960c6",
        'relevance': value==0,
        'rating_high_to_low': value==1,
        'rating_low_to_high': value==2,
        'delivery_time': value==3
      }
      
      
      
    try 
      {
      const res = await axios.post(url, payload)
      route.params.onBack({sortByRestro:res?.data?.data?.restroNewArrayList,isLoading: true});
      navigate('NearMe')
    
    
    } 
    catch (error) 
    {
        
    }
  }


  const onReset = async () => {
       
    const url = `${API_BASE}/restro/sortBy`
    const payload = {
      'userid': "60dbf51098319623d40960c6",
      'relevance': '',
      'rating_high_to_low': '',
      'rating_low_to_high': '',
      'delivery_time': ''
      }
    try 
      {
      const res = await axios.post(url, payload)
      route.params.onBack({sortByRestro:res?.data?.data?.restroNewArrayList});
      navigate('NearMe')
    
    
    } 
    catch (error) 
    {
        
    }
  }

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
      <Text style={styles.headerText}>Sort By </Text>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <View
          style={{
            marginTop: Scale(10),
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
                value == 0
                  ? {color: Colors.DARK_RED}
                  : {color: Colors.LIGHT_GRAY},
                {fontSize: 25},
              ]}
              name={value == 0 ? 'dot-circle-o' : 'circle-o'}
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
                value == 1
                  ? {color: Colors.DARK_RED}
                  : {color: Colors.LIGHT_GRAY},
                {fontSize: 25},
              ]}
              name={value == 1 ? 'dot-circle-o' : 'circle-o'}
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
                value == 2
                  ? {color: Colors.DARK_RED}
                  : {color: Colors.LIGHT_GRAY},
                {fontSize: 25},
              ]}
              name={value == 2 ? 'dot-circle-o' : 'circle-o'}
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
                value == 3
                  ? {color: Colors.DARK_RED}
                  : {color: Colors.LIGHT_GRAY},
                {fontSize: 25},
              ]}
              name={value == 3 ? 'dot-circle-o' : 'circle-o'}
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
            }}>
            <View
              style={{
                flex: 1,
                marginRight: Scale(10),
              }}>
              <CustomButton title="Reset All"  onSubmit={onReset} />
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
    </View>
  )
}
export default SortBy
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
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
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
    paddingHorizontal: Scale(30),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
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
