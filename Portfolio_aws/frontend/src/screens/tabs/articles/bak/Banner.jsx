import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Banner} from 'react-native-paper';
import ScreenWrapper from '../../../commons/utils/ScreenWapper';

const SecondTab = () => {
  const [, setHeight] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  const handleLayout = ({nativeEvent}) => {
    const {height: layoutHeight} = nativeEvent.layout;
    setHeight(layoutHeight);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Banner
          onLayout={handleLayout}
          actions={[
            {
              label: 'Fix it',
              onPress: {},
            },
          ]}
          // icon={require('../../assets/images/email-icon.png')}
          visible={visible}
          onShowAnimationFinished={() =>
            console.log('Completed opening animation')
          }
          onHideAnimationFinished={() =>
            console.log('Completed closing animation')
          }
          style={styles.banner}>
          Two line text string with two actions. One to two lines is preferable
          on mobile.
        </Banner>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  banner: {
    width: '100%',
  },
});

export default SecondTab;
