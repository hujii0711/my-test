import * as React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {Button, Snackbar, List, Divider} from 'react-native-paper';

const MyComponent = () => {
  const data = [
    {
      id: 'animatedFab',
      title: 'AnimatedFABExample',
    },
    {
      id: 'activityIndicator',
      title: 'ActivityIndicatorExample',
    },
    {
      id: 'appbar',
      title: 'AppbarExample',
    },
  ];
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
      <Snackbar
        style={{
          backgroundColor: 'white',
        }}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}
        elevation={2}>
        <FlatList
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={({item}) => (
            <List.Item title={item.title} onPress={() => {}} />
          )}
          keyExtractor={item => item.id}
        />
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default MyComponent;
