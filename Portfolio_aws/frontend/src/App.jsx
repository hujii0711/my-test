import * as React from 'react';
import {Provider} from 'react-redux';
import {legacy_createStore as createStore} from 'redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {QueryClient, QueryClientProvider} from 'react-query';
import RootNavigator from './screens/RootNavigator';
import DrawerItems from './screens/DrawerItems';
import reducers from './commons/redux';
import usePush from './commons/hooks/usePush';
import SplashScreen from 'react-native-splash-screen';

const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();
const store = createStore(reducers);

const App = () => {
  // 푸시 알림
  usePush();

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return (
    <SafeAreaProvider>
      <React.Fragment>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <Drawer.Navigator drawerContent={() => <DrawerItems />}>
                <Drawer.Screen
                  name="Home"
                  component={RootNavigator}
                  options={{headerShown: false}}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </QueryClientProvider>
        </Provider>
      </React.Fragment>
    </SafeAreaProvider>
  );
};

export default App;
