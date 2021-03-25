import React, {useState,useEffect} from 'react';
import HamburgerButton from '../../containers/HamburgerButton';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../tab/index';
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
import Settings from '../../Screens/Home/Settings';
import ChangePassword from '../../Screens/Home/ChangePassword';
import SavedCard from '../../Screens/Home/SavedCard';
import HelpSupport from '../../Screens/Home/HelpSupport';
import Order from '../../Screens/Home/Order';
import AboutUs from '../../Screens/Home/AboutUs';
import PrivacyPolicy from '../../Screens/Home/PrivacyPolicy';
import TermCondition from '../../Screens/Home/TermCondition';
import FAQs from '../../Screens/Home/FAQs';
import Filter from '../../Screens/Home/Filter';
import Rating from '../../Screens/Home/Rating';
import SortBy from '../../Screens/Home/SortBy';
import ManageAddress  from "../../Screens/Home/ManageAddress";
import AddNewCard  from "../../Screens/Home/AddNewCard";
import EditCard from '../../Screens/Home/EditCard';
import SelectLocation from '../../Screens/Home/SelectLocation';
import AddNewAddress from '../../Screens/Home/AddNewAddress';
import Coupon from '../../Screens/Home/Coupon';
import EditAddress from '../../Screens/Home/EditAddress';
import RightButton from '../../containers/RightButton';
import {headerLeftStyle,} from '../Helper';

import LogoTitle from '../../containers/LogoTitle';
const Stack = createStackNavigator();
function HomeStack(navigation) {

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}       
          options={{
            headerTitle: props => <LogoTitle {...props} />,
            ...headerLeftStyle(),
            headerLeft: () => <HamburgerButton  navigation={navigation}/>,
            headerRight: () => <RightButton navigation={navigation} />
          }}
         
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
      <Stack.Screen
        name="SavedCard"
        component={SavedCard}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupport}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="AboutUs"
        component={AboutUs}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="TermCondition"
        component={TermCondition}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="FAQs"
        component={FAQs}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="AddNewCard"
        component={AddNewCard}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="Filter"
        component={Filter}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="Rating"
        component={Rating}       
          options={{ headerShown: false}}
         
      />
        <Stack.Screen
        name="SortBy"
        component={SortBy}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="SelectLocation"
        component={SelectLocation}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="AddNewAddress"
        component={AddNewAddress}       
          options={{ headerShown: false}}
         
      />
        <Stack.Screen
        name="EditCard"
        component={EditCard}       
          options={{ headerShown: false}}
         
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddress}       
          options={{ headerShown: false}}
         
      />
       <Stack.Screen
        name="Order"
        component={Order}       
          options={{ headerShown: false}}
         
      />
        <Stack.Screen
        name="Coupon"
        component={Coupon}       
          options={{ headerShown: false}}
         
      />
          </Stack.Navigator>
  );
}
export default HomeStack;
