import {useEffect} from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {legacy_createStore as createStore} from 'redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from './screens/RootNavigator';
import DrawerItems from './screens/DrawerItems';
import reducers from './commons/redux';
import usePush from './commons/hooks/usePush';
import Color from './commons/style/Color';

const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();
const store = createStore(reducers);

const App = () => {
  // 푸시 알림
  usePush();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return (
    <SafeAreaProvider>
      <>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <StatusBar backgroundColor={Color.black} barStyle="light-content" />
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
      </>
    </SafeAreaProvider>
  );
};

export default App;
