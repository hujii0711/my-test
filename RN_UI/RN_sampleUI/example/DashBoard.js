import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, FAB} from 'react-native-paper';

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
  <>
    <View style={styles.container}>
      {data.map(elem => (
        <View style={styles.items} key={elem.id}>
          <IconButton
            icon={elem.icon}
            iconColor="#000000"
            size={50}
            onPress={() => console.log('Pressed')}
          />
          <Text style={{fontSize: 12, marginTop: -10, marginBottom: 20}}>
            {elem.text}
          </Text>
        </View>
      ))}
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  items: {
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});

export default MyComponent;
