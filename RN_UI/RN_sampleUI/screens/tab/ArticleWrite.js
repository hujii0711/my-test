import React from 'react';
import {KeyboardAvoidingView, StyleSheet, TextInput} from 'react-native';

function WriteScreen() {
  return (
    <KeyboardAvoidingView style={styles.keyboardAvoiding}>
      <TextInput
        placeholder="제목"
        style={styles.input}
        value=""
        onChangeText={() => {
          console.log('제목');
        }}
      />
      <TextInput
        placeholder="내용"
        style={[styles.input, styles.contents]}
        multiline
        textAlignVertical="top"
        value=""
        onChangeText={() => {
          console.log('내용');
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'column',
  },
  input: {
    backgroundColor: '#e0e0e0',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  contents: {
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 16,
    flex: 1,
  },
});

export default WriteScreen;
