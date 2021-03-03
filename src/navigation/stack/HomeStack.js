import * as React from 'react';
import HamburgerButton from '../../containers/HamburgerButton';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../tab';
import HomeMaker from '../../Screens/Home/HomeMaker';
import Payment from '../../Screens/Home/Payment';
import Notification from '../../Screens/Home/Notification';
import PlaceOrder from '../../Screens/Home/PlaceOrder';
import TrackOrder from '../../Screens/Home/TrackOrder';
import Profile from '../../Screens/Home/Profile';
import Offers from '../../Screens/Home/Offers';
import Share from '../../Screens/Home/Share';
import EditProfile from '../../Screens/Home/EditProfile';
import Favorites from '../../Screens/Home/Favorites';
import MyOrders from '../../Screens/Home/MyOrders';
import {headerLeftStyle} from '../Helper';
import Settings from '../../Screens/Home/Settings';
import ChangePassword from '../../Screens/Home/ChangePassword';
import ManageAddress  from "../../Screens/Home/ManageAddress";
import RightButton from '../../containers/RightButton';
const Stack = createStackNavigator();

function HomeStack(navigation) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="HomeMaker"
        component={HomeMaker}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="Payment"
        component={Payment}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="PlaceOrder"
        component={PlaceOrder}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="TrackOrder"
        component={TrackOrder}       
          options={{ headerShown: false}}
         
      />
        <Stack.Screen
        name="Notification"
        component={Notification}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="Profile"
        component={Profile}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="EditProfile"
        component={EditProfile}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="Offers"
        component={Offers}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="Favorites"
        component={Favorites}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrders}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="Share"
        component={Share}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="Settings"
        component={Settings}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="ManageAddress"
        component={ManageAddress}       
          options={{ headerShown: false}}
         
      />
          </Stack.Navigator>
  );
}
export default HomeStack;
