import * as React from 'react';
import { View } from 'react-native';
import { Appbar, Menu, Divider, Provider, IconButton } from 'react-native-paper';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
  <Appbar.Header>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title="Title" />
    <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
    <Provider>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={{marginTop:50}}
          anchor={
            <IconButton
              onPress={openMenu}
              icon="folder-settings-outline"
              iconColor="#0a3d62"
              size={24}
            />
          }>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </Provider>
  </Appbar.Header>
  )
};

export default MyComponent;