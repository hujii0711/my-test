import * as React from 'react';
import {FlatList} from 'react-native';
import {List, Divider, useTheme} from 'react-native-paper';
import {useSafeArea} from 'react-native-safe-area-context';

function ScreenList({navigation}) {
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

  const {colors} = useTheme();
  const safeArea = useSafeArea();

  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: colors.background,
        paddingBottom: safeArea.bottom,
        paddingLeft: safeArea.left,
        paddingRight: safeArea.right,
      }}
      data={data}
      style={{
        backgroundColor: colors.background,
      }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={Divider}
      renderItem={({item}) => (
        <List.Item
          title={item.title}
          onPress={() => navigation.navigate(item.id)}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}

export default ScreenList;
