import React, {Component} from 'react'
import {Text, View, StatusBar, Alert, Clipboard, LogBox} from 'react-native'
import {Colors} from './CommonConfig'
// import messaging from '@react-native-firebase/messaging';
//yarn remove "@react-native-firebase/app"
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

  // async getToken() {
  //   var fcmToken = undefined;
  //   // let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   if (fcmToken == null || fcmToken == undefined) {
  //     messaging()
  //       .getToken()
  //       .then(async (token) => {
  //         console.log(token, 'token');
  //         // await AsyncStorage.setItem('fcmToken', token);
  //         // global.DeviceToken = token
  //         // alert(token)

  //         Alert.alert(
  //           '',
  //           'Token',
  //           [
  //             {text: 'Cancle', onPress: () => console.log('hhh')},
  //             {
  //               text: 'copy',
  //               onPress: () => Clipboard.setString(token),
  //             },
  //           ],
  //           {cancelable: false},
  //         );
  //       });
  //   } else {
  //     Alert.alert(
  //       '',
  //       'Token',
  //       [
  //         {text: 'Cancle', onPress: () => console.log('hhh')},
  //         {
  //           text: 'copy',
  //           onPress: () => Clipboard.setString(fcmToken),
  //         },
  //       ],
  //       {cancelable: false},
  //     );
  //     // global.DeviceToken = fcmToken
  //     // alert(fcmToken)
  //   }
  // }

  // async checkPermission() {
  //   const enabled = await messaging().requestPermission();

  //   if (enabled) {
  //     this.getToken();
  //   } else {
  //     this.requestPermission();
  //   }
  // }

  // async requestPermission() {
  //   const enabled = await messaging().requestPermission();
  //   try {
  //     if (enabled) {
  //       this.getToken();
  //     } else {
  //       this.requestPermission();
  //     }
  //   } catch (error) {
  //     console.log('permission rejected');
  //     this.requestPermission();
  //   }
  // }

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
