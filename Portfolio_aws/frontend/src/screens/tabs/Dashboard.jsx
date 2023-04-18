import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconButton, Text} from 'react-native-paper';
import Color from '../../commons/style/Color';
import ScreenWrapper from '../../commons/utils/ScreenWapper';
import {useUser} from '../../commons/hooks/useReduxState';

const Dashboard = () => {
  const navigation = useNavigation();
  const users = useUser();
  console.log('Dashboard >>> users======', users);

  const data = [
    {
      id: 'share',
      text: '공유',
      icon: 'share-variant-outline',
      onPress: () => navigation.navigate('ShareScreen'),
    },
    {id: 'notifyPush', text: '푸시 알림', icon: 'bell'},
    {id: 'filming', text: '촬영', icon: 'camera'},
    {id: 'email', text: '이메일', icon: 'email'},
    {
      id: 'calendar',
      text: '달력',
      icon: 'calendar-month',
      onPress: () => navigation.navigate('CalendarScreen'),
    },
    {id: 'qrcode', text: 'QR 코드', icon: 'qrcode'},
    {id: 'map', text: '지도', icon: 'map-outline'},
    {id: 'link', text: '링크', icon: 'link'},
    {id: 'mapMarker', text: '위치 정보', icon: 'map-marker'},
    {id: 'voice', text: '음성 인식', icon: 'voicemail'},
  ];

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {data.map(elem => (
          <View style={styles.items} key={elem.id}>
            <View
              style={{
                backgroundColor: Color.red2,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Color.red2,
              }}>
              <IconButton
                icon={elem.icon}
                size={34}
                color={Color.white}
                onPress={elem.onPress}></IconButton>
            </View>
            <Text style={{fontSize: 12, marginTop: 7, color: '#3a3a3a'}}>
              {elem.text}
            </Text>
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    //borderRadius: 15,
    //borderWidth: 2,
    //borderColor: '#3a3a3a',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  items: {
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 30,
  },
});

export default Dashboard;
