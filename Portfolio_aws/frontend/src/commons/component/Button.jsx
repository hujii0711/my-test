import * as React from 'react';
import {Chip, Button, IconButton} from 'react-native-paper';
import {View, Text, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const MyComponent = () => (
  <>
    <View style={{marginVertical: 20}}></View>
    <View style={{marginVertical: 30}}></View>
    <View style={{flexDirection: 'row'}}>
      <Button
        icon="playlist-edit"
        mode="text"
        contentStyle={{height: 30, backgroundColor: '#1289A7'}}
        labelStyle={{color: '#ffffff'}}
        style={{borderRadius: 5, height: 32}}
        onPress={() => console.log('Pressed')}>
        수정
      </Button>
      <Button
        icon="playlist-remove"
        mode="text"
        contentStyle={{height: 30, backgroundColor: '#A3CB38'}}
        labelStyle={{color: '#ffffff'}}
        style={{borderRadius: 5, height: 32}}
        onPress={() => console.log('Pressed')}>
        삭제
      </Button>
    </View>
    <View style={{flexDirection: 'row'}}>
      <Button
        icon="playlist-edit"
        mode="text"
        contentStyle={{height: 30}}
        labelStyle={{color: '#3a3a3a'}}
        style={{borderRadius: 5, height: 32}}
        onPress={() => console.log('Pressed')}>
        수정
      </Button>
      <Button
        icon="playlist-remove"
        mode="text"
        contentStyle={{height: 30}}
        labelStyle={{color: '#3a3a3a'}}
        style={{borderRadius: 5, height: 32}}
        onPress={() => console.log('Pressed')}>
        삭제
      </Button>
    </View>
    <View style={{flexDirection: 'row'}}>
      <Button
        icon="playlist-edit"
        mode="text"
        contentStyle={{height: 30}}
        labelStyle={{color: '#3a3a3a'}}
        style={{
          borderRadius: 5,
          height: 32,
          borderWidth: 1,
          borderColor: '#3a3a3a',
        }}
        onPress={() => console.log('Pressed')}>
        수정
      </Button>
      <Button
        icon="playlist-remove"
        mode="text"
        contentStyle={{height: 30}}
        labelStyle={{color: '#3a3a3a'}}
        style={{
          borderRadius: 5,
          height: 32,
          borderWidth: 1,
          borderColor: '#3a3a3a',
        }}
        onPress={() => console.log('Pressed')}>
        삭제
      </Button>
    </View>
    <View style={{marginVertical: 30}}></View>
    <View style={{flexDirection: 'row'}}>
      <IconButton //#e55039
        icon="playlist-edit"
        iconColor="white"
        mode="contained"
        style={{backgroundColor: '#0a3d62'}}
        size={24}
        onPress={() => console.log('Pressed')}
      />
      <IconButton
        icon="playlist-remove"
        iconColor="#0a3d62"
        size={24}
        onPress={() => console.log('Pressed')}
      />
    </View>
    <View style={{marginVertical: 30}}></View>
    <Pressable
      onPress={() => {
        console.log('pressed!');
      }}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
        {width: 60, height: 60, alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Ionicons name="md-checkmark-circle" size={32} color="#3a3a3a" />
      <Text style={{fontSize: 11, marginRight: 3, color: '#3a3a3a'}}>달력</Text>
    </Pressable>
    <View style={{marginVertical: 30}}></View>
    <Pressable
      onPress={() => {
        console.log('pressed!');
      }}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
        {
          width: 60,
          height: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Ionicons name="md-checkmark-circle" size={24} color="#3a3a3a" />
      <Text style={{fontSize: 11, marginLeft: 5, color: '#3a3a3a'}}>달력</Text>
    </Pressable>
  </>
);

export default MyComponent;
