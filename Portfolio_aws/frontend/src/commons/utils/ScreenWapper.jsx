import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useState,
  RefreshControl,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ScreenWrapper = ({
  children,
  withScrollView = true,
  style,
  contentContainerStyle,
  childComponentRender = undefined, //ScreenWrapper refresh시 자식 컴포넌트 리렌더링 하기 위한 속성
  ...rest
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: '#FEFEFE',
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.left,
    },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    // 리렌더링 로직 수행

    // 리렌더링이 완료되면 refreshing 값을 false로 설정
    setRefreshing(false);

    // 자식 컴포넌트 리렌더링
    if (childComponentRender) {
      childComponentRender();
    }
  };

  return (
    <>
      {withScrollView ? (
        <ScrollView
          {...rest}
          contentContainerStyle={contentContainerStyle}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={[containerStyle, style]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          {children}
        </ScrollView>
      ) : (
        <View style={[containerStyle, style]}>{children}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
