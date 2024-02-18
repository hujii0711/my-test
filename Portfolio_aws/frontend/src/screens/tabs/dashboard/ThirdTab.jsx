import * as React from 'react';
import {WebView} from 'react-native-webview';

const ThirdTab = () => {
  console.log('#########ThirdTab@@@@@@@@@@@@#########');
  return (
    <WebView
      source={{uri: 'http://10.0.2.2:5000'}}
      //source={{html: htmlContent}}
      allowsInlineMediaPlayback={true}
      style={{flex: 1}}
    />
  );
};

export default ThirdTab;
