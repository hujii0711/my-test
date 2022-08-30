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

// import * as React from 'react';
// import { View, Button, Text, Animated, StyleSheet, StatusBar } from 'react-native';
// import {useSafeAreaInsets, SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { getHeaderTitle } from '@react-navigation/elements';
// import { MaterialIcons } from '@expo/vector-icons';

// function Home({ navigation }) {
//   return (
//     <>
//       <StatusBar backgroundColor="red"/>
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Home screen</Text>
//         <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')}/>
//       </View>
//     </>
//   );
// }

// function Profile({ navigation }) {
//   const {top} = useSafeAreaInsets();
//   return (
//     <>
//       <StatusBar backgroundColor="red"/>
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Profile screen</Text>
//         <Button title="Go back" onPress={() => navigation.goBack()} />
//       </View>
//     </>
//   );
// }

// const forFade = ({ current, next }) => {
//   const opacity = Animated.add(
//     current.progress,
//     next ? next.progress : 0
//   ).interpolate({
//     inputRange: [0, 1, 2],
//     outputRange: [0, 1, 0],
//   });

//   return {
//     leftButtonStyle: { opacity },
//     rightButtonStyle: { opacity },
//     titleStyle: { opacity },
//     backgroundStyle: { opacity },
//   };
// };

// function MyBackButton({onPress, title}) {

//   const {top} = useSafeAreaInsets();
//   const isFirstPage = false;

//   return (
//     <View style={[styles.container,{ top:top }]}>
//       <View>
//         <MaterialIcons name={isFirstPage ? "apps" : "chevron-left"} size={24} color='#ffffff' onPress={onPress}></MaterialIcons>
//       </View>
//       <View style={styles.middle}>
//         <Text style={{fontSize: 20, color: "#ffffff", fontWeight: "bold"}}>{title}</Text>
//       </View>
//       <View>
//         <MaterialIcons name='search' size={24} color='#ffffff' onPress={() => {alert("검색창 열기")}}></MaterialIcons>
//       </View>
//       <View>
//         <MaterialIcons name='login' size={24} color='#ffffff' onPress={() => {alert("로그인 열기")}}></MaterialIcons>
//       </View>
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function MyStack() {

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: 'tomato'
//         },
//         headerTintColor: 'white',
//       }}>
//       <Stack.Screen
//         name="Home"
//         component={Home}
//         options={{
//         }}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           headerStyleInterpolator: forFade,
//           title: "Profile", // headerTitle 대체
//           header: ({ navigation, route, options, back }) => {
//             const title_ = getHeaderTitle(options, route.name);
//             return <MyBackButton onPress={navigation.goBack} title="타이틀!!"/>
//           }
//           //header​: 사용자 정의 헤더
//           //headerShown​ : false,
//           //headerBackVisible​ : false,
//           //title​ : "",
//           //headerBackImageSource​ : 뒤로 버튼의 아이콘으로 헤더에 표시할 이미지입니다.
//           //headerLargeTitleShadowVisible​ : 큰 제목이 표시될 때 헤더의 그림자가 표시되는지 여부입니다.
//           //headerStyle​ : {} : 헤더의 스타일 개체입니다.
//           //headerTitleStyle​: 헤더 제목의 스타일 개체입니다.
//           //contentStyle​: screen 콘텐츠에 대한 스타일 개체입니다.
//           //headerTransparent : 탐색 모음이 반투명인지 여부 [기본값은 false]​
//           //headerTintColor​: 헤더의 색조 색상입니다. 뒤로 버튼과 제목의 색상을 변경합니다.
//           //headerLeft​: 헤더의 왼쪽에 표시할 React Element를 반환하는 함수입니다.
//           //headerRight​: 헤더의 오른쪽에 표시할 React Element를 반환하는 함수입니다.
//           //headerTitle​: 헤더에서 사용할 React Element를 반환하는 문자열 또는 함수. 기본값 title또는 화면 이름입니다.
//           //headerTitleAlign​: 헤더 제목을 정렬하는 방법.(left, cebter)
//           //presentation​: 화면이 어떻게 표시되어야 하는지
//           //animation​: 밀거나 튀었을 때 화면이 어떻게 움직여야 하는지.
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection : "row",
//     justifyContent: 'space-between', //가로 정렬
//     backgroundColor: '#de1f75',
//     color: "#ffffff",
//     padding: 10
//   },
//   middle: {
//     flex: 0.7,
//     height: 30,
//   },
// });

// export default function App() {
//   return (
//     <NavigationContainer>
//       <SafeAreaProvider>
//         <SafeAreaView edges={['bottom']} style={{flex:1}}>
//           <MyStack />
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </NavigationContainer>
//   );
// }
