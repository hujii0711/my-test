import React, {memo} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {Badge} from 'react-native-paper';
import Color from '../../../commons/style/Color';
import com from '../../../commons/utils/common';

const ArticleListItem = ({
  _navigation,
  _id,
  _title,
  _createdDt,
  _userName,
  _lookup,
}) => {
  console.log('&&&&&&&&&&&&&&&&&ArticleListItem 렌더링&&&&&&&&&&&&&&&&&');
  const createdDtAgo = com.formatDaysAgo(_createdDt);

  const onPressMove = () => {
    //_navigation.navigate('ArticleView', {id: _id, createdDt: _createdDt}); {"_createdDt": 1680840905408, "_id": "f1bf24ed-b9d6-4597-bc58-bc99dc9d4af6"}
    const move = {id: _id, createdDt: _createdDt}; //{"createdDt": 1680840905408, "id": "f1bf24ed-b9d6-4597-bc58-bc99dc9d4af6"}
    _navigation.navigate('ArticleView', move);
  };

  return (
    <Pressable
      style={({pressed}) => [styles.block, pressed && styles.pressed]}
      onPress={onPressMove}
      android_ripple={{color: Color.pressed}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>{_title}</Text>
        {/* <Badge style={styles.badge} size={14}></Badge> */}
      </View>
      <View style={styles.footer}>
        <Text style={styles.smallText}>
          {_userName} | {createdDtAgo} | 조회수: {_lookup}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: Color.background,
  },
  pressed: {
    backgroundColor: Color.pressed,
  },
  badge: {
    color: Color.white,
    fontSize: 11,
    backgroundColor: Color.red2,
    position: 'absolute',
    right: 10,
  },
  title: {
    fontSize: 14,
    color: Color.text,
  },
  footer: {
    marginTop: 16,
  },
  smallText: {
    fontSize: 11,
    color: Color.text,
  },
});

export default memo(ArticleListItem);
