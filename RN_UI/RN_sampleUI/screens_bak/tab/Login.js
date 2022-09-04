import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  input: {
    backgroundColor: 'white',
    padding: 8,
    borderColor: '#dddddd',
    borderWidth: 1,
    marginBottom: 8,
  },
  submit: {
    marginTop: 24,
    backgroundColor: '#2196f3',
    height: 56,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitPressed: {
    opacity: 0.75,
  },
  submitText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

const App = () => {
  return (
    <KeyboardAvoidingView style={styles.block}>
      <View style={styles.block}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="이메일 또는 계정명"
            value=""
            onChangeText={() => {
              console.log('아이디');
            }}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry
            value=""
            onChangeText={() => {
              console.log('비밀번호');
            }}
          />
          <Pressable
            style={({pressed}) => [
              styles.submit,
              pressed && styles.submitPressed,
            ]}
            android_ripple={{color: '#42a5f5'}}
            onPress={() => {
              console.log('로그인');
            }}>
            <Text style={styles.submitText}>로그인</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default App;
