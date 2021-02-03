import * as React from 'react';
import HamburgerButton from '../../containers/HamburgerButton';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../tab';
import {headerLeftStyle} from '../Helper';
import RightButton from '../../containers/RightButton';
const Stack = createStackNavigator();

function HomeStack(navigation) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerBackTitleVisible: false,
          title: 'Dashboard ',
          ...headerLeftStyle(),
          headerBackTitle: 'BACK',
          headerLeft: () => <HamburgerButton />,          
          headerRight: () => <RightButton navigation={navigation} />,
        }}
      />
          </Stack.Navigator>
  );
}
export default HomeStack;
