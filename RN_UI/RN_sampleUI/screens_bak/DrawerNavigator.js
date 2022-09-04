//----------------------------------------------------------------------------------------------------- exmple1
// import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {StackNavigator} from './StackNavigator';
// import DrawerDetail from './drawer/DrawerDetailScreen';

// const Drawer = createDrawerNavigator();
// /*
// ※ navigation.push, navigation.pop 같은 기능들은 드로어 내비게이터에서 호환되지 않습니다.
// <Drawer.Navigator
//     initialRouteName="Home" //initialRouteName Props는 내비게이터에서 기본적으로 보여줄 화면의 이름입니다.
//     drawerPosition="left"   //drawerPosition Props는 드로어가 나타나는 위치(defalut: left)
//     backBehavior="history"  //backBehavior Props는 뒤로가기를 할 때 어떻게 작동할지 설정
//     screenOptions={{        //드로어의 스타일을 변경
//        drawerActiveBackgroundColor: '#fb8c00',
//        drawerActiveTintColor: 'white',
//     }}
//     drawerContent={({navigation}) => ( //Drawer 컴포넌트가 나타나는 영역에 아예 다른 UI 삽입
//        <SafeAreaView>
//             <Text>A Custom Drawer</Text>
//             <Button
//               onPress={() => navigation.closeDrawer()}
//               title="Drawer 닫기"
//             />
//        </SafeAreaView>
//     )}>

//     <Drawer.Navigator 컴포넌트에 screenOptions Props를 설정>
//     - drawerActiveTintColor: 활성화된 항목의 텍스트 색상
//     - drawerActiveBackgroundColor: 활성화된 항목의 배경색
//     - drawerInactiveTintColor: 비활성화된 항목의 텍스트 색상
//     - drawerInactiveBackgroudnColor: 비활성화된 항목의 배경색
//     - drawerItemStyle: 항목의 스타일
//     - drawerLabelStyle: 항목 내부의 텍스트 스타일
//     - drawerContentContainerStyle: 항목들을 감싸고 있는 영역의 스타일
//     - drawerStyle: 전체 드로어를 감싸고 있는 영역의 스타일
//     - headerShown : 헤더 숨김 여부
// />
// */
// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="StackNB" //내비게이터에서 기본적으로 보여줄 화면의 이름입니다.
//       drawerPosition="left" //드로어가 나타나는 위치(defalut: left)
//       // drawerContent={({navigation}) => (
//       //   <SafeAreaView>
//       //     <Text>A Custom Drawer</Text>
//       //     <Button
//       //       onPress={() => navigation.closeDrawer()}
//       //       title="Drawer 닫기"
//       //     />
//       //   </SafeAreaView>
//       // )}
//       screenOptions={{
//         drawerActiveBackgroundColor: 'red', //활성화된 항목의 배경색
//         drawerActiveTintColor: 'white', //비활성화된 항목의 텍스트 색상
//         headerShown: true, // 기본값 true(숨김X)
//       }}>
//       <Drawer.Screen
//         name="StackNB"
//         component={StackNavigator}
//         options={{title: 'DASHBOARD', drawerLabel: 'DASHBOARD 이동'}}
//       />
//       <Drawer.Screen
//         name="DrawerDetail"
//         component={DrawerDetail}
//         options={{title: 'DRAWER_DETAIL', drawerLabel: 'DRAWER_DETAIL 이동'}}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;

//----------------------------------------------------------------------------------------------------- exmple2
// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';

// import {
//   createDrawerNavigator,
//   useDrawerStatus,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem
// } from '@react-navigation/drawer';

// function Feed() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//       <MaterialIcons name='article' size={24} color='#333'></MaterialIcons>
//       <MaterialIcons name='chat' size={24} color='#333'></MaterialIcons>
//       <MaterialIcons name='close' size={24} color='#333'></MaterialIcons>
//     </View>
//   );
// }

// function Article() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Article Screen</Text>
//     </View>
//   );
// }

// // component DrawerItem요소는 다음 prop을 허용합니다.
// // - label(필수): 항목의 레이블 텍스트입니다. 문자열이거나 반응 요소를 반환하는 함수일 수 있습니다.
// //  예 를 들어 ({ focused, color }) => <Text style={{ color }}>{focused ? 'Focused text' : 'Unfocused text'}</Text>
// // - icon: 항목에 대해 표시할 아이콘입니다. 반응 요소를 반환하는 함수를 허용합니다.
// //  예 를 들어 ({ focused, color, size }) => <Icon color={color} size={size} name={focused ? 'heart' : 'heart-outline'} />
// // - focused: drawer 항목을 활성으로 강조 표시할지 여부를 나타내는 부울입니다.
// // - onPress(필수): 누를 때 실행할 기능입니다.
// // - activeTintColor: 항목이 활성 상태일 때 아이콘 및 레이블의 색상입니다.
// // - inactiveTintColor: 항목이 비활성 상태일 때 아이콘 및 레이블의 색상입니다.
// // - activeBackgroundColor: 활성화된 항목의 배경색입니다.
// // - inactiveBackgroundColor: 비활성 상태일 때 항목의 배경색입니다.
// // - labelStyle: 레이블의 스타일 개체입니다 Text.
// // - style: 래퍼의 스타일 개체입니다 View.

// // <DrawerItem
// //   label="Help"
// //   onPress={() => alert('Link to help')}
// //   icon={({ focused, color, size }) => <MaterialIcons color={color} size={size} name="person-add"/>}
// //   style = {{ //drawerItemStyle 유사
// //     backgroundColor: "gray",
// //     position: 'fixed',
// //     bottom: 0,
// //     left: 0,
// //     width: 240
// //   }}
// //   labelStyle = {{ //drawerLabelStyle 유사
// //     borderWidth: 3,
// //     color: "black",
// //     fontWeight: "bold",
// //     borderColor: "orange",
// //     backgroundColor: "pink"
// //   }}
// // />

