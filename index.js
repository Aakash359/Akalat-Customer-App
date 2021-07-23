/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'
import 'react-native-gesture-handler'
import Geolocation from '@react-native-community/geolocation'

AppRegistry.registerComponent(appName, () => App)
