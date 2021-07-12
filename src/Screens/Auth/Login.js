import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from 'react-native'
import {useNavigation, CommonActions} from '@react-navigation/native'
import {Scale, Colors, ImagesPath, COUNTRY} from '../../CommonConfig'
import {FormInput, CustomButton, NumberInput} from '../../Component'
import {Icon} from 'native-base'
import ModalDropdown from 'react-native-modal-dropdown'
import {useSelector, useDispatch} from 'react-redux'
import {
  loginRequest,
  loaderRequest,
  countryListRequest,
} from '../../redux/actions'
import {LoadWheel} from '../../CommonConfig/LoadWheel'


function Login(props) {
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.Auth)
  const {isLoading} = useSelector((state) => state.Auth)
  const counrtryListResponse = useSelector(
    (state) => state.Auth.counrtryListResponse,
  )
  const countryList = counrtryListResponse?.data || []
  const [phone, setphone] = useState('')
  const [password, setpassword] = useState('')
  const [country_Code, setCountryCode] = useState('')

  if (user.loginStatus == true) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
            params: {user: 'jane'},
          },
        ],
      }),
    )
  }

  const onSubmit = () => {
    if (phone == '') {
      alert('Please enter Mobile Number')
    } else if (password == '') {
      alert('Please enter Password')
    } else {
      const data = {
        country_code: COUNTRY == 'IN' ? '91' : '971',
        phone: parseInt(phone),
        password: password,
      }
      console.log('====================================');
      console.log("Aakash===>",data);
      console.log('====================================');
      dispatch(loaderRequest(true))

      setTimeout(() => {
        dispatch(loginRequest(data))
      }, 1000)
    }
  }

  useEffect(() => {
    dispatch(countryListRequest())
    
  }, [])

  const redirectToForgotPassword = () => {
    navigate('ForgotPassword')
  }
  const [hidePassword, setHidePasswordl] = useState(true)

  const setPasswordVisibility = () => {
    setHidePasswordl(!hidePassword)
  }

  return (
    <ImageBackground
      source={ImagesPath.background}
      style={styles.imageBachgroundStyle}>
      <KeyboardAvoidingView
        style={styles.keyboardStyle}
        behavior={Platform.OS == 'android' ? '' : 'padding'}
        enabled>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrowleft"
          type="AntDesign"
          style={styles.logoStyle}
        />
        <ScrollView indicatorStyle="white">
          <View style={styles.container}>
            <Text style={styles.primaryText}>Hello !</Text>

            <Text style={styles.normalText}>Welcome back</Text>
            <Text style={styles.mobile}>Mobile Number</Text>
            <View style={styles.textInputView}>
              <ModalDropdown 
              options={[...new Set(countryList.map(i => `${i?.dial_code}`))]}
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
              >
              </ModalDropdown>
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
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              maxLength={30}
              value={password}
              onChangeText={(text) => setpassword(text)}
            />
            <Text
              onPress={redirectToForgotPassword}
              style={styles.forgotButton}>
              Forgot Password?
            </Text>
            <View style={{marginVertical: '60%'}}>
              <CustomButton
                isSecondary={true}
                title="Login"
                onSubmit={onSubmit}
              />
            </View>
          </View>
        </ScrollView>
        <LoadWheel visible={isLoading} />
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Scale(25),
    paddingTop: Scale(10),
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
  textInputContainer: {
    fontWeight: '500',
    fontSize: Scale(16),
    color: Colors.BLACK,
    justifyContent: 'center',
    alignSelf: 'center',
    width:Scale(280),
    height: Scale(50),
    paddingHorizontal:Scale(10),
    
  },

  imageBachgroundStyle: {
    height: '100%',
    width: '100%',
  },
  forgotButton: {
    alignSelf: 'center',
    fontSize: Scale(15),
    textAlign: 'center',
    marginTop: Scale(15),
    color: Colors.DARK_RED,
  },
  logoStyle: {
    fontSize: Scale(25),
    color: Colors.DARK_RED,
    marginTop: Scale(40),
    marginLeft: Scale(25),
  },
  primaryText: {
    marginTop: Scale(30),
    fontSize: Scale(24),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  normalText: {
    fontSize: Scale(16),
    color: Colors.BLACK,
    textAlign: 'left',
    marginTop: Scale(5),
    marginBottom: Scale(25),
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
    justifyContent:'center',
    backgroundColor: Colors.TRANSPARENT,
    maxWidth: Scale(100),
  },
  modalText: {
    color: Colors.BLACK,
    fontSize: Scale(14),
    marginLeft:Scale(10),
    fontWeight:'500'
  },
  modalDropDown: {
    backgroundColor: Colors.WHITE,
    overflow: 'hidden',
    marginTop: Scale(-30),
    height:Scale(55)
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
