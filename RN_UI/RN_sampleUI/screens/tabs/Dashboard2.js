import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

const data = [
  {id: 'share', text: '공유', icon: 'share-variant-outline'},
  {id: 'notifyPush', text: '푸시 알림', icon: 'bell'},
  {id: 'filming', text: '촬영', icon: 'camera'},
  {id: 'email', text: '이메일', icon: 'email'},
  {id: 'calendar', text: '달력', icon: 'calendar-month'},
  {id: 'qrcode', text: 'QR 코드', icon: 'qrcode'},
  {id: 'map', text: '지도', icon: 'map-outline'},
  {id: 'link', text: '링크', icon: 'link'},
  {id: 'mapMarker', text: '위치 정보', icon: 'map-marker'},
  {id: 'voice', text: '음성 인식', icon: 'voicemail'},
];
const MyComponent = () => (
  <ScrollView>
    <View style={styles.container}>
      {data.map(elem => (
        <View style={styles.items} key={elem.id}>
          <View
            style={{
              backgroundColor: '#F2F8FF',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#3a3a3a',
            }}>
            <IconButton
              icon={elem.icon}
              size={34}
              iconColor="#3a3a3a"
              onPress={() => console.log('Pressed')}></IconButton>
          </View>
          <Text style={{fontSize: 12, marginTop: 7, color: '#3a3a3a'}}>
            {elem.text}
          </Text>
        </View>
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3a3a3a',
    marginHorizontal: 20,
  },
  items: {
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 30,
  },
});

export default MyComponent;
