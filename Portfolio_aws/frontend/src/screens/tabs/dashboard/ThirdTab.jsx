import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import ScreenWrapper from '../../../commons/utils/ScreenWapper';

const ThirdTab = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // 그래프 색상 지정
        strokeWidth: 2, // 그래프 선 두께
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0, // 소수점 자릿수
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 텍스트 색상
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 텍스트 색상
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.largeText}>Chart Demo</Text>
        <LineChart
          data={data}
          width={300}
          height={200}
          chartConfig={chartConfig}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  largeText: {
    fontSize: 16,
    marginVertical: 20, // 수직
    marginHorizontal: 10, // 수평
  },
});

export default ThirdTab;
