import React, {useState, useCallback, useMemo} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Avatar, Button, Card, TextInput} from 'react-native-paper';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import Color from '../../../commons/style/Color';
import {insertArticle, updateArticle} from '../../../api/articles';

const LeftContent = props => (
  <Avatar.Text
    {...props}
    size={45}
    labelStyle={{fontSize: 17}}
    style={{margin: 1}}
    label="형준"
  />
);

const ArticleWrite = () => {
  console.log('&&&&&&&&&&&&&&&&&ArticleWrite 렌더링&&&&&&&&&&&&&&&&&');
  const articleId = useRoute().params?.id;
  const createdDt = useRoute().params?.createdDt;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const mode = articleId ? 'modify' : 'write';

  //글 수정시 articleId가 바뀌지 않는 한 캐싱 데이터 활용
  const selectArticleCacheData = useMemo(
    () =>
      articleId
        ? queryClient.getQueryData(['selectArticle', articleId]) // 캐시 데이터 조회
        : null,
    [queryClient, articleId],
  );

  const [title, setTitle] = useState(selectArticleCacheData?.title ?? '');
  const [contents, setContents] = useState(
    selectArticleCacheData?.contents ?? '',
  );

  const {mutate: mutateInsertArticle} = useMutation(insertArticle, {
    onSuccess: insertedData => {
      //pages: [[{},{}...]]
      //pageParams: [undefined]
      //queryClient.invalidateQueries('selectArticlePagingList');
      queryClient.setQueryData('selectArticlePagingList', data => {
        if (!data) {
          return {
            pageParams: [undefined],
            pages: [[insertedData]],
          };
        }
        const [firstPage, ...rest] = data.pages;

        return {
          ...data,
          pages: [[insertedData, ...firstPage], ...rest],
        };
      });
      navigation.goBack(); // articleList로 이동
    },
  });

  const {mutate: mutateUpdateArticle} = useMutation(updateArticle, {
    onSuccess: updatedData => {
      //pages: [[{},{}...]]
      //pageParams: [undefined]
      queryClient.setQueryData('selectArticlePagingList', data => {
        if (!data) {
          return {pageParams: [], pages: []};
        }
        return {
          pageParams: data.pageParams,
          pages: data.pages.map(page =>
            page.find(a => a.created_dt === createdDt)
              ? page.map(b => (b.created_dt === createdDt ? updatedData : b))
              : page,
          ),
        };
      });

      // 게시글 수정
      //queryClient.invalidateQueries('selectArticle');
      queryClient.setQueryData(['selectArticle', articleId], updatedData);
      navigation.goBack(); // articleView로 이동
    },
  });

  const onSubmitWriteArticle = useCallback(() => {
    mutateInsertArticle({title, contents});
  }, [mutateInsertArticle, title, contents]);

  const onSubmitModifyArticle = useCallback(() => {
    mutateUpdateArticle({createdDt, title, contents});
  }, [mutateUpdateArticle, title, contents, createdDt]);

  return (
    <Card style={{flex: 1}}>
      <Card.Title
        title={mode === 'modify' ? '글 수정' : '글 작성'}
        subtitle="2022-09-05"
        left={LeftContent}
      />
      <Card.Content style={{flex: 1}}>
        <TextInput
          label="제목"
          mode="outlined"
          placeholder="제목을 입력하세요"
          selectionColor={Color.unactive_text} //텍스트 select 되었을 때
          activeOutlineColor={Color.sub_main} //editmode
          outlineColor={Color.border} // input border
          style={styles.textInput}
          value={title}
          onChangeText={text => setTitle(text)}
          right={<TextInput.Affix text="/100" />}
        />
        <TextInput
          label="내용"
          mode="outlined"
          placeholder="내용을 입력하세요"
          selectionColor={Color.unactive_text} //텍스트 select 되었을 때
          activeOutlineColor={Color.sub_main} //editmode
          outlineColor={Color.border} // input border
          style={[styles.textInput, {flex: 1}]}
          value={contents}
          onChangeText={text => setContents(text)}
          multiline
          right={<TextInput.Affix text="/1000" />}
        />
      </Card.Content>
      <Card.Actions style={{flexDirection: 'row', justifyContent: 'center'}}>
        {mode === 'modify' && (
          <Button
            mode="outlined"
            icon="archive-cog-outline"
            onPress={onSubmitModifyArticle}
            color={Color.text}
            style={styles.button}
            labelStyle={{fontWeight: 'bold', fontSize: 12}}>
            수정
          </Button>
        )}
        {mode === 'write' && (
          <Button
            mode="outlined"
            icon="text-box-plus"
            onPress={onSubmitWriteArticle}
            color={Color.text}
            style={styles.button}
            labelStyle={{fontWeight: 'bold', fontSize: 12}}>
            등록
          </Button>
        )}
        <Button
          mode="outlined"
          icon="undo"
          onPress={() => navigation.goBack()}
          color={Color.text}
          style={styles.button}
          labelStyle={{fontWeight: 'bold', fontSize: 12}}>
          취소
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: Color.border,
    borderRadius: 5,
    padding: 0,
    marginHorizontal: 5,
  },
  textInput: {backgroundColor: Color.white, fontSize: 12},
});

export default ArticleWrite;
