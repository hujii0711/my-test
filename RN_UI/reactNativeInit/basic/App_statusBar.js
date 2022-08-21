import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'blue'} barStyle="dark-content"></StatusBar>
      <View style={styles.block}>
        <Text style={styles.dateText}>2022년8월21일</Text>
      </View>
    </>
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
