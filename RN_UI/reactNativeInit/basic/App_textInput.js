import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  StatusBar,
  TextInput,
  Platform,
  Text,
  Image,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';
/*
  - paddingHorizontal, paddingVertical 값을 준 이유는 바로 터치 영역을 늘리기 위함
  - KeyboardAvoidingView: 텍스트를 입력할 때 키보드가 화면을 가리지 않게 하기 위함
    behavior: 컴포넌트의 작동 방식을 정의할 수 있다.( 안드로이드에서는 아무 작업이 필요 없다.)
  - onSubmitEditing: TextInput에서 enter 눌렀을 때 호출되는 함수
*/
const App = () => {
  const [text, setText] = useState('');

  const button = (
    <View style={styles.buttonStyle}>
      <Image source={require('./asset/icons/add_white/add_white.png')} />
    </View>
  );

  const onPress = () => {
    setText('');
    Keyboard.dismiss(); // 키보드 닫기
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding'})}
      style={styles.avoid}>
      <StatusBar backgroundColor={'blue'} barStyle="dark-content"></StatusBar>
      <View style={styles.block}>
        <TextInput
          placeholder="썅!"
          style={styles.input}
          onChangeText={setText}
          onSubmitEditing={onPress}
        />
        <TouchableNativeFeedback onPress={onPress}>
          {button}
        </TouchableNativeFeedback>
        <Text style={styles.text}>{text}</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  block: {
    //flex: 1, // 전체 영역을 차지하게 됨(KeyboardAvoidingView 테스트용으로 활용)
    height: 150,
    paddingHorizontal: 16, //paddingLeft:16, paddingRight: 16과 동일
    borderColor: '#696969',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    borderColor: 'red',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 13,
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  avoid: {
    flex: 1,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: 'orange',
    borderRadius: 24,
  },
});

export default App;
