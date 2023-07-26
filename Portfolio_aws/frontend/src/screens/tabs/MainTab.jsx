import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {Appbar, Menu, Divider, Provider, IconButton} from 'react-native-paper';
import Color from '../../commons/style/Color';
import Dashboard from './dashboard/Dashboard';
import Faq from './Faq';
import ArticleList from './articles/ArticleList';
import ArticleWrite from './articles/ArticleWrite';
import ImageViewer from './ImageViewer';
import ChatMain from './chat/ChatMain';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const MainTab = () => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const setMainTabHeader = () => {
    return {
      header: ({navigation, options}) => {
        const headerTitle = options?.headerTitle;
        return (
          <Appbar.Header elevated style={{backgroundColor: Color.background}}>
            {navigation.openDrawer ? (
              <Appbar.Action
                icon="menu"
                onPress={() => navigation.openDrawer()}
              />
            ) : null}
            <Appbar.Content title={headerTitle} />
            <Appbar.Action
              icon="magnify"
              style={{left: 75}}
              onPress={() => {}}
            />
            <Provider>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-end',
                  left: 65,
                }}>
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  style={{marginTop: 50}}
                  contentStyle={{backgroundColor: Color.background}}
                  anchor={
                    <IconButton
                      onPress={openMenu}
                      icon="dots-vertical"
                      color="#000000"
                      size={24}
                    />
                  }>
                  <Menu.Item
                    titleStyle={{fontSize: 14}}
                    contentStyle={{}}
                    style={{height: 30, marginBottom: 5}}
                    onPress={() => {}}
                    title="메뉴1"
                  />
                  <Divider />
                  <Menu.Item
                    titleStyle={{fontSize: 14}}
                    contentStyle={{}}
                    style={{height: 30, marginTop: 5}}
                    onPress={() => {}}
                    title="메뉴2"
                  />
                  <Divider />
                  <Menu.Item
                    titleStyle={{fontSize: 14}}
                    contentStyle={{}}
                    style={{height: 30, marginTop: 5}}
                    onPress={() => {}}
                    title="메뉴3"
                  />
                </Menu>
              </View>
            </Provider>
          </Appbar.Header>
        );
      },
    };
  };

  return (
    <Tab.Navigator
      //labeled={false} //라벨 보일지 여부
      initialRouteName="DashBoard"
      activeColor={Color.active_icon}
      inactiveColor={Color.unactive_icon}
      barStyle={{backgroundColor: Color.white}}>
      <Tab.Screen
        name="_DashBoard"
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="shape-outline" color={color} size={24} />
          ),
          tabBarLabel: '대시보드',
        }}>
        {() => (
          <Stack.Navigator screenOptions={setMainTabHeader}>
            <Stack.Screen
              name="DashBoard"
              options={{headerTitle: '대시보드'}}
              component={Dashboard}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="_Board"
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="table" color={color} size={24} />
          ),
          tabBarLabel: '게시글',
        }}>
        {() => (
          <Stack.Navigator screenOptions={setMainTabHeader}>
            <Stack.Screen
              name="Board"
              options={{headerTitle: '게시글'}}
              component={ArticleList}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="_ArticleWrite"
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="email-plus" color={color} size={24} />
          ),
          tabBarLabel: '이메일',
        }}>
        {() => (
          <Stack.Navigator screenOptions={setMainTabHeader}>
            <Stack.Screen
              name="ArticleWrite"
              options={{headerTitle: '이메일'}}
              component={ArticleWrite}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="_ImageViewer"
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="image-marker" color={color} size={24} />
          ),
          tabBarLabel: '이미지뷰어',
        }}>
        {() => (
          <Stack.Navigator screenOptions={setMainTabHeader}>
            <Stack.Screen
              name="ImageViewer"
              options={{headerTitle: '이미지뷰어'}}
              component={ImageViewer}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="_ChatMain"
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="chat-outline" color={color} size={24} />
          ),
          tabBarLabel: '채팅',
        }}>
        {() => (
          <Stack.Navigator screenOptions={setMainTabHeader}>
            <Stack.Screen
              name="ChatMain"
              options={{headerTitle: '채팅'}}
              component={ChatMain}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="_Faq"
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="gamepad-circle-outline" color={color} size={24} />
          ),
          tabBarLabel: 'FAQ',
        }}>
        {() => (
          <Stack.Navigator screenOptions={setMainTabHeader}>
            <Stack.Screen
              name="Faq"
              options={{headerTitle: 'FAQ'}}
              component={Faq}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

// const MainTab = () => {
//   return (
//     <Tab.Navigator
//       //labeled={false} //라벨 보일지 여부
//       initialRouteName="DashBoard"
//       activeColor={Color.active_icon}
//       inactiveColor={Color.unactive_icon}
//       barStyle={{backgroundColor: Color.white}}>
//       <Tab.Screen
//         name="DashBoard"
//         component={Dashboard}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Icon name="shape-outline" color={color} size={24} />
//           ),
//           tabBarLabel: '대시보드',
//         }}
//       />
//       <Tab.Screen
//         name="Board"
//         component={ArticleList}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Icon name="table" color={color} size={24} />
//           ),
//           tabBarLabel: '게시글',
//         }}
//       />
//       <Tab.Screen
//         name="Email"
//         component={ArticleWrite}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Icon name="email-plus" color={color} size={24} />
//           ),
//           tabBarLabel: '이메일 작성',
//         }}
//       />
//       <Tab.Screen
//         name="ImageViewer"
//         component={ImageViewer}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Icon name="image-marker" color={color} size={24} />
//           ),
//           tabBarLabel: '이미지 뷰어',
//         }}
//       />
//       <Tab.Screen
//         name="ChatMain"
//         component={ChatMain}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Icon name="chat-outline" color={color} size={24} />
//           ),
//           tabBarLabel: '채팅',
//         }}
//       />
//       <Tab.Screen
//         name="FAQ"
//         component={Faq}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Icon name="gamepad-circle-outline" color={color} size={24} />
//           ),
//           tabBarLabel: 'FAQ',
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

export default MainTab;

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
