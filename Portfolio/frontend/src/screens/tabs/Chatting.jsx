import * as React from 'react';
import {Avatar, IconButton, Button} from 'react-native-paper';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import Color from '../../commons/style/Color';
import ScreenWrapper from '../../commons/utils/ScreenWapper';

const MyView = () => {
  return (
    <View
      style={{
        flexDirection: 'row-reverse',
        marginVertical: 10,
      }}>
      <View style={{marginRight: 10, flex: 1}}>
        <Text
          style={{
            backgroundColor: Color.black,
            color: Color.white,
            padding: 10,
            borderRadius: 10,
            flex: 1,
          }}>
          이 한 줄의 CSS만으로 아이템들은 기본적으로 아래 그림과 같이
          배치됩니다. 이 한 줄의 CSS만으로 아이템들은 기본적으로 아래 그림과
          같이 배치됩니다.
        </Text>
      </View>
      <Text
        style={{
          color: Color.text,
          padding: 10,
          fontSize: 10,
          alignSelf: 'flex-end',
        }}>
        09:16
      </Text>
    </View>
  );
};

const YouView = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 10,
      }}>
      <Avatar.Text
        size={30}
        label="너"
        style={{
          marginLeft: 10,
          alignSelf: 'stretch',
          marginTop: 5,
          backgroundColor: Color.blue3,
          color: Color.white,
        }}
      />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text
          style={{
            backgroundColor: Color.white,
            color: Color.text,
            padding: 10,
            borderColor: Color.divider,
            borderWidth: 1,
            borderRadius: 10,
            flex: 1,
          }}>
          이 한 줄의 CSS만으로 아이템들은 기본적으로 아래 그림과 같이
          배치됩니다. 이 한 줄의 CSS만으로 아이템들은 기본적으로 아래 그림과
          같이 배치됩니다.
        </Text>
      </View>
      <Text
        style={{
          color: Color.text,
          padding: 10,
          fontSize: 10,
          alignSelf: 'flex-end',
        }}>
        09:16
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
      style={{backgroundColor: Color.pink1, borderRadius: 0}}
      color={Color.white}>
      2022-09-06(수)
    </Button>
  );
};

const Chatting = () => {
  const [text, onChangeText] = React.useState('대화 내용을 입력하세요.');
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding'})}
      style={{flex: 1}}
      keyboardVerticalOffset={80}>
      <ScreenWrapper
        style={{
          backgroundColor: Color.faint_red,
          margin: 10,
        }}>
        <Today />
        <MyView />
        <YouView />
        <MyView />
        <YouView />
        <MyView />
        <YouView />
        <MyView />
        <YouView />
      </ScreenWrapper>
      {/* <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
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
          onPress={() => console.log('Pressed')}
          style={{
            flex: 1,
          }}
        />
      </View> */}
    </KeyboardAvoidingView>
  );
};

export default Chatting;
