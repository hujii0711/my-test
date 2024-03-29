import * as React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import ScreenWrapper from '../../../commons/utils/ScreenWapper';
//import {resultAmInfo, resultPmInfo, amData} from './TideInfo';

const ThirdTab = () => {
  const [clickedIndex, setClickedIndex] = React.useState(null);

  const data = {
    labels: [
      '0',
      '02:56',
      '',
      '09:26',
      '',
      '15:11',
      '17:46',
      '',
      '21:21',
      '24',
    ],
    datasets: [
      {
        //data: [546, 758, 539, 314, 480, 665, 550, 447, 211, 420],
        data: [546, 314, 539, 758, 480, 211, 550, 447, 665, 420],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
        mode: 'linear',
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0, // 소수점 자릿수
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 10,
    },
  };

  const CustomDot = ({x, y, index}) => {
    if (index === 1 || index === 5) {
      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: x - 31,
            top: y + 7,
            backgroundColor: 'blue',
            width: 65,
            height: 30,
            borderWidth: 1,
            borderColor: 'blue',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              paddingLeft: 5,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            간조: {data.labels[index]}
          </Text>
          <Text
            style={{
              fontSize: 10,
              paddingLeft: 5,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            {data.datasets[0].data[index]} (▲350)
          </Text>
        </View>
      );
    } else if (index === 3 || index === 8) {
      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: x - 27.5,
            top: y - 37,
            backgroundColor: 'red',
            width: 65,
            height: 30,
            borderWidth: 1,
            borderColor: 'red',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              paddingLeft: 5,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            만조: {data.labels[index]}
          </Text>
          <Text
            style={{
              fontSize: 10,
              paddingLeft: 5,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            {data.datasets[0].data[index]} (▲350)
          </Text>
        </View>
      );
    } else if (index === 6) {
      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: x - 37,
            top: y + 7,
            backgroundColor: 'green',
            width: 78,
            height: 28,
          }}>
          <Text
            style={{
              fontSize: 10,
              paddingLeft: 5,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            현재시간: {data.labels[index]}
          </Text>
          <Text
            style={{
              fontSize: 10,
              paddingLeft: 5,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            {data.datasets[0].data[index]} (▲350)
          </Text>
        </View>
      );
    } else {
      const dotRadius = 1; // 인덱스에 따라 도트 반지름 설정
      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: x - dotRadius,
            top: y - dotRadius,
            backgroundColor: 'red',
            width: dotRadius * 2,
            height: dotRadius * 2,
            borderRadius: 1,
          }}></View>
      );
    }
  };

  const handleDataPointClick = (data, datasetIndex, index) => {
    if (index === clickedIndex) {
      // Clicked the same data point again, so hide the content
      setClickedIndex(null);
    } else {
      // Clicked a different data point, show content
      setClickedIndex(index);
    }
  };

  const handleChartPress = (event, gesture) => {
    console.log('gesture.x=====', gesture.x);
    if (gesture.x > 0 && gesture.x < 300) {
      // Check if the touch is within the chart's boundaries
      setSelectedX(gesture.x);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.largeText}>Chart Demo</Text>
        <LineChart
          data={data}
          width={Dimensions.get('window').width}
          height={250}
          fromZero={true}
          //horizontalLabelRotation={50}
          //yLabelsOffset={0}
          //xLabelsOffset={0}
          chartConfig={chartConfig}
          bezier={true}
          withDots={true}
          withShadow={true}
          //yAxisInterval={5}
          //withScrollableDot={false}
          withInnerLines={true}
          withOuterLines={false}
          //withVerticalLines={false}
          //withHorizontalLines={false}
          //withVerticalLabels={false}
          //withHorizontalLabels={false}
          //yAxisLabel={'a'}
          //yAxisSuffix={'s'}
          //yAxisInterval={5}
          //transparent={false}
          // getDotColor={(dataPoint, index) => {
          //   if (index === 1 || index === 5) {
          //     return 'red';
          //   } else if (index === 3 || index === 7) {
          //     return 'blue';
          //   } else {
          //     return 'orange';
          //   }
          // }}
          getDotProps={(dataPoint, index) => {
            if (
              index === 0 ||
              index === 2 ||
              index === 4 ||
              index === 7 ||
              index === 9
            ) {
              return {
                r: 2,
                fill: 'orange', // 도트의 색상 설정
                //stroke: 'black', // 도트의 테두리 색상 설정
                //strokeWidth: 1, // 도트의 테두리 굵기 설정
              };
            } else if (index === 1 || index === 5) {
              return {
                r: 4,
                fill: 'red',
              };
            } else if (index === 3 || index === 8) {
              return {
                r: 4,
                fill: 'blue',
              };
            } else if (index === 6) {
              return {
                r: 5,
                fill: 'green',
              };
            }
          }}
          onPress={handleChartPress}
          //onDataPointClick={handleDataPointClick}
          renderDotContent={CustomDot}
          //segments={4}
          //formatYLabel={yValue => yValue.replace('9', 'R')}
          formatXLabel={value => value.substring(0, 2)}
          //hidePointsAtIndex={[0]}
        />
        {clickedIndex !== null && (
          <View
            style={{
              position: 'absolute',
              left: 60,
              top: 100,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 10,
            }}>
            <Text style={{color: 'white'}}>
              Clicked Value: {data.datasets[0].data[clickedIndex]}
            </Text>
          </View>
        )}
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
