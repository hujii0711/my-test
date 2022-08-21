import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ArticlesScreen from './ArticlesScreen';
import UserMenuScreen from './UserMenuScreen';
import FileUploadScreen from './FileUploadScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Articles"
        component={ArticlesScreen}
        options={{
          title: '게시글 목록',
          tabBarIcon: ({color, size}) => <MaterialIcons name="article" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="UserMenu"
        component={UserMenuScreen}
        options={{
          title: '사용자 메뉴',
          tabBarIcon: ({color, size}) => <MaterialIcons name="person" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="FileUpload"
        component={FileUploadScreen}
        options={{
          title: '파일업로드',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="add-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
