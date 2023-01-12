import * as React from 'react';
import {View, Text} from 'react-native';
import {Avatar, Button, Card, TextInput} from 'react-native-paper';

const MyComponent = () => (
  <Card style={{flex: 1}}>
    <View
      style={{
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6e6e4',
      }}>
      <Avatar.Text
        size={150}
        labelStyle={{fontSize: 17}}
        style={{backgroundColor: '#0679de'}}
        label="회원가입"
      />
    </View>
    <Card.Content style={{flex: 0.5, backgroundColor: '#4f4444'}}>
      <TextInput
        mode="outlined"
        label="아이디"
        placeholder="아이디"
        style={{marginVertical: 10}}
        right={<TextInput.Affix text="/100" />}
      />
      <TextInput
        mode="outlined"
        label="비밀번호"
        placeholder="비밀번호"
        secureTextEntry
        right={<TextInput.Icon text="/100" />}
      />
      <TextInput
        mode="outlined"
        label="비밀번호"
        placeholder="비밀번호"
        style={{marginVertical: 10}}
        secureTextEntry
        right={<TextInput.Icon text="/100" />}
      />
    </Card.Content>
    <Card.Actions>
      <Button>취소</Button>
      <Button>회원가입</Button>
    </Card.Actions>
  </Card>
);

export default MyComponent;
