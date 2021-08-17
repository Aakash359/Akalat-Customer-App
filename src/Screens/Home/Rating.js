import React, {useState, useEffect} from 'react'
import {
  Switch,
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {CustomButton, FormArea} from '../../Component'
import {useNavigation} from '@react-navigation/native'
import {API_BASE} from '../../apiServices/ApiService'
import axios from 'axios'

function Rating(props) {
  const [value, setValue] = useState('0')
  const [rating, setRating] = useState('')
  const [defaultRating, setDefaultRating] = useState(1)
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])

  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png'
  
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png'
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const redirectToMyAccount = () => {
    navigate('SavedCard')
  }
    
  const OrderDetails = props.route.params 
  console.log('====================================');
  console.log("Aakash---->",OrderDetails?.OrderDetail?.order?._id);
  console.log('====================================');

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
                }
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  const [isEnabled, setIsEnabled] = useState(true)

  const setCheckedSwitch = () => {
    setIsEnabled(!isEnabled)
  }

  const onRatings = async () => {

    if (rating==''){
      alert("Please enter reviews")
    }
    else{

      const url = `${API_BASE}/order/rateReviewOrderFromUser`
    const payload = {
      _id: OrderDetails?.OrderDetail?.order?._id,
      review_restro: rating,
      rating_restro: maxRating + '',
    }
    console.log('====================================');
    console.log("Aakash===>",payload);
    console.log('====================================');
    try {
      const res = await axios.post(url, payload)
      alert('Order rated from user successfully!')
      console.log('====================================');
      console.log("RatingResponse=====>",res);
      console.log('====================================');
      navigate('OrderDetails', { ratingRes : res} )
    } catch (error) {
      
    }

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
      <Text style={styles.headerText}>Rating and Reviews </Text>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <View style={{marginTop: Scale(20)}}>
          <Text
            style={{fontSize: Scale(16), color: Colors.GRAY, marginLeft: 5}}>
            Rate
          </Text>
          <View style={{flexDirection: 'row', marginVertical: Scale(10)}}>

            <CustomRatingBar />
          </View>
          <FormArea
            placeholder="Write your reviews..."
            
            label="Reviews"
            autoCapitalize="none"
            maxLength={30}
            value={rating}
            onChangeText={(text) => setRating(text)}
          />

          <View style={{marginTop: Scale(130)}}>
            <CustomButton
              title="Submit"
              isSecondary={true}
              onSubmit={onRatings}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
export default Rating
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
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
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
  starImageStyle: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
  },
  logoStyle: {
    marginTop: Scale(15),
    fontSize: Scale(25),
    color: Colors.WHITE,
  },
})
