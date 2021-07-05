import * as React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import NearMe from '../../Screens/Home/NearMe'
import Explore from '../../Screens/Home/Explore'
import HungryNow from '../../Screens/Home/HungryNow'
import MyAccount from '../../Screens/Home/MyAccount'
import Card from '../../Screens/Home/Card'
import ImageIcon from '../../containers/ImageIcon'
import {Scale, Colors, ImagesPath,} from '../../CommonConfig'

const getOptions = ({tabBarLabel, icon}) => {
  return {
    tabBarIcon: ({color}) => <ImageIcon src={icon} tintColor={color} />,
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
          fontSize: Scale(14),
          textTransform: 'capitalize',
          marginBottom: 5,
        },
        style: {
          height: 65,
          paddingTop: 10,
          paddingBottom: 10,
        },
      }}>
      <Tab.Screen
        name="NearMe"
        component={NearMe}
        options={{
          ...getOptions({
            tabBarLabel: 'Near Me',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            icon: ImagesPath.location,
          }),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          ...getOptions({
            tabBarLabel: 'Explore',
            icon: ImagesPath.search,
          }),
        }}
      />
      <Tab.Screen
        name="HungryNow"
        component={HungryNow}
        options={{
          ...getOptions({
            tabBarLabel: 'Hungry Now',
            icon: ImagesPath.hungry,
          }),
        }}
      />
      <Tab.Screen
        name="Card"
        component={Card}
        options={{
          ...getOptions({
            tabBarLabel: 'Cart',
            icon: ImagesPath.card,
          }),
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          ...getOptions({
            tabBarLabel: 'My Account',
            icon: ImagesPath.user,
          }),
        }}
      />
    </Tab.Navigator>
  )
}
export default index
