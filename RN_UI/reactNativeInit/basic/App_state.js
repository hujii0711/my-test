import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);

  return (
    <View style={styles.wrapper}>
      <View style={styles.numberArea}>
        <Text style={styles.number}>{count}</Text>
      </View>
      <Button title="+1" onPress={onIncrease} />
      <Button title="-1" onPress={onDecrease} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  numberArea: {
    flex: 1, // <Button> 제외한 모든 영역을 차지하게 됨
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  number: {
    fontSize: 72,
    fontWeight: 'bold',
  },
});

export default App;
