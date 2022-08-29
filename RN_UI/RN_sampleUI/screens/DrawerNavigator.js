import React from 'react';
import {Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigator} from './StackNavigator';
import DrawerDetail from './drawer/DrawerDetailScreen';

const Drawer = createDrawerNavigator();
/*
※ navigation.push, navigation.pop 같은 기능들은 드로어 내비게이터에서 호환되지 않습니다.
<Drawer.Navigator
    initialRouteName="Home" //initialRouteName Props는 내비게이터에서 기본적으로 보여줄 화면의 이름입니다.
    drawerPosition="left"   //drawerPosition Props는 드로어가 나타나는 위치(defalut: left)
    backBehavior="history"  //backBehavior Props는 뒤로가기를 할 때 어떻게 작동할지 설정
    screenOptions={{        //드로어의 스타일을 변경
       drawerActiveBackgroundColor: '#fb8c00',
       drawerActiveTintColor: 'white',
    }}
    drawerContent={({navigation}) => ( //Drawer 컴포넌트가 나타나는 영역에 아예 다른 UI 삽입
       <SafeAreaView>
            <Text>A Custom Drawer</Text>
            <Button
              onPress={() => navigation.closeDrawer()}
              title="Drawer 닫기"
            />
       </SafeAreaView>
    )}>

    <Drawer.Navigator 컴포넌트에 screenOptions Props를 설정>
    - drawerActiveTintColor: 활성화된 항목의 텍스트 색상
    - drawerActiveBackgroundColor: 활성화된 항목의 배경색
    - drawerInactiveTintColor: 비활성화된 항목의 텍스트 색상
    - drawerInactiveBackgroudnColor: 비활성화된 항목의 배경색
    - drawerItemStyle: 항목의 스타일
    - drawerLabelStyle: 항목 내부의 텍스트 스타일
    - drawerContentContainerStyle: 항목들을 감싸고 있는 영역의 스타일
    - drawerStyle: 전체 드로어를 감싸고 있는 영역의 스타일
    - headerShown : 헤더 숨김 여부
/>
*/
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="StackNB" //내비게이터에서 기본적으로 보여줄 화면의 이름입니다.
      drawerPosition="left" //드로어가 나타나는 위치(defalut: left)
      // drawerContent={({navigation}) => (
      //   <SafeAreaView>
      //     <Text>A Custom Drawer</Text>
      //     <Button
      //       onPress={() => navigation.closeDrawer()}
      //       title="Drawer 닫기"
      //     />
      //   </SafeAreaView>
      // )}
      screenOptions={{
        drawerActiveBackgroundColor: 'red', //활성화된 항목의 배경색
        drawerActiveTintColor: 'white', //비활성화된 항목의 텍스트 색상
        headerShown: true, // 기본값 true(숨김X)
      }}>
      <Drawer.Screen
        name="StackNB"
        component={StackNavigator}
        options={{title: 'DASHBOARD', drawerLabel: 'DASHBOARD 이동'}}
      />
      <Drawer.Screen
        name="DrawerDetail"
        component={DrawerDetail}
        options={{title: 'DRAWER_DETAIL', drawerLabel: 'DRAWER_DETAIL 이동'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

// import * as React from 'react';
// import { View, Text, Button } from 'react-native';
// import { NavigationContainer, DrawerActions } from '@react-navigation/native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';

// function Custom({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//       <Button
//         title="Open drawer"
//         onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//       />
//       <Button
//         title="Toggle drawer"
//         onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//       />
//     </View>
//   );
// }

// function Feed({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//       <Button
//         title="Open drawer"
//         onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//       />
//       <Button
//         title="Toggle drawer"
//         onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//       />
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications Screen</Text>
//     </View>
//   );
// }

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         style={{
//           borderWidth: 1,
//           borderRadius: 0,
//           height: 100,
//           borderColor: "black",
//           backgroundColor: 'pink',
//         }}
//         label="Close drawer1"
//         onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
//       />
//     </DrawerContentScrollView>
//   );
// }

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       useLegacyImplementation
//       initialRouteName="Feed"
//       //backBehavior​="order"
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         //drawerActiveBackgroundColor: 'red', //활성화된 항목의 배경색
//         //drawerActiveTintColor: 'white', //비활성화된 항목의 텍스트 색상
//         headerShown: true, // 기본값 true(숨김X)
//         drawerStyle: {
//           backgroundColor: '#c6cbef',
//         },
//       }}
//     >
//       <Drawer.Screen name="Custom" component={Custom}
//       options={{
//         title: "커스텀",
//         drawerActiveBackgroundColor: 'red', //활성화된 항목의 배경색
//         drawerActiveTintColor: 'white', //비활성화된 항목의 텍스트 색상
//         //drawerInactiveBackgroundColor​ : "green",
//         headerShown: true, // 기본값 true(숨김X)

//         //drawerLabelStyle​ : {
//         //}
//       }}/>
//       <Drawer.Screen name="Feed" component={Feed}
//       options={{
//         title: "테스트",
//         drawerActiveBackgroundColor: 'red', //활성화된 항목의 배경색
//         drawerActiveTintColor: 'white', //비활성화된 항목의 텍스트 색상
//         //drawerInactiveBackgroundColor​ : "green",
//         headerShown: true, // 기본값 true(숨김X)
//       }}/>
//       <Drawer.Screen name="Notifications" component={Notifications} />
//     </Drawer.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }
