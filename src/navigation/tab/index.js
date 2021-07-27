import * as React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import NearMe from '../../Screens/Home/NearMe'
import Explore from '../../Screens/Home/Explore'
import HungryNow from '../../Screens/Home/HungryNow'
import MyAccount from '../../Screens/Home/MyAccount'
import Card from '../../Screens/Home/Card'
import ImageIcon from '../../containers/ImageIcon'
import {Scale, Colors, ImagesPath} from '../../CommonConfig'

const getOptions = ({tabBarLabel, icon, tint = true}) => {
  return {
    tabBarIcon: ({color}) => (
      <ImageIcon src={icon} tintColor={color} tint={tint} />
    ),
    tabBarLabel,
    headerBackTitle: ' ',
  }
}
const Tab = createBottomTabNavigator()

function index() {
  return (
    <Tab.Navigator
      initialRouteName="Near Me"
      tabBarOptions={{
        inactiveTintColor: Colors.BORDERCOLOR,
        activeTintColor: Colors.DARK_RED,
        labelStyle: {
          fontSize: Scale(10),
          textTransform: 'capitalize',
          marginBottom: 5,
          marginTop: 5,
        },
        style: {
          height: 70,
          paddingTop: 10,
          paddingBottom: 10,
        },
      }}>
      <Tab.Screen
        name="NearMe"
        component={NearMe}
        options={({navigation: {isFocused}}) => {
          const focus = isFocused()

          return {
            ...getOptions({
              tabBarLabel: 'Near Me',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="ios-home"
                  color={color}
                  size={size}
                />
              ),
              icon: focus ? ImagesPath.locActive : ImagesPath.location,
            }),
          }
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={({navigation: {isFocused}}) => {
          const focus = isFocused()

          return {
            ...getOptions({
              tabBarLabel: 'Explore',
              icon: focus ? ImagesPath.searchActive : ImagesPath.search,
            }),
          }
        }}
      />
      <Tab.Screen
        name="HungryNow"
        component={HungryNow}
        options={{
          ...getOptions({
            tabBarLabel: 'Hungry Now',
            icon: ImagesPath.hungry,
            tint: false,
          }),
        }}
      />
      <Tab.Screen
        name="Card"
        component={Card}
        options={({navigation: {isFocused}}) => {
          const focus = isFocused()

          return {
            ...getOptions({
              tabBarLabel: 'Cart',
              icon: focus ? ImagesPath.cartActive : ImagesPath.card,
            }),
          }
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={({navigation: {isFocused}}) => {
          const focus = isFocused()

          return {
            ...getOptions({
              tabBarLabel: 'My Account',
              icon: focus ? ImagesPath.userActive : ImagesPath.user,
            }),
          }
        }}
      />
    </Tab.Navigator>
  )
}
export default index
