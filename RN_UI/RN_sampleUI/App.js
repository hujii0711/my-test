import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './screens/DrawerNavigator';

function App() {
  console.log('App start!');
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default App;
