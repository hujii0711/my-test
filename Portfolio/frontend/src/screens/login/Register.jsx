import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Avatar, Button, TextInput, Switch} from 'react-native-paper';
import ScreenWrapper from '../../commons/utils/ScreenWapper';
import Color from '../../commons/style/Color';
import useRegister from '../../commons/hooks/useRegister';

const Register = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {mutate: mutateRegister} = useRegister();

  const onPressRegister = () => {
    mutateRegister({
      userId,
      userName,
      email,
      password,
    });
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
            placeholder="아이디를 입력하세요"
            selectionColor="#c2c2c2"
            activeOutlineColor="#919191"
            outlineColor="#919191"
            style={{backgroundColor: '#ffffff', fontSize: 12}}
            value={userId}
            onChangeText={setUserId}
          />
          <TextInput
            mode="outlined"
            placeholder="이름을 입력하세요"
            selectionColor="#c2c2c2"
            activeOutlineColor="#919191"
            outlineColor="#919191"
            style={{backgroundColor: '#ffffff', fontSize: 12}}
            value={userName}
            onChangeText={setUserName}
          />
          <TextInput
            mode="outlined"
            placeholder="이메일을 입력하세요"
            selectionColor="#c2c2c2"
            activeOutlineColor="#919191"
            outlineColor="#919191"
            style={{backgroundColor: '#ffffff', fontSize: 12}}
            value={email}
            onChangeText={setEmail}
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
          <Button
            mode="contained"
            onPress={onPressRegister}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: Color.red4,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            회원가입
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Register;
