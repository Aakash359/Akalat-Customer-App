import React, { useState, useEffect } from 'react';
import { Switch, Text, View, StyleSheet, Image,StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath,} from '../../CommonConfig';
import { CustomButton,FormArea } from '../../Component';
import { useNavigation } from '@react-navigation/native';
import {API_BASE} from '../../apiServices/ApiService'
import axios from 'axios'
function Rating() {
    const [value, setValue] = useState('0')
    const [rating, setRating] = useState('');
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star. You can also give the path from local
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToMyAccount = () => {
        navigate('SavedCard');
    };

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
              );
            })}
          </View>
        );
      };
    const [isEnabled, setIsEnabled] = useState(true);
    
    const setCheckedSwitch = () => {
      setIsEnabled(!isEnabled)
    };

    const onRatings = async () => {
       
        const url = `${API_BASE}/order/rateReviewOrderFromUser`
        const payload = {
            '_id': '60d962f26143c57f9f046eb0',
            'review_restro': rating,
            'rating_restro': maxRating+"",
            
          }
        try 
          {
          const res = await axios.post(url, payload)
          alert("Order rated error from user successfully!")
        
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
                <Icon onPress={() => navigation.goBack()} name="arrowleft" type="AntDesign" style={styles.logoStyle} />
            </View>
            <Text style={styles.headerText}>Rating and Reviews  </Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
                <View style={{marginTop:Scale(20)}}>
                    <Text style={{fontSize:Scale(16)}}>Rate</Text>
                <View style={{flexDirection:'row',marginVertical:Scale(10)}}>
                 {/* <Icon type="FontAwesome" name="star" style={{fontSize:Scale(35),color:Colors.GRAY,marginRight:Scale(2)}}/>                  */}

                 <CustomRatingBar />
                 </View>
                 <FormArea
                            placeholder="Write your reviews..."
                            label="Reviews"
                            autoCapitalize="none"
                            maxLength={30}
                            value={rating}
                            onChangeText={(text) => setRating(text )}
                        />
                        
                    
                        <View style={{marginTop:Scale(30),}}>
                        <CustomButton title="Submit" isSecondary={true} onSubmit={onRatings}/>
                        </View>

                 </View>  
            </ImageBackground>

        </View>
    );
}
export default Rating;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APPCOLOR
    },
    textStyle: {
        color: Colors.BORDERCOLOR,
        fontSize: Scale(14),
        marginTop: Scale(10)
    },
    inputStyle: {
        color: Colors.BLACK,
        fontSize: Scale(16),
        marginBottom: Scale(15),
        fontWeight: 'bold'
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
        paddingTop:Scale(20),
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
});
