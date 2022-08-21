import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

/*
  ios의 경우 SafeAreaProvider와 SafeAreaView를 주위 깊에 보자!!!
  여러 화면을 다루는 앱을 만들 때는 SafeAreaProvider를 App 컴포넌트 JSX의 가장 바깥 부분에서 딱 한번만 사용하고,
  다른 화면에서는 SafeAreaView 컴포넌트 하나만 사용하면 된다.

  useSafeAreaInsets라는 hooks를 이용하면 StatusBar의 높이를 구할 수 있다.
*/
const App = () => {
  //const {top} = useSafeAreaInsets();
  //console.log('top:', top);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar backgroundColor={'blue'} barStyle="dark-content"></StatusBar>
        <View style={styles.block}>
          <Text style={styles.dateText}>2022년8월21일</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {
    padding: 16,
    backgroundColor: 'red',
  },
  dateText: {
    fontSize: 24,
    color: 'white',
  },
});

export default App;
