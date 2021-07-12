import React, {useState} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  ImageBackground,
} from 'react-native'
import {SafeAreaInsetsContext} from 'react-native-safe-area-context'
import {
  screenWidth,
  screenHeight,
  ImagesPath,
  COUNTRY,
  Colors,
  Scale,
  Fonts,
} from '../../CommonConfig'
import {AuthStyle} from './AuthStyle'
import {useNavigation} from '@react-navigation/native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {useSelector, useDispatch, connect} from 'react-redux'
import {CustomButton} from '../../Component'
import {OTPVerifyRequest, OTPRequest} from '../../redux/actions'

function Otp(props) {
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [otp, setotp] = useState('')
  const [phone, setphone] = useState(props.route.params.phone)
  const [email, setemail] = useState(props.route.params.email)
  const otpData = useSelector(({Auth: {otpResponse}}) => otpResponse)

  const onSubmit = () => {
    if (otp == '') {
      alert('Please enter otp')
    } else {
      const data = {
        otp: otp,
        role: 'user',
        phone: phone,
        country_code: COUNTRY == 'IN' ? '91' : '971',
        verification_status: 'true',
      }

      dispatch(OTPVerifyRequest(data))
    }
  }

  const onPress = () => {
    const data = {
      phone: phone,
      role: 'user',
      country_code: COUNTRY == 'IN' ? '91' : '971',
    }

    navigate('Otp', data)
    dispatch(OTPRequest(data))
    alert('OTP has been sent successfully')
  }
  React.useEffect(() => {
    if (props?.otpSuccess) {
      if (props?.route?.params?.email) {
        const {data} = props?.otpReponse
        navigate('Address', {data: data})
      } else {
        const {data} = props?.otpReponse
        navigate('ResetPassword', {data: data})
      }
    }
  }, [props?.otpSuccess])

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <KeyboardAvoidingView
          style={AuthStyle.keyboardAware}
          showsVerticalScrollIndicator={false}>
          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <Image
                source={ImagesPath.otp}
                style={{width: screenWidth, flex: 1}}
              />
            </View>
            <ImageBackground
              source={ImagesPath.background}
              style={[AuthStyle.loginInputCont, {top: -20}]}>
              <View style={{paddingHorizontal: Scale(25)}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={ImagesPath.backArrow}
                    style={styles.arrowStyle}
                  />
                </TouchableOpacity>
                <Text style={styles.primaryText}>OTP Verification</Text>
                <Text style={styles.normalText}>
                  Enter the verification code send to {phone}, otp:{' '}
                  {otpData?.data?.otp}
                </Text>
                <View
                  style={{
                    justifyContent: 'space-between',
                    paddingTop: Scale(15),
                  }}>
                  <OTPInputView
                    style={styles.otpContainer}
                    pinCount={4}
                    keyboardType="number-pad"
                    autoFocusOnLoad
                    codeInputFieldStyle={{
                      backgroundColor: Colors.WHITE,
                      borderWidth: 1,
                      borderColor: Colors.BORDERCOLOR,
                      borderRadius: Scale(5),
                      color: Colors.BLACK,
                    }}
                    editable={true}
                    codeInputHighlightStyle={{
                      color: Colors.BLACK,
                      fontSize: Scale(16),
                    }}
                    value={otp}
                    onCodeFilled={(text) => setotp(text)}
                  />
                </View>
                <CustomButton
                  title="Submit"
                  onSubmit={onSubmit}
                  isSecondary={true}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={styles.normalText1}>Didn't get the code?</Text>
                  <TouchableOpacity onPress={onPress}>
                    <Text
                      style={{
                        color: Colors.DARK_RED,
                        justifyContent: 'center',
                      }}>
                      {' '}
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const mapStateToProps = (state) => {
  return {
    otpSuccess: state.Auth.OTPVerifyStatus,
    otpReponse: state.Auth.otpVerifyResponse,
  }
}

export default connect(mapStateToProps, null)(Otp)

const styles = StyleSheet.create({
  container: {height: screenHeight / 2, alignItems: 'center'},
  mainContainer: {justifyContent: 'space-between', paddingBottom: Scale(10)},
  normalText: {
    fontSize: Scale(16),
    fontFamily: Fonts.Medium,
    marginTop: Scale(5),
    textAlign: 'left',
    width: '80%',
    color: Colors.GRAY,
  },
  normalText1: {
    fontSize: Scale(16),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
  },
  otpContainer: {
    width: '70%',
    height: Scale(60),
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
    marginTop: Scale(20),
  },
})
