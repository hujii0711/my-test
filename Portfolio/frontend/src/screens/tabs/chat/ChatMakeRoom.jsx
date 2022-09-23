import * as React from 'react';
import {Image, View} from 'react-native';
import {IconButton} from 'react-native-paper';

const MyComponent = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{width: '100%', height: '85%', backgroundColor: 'red'}}>
        <Image
          source={{
            uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: '15%',
          backgroundColor: '#b8e994',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <IconButton
          icon="chat-plus"
          iconColor="#227093"
          size={50}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="close"
          iconColor="#227093"
          size={50}
          onPress={() => console.log('Pressed')}
        />
      </View>
    </View>
  );
};

export default MyComponent;
