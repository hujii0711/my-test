import React, {useState} from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';

const DATA = [
  {
    title: '공유',
  },
  {
    title: '푸시 알림',
  },
  {
    title: '촬영',
  },
  {
    title: '이메일',
  },
  {
    title: '달력',
  },
  {
    title: 'QR 코드',
  },
  {
    title: 'MAP',
  },
  {
    title: '링크',
  },
  {
    title: '위치 정보',
  },
  {
    title: '음성 인식',
  },
];

const Item = ({title}) => (
  <View
    style={{
      backgroundColor: '#000000',
      paddingHorizontal: 20,
      paddingVertical: 35,
      marginVertical: 8,
      marginHorizontal: 16,
      width: 100,
      borderRadius: 20,
    }}>
    <Text
      style={{
        color: '#ffffff',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
      }}>
      {title}
    </Text>
  </View>
);

const Header = () => {
  return (
    <View
      style={{
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
      }}>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
        }}>
        [구현 기능]
      </Text>
    </View>
  );
};

const Footer = () => {
  return (
    <View
      style={{
        backgroundColor: '#a5a5a5',
        padding: 13,
      }}>
      <Text
        style={{
          fontSize: 15,
          textAlign: 'right',
        }}>
        design by 김형준
      </Text>
    </View>
  );
};

const Dashboard = () => {
  /*
  numColumns: 칼럼 개수 형태 지정
  onLayout: 아이템 컨테이너의 여백을 모두 제거한 값을 동일하게 칼럼수만큼 나눈 게 width가 되어야 한다. 이런 경우 사용할 수 있는 게 onLayOut이다.
  onLayout 을 통해서 레이아웃이 만들어졌을 때, 현재 요소가 가지고 있는 width 크기를 가져올 수 있는데 그걸 상태로 저장한다.
  columnWrapperStyle: 한 줄에 대한 css를 설정할 수 있다. 이곳에서 space-between으로 쫘악쫘악 밀어주고 마진값을 부여하면 원하던 그리드가 완성된다.
   */
  const [containerWidth, setContainerWidth] = useState(0);
  const margins = 39 * 2;
  const numColumns = 3;

  return (
    <SafeAreaView style={{marginTop: 0}}>
      <View style={{paddingHorizontal: 10}}>
        <FlatList
          data={DATA}
          columnWrapperStyle={{
            justifyContent: 'center',
            marginBottom: 10,
          }}
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
          renderItem={({item}) => (
            <Item
              title={item.title}
              width={(containerWidth - margins) / numColumns}
            />
          )}
          keyExtractor={(item, index) => index}
          numColumns={2}
          ListHeaderComponent={() => <Header />}
          ListFooterComponent={() => <Footer />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
