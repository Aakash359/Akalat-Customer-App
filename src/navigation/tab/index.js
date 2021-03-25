import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NearMe from '../../Screens/Home/NearMe';
import Explore from '../../Screens/Home/Explore';
import HomeScreen from '../stack/HungryStack';
import MyAccount from '../../Screens/Home/MyAccount';
import Card from '../../Screens/Home/Card';
import ImageIcon from '../../containers/ImageIcon';
import { Scale, Colors, ImagesPath,LocationAlert } from '../../CommonConfig';
const getOptions = ({tabBarLabel, icon}) => {
  return {
    tabBarIcon: ({color}) => <ImageIcon src={icon} tintColor={color} />,
    tabBarLabel,
    //headerBackTitle: null,
    headerBackTitle: ' ',
  };
};
const Tab =  createBottomTabNavigator();

function index() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        inactiveTintColor: Colors.BORDERCOLOR,
        activeTintColor: Colors.DARK_RED,
        labelStyle: {fontSize:Scale(14), textTransform: 'capitalize',marginBottom:5},
        style: {
          height: 65,
          paddingTop: 10,
          paddingBottom: 10,
        //  borderTopLeftRadius: 12,
          //borderTopRightRadius: 12,
        },
        
      }}>
      <Tab.Screen
        name="NearMe"
        component={NearMe}
        options={{
          ...getOptions({
            tabBarLabel: 'Near Me',
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
        name="HomeScreen"
        component={HomeScreen}
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
            tabBarLabel: 'Card',
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
  );
}
export default index;
