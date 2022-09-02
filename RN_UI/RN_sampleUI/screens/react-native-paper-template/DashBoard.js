import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FAB} from 'react-native-paper';

const MyComponent = () => (
  <>
    <View style={styles.row}>
      <View style={styles.fabVariant}>
        <FAB
          icon="pencil"
          style={styles.fab}
          onPress={() => console.log('Pressed')}
        />
        <Text variant="bodyMedium">게시글</Text>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.fabVariant}>
        <FAB
          icon="pencil"
          style={styles.fab}
          onPress={() => console.log('Pressed')}
        />
        <Text variant="bodyMedium">채팅</Text>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  row: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    margin: 8,
  },
  fabVariant: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MyComponent;

// import * as React from 'react';
// import { Surface, Text } from 'react-native-paper';
// import { StyleSheet } from 'react-native';

// const MyComponent = () => (
//   <Surface style={styles.surface} elevation={4}>
//      <Text>Surface</Text>
//   </Surface>
// );

// export default MyComponent;

// const styles = StyleSheet.create({
//   surface: {
//     padding: 8,
//     height: 80,
//     width: 80,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius : 15
//   },
// });
