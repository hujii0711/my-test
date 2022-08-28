import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StackDetail from './stack/StackDetailScreen';
import MainTab from './tab/MainTab';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/*
Stack.Screen 옵션
options={{
  title: '홈',
  // Header 블록에 대한 스타일
  headerStyle: {
    backgroundColor: '#29b6f6',
  },
  // Header의 텍스트, 버튼들 색상
  headerTintColor: '#ffffff',
  // 타이틀 텍스트의 스타일
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerLeft: ({onPress}) => (
      <TouchableOpacity onPress={onPress}>
          <Text>Left</Text>
      </TouchableOpacity>
  ),
  headerTitle: ({children}) => (
      <View>
          <Text>{children}</Text>
      </View>
  ),
  headerRight: () => (
      <View>
          <Text>Right</Text>
      </View>
  ),
  headerBackVisible : true // 뒤로가기 버튼 보일지 여부
}}

*/
const Stack = createStackNavigator();

const StackNavigator = () => {
  const navigation = useNavigation();
  const HeaderLeftClick = () => {
    console.log('뒤로!!');
    navigation.goBack();
  };

  return (
    <Stack.Navigator>
      {/* 헤더 뒤로가기는 메뉴 이동이 있을 때 활성화되고 최초 screen인 경우에도 비활성화 된다. */}
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{
          title: 'MAIN',
        }}
      />
      <Stack.Screen
        name="StackDetail"
        component={StackDetail}
        options={{
          headerShown: true,
          headerBackVisible: true, // 뒤로가기 버튼 보일지 여부
          headerStyle: {
            backgroundColor: '#29b6f6',
          },
          headerTintColor: '#ffffff', // Header의 텍스트, 버튼들 색상
          headerTitleStyle: {
            fontSize: 13, // 타이틀 텍스트의 스타일
          },
          headerLeft: () => (
            <TouchableOpacity onPress={HeaderLeftClick}>
              <Text>Left</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export {StackNavigator};
