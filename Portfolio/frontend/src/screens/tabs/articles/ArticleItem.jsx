import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {Badge} from 'react-native-paper';
import Color from '../../../commons/style/Color';
import {formatDaysAgo} from '../../../commons/utils/common';

const ArticleItem = ({
  navigation,
  id,
  title,
  created_at,
  user_name,
  comment_cnt,
  lookup,
}) => {
  const createdAt = formatDaysAgo(created_at);
  const onPressMove = () => {
    navigation.navigate('ArticleView', {id});
  };

  return (
    <Pressable
      style={({pressed}) => [styles.block, pressed && styles.pressed]}
      onPress={onPressMove}
      android_ripple={{color: Color.pressed}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>{title}</Text>
        <Badge style={styles.badge} size={14}>
          {comment_cnt}
        </Badge>
      </View>
      <View style={styles.footer}>
        <Text style={styles.smallText}>
          {user_name} | {createdAt} | 조회수: {lookup}
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

export default ArticleItem;
