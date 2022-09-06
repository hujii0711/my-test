import * as React from 'react';
import {Avatar, Button, Card, TextInput, View} from 'react-native-paper';

const LeftContent = props => (
  <Avatar.Text
    {...props}
    size={45}
    labelStyle={{fontSize: 17}}
    style={{margin: 1}}
    label="형준"
  />
);

const MyComponent = () => {
  const [text, setText] = React.useState('');

  return (
    <Card style={{flex: 1}}>
      <Card.Title title="글 작성" subtitle="2022-09-05" left={LeftContent} />
      <Card.Content style={{flex: 1}}>
        <TextInput
          mode="outlined"
          label="제목"
          placeholder="제목을 입력하세요"
          right={<TextInput.Affix text="/100" />}
        />
        <TextInput
          mode="outlined"
          label="내용"
          style={{flex: 1}}
          placeholder="내용을 입력하세요"
          right={<TextInput.Affix text="/1000" />}
        />
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

export default MyComponent;
