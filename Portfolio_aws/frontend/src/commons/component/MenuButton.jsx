import * as React from 'react';
import {View, Text} from 'react-native';
import {Button, Menu, Divider, Provider, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuButton = ({isVisible}) => {
  //console.log('MenuButton >>>> isVisible-----', isVisible);
  const [visible, setVisible] = React.useState(false);
  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);

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
              <Icon name="md-checkmark-circle" size={20} color="#3a3a3a" />
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
              <Icon name="md-checkmark-circle" size={20} color="#3a3a3a" />
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

export default MenuButton;
