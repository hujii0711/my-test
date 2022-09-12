import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

const FilmingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FilmingScreen</Text>
      <Button
        title="Go to MOVE"
        onPress={() => console.log('MOVE')} //drawer 네비 이므로 push 사용 불가
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilmingScreen;
