import React, {useState, useEffect, useRef} from 'react';
import {Pressable, View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';

const MyComponent = () => {
  const initLike = 12;
  const [like, setLike] = useState(initLike);
  const [selectedLike, setSelectedLike] = useState(false);

  const initHate = 10;
  const [hate, setHate] = useState(initHate);
  const [selectedHate, setSelectedHate] = useState(false);

  const renderCount = useRef(0);
  const select = useRef('');

  const onPressLike = () => {
    // 좋아요 토클
    if (selectedLike) {
      setLike(like - 1);
      //update like-1
      setSelectedLike(false);
    } else {
      setLike(like + 1);
      //update like+1
      setSelectedLike(true);
    }
    // 싫어요 언체크
    setSelectedHate(false);

    // 싫어요는 원래 값으로 초기화
    setHate(initHate);
    select.current = 'like';
  };

  const onPressHate = () => {
    // 싫어요 토클
    if (selectedHate) {
      setHate(hate - 1);
      setSelectedHate(false);
    } else {
      setHate(hate + 1);
      setSelectedHate(true);
    }
    // 좋아요 언체크
    setSelectedLike(false);

    // 좋아요는 원래 값으로 초기화
    setLike(initLike);
    select.current = 'hate';
  };

  useEffect(() => {
    console.log('renderCount.current========', renderCount.current);
    console.log('select.current========', select.current);

    if (renderCount.current === 0) {
      renderCount.current = renderCount.current + 1;
      return;
    }
    renderCount.current = renderCount.current + 1;
    console.log('selectedLike===========', selectedLike);
    console.log('selectedHate==========', selectedHate);

    // 경우의 수
    // 1. selectedLike=false | selectedHate=false
    // 2. selectedLike=true | selectedHate=false
    // 3. selectedLike=false | selectedHate=true

    if (selectedLike === false && selectedHate === false) {
      select.current = '';
      console.log('like를 체크한 상태에서 like를 언체크한 경우');
      console.log('hate를 체크한 상태에서 hate를 언체크한 경우');
      //like를 체크한 상태에서 like를 언체크한 경우 like--
      //hate를 체크한 상태에서 hate를 언체크한 경우 unlike--
      return;
    } else if (selectedLike === true && selectedHate === false) {
      //DB like++
      console.log('처음부터 like를 체크한 경우');
      console.log('hate를 체크한 상태에서 like를 언체크한 경우');
      //hate를 체크한 상태에서 like를 언체크한 경우 unlike--
      return;
    } else if (selectedLike === false && selectedHate === true) {
      //DB unlike++
      console.log('처음부터 hate를 체크한 경우');
      console.log('like를 체크한 상태에서 hate를 언체크한 경우');
      //like를 체크한 상태에서 hate를 언체크한 경우 like--
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
      <Text style={{fontSize: 11, marginLeft: -10}}>{like}</Text>
      <IconButton
        icon={selectedHate ? 'thumb-down' : 'thumb-down-outline'}
        size={18}
        onPress={onPressHate}
      />
      <Text style={{fontSize: 11, marginLeft: -10}}>{hate}</Text>
    </View>
  );
};

export default MyComponent;
