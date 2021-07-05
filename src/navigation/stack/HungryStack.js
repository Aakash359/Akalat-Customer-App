import * as React from 'react';
import HamburgerButton from '../../containers/HamburgerButton';
import {createStackNavigator} from '@react-navigation/stack';
import HungryNow from '../../Screens/Home/HungryNow';
import {headerLeftStyle} from '../Helper';
import RightButton from '../../containers/RightButton';

const Stack = createStackNavigator();

function HungryStack(navigation) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HungryNow"
        component={HungryNow}       
          options={{ headerShown: false}}
         
      />

      
    </Stack.Navigator>
  );
}
export default HungryStack;
