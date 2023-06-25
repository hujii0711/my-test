import * as React from 'react';
import {getHeaderTitle} from '@react-navigation/elements';
import {createStackNavigator} from '@react-navigation/stack';
import Color from '../commons/style/Color';
import {MenuList} from './MenuList';
import useAuthLoadEffect from '../commons/hooks/useAuthLoadEffect';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {Appbar, Menu, Divider, Provider, IconButton} from 'react-native-paper';

const Stack = createStackNavigator();

const RootNavigator = () => {
  useAuthLoadEffect();

  const {users} = useSelector(({userReducer}) => ({
    users: userReducer.users,
  }));

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          header: ({navigation, route, options, back}) => {
            const title = getHeaderTitle(options, route.name);
            const isChatSocketMessage = route.name === 'ChatSocketMessage';
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
                {isChatSocketMessage && (
                  <Provider>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        style={{marginTop: 50}}
                        contentStyle={{backgroundColor: '#f1f2f6'}}
                        anchor={
                          <IconButton
                            onPress={openMenu}
                            icon="folder-settings-outline"
                            color="#ffffff"
                            size={24}
                          />
                        }>
                        <Menu.Item
                          icon="folder-settings-outline"
                          titleStyle={{fontSize: 14}}
                          contentStyle={{}}
                          style={{height: 30, marginBottom: 5}}
                          onPress={() => {}}
                          title="방나가기"
                        />
                        <Divider />
                        <Menu.Item
                          icon="folder-settings-outline"
                          titleStyle={{fontSize: 14}}
                          contentStyle={{}}
                          style={{height: 30, marginTop: 5}}
                          onPress={() => {}}
                          title="차단"
                        />
                      </Menu>
                    </View>
                  </Provider>
                )}
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
