import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import useAuthLoadEffect from '../hooks/useAuthLoadEffect';
import MainTab from './MainTab';
import ArticleScreen from './ArticleScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MyArticlesScreen from './MyArticlesScreen';
import WriteScreen from './WriteScreen';
import FileUploadScreen from './FileUploadScreen';

/*
<Stack.Navigator>의 initialRouteName의 값이 없으면 내비게이터 안에 들어 있는 첫번째 화면이 보여진다.
*/
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  useAuthLoadEffect();

  return (
    <Stack.Navigator screenOptions={{headerBackTitle: '닫기'}}>
      <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}} />
      <Stack.Screen name="Article" options={{title: '게시글'}} component={ArticleScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{title: '회원가입'}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{title: '로그인'}} />
      <Stack.Screen
        name="MyArticles"
        component={MyArticlesScreen}
        options={{title: '내가 쓴 글'}}
      />
      <Stack.Screen name="Write" component={WriteScreen} options={{title: '새 게시글 작성'}} />
      <Stack.Screen
        name="FileUpload"
        component={FileUploadScreen}
        options={{title: '파일업로드 테스트'}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
