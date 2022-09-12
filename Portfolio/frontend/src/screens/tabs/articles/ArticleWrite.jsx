import * as React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Avatar, Button, Card, TextInput} from 'react-native-paper';
import Color from '../../../commons/style/Color';

const LeftContent = props => (
  <Avatar.Text
    {...props}
    size={45}
    labelStyle={{fontSize: 17}}
    style={{margin: 1}}
    label="형준"
  />
);

const ArticleWrite = () => {
  const [text, setText] = React.useState('');

  return (
    <Card style={{flex: 1}}>
      <Card.Title title="글 작성" subtitle="2022-09-05" left={LeftContent} />
      <Card.Content style={{flex: 1}}>
        <TextInput
          label="제목"
          mode="outlined"
          placeholder="제목을 입력하세요"
          selectionColor={Color.unactive_text} //텍스트 select 되었을 때
          activeOutlineColor={Color.sub_main} //editmode
          outlineColor={Color.border} // input border
          style={{backgroundColor: Color.white, fontSize: 12}}
          onChangeText={text => setText(text)}
          right={<TextInput.Affix text="/100" />}
        />
        <TextInput
          label="내용"
          mode="outlined"
          placeholder="내용을 입력하세요"
          selectionColor={Color.unactive_text} //텍스트 select 되었을 때
          activeOutlineColor={Color.sub_main} //editmode
          outlineColor={Color.border} // input border
          style={{backgroundColor: Color.white, fontSize: 12, flex: 1}}
          onChangeText={text => setText(text)}
          multiline
          right={<TextInput.Affix text="/1000" />}
        />
      </Card.Content>
      <Card.Actions style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          mode="outlined"
          icon="archive-cog-outline"
          onPress={() => console.log('Pressed')}
          color={Color.text}
          style={{
            borderWidth: 1,
            borderColor: Color.border,
            borderRadius: 5,
            padding: 0,
            marginHorizontal: 5,
          }}
          labelStyle={{fontWeight: 'bold', fontSize: 12}}>
          수정
        </Button>
        <Button
          mode="outlined"
          icon="archive-edit-outline"
          onPress={() => console.log('Pressed')}
          color={Color.text}
          style={{
            borderWidth: 1,
            borderColor: Color.border,
            borderRadius: 5,
            padding: 0,
            marginHorizontal: 5,
          }}
          labelStyle={{fontWeight: 'bold', fontSize: 12}}>
          등록
        </Button>
        <Button
          mode="outlined"
          icon="archive-remove-outline"
          onPress={() => console.log('Pressed')}
          color={Color.text}
          style={{
            borderWidth: 1,
            borderColor: Color.border,
            borderRadius: 5,
            padding: 0,
            marginHorizontal: 5,
          }}
          labelStyle={{fontWeight: 'bold', fontSize: 12}}>
          삭제
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ArticleWrite;
