import React, {Component} from 'react'
import {
  Text,
  View,
  StatusBar,
  Alert,
  Clipboard,
  LogBox,
  Platform,
  PermissionsAndroid,
} from 'react-native'
import {Colors} from './CommonConfig'
import SplashScreen from 'react-native-splash-screen'
import NetInfo from '@react-native-community/netinfo'
import DropdownAlert from 'react-native-dropdownalert'
import {Store, Persistor} from './redux/Store'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import RootStack from './navigation'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from '@react-native-community/geolocation'
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
export class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
    NetInfo.addEventListener((state) => {
      if (state.isConnected === false && state.isInternetReachable === false) {
        global.dropDownAlertRef &&
          global.dropDownAlertRef.alertWithType(
            'error',
            'Error',
            'No Internet Connection',
          )
      }
      global.isNetConnected = state.isConnected
    })
    Geolocation.setRNConfiguration({
      authorizationLevel: 'whenInUse',
      skipPermissionRequests: false,
    })
    this.requestLocationPermission()
  }

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse')
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
        }
      } catch (err) {}
    }
  }
  

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <Provider store={Store}>
          <PersistGate persistor={Persistor}>
            <StatusBar
              translucent={true}
              backgroundColor="#fff"
              barStyle="light-content"
            />
            <RootStack />
            <DropdownAlert
              ref={(ref) => (global.dropDownAlertRef = ref)}
              inactiveStatusBarStyle="light-content"
              translucent={true}
              inactiveStatusBarBackgroundColor="transparent"
            />
          </PersistGate>
        </Provider>
      </View>
    )
  }
}

export default App
