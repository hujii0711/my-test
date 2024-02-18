import * as React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import ScreenWrapper from '../../../commons/utils/ScreenWapper';
import {resultInfo} from './chart_bak/TideInfo';

const ThirdTab = () => {
  const [clickedData, setClickedData] = React.useState(null);
  console.log('resultInfo==========', resultInfo);

  const data = {
    labels: resultInfo.map(elem => elem.time),
    datasets: [
      {
        data: resultInfo.map(elem => elem.tide),
        color: (opacity = 1) => `rgba(0, 57, 163, ${opacity})`,
        strokeWidth: 3,
        mode: 'linear',
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0, // 소수점 자릿수
    color: (opacity = 1) => `rgba(0, 82, 224, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 10,
    },
  };

  const CustomDot = ({x, y, index}) => {
    const type = resultInfo[index].type;
    const tide = resultInfo[index].tide;
    const time = resultInfo[index].time;

    //만조값
    if (type === 'A2' || type === 'P2') {
      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: x - 27.5,
            top: y - 37,
            backgroundColor: '#DE3163',
            width: 65,
            height: 30,
            borderWidth: 1,
            borderColor: '#DE3163',
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
      //간조값
    } else if (type === 'A1' || type === 'P1') {
      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: x - 31,
            top: y + 7,
            // left: x - 27.5,
            // top: y - 37,
            backgroundColor: '#005A9C',
            width: 65,
            height: 30,
            borderWidth: 1,
            borderColor: '#005A9C',
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
      // 현재시간
    } else if (type === 'C0') {
      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            // left: x - 37,
            // top: y + 7,
            left: x - 37.5,
            top: -60,
            backgroundColor: '#662d91',
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
      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: x - 1,
            top: y - 1,
            backgroundColor: '#ccd7ed', //'#ccd7ed',
            width: 2,
            height: 2,
            borderRadius: 1,
          }}></View>
      );
    }
  };

  const handleDataPointClick = data => {
    const clickedIndex = data.index;
    const y = data.y;
    const x = data.x;
    const xValue = resultInfo[clickedIndex].time;
    const yValue = resultInfo[clickedIndex].tide;
    const type = resultInfo[clickedIndex].type;

    if (
      clickedIndex > -1 &&
      (type === 'A0' || type === 'P0' || type === 'D0')
    ) {
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
          //bezier={true}
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
            const type = resultInfo[index].type;

            if (type === 'A2' || type === 'P2') {
              return {
                r: 3,
                fill: '#DE3163',
              };
            } else if (type === 'A1' || type === 'P1') {
              return {
                r: 3,
                fill: '#005A9C',
              };
            } else if (type === 'C0') {
              return {
                r: 4,
                fill: '#662d91',
              };
            } else {
              return {
                r: 1,
                fill: '#ccd7ed', // 도트의 색상 설정
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
          formatXLabel={value => {
            if (
              value.slice(0, 2) === '00' ||
              value.slice(0, 2) === '06' ||
              value.slice(0, 2) === '12' ||
              value.slice(0, 2) === '18'
            ) {
              return value.substring(0, 2);
            } else if (
              value.slice(0, 2) === '23' &&
              value.slice(3, 5) === '59'
            ) {
              return '24';
            } else {
              return '';
            }
          }}
          //hidePointsAtIndex={[0]}
        />
        {clickedData?.clickedIndex > -1 ? (
          <View
            style={{
              position: 'absolute',
              //left: clickedData.x,
              left: clickedData.x + 5,
              top: clickedData.y + 90,
              backgroundColor: '#5c5f66',
              width: 62,
            }}>
            <Text
              style={{
                fontSize: 10,
                paddingLeft: 5,
                color: '#fff',
                fontWeight: 'bold',
              }}>
              {clickedData.xValue} / {clickedData.yValue}
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
