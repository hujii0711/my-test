import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  List,
  Badge,
  Divider,
  FAB,
  IconButton,
  Button,
} from 'react-native-paper';

const ArticleList = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const onToggleCommentBar = () => setVisible(!visible);

  return (
    <SafeAreaView style={styles.container}>
      <FAB
        icon="clipboard-edit-outline"
        label="새 글 작성 하기"
        style={styles.fab}
        onPress={() => {}}
        visible={true}
      />
      <ScrollView style={styles.scrollView}>
        <List.AccordionGroup>
          {/* <List.Subheader>게시글 목록</List.Subheader> */}
          <List.Accordion title="게시글1" id="1">
            <View>
              <Text style={{padding: 10}}>
                게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1
              </Text>
              <View style={styles.badge_row}>
                <View style={styles.badge_item}>
                  <IconButton
                    icon="comment-processing"
                    color="#bdbdbd"
                    size={25}
                    onPress={onToggleCommentBar}
                  />
                  <Badge visible={true} style={[styles.badge]}>
                    10
                  </Badge>
                </View>
              </View>
            </View>
            {/* 댓글 영역 */}
            {visible && <CommentArea />}
          </List.Accordion>
          <List.Accordion title="게시글2" id="2">
            <List.Section>
              <List.Item
                title="First Item"
                right={() => <List.Icon icon="comment-processing" />}
              />
              <List.Item
                title="Second Item"
                right={() => <List.Icon color="red" icon="folder" />}
              />
            </List.Section>
          </List.Accordion>
          <List.Accordion title="게시글3" id="3">
            <List.Section>
              <List.Item
                title="First Item"
                right={() => <List.Icon icon="comment-processing" />}
              />
              <List.Item
                title="Second Item"
                right={() => <List.Icon color="red" icon="folder" />}
              />
            </List.Section>
          </List.Accordion>
          <List.Accordion title="게시글4" id="4">
            <List.Section>
              <List.Item
                title="First Item"
                right={() => <List.Icon icon="comment-processing" />}
              />
              <List.Item
                title="Second Item"
                right={() => <List.Icon color="red" icon="folder" />}
              />
            </List.Section>
          </List.Accordion>
          <List.Accordion title="게시글5" id="5">
            <List.Section>
              <List.Item
                title="First Item"
                right={() => <List.Icon icon="comment-processing" />}
              />
              <List.Item
                title="Second Item"
                right={() => <List.Icon color="red" icon="folder" />}
              />
            </List.Section>
          </List.Accordion>
          <List.Accordion title="게시글6" id="6">
            <List.Section>
              <List.Item
                title="First Item"
                right={() => <List.Icon icon="comment-processing" />}
              />
              <List.Item
                title="Second Item"
                right={() => <List.Icon color="red" icon="folder" />}
              />
            </List.Section>
          </List.Accordion>
          <List.Accordion title="게시글7" id="7">
            <List.Section>
              <List.Item
                title="First Item"
                right={() => <List.Icon icon="comment-processing" />}
              />
              <List.Item
                title="Second Item"
                right={() => <List.Icon color="red" icon="folder" />}
              />
            </List.Section>
          </List.Accordion>
          <List.Accordion title="게시글8" id="8">
            <List.Section>
              <List.Item
                title="First Item"
                right={() => <List.Icon icon="comment-processing" />}
              />
              <List.Item
                title="Second Item"
                right={() => <List.Icon color="red" icon="folder" />}
              />
            </List.Section>
          </List.Accordion>
          <List.Accordion title="게시글9" id="9">
            <List.Section>
              <List.Item
                title="First Item"
                right={() => <List.Icon icon="comment-processing" />}
              />
              <List.Item
                title="Second Item"
                right={() => <List.Icon color="red" icon="folder" />}
              />
            </List.Section>
          </List.Accordion>
          <List.Accordion title="게시글10" id="10">
            <List.Section>
              <List.Item
                title="First Item"
                right={() => <List.Icon icon="comment-processing" />}
              />
              <List.Item
                title="Second Item"
                right={() => <List.Icon color="red" icon="folder" />}
              />
            </List.Section>
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>
    </SafeAreaView>
  );
};

