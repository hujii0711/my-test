import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {format} from 'date-fns';

function CommentItem({id, message, publishedAt, username, onRemove, onModify}) {
  const handleRemove = () => onRemove(id);
  const handleModify = () => onModify(id);

  const [like, setLike] = React.useState(0);
  const [hate, setHate] = React.useState(0);

  const published_at = format(new Date(publishedAt), 'yyyy-MM-dd');

  return (
    <View style={styles.block}>
      {/*left*/}
      <View style={styles.left}>
        <Avatar.Text
          size={30}
          label="AI"
          style={{backgroundColor: '#f6b93b'}}
        />
      </View>
      {/*right*/}
      <View style={styles.right}>
        {/*header*/}
        <View style={styles.header}>
          <Text style={styles.header_text}>{username}</Text>
          <View style={styles.space} />
          <Text style={styles.header_text}>{published_at}</Text>
        </View>
        <View style={styles.divider} />

        {/*content*/}
        <View style={styles.content}>
          <Text style={styles.content_text}>{message}</Text>
        </View>
        <View style={styles.divider} />

        {/*footer*/}
        <View style={styles.footer}>
          <View style={styles.footer_left}>
            <IconButton
              icon="emoticon-kiss-outline"
              size={18}
              onPress={() => setLike(like + 1)}
            />
            <Text style={{fontSize: 11, marginLeft: -10}}>{like}</Text>
            <IconButton
              icon="emoticon-devil-outline"
              size={18}
              onPress={() => setHate(hate + 1)}
            />
            <Text style={{fontSize: 11, marginLeft: -10}}>{hate}</Text>
          </View>
          <View style={styles.footer_right}>
            <Pressable
              style={({pressed}) => pressed && styles.pressed}
              onPress={handleModify}>
              <Text style={styles.buttonText}>수정</Text>
            </Pressable>
            <Pressable
              style={({pressed}) => pressed && styles.pressed}
              onPress={handleRemove}>
              <Text style={styles.buttonText}>삭제</Text>
            </Pressable>
          </View>
        </View>
      </View>{' '}
      {/*right END*/}
    </View> //block END
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#f5f6fa',
    flexDirection: 'row',
  },
  left: {
    backgroundColor: '#f5f6fa',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '15%',
  },
  right: {
    backgroundColor: '#f5f6fa',
    width: '85%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  header_text: {
    fontSize: 12,
    color: '#3a3a3a',
  },
  content: {
    marginBottom: 10,
  },
  content_text: {
    fontSize: 12,
    color: '#3a3a3a',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer_left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer_right: {
    flexDirection: 'row',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#f5f6fa',
  },
  space: {
    borderWidth: 1,
    width: 1,
    marginHorizontal: 10,
    borderColor: '#dcdde1',
    height: '100%',
  },
  buttonText: {
    fontSize: 11,
    borderWidth: 1,
    padding: 4,
    borderColor: '#3a3a3a',
    marginHorizontal: 5,
    borderRadius: 10,
    color: '#3a3a3a',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default CommentItem;
