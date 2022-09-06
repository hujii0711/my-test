import * as React from 'react';
import {Avatar, IconButton, Button} from 'react-native-paper';
import {View, Text, ScrollView, TextInput} from 'react-native';

const MyComponent = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#65abda'}}>
        <Button
          icon="calendar-month"
          mode="text"
          onPress={() => console.log('Pressed')}
          style={{backgroundColor: '#dddddd', borderRadius: 0}}
          textColor="#4d4d4d">
          2022-09-06(수)
        </Button>
        {/* 
        Array(10).fill().map((arr, i) => {
          return (
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: 'center',
                marginVertical:10,
                marginHorizontal:5,
                marginLeft:70
              }}>
              <Avatar.Text size={24} label="나"/>
              <View style={{ marginRight: 10, flex:1}}>
                <Text style={{backgroundColor: "#f9d900", color:"#000000", padding: 10, borderRadius:10}}>
                  `{i}_____이 한 줄의 CSS만으로 아이템들은 기본적으로 아래 그림과 같이 배치됩니다.`
                </Text>
              </View>
            </View>
          )
        })
      */}
        <View
          style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            marginVertical: 10,
            marginRight: 70,
          }}>
          <Avatar.Text size={24} label="나" />
          <View style={{marginRight: 10, flex: 1}}>
            <Text
              style={{
                backgroundColor: '#f9d900',
                color: '#000000',
                padding: 10,
                borderRadius: 10,
              }}>
              이 한 줄의 CSS만으로 아이템들은 기본적으로 아래 그림과 같이
              배치됩니다. 이 한 줄의 CSS만으로 아이템들은 기본적으로 아래 그림과
              같이 배치됩니다.
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            marginRight: 70,
          }}>
          <Avatar.Text size={24} label="AI" />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text
              style={{
                backgroundColor: '#ffffff',
                padding: 10,
                borderRadius: 10,
              }}>
              이 한 줄의 CSS만으로 아이템들은 기본적으로 아래 그림과 같이
              배치됩니다. 이 한 줄의 CSS만으로 아이템들은 기본적으로 아래 그림과
              같이 배치됩니다.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row', flex: 0.09, alignItems: 'flex-end'}}>
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
      </View>
    </>
  );
};

export default MyComponent;
