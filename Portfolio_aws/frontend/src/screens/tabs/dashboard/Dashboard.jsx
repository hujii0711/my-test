import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native';
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
import ThirdTab from './ThirdTab';
import ForthTab from './ForthTab';
import TestTab from './TestTab';

const Tabs = createMaterialTopTabNavigator();
/**
 * 타이틀 우선순위
 * 1. Tabs.Screen.options.tabBarLabel
 * 2. Tabs.Navigator.screenOptions.tabBarLabel
 * 3. Tabs.Screen.options.title
 */
const Dashboard = () => {
  return (
    <PaperProvider>
      <Tabs.Navigator
        screenOptions={({route}) => ({
          //tabBarLabel: '테스트', //route.name.toLowerCase(),
          tabBarLabelStyle: {
            fontSize: 14, // 탭의 라벨(텍스트)의 크기를 지정합니다.
            fontWeight: 'bold', // 탭의 라벨의 폰트 굵기를 지정합니다.
          },
          tabBarStyle: {
            backgroundColor: '#fefefe', // 탭 바의 배경색을 지정합니다.
          },
          tabBarActiveTintColor: '#b57fb3', // 활성화된 탭의 아이콘과 라벨의 색상을 지정합니다.
          tabBarInactiveTintColor: '#f8dae2', // 비활성화된 탭의 아이콘과 라벨의 색상을 지정합니다.
          tabBarIndicatorContainerStyle: {
            //backgroundColor:"red",
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#b57fb3',
            height: 2,
            //width: "40%",
            //alignItems:'center',
            //flexDirection: "row"
            //marginLeft: 15
            //alignContent:"center",
            //paddingHorizontal:30
          },
          //tabBarContentContainerStyle:{
          //  backgroundColor: "red"
          //},
          tabBarItemStyle: {
            width: 'auto',
          },
        })}>
        <Tabs.Screen name="가로 스크롤" component={FirstTab} />
        <Tabs.Screen name="스와이프" component={SecondTab} />
        <Tabs.Screen name="차트" component={ThirdTab} />
        <Tabs.Screen name="차트2" component={TestTab} />
        <Tabs.Screen
          name="tab04"
          //options={{title: 'tab04'.toLowerCase()}}
          options={{
            // tabBarIcon: ({color}) => (
            //   <Icon name="shape-outline" color={color} size={24} />
            // ),
            tabBarLabel: '레거시', //'Tab04'.toLowerCase(),
          }}
          component={ForthTab}
        />
      </Tabs.Navigator>
    </PaperProvider>
  );
};

export default Dashboard;
