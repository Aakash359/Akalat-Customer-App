import React, { useState,useEffect } from 'react';
import {View,Text,TouchableOpacity,TextInput,
Image,KeyboardAvoidingView,ScrollView,Platform,StyleSheet,ImageBackground,StatusBar} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import {screenWidth,screenHeight,ImagesPath,COUNTRY, Colors,Scale,Fonts,} from '../../CommonConfig';
import { AuthStyle } from './AuthStyle';
import { useNavigation } from '@react-navigation/native';
import {useSelector,useDispatch} from 'react-redux'
import { CustomButton} from '../../Component';
import { OTPRequest,countryListRequest } from '../../redux/actions'
import CountryPicker from 'react-native-country-picker-modal'
import DropDownPicker from 'react-native-dropdown-picker';

function ForgotPassword() {
    const otpResponse = useSelector((state) => state.Auth);
    const  counrtryListResponse = useSelector((state) => state.Auth.counrtryListResponse);
    const  countryList = counrtryListResponse?.data || []
    const [phone, setphone] = useState('');
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [items, setItems] = useState();
    const dispatch = useDispatch();

    const  onSubmit = () =>{
      if(phone == '') {

        alert("Please enter phone number")
        }
        else
        {
            const data = { 
                'phone': phone,
                'role' : 'customer',
                'country_code' : COUNTRY == "IN" ? '91' : '971'
     
                }
               
              navigate('Otp', data)
              dispatch(OTPRequest(data));
        }
      }
      useEffect(() => {

        dispatch(countryListRequest());
          
        }, 
     []); 


    return (
        <SafeAreaInsetsContext.Consumer>
            {(insets) => (
                <KeyboardAvoidingView
                    style={AuthStyle.keyboardAware}
                    behavior={Platform.OS == 'android' ? '' : 'padding'}
                    enabled>
                    <ScrollView
                        bounces={false}
                        keyboardShouldPersistTaps={'handled'}
                        showsVerticalScrollIndicator={false}>
                    <StatusBar translucent backgroundColor="transparent" />
                        <View style={styles.container}>
                            <Image source={ImagesPath.bug} 
                            style={{ width: screenWidth, flex: 1 }} 
                            />
                        </View>
                        <ImageBackground source={ImagesPath.background} style={[AuthStyle.loginInputCont,{top:-20}]}>
                            <View style={{ paddingHorizontal: Scale(25), }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}>
                                    <Image
                                        source={ImagesPath.backArrow}
                                        style={styles.arrowStyle} />
                                </TouchableOpacity>
                                <Text style={styles.primaryText}>Forgot Password</Text>
                                <Text style={styles.normalText}>Please enter your registered mobile number to reset password</Text>
                                <Text style={styles.mobile}>Mobile Number</Text>
                        <View style={styles.textInputView}>
                        <DropDownPicker
                        placeholder={'+92'}
                        open={open}
                        onChangeText={(items) => setItems(items.dial_code)}
                        items={countryList.map((items)=>{
                            return{
                                label:items.dial_code
                            }
                        })}
                        setOpen={setOpen}
                        setValue={value}
                        setItems={setItems}
                        
                        
                        style={{width:Scale(72),borderWidth:0,fontWeight:'bold',
                            backgroundColor:Colors.TRANSPARENT}}
                        containerStyle={{
                           width:Scale(72),
                           borderWidth:0,
                           fontWeight:'bold',
                           backgroundColor:Colors.TRANSPARENT

                        }}
                        />
                        {/* <CountryPicker
                            countryCode={countryCode}
                            withFilter
                            withFlag
                            withCurrencyButton={false}
                            withAlphaFilter={false}
                            withCallingCode
                            withEmoji
                            onSelect={ country=>{
                                console.log("Country",country)
                                const {cca2,callingCode} = country
                                setCountryCode(cca2);
                                setcallingCode(callingCode[0]);
                            }}
                            
                            containerButtonStyle={{
                                marginLeft:10,
                                marginTop:10
                            }}
                          
                        /> */}

                        <TextInput
                          style={styles.textInputContainer}
                          value={phone}
                          maxLength={10}
                          autoCapitalize="none"
                          placeholder="Mobile Number"
                          keyboardType={'numeric'}
                          onChangeText={(text) => setphone(text )}
                          placeholderTextColor={Colors.BORDERCOLOR}
                          placeholderStyle={{fontWeight:'bold'}}
                          underlineColorAndroid="transparent"
                                
                          />

                        </View>
                              
                                <CustomButton title="Submit" onSubmit={onSubmit} isSecondary={true} />
                            </View>
                        </ImageBackground>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </SafeAreaInsetsContext.Consumer>
    );
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: { 
        height: screenHeight/2, alignItems: 'center' 
    },
    mainContainer: { justifyContent: 'space-between', paddingBottom: Scale(10) },
    normalText: {
        fontSize: Scale(16),
        fontFamily: Fonts.Medium,
        marginTop: Scale(5),
        textAlign: 'left',
        width: '90%',
        color: Colors.GRAY,
    },
    textInputView: {
        flexDirection:'row',
        marginVertical: Scale(8),
        height: Scale(50),
        fontSize: Scale(16),
        color: Colors.BLACK, 
        fontWeight:'500', 
        borderWidth: Scale(1),
        borderColor: "#AB8F8E",
        width: '100%',
        alignSelf: 'center',
        borderRadius:Scale(5),
      },
    mobile: {
        fontSize:Scale(14),
        marginBottom:Scale(5),
        color: Colors.BORDERCOLOR,
        textAlign: "left",
        marginTop:Scale(5),
        marginLeft:Scale(2)
        
    },
    textInputContainer: {
        fontWeight:'500', 
        fontSize: Scale(16),
        color: Colors.BLACK, 
        justifyContent: 'center',
        alignSelf: 'center',
      },
    heading: {
        flexDirection: 'row',
        marginHorizontal: Scale(30),
        marginTop: Scale(10),
    },
    arrowStyle: {
        tintColor: Colors.DARK_RED,
        width: Scale(20),
        height: Scale(20),
        marginTop: Scale(20),
        resizeMode: 'contain',
    },
    primaryText: {
        textAlign: 'left',
        fontSize: Scale(24),
        fontWeight: 'bold',
        color: Colors.BLACK,
        fontFamily: Fonts.Light,
        marginTop: Scale(22),
    },
})
