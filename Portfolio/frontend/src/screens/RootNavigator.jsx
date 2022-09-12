import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';
import {createStackNavigator} from '@react-navigation/stack';
import Color from '../commons/style/Color';
import {MenuList} from './MenuList';
import useAuthLoadEffect from '../commons/hooks/useAuthLoadEffect';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const RootNavigator = () => {
  useAuthLoadEffect();

  const {users} = useSelector(({userReducer}) => ({
    users: userReducer.users,
  }));

  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          header: ({navigation, route, options, back}) => {
            const title = getHeaderTitle(options, route.name);

            return (
              <Appbar.Header elevated style={{backgroundColor: Color.main}}>
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
                <Appbar.Action
                  icon="dots-vertical"
                  onPress={() => {
                    console.log('userInfo===', users);
                  }}
                />
              </Appbar.Header>
            );
          },
        };
      }}>
      {MenuList.map(elem => (
        <Stack.Screen
          key={elem.id}
          name={elem.id}
          component={elem.component}
          options={elem.options && elem.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RootNavigator;
