import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';
import ScreenList from './ScreenList';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './tabs/MainTab';

import ShareScreen from './direct/ShareScreen';
import NotifyPushScreen from './direct/NotifyPushScreen';
import FilmingScreen from './direct/FilmingScreen';
import SendEmailScreen from './direct/SendEmailScreen';
import CalendarScreen from './direct/CalendarScreen';
import QRCodeScreen from './direct/QRCodeScreen';
import MapScreen from './direct/MapScreen';
import LinkScreen from './direct/LinkScreen';
import LocationScreen from './direct/LocationScreen';
import VoiceScreen from './direct/VoiceScreen';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          header: ({navigation, route, options, back}) => {
            const title = getHeaderTitle(options, route.name);

            return (
              <Appbar.Header elevated>
                {back ? (
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                ) : navigation.openDrawer ? (
                  <Appbar.Action
                    icon="menu"
                    onPress={() => navigation.openDrawer()}
                  />
                ) : null}
                <Appbar.Content title={title} />
                <Appbar.Action icon="magnify" onPress={() => {}} />
                <Appbar.Action icon="dots-vertical" onPress={() => {}} />
              </Appbar.Header>
            );
          },
        };
      }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="ShareScreen" component={ShareScreen} />
      <Stack.Screen name="NotifyPushScreen" component={NotifyPushScreen} />
      <Stack.Screen name="FilmingScreen" component={FilmingScreen} />
      <Stack.Screen name="SendEmailScreen" component={SendEmailScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="LinkScreen" component={LinkScreen} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="VoiceScreen" component={VoiceScreen} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
