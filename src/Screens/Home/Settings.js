import React, {useState} from 'react'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Switch,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath, LogoutAlert} from '../../CommonConfig'
import {CustomButton} from '../../Component'
import {useNavigation, CommonActions} from '@react-navigation/native'
import {logOutRequest, loaderRequest} from '../../redux/actions'
import {useSelector, useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import {LoadWheel} from '../../CommonConfig/LoadWheel'

function Settings() {
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const signupResponse = useSelector((state) => state.Auth)
  const [logoutModal, setLogoutModal] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)
  const {isLoading} = useSelector((state) => state.Auth)

  const Userid = signupResponse?.user?._id

  const setCheckedSwitch = () => {
    setIsEnabled(!isEnabled)
  }
  const [data, setData] = React.useState([
    {name: 'Change Password', screenName: 'ChangePassword'},
    {name: 'Manage Address', screenName: 'ManageAddress'},
    {name: 'Saved Cards', screenName: 'SavedCard'},
  ])

  const redirectToLogin = async () => {
    dispatch(loaderRequest(true))
    let keys = ['token']
    // await AsyncStorage.clear()
    dispatch(logOutRequest(data))

    setLogoutModal(false)
  }
  const renderItems = ({item, index}) => (
    <TouchableOpacity onPress={() => navigate(item.screenName)}>
      <View style={styles.cardStyle}>
        <Text style={styles.textStyle}>{item.name}</Text>
        <Image source={ImagesPath.right_new} />
      </View>
    </TouchableOpacity>
  )

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
      <Text style={styles.headerText}>Settings </Text>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <ScrollView>
          <View style={styles.cardStyle}>
            <Text style={styles.textStyle}>Notifications</Text>
            <Switch
              trackColor={{false: Colors.BORDERCOLOR, true: Colors.DARK_RED}}
              style={{transform: [{scaleX: 0.9}, {scaleY: 0.8}]}}
              thumbColor={isEnabled ? Colors.WHITE : Colors.WHITE}
              ios_backgroundColor={Colors.GREEN}
              onValueChange={setCheckedSwitch}
              value={isEnabled}
            />
          </View>
          <FlatList data={data} renderItem={renderItems} />
          <TouchableOpacity onPress={() => setLogoutModal(true)}>
            <View style={styles.cardStyle}>
              <Text style={styles.textStyle}>{'Logout'}</Text>
              <Image source={ImagesPath.right_new} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
      <LogoutAlert
        visible={logoutModal}
        title={'Logout'}
        alertTitle={'Are you sure you want to\nlogout ? '}
        rightButtonText={'Yes'}
        leftButtonText={'No'}
        onPressLeftButton={() => setLogoutModal(false)}
        onPressRightButton={redirectToLogin}
      />
      <LoadWheel visible={isLoading} />
    </View>
  )
}
export default Settings
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
  },
  textStyle: {
    color: '#202020',
    fontSize: Scale(16),
  },
  inputStyle: {
    color: Colors.BLACK,
    fontSize: Scale(16),
    marginBottom: Scale(15),
    fontWeight: 'bold',
  },
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Scale(25),
    height: Scale(65),
    borderBottomWidth: Scale(2),
    borderBottomColor: '#ABBFBE',
  },
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
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
