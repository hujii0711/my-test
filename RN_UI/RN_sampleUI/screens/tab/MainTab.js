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
// import { Button, View, Text, StyleSheet} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { getHeaderTitle } from '@react-navigation/elements';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to Profile"
//         onPress={() => navigation.navigate('Profile')}
//       />
//     </View>
//   );
// }

// function ProfileScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to Notifications"
//         onPress={() => navigation.navigate('Notifications')}
//       />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate('Settings')}
//       />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// function MyBackButton({ navigation, title}) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.top}>
//         <Text>뒤로</Text>
//       </View>
//       <View style={styles.middle}>
//         <Text>{title}</Text>
//       </View>
//       <View style={styles.bottom}>
//         <Text>검색</Text>
//       </View>
//       <View style={styles.bottom}>
//         <Text>가입</Text>
//       </View>
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen}
//         options={() => ({
//         title: 'Awesome app',
//         header: ({ navigation, route, options, back }) => {
//           const title_ = getHeaderTitle(options, route.name);
//           return <MyBackButton title = {title_}/>
//         }
//       })}
//       />
//       <Stack.Screen name="Notifications" component={NotificationsScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="Settings" component={SettingsScreen} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection : "row",
//     justifyContent: 'space-between', //가로 정렬
//     backgroundColor: 'orange',
//     padding: 5,
//     margin: 5,
//     height: 30,
//   },
//   top: {
//     flex: 0.1,
//     backgroundColor: 'grey',
//     borderWidth: 1,
//     height: 30,
//   },
//   middle: {
//     flex: 0.5,
//     backgroundColor: 'beige',
//     borderWidth: 1,
//     height: 30,
//   },
//   bottom: {
//     flex: 0.1,
//     height: 30,
//     backgroundColor: 'pink',
//     borderWidth: 1,
//   },
// });
