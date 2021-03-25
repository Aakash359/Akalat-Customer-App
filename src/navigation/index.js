import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import SelectLanguage from '../Screens/Auth/SelectLanguage';
import Step from '../Screens/Auth/Step';
import Step1 from '../Screens/Auth/Step1';
import Step2 from '../Screens/Auth/Step2';
import SelectLoginSignup from '../Screens/Auth/SelectLoginSignup';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import ResetPassword from '../Screens/Auth/ResetPassword';
import Address from '../Screens/Auth/Address';
import HomeStack from './stack/HomeStack';
import Otp from '../Screens/Auth/Otp';
import 'react-native-gesture-handler'
const Stack = createStackNavigator();
function index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectLanguage">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectLanguage"
          component={SelectLanguage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectLoginSignup"
          component={SelectLoginSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown:false}}
         />
          <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown:false}}
         />
         <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown:false}}
         />
         <Stack.Screen
          name="Address"
          component={Address}
          options={{headerShown:false}}
         />
          <Stack.Screen
          name="Otp"
          component={Otp}
          options={{headerShown:false}}
         />
          <Stack.Screen
          name="Step"
          component={Step}
          options={{headerShown:false}}
         />
         <Stack.Screen
          name="Step1"
          component={Step1}
          options={{headerShown:false}}
         />
         <Stack.Screen
          name="Step2"
          component={Step2}
          options={{headerShown:false}}
         />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default index;
