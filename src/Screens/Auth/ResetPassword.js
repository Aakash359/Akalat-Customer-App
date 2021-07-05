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
  Alert,
} from 'react-native'
import {SafeAreaInsetsContext} from 'react-native-safe-area-context'
import {
  screenWidth,
  screenHeight,
  ImagesPath,
  Colors,
  Scale,
  Fonts,
} from '../../CommonConfig'
import {AuthStyle} from './AuthStyle'
import {useNavigation} from '@react-navigation/native'
import {CustomButton, FormInput} from '../../Component'
import {connect} from 'react-redux'
import {API_BASE} from '../../apiServices/ApiService'
import axios from 'axios'

function ResetPassword(props) {
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const [form, setForm] = React.useState({password: '', confirm_password: ''})
  const [otpRes, setotpRes] = React.useState(props.route.params.data._id || '')

  const onReset = async () => {
    const {password, confirm_password} = form
    if (password == '') {
      return Alert.alert('', 'Please enter password')
    }
    if (confirm_password == '') {
      return Alert.alert('', 'Please enter confirm password')
    }
    if (password.length < 8 || confirm_password.length < 8) {
      return Alert.alert('', 'Please enter minimum 8 charcter password')
    }

    const url = `${API_BASE}/resetPassword`
    const payload = {
      password,
      confirm_password,
      phone: props?.route?.params?.data?.phone,
      _id: otpRes,
    }

    try {
      const res = await axios.post(url, payload)
      if (res?.data?.error) {
        Alert.alert('', res?.data?.message)
      } else {
        props.navigation.navigate('Login')
        Alert.alert('', 'Your Password has been changed successfully!')
      }
    } catch (error) {
      Alert.alert('', error.message)
    }
  }

  console.log(props)

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
            <View style={styles.container}>
              <Image
                source={ImagesPath.reset}
                style={{width: screenWidth, flex: 1}}
              />
            </View>
            <ImageBackground
              source={ImagesPath.background}
              style={AuthStyle.loginInputCont}>
              <View style={{paddingHorizontal: Scale(25)}}>
                <Text style={styles.primaryText}>Reset Password</Text>

                <View style={{marginVertical: Scale(2)}}>
                  <FormInput
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    maxLength={30}
                    onChangeText={(password) => setForm({...form, password})}
                  />
                </View>

                <FormInput
                  placeholder="Confirm Password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  maxLength={30}
                  onChangeText={(confirm_password) =>
                    setForm({...form, confirm_password})
                  }
                />
                <CustomButton
                  title="Submit"
                  onSubmit={onReset}
                  isSecondary={true}
                />
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const mapStateToProps = ({Auth: {otpVerifyResponse}}) => {
  return {
    user: otpVerifyResponse?.data,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)

const styles = StyleSheet.create({
  container: {
    height: screenHeight / 2,
    alignItems: 'center',
  },
  mainContainer: {
    justifyContent: 'space-between',
    paddingBottom: Scale(10),
  },
  normalText: {
    fontSize: Scale(16),
    fontFamily: Fonts.Medium,
    marginTop: Scale(5),
    textAlign: 'left',
    width: '80%',
    color: Colors.GRAY,
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
