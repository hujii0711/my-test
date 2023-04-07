import React, {useState, useEffect, useRef} from 'react';
import {Pressable, View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';

const MyComponent = ({initLike = 12, initHate = 10}) => {
  const [likeCnt, setLikeCnt] = useState(initLike);
  const [selectedLike, setSelectedLike] = useState(false);

  const [hateCnt, setHateCnt] = useState(initHate);
  const [selectedHate, setSelectedHate] = useState(false);

  const isFirstRender = useRef(false);
  const select = useRef('');

  const onPressLike = () => {
    // 좋아요 토클
    if (selectedLike) {
      setLikeCnt(likeCnt - 1);
      //update like-1
      setSelectedLike(false);
    } else {
      setLikeCnt(likeCnt + 1);
      //update like+1
      setSelectedLike(true);
    }
    // 싫어요 언체크
    setSelectedHate(false);

    // 싫어요는 원래 값으로 초기화
    setHateCnt(initHate);
  };

  const onPressHate = () => {
    // 싫어요 토클
    if (selectedHate) {
      setHateCnt(hateCnt - 1);
      setSelectedHate(false);
    } else {
      setHateCnt(hateCnt + 1);
      setSelectedHate(true);
    }
    // 좋아요 언체크
    setSelectedLike(false);

    // 좋아요는 원래 값으로 초기화
    setLikeCnt(initLike);
  };

  const dbUpdate = type => {
    if (type === 'likeUp') {
      console.log('likeUp');
    } else if (type === 'likeDown') {
      console.log('likeDown');
    } else if (type === 'hateUp') {
      console.log('hateUp');
    } else if (type === 'hateDown') {
      console.log('hateDown');
    } else if (type === 'likeUpAndhateDown') {
      console.log('likeUpAndhateDown');
    } else if (type === 'likeDownAndhateUp') {
      console.log('likeDownAndhateUp');
    }
  };

  useEffect(() => {
    //console.log('isFirstRender.current========', isFirstRender.current);
    //console.log('select.current========', select.current);

    // 최초 렌더링시 skip
    if (isFirstRender.current === false) {
      isFirstRender.current = true;
      return;
    }

    // 경우의 수
    // 1. selectedLike=false | selectedHate=false
    // 2. selectedLike=true | selectedHate=false
    // 3. selectedLike=false | selectedHate=true
    if (selectedLike === false && selectedHate === false) {
      if (select.current === 'like') {
        console.log('like를 체크한 상태에서 like를 언체크한 경우'); //like--
        dbUpdate('likeDown');
      } else if (select.current === 'hate') {
        console.log('hate를 체크한 상태에서 hate를 언체크한 경우'); //unlike--
        dbUpdate('hateDown');
      }
      select.current = '';
      return;
    } else if (selectedLike === true && selectedHate === false) {
      if (select.current === '') {
        console.log('처음부터 like를 체크한 경우'); //like++
        dbUpdate('likeUp');
      } else if (select.current === 'hate') {
        console.log('hate가 체크된 상태에서 like를 체크한 경우'); //unlike-- & like++
        dbUpdate('likeUpAndhateDown');
      }
      select.current = 'like';
      return;
    } else if (selectedLike === false && selectedHate === true) {
      if (select.current === '') {
        console.log('처음부터 hate를 체크한 경우'); //unlike++
        dbUpdate('hateUp');
      } else if (select.current === 'like') {
        console.log('like가 체크된 상태에서 hate를 체크한 경우'); //like-- & unlike++
        dbUpdate('likeDownAndhateUp');
      }
      select.current = 'hate';
      return;
    }
  }, [selectedLike, selectedHate]);

  return (
    <View style={{flexDirection: 'row'}}>
      <IconButton
        icon={selectedLike ? 'thumb-up' : 'thumb-up-outline'}
        size={18}
        onPress={onPressLike}
      />
      <Text style={{fontSize: 11, marginLeft: -10}}>{likeCnt}</Text>
      <IconButton
        icon={selectedHate ? 'thumb-down' : 'thumb-down-outline'}
        size={18}
        onPress={onPressHate}
      />
      <Text style={{fontSize: 11, marginLeft: -10}}>{hateCnt}</Text>
    </View>
  );
};

export default MyComponent;
