import React, {memo, useEffect} from 'react';
import {Badge, IconButton, ActivityIndicator} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import Color from '../../../commons/style/Color';

const CommentEntry = ({refRBSheet, commentCnt = 0}) => {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>댓글</Text>
      <Badge style={styles.badge} visible={true} size={16}>
        {commentCnt}
      </Badge>
      <IconButton
        icon="unfold-more-horizontal"
        iconColor={Color.text}
        style={styles.button}
        size={18}
        onPress={() => refRBSheet.current.open()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.divider,
    flexDirection: 'row',
    height: 40,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 12,
    padding: 10,
    color: Color.text,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 35,
    backgroundColor: Color.red2,
    color: Color.white,
  },
  button: {
    position: 'absolute',
    right: 5,
  },
});

export default memo(CommentEntry);