import * as React from 'react';
import {TextInput} from 'react-native-paper';

const Register = () => {
  const [text, setText] = React.useState('');

  return (
    <>
      <TextInput
        mode="outlined"
        label="제목"
        placeholder="제목을 입력하세요."
        left={<TextInput.Icon icon="pencil" />}
        right={<TextInput.Affix text="/100" />}
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        mode="outlined"
        label="내용"
        multiline={true}
        placeholder="내용을 입력하세요."
        style={{height: 120}}
        left={<TextInput.Icon icon="pencil" />}
        right={<TextInput.Affix text="/1000" />}
      />
    </>
  );
};

export default Register;
