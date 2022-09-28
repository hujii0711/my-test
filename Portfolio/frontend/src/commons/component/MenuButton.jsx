import * as React from 'react';
import {View, Text} from 'react-native';
import {Button, Menu, Divider, Provider, IconButton} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={{}}
          contentStyle={{backgroundColor: '#f1f2f6'}}
          anchor={
            <IconButton
              onPress={openMenu}
              icon="folder-settings-outline"
              iconColor="#0a3d62"
              size={24}
            />
          }>
          <Menu.Item
            leadingIcon={() => (
              <Ionicons
                name="md-checkmark-circle"
                size={20}
                color="#3a3a3a"
                style={{}}
              />
            )}
            titleStyle={{fontSize: 14}}
            contentStyle={{}}
            style={{height: 30, marginBottom: 5}}
            onPress={() => {}}
            title="방나가기"
          />
          <Divider />
          <Menu.Item
            leadingIcon={() => (
              <Ionicons
                name="md-checkmark-circle"
                size={20}
                color="#3a3a3a"
                style={{}}
              />
            )}
            titleStyle={{fontSize: 14}}
            contentStyle={{}}
            style={{height: 30, marginTop: 5}}
            onPress={() => {}}
            title="차단"
          />
        </Menu>
      </View>
    </Provider>
  );
};

export default MyComponent;
