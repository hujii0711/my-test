import React from 'react';
import {StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Button, Text, theme} from 'galio-framework';

const materialTheme = {
  COLORS: {
    DEFAULT: '#DCDCDC',
    PRIMARY: '#9C26B0',
    LABEL: '#FE2472',
    INFO: '#00BCD4',
    ERROR: '#F44336',
    SUCCESS: '#4CAF50',
    WARNING: '#FF9800',
    MUTED: '#979797',
    INPUT: '#DCDCDC',
    ACTIVE: '#9C26B0',
    BUTTON_COLOR: '#9C26B0',
    PLACEHOLDER: '#9FA5AA',
    SWITCH_ON: '#9C26B0',
    SWITCH_OFF: '#D4D9DD',
    GRADIENT_START: '#6B24AA',
    GRADIENT_END: '#AC2688',
    PRICE_COLOR: '#EAD5FB',
    BORDER_COLOR: '#E7E7E7',
    BLOCK: '#E7E7E7',
    ICON: '#4A4A4A',
  },
  SIZES: {
    BLOCK_SHADOW_RADIUS: 2,
  },
};

export default class GaButton extends React.Component {
  render() {
    const {gradient, children, style, ...props} = this.props;

    if (gradient) {
      return (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          locations={[0.2, 1]}
          style={[styles.gradient, style]}
          colors={[
            materialTheme.COLORS.GRADIENT_START,
            materialTheme.COLORS.GRADIENT_END,
          ]}>
          <Button
            color="transparent"
            style={[styles.gradient, style]}
            {...props}>
            <Text color={theme.COLORS.WHITE}>{children}</Text>
          </Button>
        </LinearGradient>
      );
    }

    return <Button {...props}>{children}</Button>;
  }
}

const styles = StyleSheet.create({
  gradient: {
    borderWidth: 0,
    borderRadius: theme.SIZES.BASE * 2,
  },
});

// import React from 'react';
// import {Button} from '@react-native-material/core';
// const App = () => (
//   <Button title="Click Me" style={{alignSelf: 'center', marginTop: 40}} />
// );

// export default App;

// export default App;

// import React from 'react';
// import {
//   AppBar,
//   Stack,
//   ActivityIndicator,
//   Button,
//   FAB,
//   IconButton,
// } from '@react-native-material/core';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// const App = () => (
//   <>
//     <AppBar
//       title="Title"
//       leading={props => (
//         <IconButton
//           icon={props => <Icon name="menu" {...props} />}
//           {...props}
//         />
//       )}
//       trailing={props => (
//         <Stack center style={{width: 48, height: 48}}>
//           <ActivityIndicator size="small" color="on-primary" />
//         </Stack>
//       )}
//     />
//     <Stack fill center>
//       <Button title="Button" loading disabled />
//     </Stack>
//     <FAB loading style={{position: 'absolute', end: 16, bottom: 16}} disabled />
//   </>
// );

// export default App;
