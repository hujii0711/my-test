import * as React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import ScreenWrapper from '../../../commons/utils/ScreenWapper';
import {resultAmInfo, resultPmInfo} from './TideInfo';

const ThirdTab = () => {
  const [clickedData, setClickedData] = React.useState(null);

  console.log('clickedData=========', clickedData);
  console.log('resultAmInfo=========', resultAmInfo);
  console.log('resultPmInfo=========', resultPmInfo);

  const detailData = {
    // xValue: [
    //   {type: '0', value: '0'},
    //   {type: '3', value: '02:56'},
    //   {type: '2', value: '04:10'},
    //   {type: '1', value: '09:26'},
    //   {type: '2', value: '13:11'},
    //   {type: '3', value: '15:11'},
    //   {type: '2', value: '19:20'},
    //   {type: '1', value: '21:21'},
    //   {type: 'C', value: '23:46'},
    //   {type: '4', value: '24'},
    // ],
    // yValue: [
    //   {type: '0', value: 400},
    //   {type: '3', value: 758},
    //   {type: '2', value: 539},
    //   {type: '1', value: 314},
    //   {type: '2', value: 480},
    //   {type: '3', value: 665},
    //   {type: '2', value: 447},
    //   {type: '1', value: 211},
    //   {type: 'C', value: 430},
    //   {type: '4', value: 420},
    // ],

    xValue: [
      {type: '0', value: '0'},
      {type: '1', value: '02:56'},
      {type: '2', value: '04:10'},
      {type: '3', value: '09:26'},
      {type: '2', value: '13:11'},
      {type: '1', value: '15:11'},
      {type: 'C', value: '17:46'},
      {type: '2', value: '19:20'},
      {type: '3', value: '21:21'},
      {type: '4', value: '24'},
    ],

    yValue: [
      {type: '0', value: 546},
      {type: '1', value: 314},
      {type: '2', value: 539},
      {type: '3', value: 758},
      {type: '2', value: 480},
      {type: '1', value: 211},
      {type: 'C', value: 400},
      {type: '2', value: 447},
      {type: '3', value: 665},
      {type: '4', value: 420},
    ],
  };

  const data = {
    labels: detailData.xValue.map(elem => elem.value),
    datasets: [
      {
        data: detailData.yValue.map(elem => elem.value),
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
    const type = detailData.yValue[index].type;
    const tide = detailData.yValue[index].value;
    const time = detailData.xValue[index].value;

    if (type === '3') {
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
            만조: {time}
          </Text>
          <Text
            style={{
              fontSize: 10,
              paddingLeft: 5,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            {tide} (▲350)
          </Text>
        </View>
      );
    } else if (type === '1') {
      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: x - 31,
            top: y + 7,
            // left: x - 27.5,
            // top: y - 37,
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
            간조: {time}
          </Text>
          <Text
            style={{
              fontSize: 10,
              paddingLeft: 5,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            {tide} (▲350)
          </Text>
        </View>
      );
    } else if (type === 'C') {
      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            // left: x - 37,
            // top: y + 7,
            left: x - 37.5,
            top: -60,
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
            현재시간: {time}
          </Text>
          <Text
            style={{
              fontSize: 10,
              paddingLeft: 5,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            {tide} (▲350)
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

  const handleDataPointClick = data => {
    const clickedIndex = data.index;
    const y = data.y;
    const x = data.x;
    const xValue = detailData.xValue[clickedIndex].value;
    const yValue = detailData.yValue[clickedIndex].value;
    const type = detailData.yValue[clickedIndex].type;

    if (clickedIndex > -1 && (type === '0' || type === '2' || type === '4')) {
      setClickedData({
        clickedIndex,
        x,
        y,
        xValue,
        yValue,
        type,
      });
    } else {
      setClickedData(null);
    }
  };

  // const handleChartPress = (event, gesture) => {
  //   console.log('handleChartPress===========');
  //   console.log('gesture.x=====', gesture.x);
  //   if (gesture.x > 0 && gesture.x < 300) {
  //     // Check if the touch is within the chart's boundaries
  //     setSelectedX(gesture.x);
  //   }
  // };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.largeText}>Chart Demo</Text>
        <LineChart
          data={data}
          width={Dimensions.get('window').width}
          height={220}
          style={{marginLeft: -10}}
          fromZero={true}
          //horizontalLabelRotation={50}
          //yLabelsOffset={0}
          //xLabelsOffset={0}
          chartConfig={chartConfig}
          bezier={true}
          //withDots={false}
          //withShadow={false}
          //yAxisInterval={5}
          //withScrollableDot={false}
          withInnerLines={false}
          //withOuterLines={false}
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
            const type = detailData.yValue[index].type;

            if (type === '3') {
              return {
                r: 4,
                fill: 'red',
              };
            } else if (type === '1') {
              return {
                r: 4,
                fill: 'blue',
              };
            } else if (type === 'C') {
              return {
                r: 4,
                fill: 'green',
              };
            } else if (type === '2') {
              return {
                r: 3,
                fill: 'orange',
                strokeWidth: 0, // 도트의 테두리 굵기 설정
              };
            } else {
              return {
                r: 3,
                fill: 'orange', // 도트의 색상 설정
                //stroke: 'black', // 도트의 테두리 색상 설정
                //strokeWidth: 2, // 도트의 테두리 굵기 설정
              };
            }
          }}
          //onPress={handleChartPress}
          onDataPointClick={handleDataPointClick}
          renderDotContent={CustomDot}
          //segments={4}
          //formatYLabel={yValue => yValue.replace('9', 'R')}
          formatXLabel={value => value.substring(0, 2)}
          //hidePointsAtIndex={[0]}
        />
        {clickedData?.clickedIndex > -1 ? (
          <View
            style={{
              position: 'absolute',
              //left: clickedData.x,
              left:
                clickedData.type === '4' ? clickedData.x - 67 : clickedData.x,
              top:
                clickedData.type === '0' || clickedData.type === '4'
                  ? clickedData.y + 108
                  : clickedData.y + 67,
              backgroundColor:
                clickedData.type === '0' || clickedData.type === '4'
                  ? 'black'
                  : 'orange',
              width: 68,
            }}>
            {clickedData.type === '2' && (
              <Text
                style={{
                  fontSize: 10,
                  paddingLeft: 5,
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                중간조: {clickedData.xValue}
              </Text>
            )}
            {(clickedData.type === '0' || clickedData.type === '4') && (
              <Text
                style={{
                  fontSize: 10,
                  paddingLeft: 5,
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                {clickedData.xValue}:00
              </Text>
            )}

            <Text
              style={{
                fontSize: 10,
                paddingLeft: 5,
                color: '#fff',
                fontWeight: 'bold',
              }}>
              {clickedData.yValue} (▲350)
            </Text>
          </View>
        ) : (
          <View></View>
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
    marginTop: 10,
    marginBottom: 60,
    marginHorizontal: 10,
  },
});

export default ThirdTab;

// /**
//  * Data for the chart.
//  *
//  * Example from [docs](https://github.com/indiespirit/react-native-chart-kit#line-chart):
//  *
//  * ```javascript
//  * const data = {
//  *   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//  *   datasets: [{
//  *     data: [ 20, 45, 28, 80, 99, 43 ],
//  *     color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//  *     strokeWidth: 2 // optional
//  *   }],
//  *   legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
//  * }
//  * ```
//  */
// data: LineChartData;

// /**
//  * Width of the chart, use 'Dimensions' library to get the width of your screen for responsive.
//  */
// width: number;

// /**
//  * Height of the chart.
//  */
// height: number;

// /**
//  * Show dots on the line - default: True.
//  */
// withDots?: boolean;

// /**
//  * Show shadow for line - default: True.
//  */
// withShadow?: boolean;

// /**
//  * Show inner dashed lines - default: True.
//  */

// withScrollableDot?: boolean;
// withInnerLines?: boolean;

// /**
//  * Show outer dashed lines - default: True.
//  */
// withOuterLines?: boolean;

// /**
//  * Show vertical lines - default: True.
//  */
// withVerticalLines?: boolean;

// /**
//  * Show horizontal lines - default: True.
//  */
// withHorizontalLines?: boolean;

// /**
//  * Show vertical labels - default: True.
//  */
// withVerticalLabels?: boolean;

// /**
//  * Show horizontal labels - default: True.
//  */
// withHorizontalLabels?: boolean;

// /**
//  * Render charts from 0 not from the minimum value. - default: False.
//  */
// fromZero?: boolean;

// /**
//  * Prepend text to horizontal labels -- default: ''.
//  */
// yAxisLabel?: string;

// /**
//  * Append text to horizontal labels -- default: ''.
//  */
// yAxisSuffix?: string;

// /**
//  * Prepend text to vertical labels -- default: ''.
//  */
// xAxisLabel?: string;

// /**
//  * Configuration object for the chart, see example:
//  *
//  * ```javascript
//  * const chartConfig = {
//  *   backgroundGradientFrom: "#1E2923",
//  *   backgroundGradientFromOpacity: 0,
//  *   backgroundGradientTo: "#08130D",
//  *   backgroundGradientToOpacity: 0.5,
//  *   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//  *   labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//  *   strokeWidth: 2, // optional, default 3
//  *   barPercentage: 0.5
//  * };
//  * ```
//  */
// chartConfig?: AbstractChartConfig;

// /**
//  * Divide axis quantity by the input number -- default: 1.
//  */
// yAxisInterval?: number;

// /**
//  * Defines if chart is transparent
//  */
// transparent?: boolean;

// /**
//  * This function takes a [whole bunch](https://github.com/indiespirit/react-native-chart-kit/blob/master/src/line-chart.js#L266)
//  * of stuff and can render extra elements,
//  * such as data point info or additional markup.
//  */
// decorator?: Function;

// /**
//  * Callback that is called when a data point is clicked.
//  */
// onDataPointClick?: (data: {
//   index: number;
//   value: number;
//   dataset: Dataset;
//   x: number;
//   y: number;
//   getColor: (opacity: number) => string;
// }) => void;

// /**
//  * Style of the container view of the chart.
//  */
// style?: Partial<ViewStyle>;

// /**
//  * Add this prop to make the line chart smooth and curvy.
//  *
//  * [Example](https://github.com/indiespirit/react-native-chart-kit#bezier-line-chart)
//  */
// bezier?: boolean;

// /**
//  * Defines the dot color function that is used to calculate colors of dots in a line chart.
//  * Takes `(dataPoint, dataPointIndex)` as arguments.
//  */
// getDotColor?: (dataPoint: any, index: number) => string;

// /**
//  * Renders additional content for dots in a line chart.
//  * Takes `({x, y, index})` as arguments.
//  */
// renderDotContent?: (params: {
//   x: number;
//   y: number;
//   index: number;
//   indexData: number;
// }) => React.ReactNode;

// /**
//  * Rotation angle of the horizontal labels - default 0 (degrees).
//  */
// horizontalLabelRotation?: number;

// /**
//  * Rotation angle of the vertical labels - default 0 (degrees).
//  */
// verticalLabelRotation?: number;

// /**
//  * Offset for Y axis labels.
//  */
// yLabelsOffset?: number;

// /**
//  * Offset for X axis labels.
//  */
// xLabelsOffset?: number;

// /**
//  * Array of indices of the data points you don't want to display.
//  */
// hidePointsAtIndex?: number[];

// /**
//  * This function change the format of the display value of the Y label.
//  * Takes the y value as argument and should return the desirable string.
//  */
// formatYLabel?: (yValue: string) => string;

// /**
//  * This function change the format of the display value of the X label.
//  * Takes the X value as argument and should return the desirable string.
//  */
// formatXLabel?: (xValue: string) => string;

// /**
//  * Provide props for a data point dot.
//  */
// getDotProps?: (dataPoint: any, index: number) => object;

// /**
//  * The number of horizontal lines
//  */
// segments?: number;

//-----------------------------------------------------------------------------------------------
// data: LineChartData;
// width: number;
// height: number;
// withDots?: boolean;
// withShadow?: boolean;
// withScrollableDot?: boolean;
// withInnerLines?: boolean;
// withOuterLines?: boolean;
// withVerticalLines?: boolean;
// withHorizontalLines?: boolean;
// withVerticalLabels?: boolean;
// withHorizontalLabels?: boolean;
// fromZero?: boolean;
// yAxisLabel?: string;
// yAxisSuffix?: string;
// xAxisLabel?: string;
// chartConfig?: AbstractChartConfig;
// yAxisInterval?: number;
// transparent?: boolean;
// decorator?: Function;
// onDataPointClick?: (data: {
//   index: number;
//   value: number;
//   dataset: Dataset;
//   x: number;
//   y: number;
//   getColor: (opacity: number) => string;
// }) => void;
// style?: Partial<ViewStyle>;
// bezier?: boolean;
// getDotColor?: (dataPoint: any, index: number) => string;
// renderDotContent?: (params: {
//   x: number;
//   y: number;
//   index: number;
//   indexData: number;
// }) => React.ReactNode;
// horizontalLabelRotation?: number;
// verticalLabelRotation?: number;
// yLabelsOffset?: number;
// xLabelsOffset?: number;
// hidePointsAtIndex?: number[];
// formatYLabel?: (yValue: string) => string;
// formatXLabel?: (xValue: string) => string;
// getDotProps?: (dataPoint: any, index: number) => object;
// segments?: number;
