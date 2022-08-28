import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const StackDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // 동적으로 헤더 이름 변경하기
  useEffect(() => {
    navigation.setOptions({
      title: `StackDetailScreen_${route.params.id}`,
    });
  }, [navigation, route.params.id]);

  return (
    <View style={styles.container}>
      <Text>StackDetailScreen</Text>
      <Button
        title="Go to MainTab"
        onPress={() => navigation.push('MainTab', {id: 'hujii0711'})} //drawer 네비가 아니므로 push 사용 가능
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

export default StackDetailScreen;
