import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RootNavigator from './screens/RootNavigator';
import DrawerItems from './screens/DrawerItems';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <React.Fragment>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={() => <DrawerItems />}>
            <Drawer.Screen
              name="Home"
              component={RootNavigator}
              options={{headerShown: false}}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </React.Fragment>
    </SafeAreaProvider>
  );
};

export default App;
