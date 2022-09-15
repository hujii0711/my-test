import * as React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Avatar, Button, Card, TextInput} from 'react-native-paper';
import Color from '../../../commons/style/Color';
import {InfiniteData, useMutation, useQueryClient} from 'react-query';
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

  const cachedArticle = useMemo(
    () =>
      params.articleId
        ? queryClient.getQueryData(['article', params.articleId]) // 캐시 데이터 조회
        : null,
    [queryClient, params.articleId],
  );

  const [title, setTitle] = useState(cachedArticle?.title ?? '');
  const [contents, setContents] = useState(cachedArticle?.contents ?? '');

  const {mutate: write} = useMutation(writeArticle, {
    onSuccess: article => {
      queryClient.setQueryData('articles', data => {
        if (!data) {
          return {
            pageParams: [undefined],
            pages: [[article]],
          };
        }
        const [firstPage, ...rest] = data.pages;
        return {
          ...data,
          pages: [[article, ...firstPage], ...rest],
        };
      });
      navigation.goBack();
    },
  });

  const {mutate: modify} = useMutation(modifyArticle, {
    onSuccess: article => {
      queryClient.setQueryData('articles', data => {
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
      queryClient.setQueryData(['article', params.articleId], article);
      navigation.goBack();
    },
  });

  const navigation = useNavigation();

  const onSubmit = useCallback(() => {
    if (params.articleId) {
      modify({id: params.articleId, title, contents}); //title, contents 사용자가 입력한 state값
    } else {
      write({title, contents});
    }
  }, [write, modify, title, contents, params.articleId]);

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
              onPress={onSubmit}
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
              onPress={onSubmit}
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
              onPress={() => console.log('Pressed')}
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
