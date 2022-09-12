import * as React from 'react';
import {View, Text} from 'react-native';
import {Avatar, Button, TextInput, Switch} from 'react-native-paper';
import ScreenWrapper from '../../commons/ScreenWapper';
import Color from '../../commons/Color';

const Login = ({navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <ScreenWrapper>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#ffffff',
            padding: 20,
          }}>
          <Avatar.Text
            size={100}
            labelStyle={{fontSize: 17}}
            style={{
              backgroundColor: '#bc28e4',
              margin: 10,
              alignSelf: 'center',
            }}
            label="Portfolio"
          />
          <TextInput
            mode="outlined"
            placeholder="아이디를 입력하세요."
            selectionColor="#c2c2c2" //텍스트 select 되었을 때
            activeOutlineColor="#919191" //editmode
            outlineColor="#919191" // input border
            //underlineColor="red"
            //activeUnderlineColor="blue"
            style={{backgroundColor: '#ffffff', fontSize: 12}}
            onChangeText={text => setText(text)}
          />
          <TextInput
            mode="outlined"
            placeholder="비밀번호를 입력하세요."
            selectionColor="#c2c2c2" //텍스트 select 되었을 때
            activeOutlineColor="#919191" //editmode
            outlineColor="#919191" // input border
            style={{backgroundColor: '#ffffff', fontSize: 12}}
            secureTextEntry
          />

          <View style={{flex: 1, flexDirection: 'row', marginVertical: 20}}>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            <Text
              style={{
                fontSize: 12,
                marginLeft: 10,
                marginTop: 5,
                color: '#000000',
              }}>
              자동 로그인
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: Color.red4,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            로그인
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate('SnsLogin');
            }}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: Color.green2,
              marginTop: 10,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            간편계정으로 시작하기
          </Button>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Button
              mode="text"
              onPress={() => {}}
              labelStyle={{color: '#000000', fontSize: 12}}>
              아이디 찾기
            </Button>
            <Button
              mode="text"
              onPress={() => {}}
              labelStyle={{color: '#000000', fontSize: 12}}>
              비밀번호 찾기
            </Button>
            <Button
              mode="text"
              onPress={() => {}}
              labelStyle={{color: '#000000', fontSize: 12}}>
              회원가입
            </Button>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;
