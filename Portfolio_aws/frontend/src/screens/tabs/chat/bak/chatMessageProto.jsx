import * as React from 'react';
import {Avatar, IconButton, Button} from 'react-native-paper';

import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';

const MyView = ({message}) => {
  return (
    <View
      style={{
        marginVertical: 10,
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        backgroundColor: 'red',
      }}>
      <Text
        style={{
          backgroundColor: 'black', //Color.black
          color: 'white', //Color.white
          padding: 10,
          borderRadius: 10,
          maxWidth: '70%',
          marginRight: 20,
        }}>
        {message}
      </Text>
      <Text
        style={{
          color: '#3a3a3a', //Color.text
          fontSize: 10,
          paddingRight: 10,
          fontSize: 11,
          alignSelf: 'flex-end',
          backgroundColor: 'green',
        }}>
        오후 09:16
      </Text>
    </View>
  );
};

const YouView = ({message}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        backgroundColor: 'red',
      }}>
      <Avatar.Text
        size={30}
        label="너"
        style={{
          alignSelf: 'stretch',
          marginTop: 5,
          backgroundColor: 'blue', //Color.blue3
          color: 'white', //Color.white
          marginLeft: 10,
        }}
      />
      <Text
        style={{
          backgroundColor: 'white', //Color.white
          color: '#3a3a3a', //Color.text
          padding: 10,
          borderColor: '#3a3a3a', //Color.divider
          borderWidth: 1,
          borderRadius: 10,
          marginLeft: 10,
          maxWidth: '60%',
        }}>
        {message}
      </Text>
      <Text
        style={{
          color: '#3a3a3a', //Color.text
          paddingLeft: 10,
          fontSize: 11,
          alignSelf: 'flex-end',
          backgroundColor: 'green',
        }}>
        오후 09:16
      </Text>
    </View>
  );
};

const Today = () => {
  return (
    <Button
      icon="calendar-month"
      mode="text"
      onPress={() => console.log('Pressed')}
      style={{backgroundColor: 'gray', borderRadius: 0}}
      color={'white'}>
      2022-09-06(수)
    </Button>
  );
};

const ChattingMessge = () => {
  const [text, onChangeText] = React.useState('대화 내용을 입력하세요.');
  const [messageList, setMessageList] = React.useState([]);

  const onAddBtnClick = event => {
    setMessageList(
      messageList.concat(<YouView message={text} key={messageList.length} />),
    );
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={80}>
      <Today />
      {messageList}
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <TextInput
          style={{
            margin: 12,
            borderWidth: 1,
            borderColor: '#b2b2b2',
            borderRadius: 10,
            padding: 10,
            height: 40,
            flex: 5,
          }}
          onChangeText={onChangeText}
          value={text}
        />
        <IconButton
          icon="check"
          size={36}
          onPress={onAddBtnClick}
          style={{
            flex: 1,
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChattingMessge;
