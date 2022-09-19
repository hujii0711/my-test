import * as React from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, Text, Pressable} from 'react-native';

const MyComponent = () => {
  const [text, setText] = React.useState('');

  return (
    <>
      <Text
        style={{
          fontSize: 14,
          marginVertical: 20,
          marginHorizontal: 10,
          justifyContent: 'center',
          borderWidth: 1,
          padding: 15,
          borderRadius: 10,
          borderColor: '#919191',
        }}>
        가입시 사용하신 이메일을 입력해주세요.{'\n'}
        비밀번호를 변경할 수 있는 인증 코드를 {'\n'}이메일로 보내드립니다.
      </Text>
      <Text variant="displayMedium">가입시 작성한 이메일</Text>
      <TextInput
        label="이메일(아이디)"
        mode="outlined"
        value={text}
        placeholder="이메일을 입력하세요."
        activeOutlineColor="#919191"
        outlineColor="#919191"
        left={<TextInput.Icon icon="email" size={20} />}
        style={{backgroundColor: '#ffffff', fontSize: 13}}
        onChangeText={text => setText(text)}
      />
      <Button
        mode="contained"
        onPress={{}}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          padding: 5,
          marginVertical: 10,
          backgroundColor: 'orange',
        }}
        labelStyle={{fontWeight: 'bold', fontSize: 14}}>
        비밀번호 재설정 인증 코드 받기
      </Button>
      <Text variant="displayMedium">비밀번호 재설정</Text>
      <TextInput
        label="재설정 코드"
        mode="outlined"
        value={text}
        placeholder="이메일로 받으신 재설정 코드 6자리"
        activeOutlineColor="#919191"
        outlineColor="#919191"
        left={<TextInput.Icon icon="gamepad-circle" size={20} />}
        style={{backgroundColor: '#ffffff', fontSize: 13}}
        onChangeText={text => setText(text)}
      />
      <TextInput
        label="새 비밀번호"
        mode="outlined"
        value={text}
        placeholder="8~16 자리의 비밀번호를 입력하세요."
        activeOutlineColor="#919191"
        outlineColor="#919191"
        left={<TextInput.Icon icon="file-key-outline" size={20} />}
        style={{backgroundColor: '#ffffff', fontSize: 13}}
        onChangeText={text => setText(text)}
      />
      <TextInput
        label="새 비밀번호 확인"
        mode="outlined"
        value={text}
        placeholder="비밀번호를 다시 입력하세요."
        activeOutlineColor="#919191"
        outlineColor="#919191"
        left={<TextInput.Icon icon="file-key" size={20} />}
        style={{backgroundColor: '#ffffff', fontSize: 13}}
        onChangeText={text => setText(text)}
      />
      <Button
        mode="contained"
        onPress={{}}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          padding: 5,
          marginVertical: 10,
          backgroundColor: 'orange',
        }}
        labelStyle={{fontWeight: 'bold', fontSize: 14}}>
        비밀번호 변경하기
      </Button>
    </>
  );
};

export default MyComponent;
