import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../stack/HomeStack';
import Hamburger from '../../containers/Hamburger';
import {Colors,Scale,} from '../../CommonConfig';

const Drawer = createDrawerNavigator();

export default function index() {
  
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={Hamburger}
      drawerPosition="left"
      drawerContentOptions={{       
        activeBackgroundColor: Colors.WHITE,
        activeTintColor: Colors.BLACK,
        inactiveTintColor: Colors.BLACK,
        itemStyle: {
          marginHorizontal: 0,
        },
        labelStyle: {
          fontSize: Scale(18),
        },
      }}>
      
      <Drawer.Screen
        name="Home"
        component={Home}
      />
      
    </Drawer.Navigator>
  );
}
