import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const App = props => (
  <>
    <View
      style={[
        styles.box,
        props.rounded ?? styles.rounded,
        {backgroundColor: 'green'},
      ]}>
      <Text>{props.name}</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center', //가로정렬
    alignItems: 'center', //세로정렬
  },
  rounded: {
    borderRadius: 16,
  },
});

App.defaultProps = {
  name: '안녕하쇼',
};

export default App;
