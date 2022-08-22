import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

function DetailScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>DetailScreen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailScreen;
