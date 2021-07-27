import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Linking
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {
  SignUpRequest,
  loaderRequest,
  countryListRequest,
  setOtpVerifyStatus,
} from '../../redux/actions'
import {Scale, Colors, ImagesPath, COUNTRY} from '../../CommonConfig'
import ModalDropdown from 'react-native-modal-dropdown'
import {FormInput, CustomButton} from '../../Component'
import {LoadWheel} from '../../CommonConfig/LoadWheel'
import Icon from 'react-native-vector-icons/AntDesign'
import {useSelector, useDispatch} from 'react-redux'
import {
  SafeAreaView,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context'

function SignUp(props) {
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const signupResponse = useSelector((state) => state.Auth)
  const [first_name, setfirst_name] = useState('')
  const [last_name, setlast_name] = useState('')
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirm_pass, setconfirm_pass] = useState('')
  const {isLoading} = useSelector((state) => state.Auth)
  const [checkBox, setcheckBox] = useState(false)
  const [country_Code, setCountryCode] = useState('')
  const counrtryListResponse = useSelector(
    (state) => state.Auth.counrtryListResponse,
  )
  const countryList = counrtryListResponse?.data || []

  useEffect(() => {
    if (signupResponse?.SignStatus) {
      navigate('Otp', {phone, email})
    }
    dispatch(countryListRequest())
  }, [signupResponse?.SignStatus])

  const onSubmit = async () => {
    const {
      navigation: {navigate},
      t: translate,
    } = props
    let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
    if (first_name == '') {
      alert('Please enter First Name')
    }else if (last_name == '') {
      alert('Please enter Last Name')
    } else if (phone == '') {
      alert('Please enter your Mobile Number')
    } else if (phone.length<10) {
      alert('Please enter 10 digit mobile number')
    } else if (email == '') {
      alert('Please enter your Email')
    } else if (reg.test(email) == false) {
      alert('Please enter valid email')
    } else if (password == '') {
      alert('Please enter Password')
    } else if (password.length<8) {
      alert('Please enter min 8 characters digit password')
    } else if (confirm_pass == '') {
      alert('Please enter Confirm Password')
    } else if (confirm_pass != password) {
      alert('Confirm password not matched ')
    } else if (confirm_pass.length < 8) {
      alert('Please enter min 8 characters digit in confirm password')
    } else if (checkBox == false) {
      alert('Please accept terms and conditions')
    } else {
      const data = {
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        email: email,
        password: password,
        country_code: COUNTRY == 'IN' ? '91' : '971',
        role_for_user: 'user',
      }

      dispatch(loaderRequest(true))
      dispatch(SignUpRequest(data))
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(setOtpVerifyStatus(false))
    })
  }, [])

  return (
    <KeyboardAvoidingView
      showsVerticalScrollIndicator={false}
      style={styles.keyboardStyle}>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.imageBachgroundStyle}>
        <Icon
          name="arrowleft"
          type="AntDesign"
          style={styles.logoStyle}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.primaryText}>Signup</Text>

        <ScrollView indicatorStyle="white">
          <View style={styles.container}>
            <FormInput
              placeholder="First Name"
              autoCapitalize="none"
              maxLength={30}
              autoCapitalize="words"
              value={first_name}
              onChangeText={(text) => setfirst_name(text)}
            />
            <FormInput
              placeholder="Last Name"
              autoCapitalize="none"
              maxLength={30}
              autoCapitalize="words"
              value={last_name}
              onChangeText={(text) => setlast_name(text)}
            />
            <Text style={styles.mobile}>Mobile Number</Text>

            <View style={styles.textInputView}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ModalDropdown
                  options={[
                    ...new Set(countryList.map((i) => `${i?.dial_code}`)),
                  ]}
                  onSelect={(country_Code) => setCountryCode(country_Code)}
                  defaultIndex={0}
                  defaultValue={countryList.dial_code || '+91'}
                  style={styles.modal}
                  textStyle={styles.modalText}
                  dropdownStyle={styles.modalDropDown}
                  dropdownTextStyle={styles.modalDropDownText}
                  dropdownTextHighlightStyle={
                    styles.modalDropDownHighlightedText
                  }
                />

                <Icon
                  name="caretdown"
                  size={Scale(10)}
                  style={{marginLeft: Scale(8)}}
                />
              </View>
              <TextInput
                style={styles.textInputContainer}
                value={phone}
                maxLength={10}
                autoCapitalize="none"
                placeholder="Mobile Number"
                keyboardType={'numeric'}
                onChangeText={(text) => setphone(text)}
                placeholderTextColor={Colors.BORDERCOLOR}
                placeholderStyle={{fontWeight: 'bold'}}
                underlineColorAndroid="transparent"
              />
            </View>

            <FormInput
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={30}
              value={email}
              onChangeText={(text) => setemail(text)}
            />

            <FormInput
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              maxLength={30}
              value={password}
              onChangeText={(text) => setpassword(text)}
            />
            <FormInput
              placeholder="Confirm Password"
              autoCapitalize="none"
              secureTextEntry={true}
              maxLength={30}
              value={confirm_pass}
              onChangeText={(text) => setconfirm_pass(text)}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Scale(10),
              }}>
              <TouchableOpacity
                onPress={() => setcheckBox(!checkBox)}
                activeOpacity={0.7}>
                <Image
                  source={
                    checkBox == true ? ImagesPath.check1 : ImagesPath.uncheck
                  }
                  style={{
                    width: Scale(17),
                    height: Scale(17),
                    marginRight: Scale(5),
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.forgotButton}>
                I accept{' '}
                <Text style={{color: Colors.APPCOLOR}}
                onPress={() => Linking.openURL('http://google.com')}>Privacy Policy</Text> and
                <Text style={{color: Colors.APPCOLOR, marginLeft: Scale(5)}}
                onPress={() => Linking.openURL('http://google.com')}>
                  {' '}
                  Terms &{'\n'}Conditions{' '}
                </Text>
              </Text>
            </View>
            <View style={{marginTop: Scale(10)}}>
              <CustomButton
                title="Signup"
                onSubmit={onSubmit}
                isSecondary={true}
              />
            </View>
          </View>
        </ScrollView>
        <LoadWheel visible={isLoading} />
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Scale(25),
    paddingTop: Scale(0),
  },
  textInputView: {
    flexDirection: 'row',
    marginVertical: Scale(8),

    height: Scale(50),
    fontSize: Scale(16),
    color: Colors.BLACK,
    fontWeight: '500',
    borderWidth: Scale(1),
    borderColor: '#AB8F8E',
    width: '100%',
    alignSelf: 'center',
    borderRadius: Scale(5),
  },

  imageBachgroundStyle: {
    height: '100%',
    width: '100%',
  },
  forgotButton: {
    marginTop: Scale(12),
    fontSize: Scale(16),
    marginLeft: Scale(15),
    color: Colors.BORDERCOLOR,
  },
  logoStyle: {
    fontSize: Scale(25),
    color: Colors.DARK_RED,
    paddingTop: Scale(-30),
    marginTop: Scale(40),
    marginLeft: Scale(25),
  },
  primaryText: {
    marginVertical: Scale(20),
    marginBottom: Scale(10),
    marginLeft: Scale(25),
    fontSize: Scale(30),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  textInputContainer: {
    fontWeight: '500',
    fontSize: Scale(16),
    color: Colors.BLACK,
    justifyContent: 'center',
    alignSelf: 'center',
    width: Scale(280),
    height: Scale(50),
    paddingHorizontal: Scale(10),
  },
  normalText: {
    fontSize: Scale(16),
    color: Colors.BLACK,
    textAlign: 'left',
  },
  mobile: {
    fontSize: Scale(14),
    marginBottom: Scale(5),
    color: Colors.BORDERCOLOR,
    textAlign: 'left',
    marginTop: Scale(5),
    marginLeft: Scale(2),
  },
  modal: {
    justifyContent: 'center',
    backgroundColor: Colors.TRANSPARENT,
    maxWidth: Scale(100),
  },
  modalText: {
    color: Colors.BLACK,
    fontSize: Scale(14),
    marginLeft: Scale(10),
    fontWeight: '500',
  },
  modalDropDown: {
    backgroundColor: Colors.WHITE,
    overflow: 'hidden',
    marginTop: Scale(-30),
    height: Scale(80),
  },
  modalDropDownText: {
    backgroundColor: Colors.TRANSPARENT,
    color: Colors.BLACK,
    fontSize: Scale(14),
    paddingHorizontal: Scale(15),
  },
  modalDropDownHighlightedText: {
    color: Colors.BLACK,
  },
})
