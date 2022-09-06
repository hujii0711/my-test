import * as React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  Avatar,
  Button,
  TextInput,
  Divider,
  Switch,
  Chip,
} from 'react-native-paper';

const MyComponent = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <ScrollView>
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
            <Text style={{fontSize: 12, marginLeft: 10, color: '#000000'}}>
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
              backgroundColor: '#fa5b5b',
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            로그인
          </Button>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button mode="text" labelStyle={{color: '#000000', fontSize: 12}}>
              아이디 찾기
            </Button>
            <Button mode="text" labelStyle={{color: '#000000', fontSize: 12}}>
              비밀번호 찾기
            </Button>
            <Button mode="text" labelStyle={{color: '#000000', fontSize: 12}}>
              회원가입
            </Button>
          </View>
        </View>
        <Divider bold={true} style={{marginVertical: 10}} />
        <View
          style={{
            backgroundColor: '#ffffff',
            padding: 20,
            marginHorizontal: 40,
          }}>
          <Chip
            style={{backgroundColor: '#ffffff'}}
            textStyle={{fontSize: 12}}
            icon="transit-connection-variant"
            onPress={() => console.log('Pressed')}>
            간편계정으로 시작하기
          </Chip>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: '#ffcf00',
              marginVertical: 7,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            카카오톡 계정으로 시작하기
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: '#40c500',
              marginVertical: 7,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            네이버 계정으로 시작하기
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: '#0051ff',
              marginVertical: 7,
            }}
            labelStyle={{fontWeight: 'bold', fontSize: 15}}>
            구글 계정으로 시작하기
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyComponent;
