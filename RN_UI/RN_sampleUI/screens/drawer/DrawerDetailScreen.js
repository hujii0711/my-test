import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/* navigation.push, navigation.pop 같은 기능들은 드로어 내비게이터에서 호환되지 않습니다. */
/* navigate는 push와는 달리 새로 이동할 화면이 현재 화면과 같으면 새로운 화면을 쌓지 않고 파라미터만 변경 */

const DrawerDetailScreen = () => {
  const navigations = useNavigation();
  return (
    <View style={styles.container}>
      <Text>DrawerDetailScreen</Text>
      <Button
        title="Go to StackDetail"
        onPress={() => navigations.navigate('StackDetail', {id: 'hujii0711'})} //drawer 네비 이므로 push 사용 불가
      />
      {/* <Button title="뒤로가기" onPress={() => navigation.pop()} />
      <Button title="처음으로" onPress={() => navigation.popToTop()} /> */}
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

export default DrawerDetailScreen;