// function CustomDrawerContent(props) {

//   const navigation = useNavigation();
//   const isDrawerOpen = useDrawerStatus() === 'open';

//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label=""
//         onPress={() => navigation.navigate('Article')}
//         icon={({ focused, color, size }) => <MaterialIcons color={color} size={size} name="person-add"/>}
//         style = {{ //drawerItemStyle 유사
//           position: 'fixed',
//           bottom: 0,
//           left: 200,
//           width: 240,
//           float: "right"
//         }}
//       />
//       <DrawerItem
//         label=""
//         onPress={() => {isDrawerOpen ? props.navigation.closeDrawer() : props.navigation.openDrawer()}}
//         icon={({ focused, color, size }) => <MaterialIcons color={color} size={size} name="close"/>}
//         style = {{ //drawerItemStyle 유사
//           position: 'fixed',
//           bottom: 0,
//           left: 240,
//           width: 230,
//           float: "right"
//         }}
//       />
//     </DrawerContentScrollView>
//   );
// }

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       useLegacyImplementation
//       screenOptions={{
//         headerShown : false,
//         drawerStyle: {
//           flex: 1,
//           borderWidth: 3,
//           backgroundColor: 'red',
//           borderColor: "purple",
//           width: 300,
//         },
//         drawerContentStyle : { //screenOptions.drawerContent 있을시 없어짐
//           flex: 0.5,
//           borderWidth: 3,
//           borderColor: "gray",
//           backgroundColor: "blue"
//         },
//         drawerItemStyle : {
//           borderWidth: 3,
//           borderColor: "green",
//           backgroundColor: "yellow"
//         },
//         drawerLabelStyle : {
//           borderWidth: 3,
//           color: "black",
//           fontWeight: "bold",
//           borderColor: "orange",
//           backgroundColor: "pink"
//         },
//         //overlayColor: "black"
//       }}
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen
//         name="Feed"
//         component={Feed}
//         options= {{
//             title: "AAA",
//             drawerLabel : "BBB",
//             drawerContentStyle : { //screenOptions.drawerContent 있을시 없어짐
//               flex: 0.5,
//               borderWidth: 3,
//               borderColor: "gray",
//               backgroundColor: "blue"
//             },
//             drawerItemStyle : {
//               borderWidth: 1,
//               height: 150,
//               borderColor: "black",
//               backgroundColor: "yellow"
//             },
//             drawerLabelStyle : {
//               borderWidth: 3,
//               color: "black",
//               fontWeight: "bold",
//               borderColor: "orange",
//               backgroundColor: "pink"
//             },
//           }}
//         />
//       <Drawer.Screen name="Article" component={Article} />
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

//----------------------------------------------------------------------------------------------------- exmple3
import * as React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  createDrawerNavigator,
  useDrawerStatus,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {StackNavigator} from './StackNavigator';

const Drawer = createDrawerNavigator();

function Feed() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Feed Screen</Text>
      <Icon name="article" size={24} color="#333" />
      <Icon name="chat" size={24} color="#333" />
      <Icon name="close" size={24} color="#333" />
    </View>
  );
}

function Article() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Article Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus() === 'open';

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="StackDetail 이동"
        onPress={() => navigation.navigate('StackDetail')}
        icon={({focused, color, size}) => (
          <Icon color={color} size={size} name="person-add" />
        )}
        // style={{
        //   //drawerItemStyle 유사
        //   position: 'fixed',
        //   bottom: 0,
        //   left: 200,
        //   //width: 240,
        // }}
      />
      <DrawerItem
        label="22"
        onPress={() => {
          isDrawerOpen
            ? props.navigation.closeDrawer()
            : props.navigation.openDrawer();
        }}
        icon={({focused, color, size}) => (
          <Icon color={color} size={size} name="close" />
        )}
        // style={{
        //   //drawerItemStyle 유사
        //   position: 'fixed',
        //   bottom: 0,
        //   left: 240,
        //   //width: 230,
        // }}
      />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="StackNB" //내비게이터에서 기본적으로 보여줄 화면의 이름입니다.
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          flex: 1,
          borderWidth: 3,
          backgroundColor: 'red',
          borderColor: 'purple',
          width: 300,
        },
        drawerContentStyle: {
          //screenOptions.drawerContent 있을시 없어짐
          flex: 0.5,
          borderWidth: 3,
          borderColor: 'gray',
          backgroundColor: 'blue',
        },
        drawerItemStyle: {
          borderWidth: 3,
          borderColor: 'green',
          backgroundColor: 'yellow',
        },
        drawerLabelStyle: {
          borderWidth: 3,
          color: 'black',
          fontWeight: 'bold',
          borderColor: 'orange',
          backgroundColor: 'pink',
        },
        //overlayColor: "black"
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="StackNB"
        component={StackNavigator}
        options={{title: 'DASHBOARD', drawerLabel: 'DASHBOARD 이동'}}
      />
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{
          title: 'AAA',
          drawerLabel: 'BBB',
          drawerContentStyle: {
            //screenOptions.drawerContent 있을시 없어짐
            flex: 0.5,
            borderWidth: 3,
            borderColor: 'gray',
            backgroundColor: 'blue',
          },
          drawerItemStyle: {
            borderWidth: 1,
            height: 150,
            borderColor: 'black',
            backgroundColor: 'yellow',
          },
          drawerLabelStyle: {
            borderWidth: 3,
            color: 'black',
            fontWeight: 'bold',
            borderColor: 'orange',
            backgroundColor: 'pink',
          },
        }}
      />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
