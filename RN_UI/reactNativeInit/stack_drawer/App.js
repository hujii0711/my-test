import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';

function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default App;
