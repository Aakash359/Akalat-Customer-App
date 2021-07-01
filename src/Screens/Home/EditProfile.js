import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {CustomButton, FormInput} from '../../Component'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, connect} from 'react-redux'
import {
  EditProfileRequest,
} from '../../redux/actions'

function Profile(props) {
  const dispatch = useDispatch()
  const {profileDetails} = props.route.params
  const [first_name, setfirst_name] = useState(profileDetails?.first_name || '')
  const [last_name, setlast_name] = useState(profileDetails?.last_name || '')
  const [phone, setphone] = useState(profileDetails?.phone || '')
  const [email, setemail] = useState(profileDetails?.email || '')

  const {navigate} = useNavigation()
  const navigation = useNavigation()

  const onSave = async () => {
    let reg =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (first_name == '') {
      alert('Please enter First Name')
    } else if (last_name == '') {
      alert('Please enter Last Name')
    } else if (phone == '') {
      alert('Please enter your Mobile Number')
    } else if (email == '') {
      alert('Please enter your Email')
    } else if (reg.test(email) == false) {
      alert('Please enter valid email')
    } else {
      const data = {
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        email: email,
        _id: profileDetails?._id != undefined ? profileDetails?._id : 0,
      }

      dispatch(EditProfileRequest(data))
    }
    navigate('Profile')
  }

  useEffect(() => {
    if (props.editProfileStatus) {
       
    }
  }, [props?.editProfileStatus])

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
      <Text style={styles.headerText}>Edit Profile </Text>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <KeyboardAvoidingView
          style={styles.keyboardStyle}
          behavior={Platform.OS == 'android' ? '' : 'padding'}
          enabled>
          <ScrollView indicatorStyle="white">
            <FormInput
              placeholder="First Name"
              autoCapitalize = 'words'
              maxLength={30}
              value={first_name}
              onChangeText={(text) => setfirst_name(text)}
            />
            <FormInput
              placeholder="Last Name"
              autoCapitalize = 'words'
              maxLength={30}
              value={last_name}
              onChangeText={(text) => setlast_name(text)}
            />
            <FormInput
              placeholder="Mobile Number"
              autoCapitalize = 'none'
              keyboardType={'numeric'}
              maxLength={30}
              value={phone}
              onChangeText={(text) => setphone(text)}
            />
            <FormInput
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={30}
              value={email}
              onChangeText={(text) => setemail(text)}
            />
            <View style={{marginTop: Scale(20)}}>
              {props?.editProfileLoader ? (
                <ActivityIndicator color={Colors.APPCOLOR} />
              ) : (
                <CustomButton
                  title="Save"
                  isSecondary={true}
                  onSubmit={onSave}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  )
}

const mapStateToProps = ({
  Setting: {editProfileLoader, editProfileStatus},
}) => ({
  editProfileLoader,
  editProfileStatus,
})

export default connect(mapStateToProps)(Profile)

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
