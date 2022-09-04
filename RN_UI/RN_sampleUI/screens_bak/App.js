import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerItems from '/screens/DrawerItems';

const Drawer = createDrawerNavigator();

const App = props => {
  return (
    <SafeAreaProvider>
      <React.Fragment>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={() => <DrawerItems {...props} />}>
            <Drawer.Screen
              name="Home"
              component={StackNB}
              options={{headerShown: false}}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </React.Fragment>
    </SafeAreaProvider>
  );
};

export default App;
