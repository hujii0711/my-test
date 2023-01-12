/* StackNavigator.js */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './HomeScreen';
import Details from './DetailScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export {StackNavigator};
