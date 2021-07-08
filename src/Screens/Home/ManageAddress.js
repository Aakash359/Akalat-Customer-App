import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath, LogoutAlert} from '../../CommonConfig'
import {useNavigation} from '@react-navigation/native'
import {AddressListRequest, deleteAddressRequest} from '../../redux/actions'
import {useSelector, useDispatch} from 'react-redux'

function ManageAddress() {
  const addressListResponse = useSelector(
    (state) => state.Setting.addressListResponse,
  )

  const addressList = addressListResponse?.data?.addressList || []

  const [deleteAdd, setDeleteAdd] = useState({
    id: null,
    show: false,
  })
  const {navigate} = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.Auth.user)

  useEffect(() => {
    const data = {
      created_by: user?._id,
    }

    setTimeout(() => {
      dispatch(AddressListRequest(data))
    }, 5000)
  }, [])

  const delAdd = () => {
    dispatch(deleteAddressRequest({_id: deleteAdd?.id}))
    setDeleteAdd({...deleteAdd, show: false, id: null})
  }

  const redirectToAddress = () => {
    navigate('AddNewAddress')
  }
  const EditAddress = (address) => {
    navigate('EditAddress', {address})
  }
  const renderItems = ({item}) => (
    <View style={styles.cardStyle}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={([styles.placeText], {fontWeight: 'bold'})}>
            {item?.address_type}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            onPress={() =>
              setDeleteAdd({...deleteAdd, show: true, id: item?._id})
            }
            style={[
              styles.placeText,
              {color: Colors.APPCOLOR, fontWeight: 'bold'},
            ]}>
            Delete{' '}
          </Text>
          <Text
            onPress={() => EditAddress(item)}
            style={[
              styles.placeText,
              {
                color: Colors.APPCOLOR,
                marginLeft: Scale(10),
                fontWeight: 'bold',
              },
            ]}>
            Edit
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.placeText}>
          {item?.house_name_and_no},{item?.area_name},{item?.nearby}
        </Text>
      </View>
    </View>
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
      <View style={styles.buttonHeader}>
        <Text style={styles.headerText}>Manage Address </Text>
        <View style={styles.textStyle}>
          <Text
            onPress={redirectToAddress}
            style={{color: 'white', fontWeight: '700'}}>
            Add New Address
          </Text>
        </View>
      </View>
      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        <KeyboardAvoidingView
          style={styles.keyboardStyle}
          behavior={Platform.OS == 'android' ? '' : 'padding'}
          enabled>
          <ScrollView indicatorStyle="white">
            <FlatList
              data={addressList}
              renderItem={renderItems}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
      <LogoutAlert
        visible={deleteAdd?.show}
        title={'Delete Address'}
        alertTitle={'Are you sure you want to delete this address?'}
        rightButtonText={'No'}
        leftButtonText={'Yes'}
        onPressLeftButton={() => delAdd()}
        onPressRightButton={() => setDeleteAdd({...deleteAdd, show: false})}
      />
    </View>
  )
}
export default ManageAddress
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
  },
  textStyle: {
    borderWidth: 1.5,
    padding: 15,
    borderRadius: 25,
    borderColor: 'white',
    paddingVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Scale(10),
  },
  placeText: {
    fontSize: Scale(16),
    color: Colors.BLACK,
  },

  cardStyle: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: Scale(2),
    borderColor: Colors.LIGHTGREY,
    marginVertical: Scale(15),
    paddingHorizontal: Scale(15),
    paddingVertical: Scale(15),
    alignSelf: 'center',
    borderRadius: Scale(10),
  },
  buttonContainer: {
    alignItems: 'center',
    borderWidth: Scale(1),
    borderColor: Colors.WHITE,
    borderRadius: Scale(26),
  },
  buttonHeader: {
    height: Scale(50),
    marginBottom: Scale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Scale(25),
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
    fontWeight: 'bold',
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
