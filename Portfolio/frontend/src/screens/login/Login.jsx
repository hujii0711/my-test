import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Avatar, Button, TextInput, Switch} from 'react-native-paper';
import ScreenWrapper from '../../commons/utils/ScreenWapper';
import Color from '../../commons/style/Color';
import useLogin from '../../commons/hooks/useLogin';
import {authStorage} from '/commons/storage/authStorage';

const Login = ({navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const {mutate: login, isLoading: loginLoading} = useLogin();
  const isLoading = loginLoading;

  const onPressLogin = () => {
    if (isLoading) {
      return;
    }

    // 자동로그인 체크 정보 AsyncStorage에 저장
    authStorage.set('autoLogin', isSwitchOn ? 'Y' : 'N');

    login({
      identifier,
      password,
    });
  };
  const onPressRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={{flex: 1}}>
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
            placeholder="이메일을 입력하세요."
            selectionColor="#c2c2c2" //텍스트 select 되었을 때
            activeOutlineColor="#919191" //editmode
            outlineColor="#919191" // input border
            style={{backgroundColor: '#ffffff', fontSize: 12}}
            value={identifier}
            onChangeText={setIdentifier}
          />
          <TextInput
            mode="outlined"
            placeholder="비밀번호를 입력하세요."
            selectionColor="#c2c2c2" //텍스트 select 되었을 때
            activeOutlineColor="#919191" //editmode
            outlineColor="#919191" // input border
            style={{backgroundColor: '#ffffff', fontSize: 12}}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
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
            onPress={onPressLogin}
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
              onPress={onPressRegister}
              labelStyle={{color: '#000000', fontSize: 12}}>
              회원가입
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Login;
