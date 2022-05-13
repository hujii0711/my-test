import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  //onChangeField 함수는 useCallback으로 감싸주었는데, 이는 Editor 컴포넌트에서 사용할 useEffect에서 onChangeField를 사용할 것이기 때문.
  //onChangeField를 useCallback으로 감싸 주어야만 나중에 Editor에서 사용할 useEffect가 컴포넌트가 화면에 나타났을때 딱 한번만 실행된다.
  const onChangeField = useCallback(function(payload) { 
    return dispatch(changeField(payload));
  }, [dispatch]);

  // const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
  //   dispatch,
  // ]);

  // 언마운트될 때 초기화
  // 사용자가 WritePage에서 벗어날 때는 데이터를 초기화해야 한다.
  // 컴포넌트가 언마운트될 때 useEffect로 INITIALIZE 액션을 발생시켜서 리덕스의 write 관련 상태를 초기화해준다.
  // 만약 초기화를 하지 않는다면, 포스트 작성 후 다시 글쓰기 페이지에 들어왔을 때 이전에 작성한 내용이 남아 있게 된다.
  useEffect(() => {
    return () => {
      dispatch(initialize()); //INITIALIZE
    };
  }, [dispatch]);
  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