function CommentInput() {
  return (
    <>
      <Pressable
        style={styles.commentInputBlock}
        onPress={() => {
          console.log('댓글 입력');
        }}>
        <Text style={styles.commentInputText}>댓글을 입력하세요</Text>
      </Pressable>
    </>
  );
}

function CommentItem({message, username, publishedAt}) {
  return (
    <View style={styles.commentItemBlock}>
      <View style={styles.commentInputHead}>
        <Text style={styles.commentInputUsername}>{username}</Text>
        <Text style={styles.commentInputDate}>{publishedAt}</Text>
      </View>
      <Text style={styles.commentInputMessage}>{message}</Text>
      <View style={styles.commentInputActionButtons}>
        <Pressable
          style={({pressed}) => pressed && styles.commentInputPressed}
          hitSlop={8}
          onPress={() => {
            console.log('수정');
          }}>
          {/* <Text style={styles.commentInputButtonText}>수정</Text> */}
          {/* <IconButton icon="comment-edit" color="#2c2c2c" size={16} /> */}
          <Button
            icon="comment-edit"
            mode="contained-tonal"
            color="#2c2c2c"
            onPress={() => console.log('Pressed')}>
            수정
          </Button>
        </Pressable>
        <View style={styles.commentInputPressed} />
        <Pressable
          style={({pressed}) => pressed && styles.commentInputPressed}
          hitSlop={8}
          onPress={() => {
            console.log('삭제');
          }}>
          {/* <Text style={styles.commentInputButtonText}>삭제</Text> */}
          {/* <IconButton icon="comment-remove" color="#2c2c2c" size={16} /> */}
          <Button
            icon="comment-remove"
            mode="contained-tonal"
            color="#2c2c2c"
            onPress={() => console.log('Pressed')}>
            삭제
          </Button>
        </Pressable>
      </View>
    </View>
  );
}

const CommentArea = () => {
  const data = [
    {
      id: '1',
      message: 'message1',
      created_at: '2020-01-01',
      user_id: 'hujii0711',
    },
    {
      id: '2',
      message: 'message2',
      created_at: '2020-01-01',
      user_id: 'hujii0711',
    },
    {
      id: '3',
      message: 'message3',
      created_at: '2020-01-01',
      user_id: 'hujii0711',
    },
  ];

  return (
    <>
      <CommentInput />
      {data.map(elem => {
        return (
          <View key={`${elem.id}_${elem.user_id}`}>
            <CommentItem
              key={elem.id}
              message={elem.message}
              publishedAt={elem.created_at}
              username={elem.user_id}
            />
            <Divider />
          </View>
        );
      })}
    </>
    // <FlatList
    //   data={data}
    //   showsVerticalScrollIndicator={false}
    //   ItemSeparatorComponent={Divider}
    //   ListHeaderComponent={<CommentInput />}
    //   renderItem={({item}) => (
    //     <CommentItem
    //       id={item.id}
    //       message={item.message}
    //       publishedAt={item.created_at}
    //       username={item.user_id}
    //     />
    //   )}
    //   keyExtractor={item => item.id}
    // />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  scrollView: {
    marginHorizontal: 5,
  },
  row: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  fab: {
    margin: 5,
    backgroundColor: '#ffc858',
  },
  badge_row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    backgroundColor: '#2c2c2c',
  },
  badge_item: {
    margin: 5,
  },
  badge: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#ff0000',
  },

  //CommentInput
  commentInputBlock: {
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 12,
  },
  commentInputText: {
    fontSize: 12,
    color: '#898989',
  },

  //CommentItem
  commentItemBlock: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  commentInputHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentInputUsername: {
    fontWeight: 'bold',
  },
  commentInputDate: {
    color: '#546e7a',
    fontSize: 10,
    marginTop: 4,
  },
  commentInputMessage: {
    marginTop: 4,
  },
  commentInputActionButtons: {
    marginTop: 24,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  commentInputSeparator: {
    width: 8,
  },
  commentInputButtonText: {
    fontSize: 12,
    color: '#546e7a',
  },
  commentInputPressed: {
    opacity: 0.75,
  },
});

export default ArticleList;
