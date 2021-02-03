import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import New from '../../Screens/Home/New';
import Preparing from '../../Screens/Home/Preparing';
import Ready from '../../Screens/Home/Ready';
import Past from '../../Screens/Home/Past';
import {Colors,Scale,} from '../../CommonConfig';

const Tab = createMaterialTopTabNavigator();

function index() {
  return (
    <Tab.Navigator
      initialRouteName="New"
      tabBarOptions={{
        inactiveTintColor: Colors.BLACK,
        activeTintColor: Colors.APPCOLOR,
        labelStyle: {fontSize:Scale(14), textTransform: 'capitalize'},
        indicatorStyle: {
          borderBottomColor:Colors.APPCOLOR,
          borderBottomWidth: Scale(2),
        },
      }}>
      <Tab.Screen
        name="New"
        component={New}
        options={{
          tabBarLabel: 'New',
        }}
      />
      <Tab.Screen
        name="Preparing"
        component={Preparing}
        options={{
          tabBarLabel: 'Preparing',
        }}
      />
      <Tab.Screen
        name="Ready"
        component={Ready}
        options={{
          tabBarLabel: 'Ready',
        }}
      />
       <Tab.Screen
        name="Past"
        component={Past}
        options={{
          tabBarLabel: 'Past',
        }}
      />
    </Tab.Navigator>
  );
}
export default index;
