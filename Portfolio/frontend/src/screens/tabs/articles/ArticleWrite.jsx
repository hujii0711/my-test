import * as React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Avatar, Button, Card, TextInput} from 'react-native-paper';
import Color from '../../../commons/style/Color';
import {useMutation, useQueryClient, InfiniteData} from 'react-query';
import {writeArticle, modifyArticle} from '../../../api/articles';

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
  const {params} = useRoute();
  const queryClient = useQueryClient();

  //articleId가 바뀌지 않는 한 캐싱 데이터 활용
  const cachedArticle = useMemo(
    () =>
      params.articleId
        ? queryClient.getQueryData(['selectListArticle', params.articleId]) // 캐시 데이터 조회
        : null,
    [queryClient, params.articleId],
  );

  const [title, setTitle] = useState(cachedArticle?.title ?? '');
  const [contents, setContents] = useState(cachedArticle?.contents ?? '');

  const {mutate: mutateWriteArticle} = useMutation(writeArticle, {
    onSuccess: article => {
      queryClient.setQueryData <
        InfiniteData >
        ('selectListArticle',
        data => {
          if (!data) {
            return {
              pageParams: [undefined],
              pages: [[article]],
            };
          }
          const [firstPage, ...rest] = data.pages; // 첫번째 페이지와 나머지 페이지를 구분
          return {
            ...data,
            // 첫번째 페이지에 article을 맨 앞에 추가, 그리고 그 뒤에 나머지 페이지
            pages: [[article, ...firstPage], ...rest],
          };
        });
      navigation.goBack();
    },
  });

  const {mutate: mutateModifyArticle} = useMutation(modifyArticle, {
    onSuccess: article => {
      // 게시글 목록 수정
      queryClient.setQueryData <
        InfiniteData >
        ('selectListArticle',
        data => {
          if (!data) {
            return {pageParams: [], pages: []};
          }

          return {
            pageParams: data.pageParams,
            pages: data.pages.map(page =>
              page.find(a => a.id === params.articleId)
                ? page.map(a => (a.id === params.articleId ? article : a))
                : page,
            ),
          };
        });
      // 게시글 수정
      queryClient.setQueryData(['selectArticle', params.articleId], article);
      navigation.goBack();
    },
  });

  const onSubmitWriteArticle = useCallback(() => {
    mutateWriteArticle({title, contents});
  }, [mutateWriteArticle, title, contents]);

  const onSubmitModifyArticle = useCallback(() => {
    mutateModifyArticle({id: params.articleId, title, contents});
  }, [mutateModifyArticle, title, contents, params.articleId]);

  return (
    <>
      <KeyboardAvoidingView>
        <Card style={{flex: 1}}>
          <Card.Title
            title="글 작성"
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
              style={{backgroundColor: Color.white, fontSize: 12}}
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
              style={{backgroundColor: Color.white, fontSize: 12, flex: 1}}
              onChangeText={text => setContents(text)}
              multiline
              right={<TextInput.Affix text="/1000" />}
            />
          </Card.Content>
          <Card.Actions
            style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              mode="outlined"
              icon="archive-cog-outline"
              onPress={onSubmitModifyArticle}
              color={Color.text}
              style={{
                borderWidth: 1,
                borderColor: Color.border,
                borderRadius: 5,
                padding: 0,
                marginHorizontal: 5,
              }}
              labelStyle={{fontWeight: 'bold', fontSize: 12}}>
              수정
            </Button>
            <Button
              mode="outlined"
              icon="archive-edit-outline"
              onPress={onSubmitWriteArticle}
              color={Color.text}
              style={{
                borderWidth: 1,
                borderColor: Color.border,
                borderRadius: 5,
                padding: 0,
                marginHorizontal: 5,
              }}
              labelStyle={{fontWeight: 'bold', fontSize: 12}}>
              등록
            </Button>
            <Button
              mode="outlined"
              icon="archive-remove-outline"
              onPress={() => console.log('go back')}
              color={Color.text}
              style={{
                borderWidth: 1,
                borderColor: Color.border,
                borderRadius: 5,
                padding: 0,
                marginHorizontal: 5,
              }}
              labelStyle={{fontWeight: 'bold', fontSize: 12}}>
              취소
            </Button>
          </Card.Actions>
        </Card>
      </KeyboardAvoidingView>
    </>
  );
};

export default ArticleWrite;
