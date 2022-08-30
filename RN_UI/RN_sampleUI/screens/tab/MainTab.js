import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();
function DashBoardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <View style={styles.middle} />
      <View style={styles.bottom} />
    </View>
  );
}

function BoardScreen() {
  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function MyBoardScreen() {
  return (
    <View>
      <Text>MyBoardScreen</Text>
    </View>
  );
}

function ImageUploadScreen() {
  return (
    <View>
      <Text>ImageUploadScreen</Text>
    </View>
  );
}

function ImageViewerScreen() {
  return (
    <View>
      <Text>ImageViewerScreen</Text>
    </View>
  );
}

function ChattingScreen() {
  return (
    <View>
      <Text>ChattingScreen</Text>
    </View>
  );
}

function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="DashBoard"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: 'red', //활성화 탭 하단 구분선
        },
        tabBarActiveTintColor: 'red', //활성화 아이콘 색상
        tabBarStyle: {backgroundColor: 'powderblue', height: 50},
      }}>
      <Tab.Screen
        name="DashBoard"
        component={DashBoardScreen}
        options={{
          //tabBarLabel: '대시보드_1',
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Icon name="dashboard" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Board"
        component={BoardScreen}
        options={{
          //tabBarLabel: '게시글_2',
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Icon name="view-carousel" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="MyBoard"
        component={MyBoardScreen}
        options={{
          //tabBarLabel: '나의 게시글_3',
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Icon name="view-headline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ImageUpload"
        component={ImageUploadScreen}
        options={{
          //tabBarLabel: '사진 올리기_4',
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Icon name="view-module" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ImageViewer"
        component={ImageViewerScreen}
        options={{
          //tabBarLabel: '업로드 사진 뷰어_5',
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Icon name="accessible-forward" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatting"
        component={ChattingScreen}
        options={{
          //tabBarLabel: '채팅_6',
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Icon name="view-comfy" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
//1) display 속성은 기본적으로 flex이며, 다른값은 none 밖에 없다.
//2) flexDirection 속성의 기본값은 웹에서는 row이지만, 리액트 네이티브에서는 column이다.
//Web default)
//justify... : 가로 정렬
//align... : 세로 정렬
//RN default)
//justify... : 세로 정렬
//align... : 가로 정렬

/* justify-content: flex-start; */
/* justify-content: flex-end; */
/* justify-content: center; */
/* justify-content: space-between; */
/* justify-content: space-around; */
/* justify-content: space-evenly; */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', //세로 정렬
    backgroundColor: 'orange',
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    //height: 50,
    //width: 50,
    backgroundColor: 'grey',
    borderWidth: 2,
    borderRadius: 20,
    //borderTopLeftRadius: 20,
    //borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: 'beige',
    borderWidth: 2,
    borderRadius: 20,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: 'pink',
    borderWidth: 2,
    borderRadius: 20,
    //borderBottomLeftRadius: 20,
    //borderBottomRightRadius: 20,
  },
  container2: {
    flex: 1,
    backgroundColor: 'orange',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default MainTab;

// import * as React from 'react';
// import { Text, View, Animated, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// function FeedScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed!</Text>
//     </View>
//   );
// }

// function NotificationsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications!</Text>
//     </View>
//   );
// }

// function ProfileScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Profile!</Text>
//     </View>
//   );
// }

// function MyTabBar({ state, descriptors, navigation, position }) {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             // The `merge: true` option makes sure that the params inside the tab screen are preserved
//             navigation.navigate({ name: route.name, merge: true });
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         const inputRange = state.routes.map((_, i) => i);
//         const opacity = position.interpolate({
//           inputRange,
//           outputRange: inputRange.map(i => (i === index ? 1 : 0)),
//         });

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Animated.Text style={{ opacity }}>
//               {label}
//             </Animated.Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const Tab = createMaterialTopTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Feed"
//       //style​: 탭 보기 컨테이너에 적용할 스타일입니다.
//       //tabBar​: 탭 표시줄로 표시할 React 요소를 반환하는 함수입니다.
//       //backBehavior: 네비게이터에서 되돌아가는 방법을 제어합니다.
//       //sceneContainerStyle​:각 화면을 래핑하는 뷰에 적용할 스타일입니다. 이것을 전달하여 오버플로 클리핑과 같은 일부 기본 스타일을 재정의할 수 있습니다.
//       //tabBar={(props) => <MyTabBar {...props} />}
//       screenOptions={{
//         tabBarActiveTintColor: '#e91e63', //활성 탭의 아이콘 및 레이블 색상입니다.
//         tabBarLabelStyle: { fontSize: 12 },
//         tabBarStyle: { backgroundColor: 'powderblue' },
//         //tabBarLabel​: 탭 표시줄에 표시되는 탭의 제목 문자열 또는 탭 표시줄 { focused: boolean, color: string }에 표시할 React.Node를 반환하는 함수.
//         //tabBarShowLabel: 탭 레이블이 표시되어야 하는지 여부입니다.
//         //tabBarShowIcon: 탭 아이콘이 표시되어야 하는지 여부입니다.
//         //tabBarIcon​: 주어진 함수 { focused: boolean, color: string }는 탭 표시줄에 표시할 React.Node를 반환합니다.
//         //tabBarInactiveTintColor​: "white", //비활성 탭의 아이콘 및 레이블 색상입니다.
//         //tabBarPosition: 탭 보기에서 탭 표시줄의 위치입니다.

//         //tabBarIndicatorStyle​:탭 표시줄 표시기의 스타일 개체입니다.
//         //tabBarIndicatorContainerStyle​:탭 표시줄 표시기를 포함하는 보기의 스타일 개체입니다.
//         //tabBarIconStyle​: 탭 아이콘 컨테이너의 스타일 개체입니다.
//         //tabBarLabelStyle​: 탭 레이블의 스타일 개체입니다.
//         //tabBarItemStyle​: 개별 탭 항목에 대한 스타일 개체입니다.
//         //tabBarContentContainerStyle​:탭 항목을 포함하는 보기의 스타일 개체입니다.
//         //tabBarStyle​: 탭 표시줄의 스타일 개체입니다.
//       }}
//     >
//       <Tab.Screen
//         name="Feed"
//         component={FeedScreen}
//         options={{ tabBarLabel: 'Home' }}
//       />
//       <Tab.Screen
//         name="Notifications"
//         component={NotificationsScreen}
//         options={{ tabBarLabel: 'Updates' }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{ tabBarLabel: 'Profile' }}
//       />
//     </Tab.Navigator>
//   );
// }
// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//     </NavigationContainer>
//   );
// }
