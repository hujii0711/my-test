import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigator} from './StackNavigator';
import About from './AboutScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{drawerLabel: 'HOME'}}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{drawerLabel: 'ABOUT'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
