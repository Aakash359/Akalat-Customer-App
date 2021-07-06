import React, {Component} from 'react'
import {Text, View, StatusBar, Alert, Clipboard, LogBox} from 'react-native'
import {Colors} from './CommonConfig'
// import messaging from '@react-native-firebase/messaging';
//yarn remove "@react-native-firebase/app"
import SplashScreen from 'react-native-splash-screen'
import NetInfo from '@react-native-community/netinfo'
import DropdownAlert from 'react-native-dropdownalert'
import {Store, Persistor} from './redux/Store'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import RootStack from './navigation'
import AsyncStorage from '@react-native-community/async-storage'

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

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
  }

 
  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <Provider store={Store}>
          <PersistGate persistor={Persistor}>
            <StatusBar
              translucent={true}
              backgroundColor="#ffffff"
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
