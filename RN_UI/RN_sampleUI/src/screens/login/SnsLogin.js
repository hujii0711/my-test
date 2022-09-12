import * as React from 'react';
import {View} from 'react-native';
import {Button, Chip} from 'react-native-paper';
import ScreenWrapper from '../../commons/ScreenWapper';
import Color from '../../commons/Color';

const SnsLogin = () => {
  return (
    <ScreenWrapper>
      <View style={{flex: 1}}>
        <View
          style={{
            padding: 20,
          }}>
          <Chip
            style={{backgroundColor: '#ffffff'}}
            textStyle={{fontSize: 12}}
            icon="transit-connection-variant"
            onPress={() => console.log('Pressed')}>
            간편계정으로 시작하기
          </Chip>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: '#ffcf00',
              marginVertical: 7,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            카카오톡 계정으로 시작하기
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: '#40c500',
              marginVertical: 7,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            네이버 계정으로 시작하기
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: '#0051ff',
              marginVertical: 7,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            구글 계정으로 시작하기
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SnsLogin;
