import * as React from 'react';
import {StyleSheet, Text, View, Image, Button, Linking} from 'react-native';
import {Card, Paragraph, Divider} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import ScreenWrapper from '../../../commons/utils/ScreenWapper';

const SecondTab = () => {
  const handleOpenLink = () => {
    const url = 'https://www.naver.com'; // 여기에 이동할 사이트의 URL을 입력하세요.
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const PHOTOS = Array(5)
    .fill()
    .map((_, i) => {
      return {
        url: `https://unsplash.it/500/500/?random&__id=${i}`,
      };
    });
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.largeText}>Swiper Demo</Text>
          <Swiper>
            {PHOTOS.map((elem, index) => {
              const url_ = elem.url;
              return (
                <View key={index} style={styles.slide}>
                  <Image
                    key={index}
                    source={{uri: url_}}
                    style={styles.image}
                  />
                </View>
              );
            })}
          </Swiper>
        </View>
      </View>
      <Divider />
      <View style={styles.wrapper2}>
        <Text style={styles.largeText}>Card Demo</Text>
        <Card style={styles.card} mode={'elevated'}>
          <Card.Cover
            source={require('../../../assets/images/santafe01.png')}
          />
          <Card.Title title="Ship" />
          <Card.Content>
            <Paragraph variant="bodyMedium">
              The Abandoned Ship is a wrecked ship located on Route 108 in
              Hoenn, originally being a ship named the S.S. Cactus. The second
              part of the ship can only be accessed by using Dive and contains
              the Scanner.
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
      <Divider />
      <View>
        <Text style={styles.largeText}>Link Demo</Text>
        <Button title="Open Website_naver" onPress={handleOpenLink} />
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
    marginHorizontal: 20,
    marginVertical: 15,
  },
  wrapper: {height: 300},
  wrapper2: {height: 'auto'},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  largeText: {
    fontSize: 16,
    marginVertical: 20, // 수직
    marginHorizontal: 10, // 수평
  },
  card: {
    margin: 4,
  },
});

export default SecondTab;
