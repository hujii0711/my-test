import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {List, FAB} from 'react-native-paper';
import ScreenWrapper from '../../commons/ScreenWapper';
import Color from '../../commons/Color';

const Faq = ({navigation}) => {
  const listData = [
    {
      id: '1',
      title: '게시글1',
      contents:
        'align-items는 한 줄을 기준으로 정렬하는 반면, align-content는 두 줄부터 사용하는데 의미가 있다',
      created_at: '2020-01-01',
      user_id: 'hujii0711',
      isComment: true,
    },
    {
      id: '2',
      title: '게시글2',
      contents:
        'align-items는 한 줄을 기준으로 정렬하는 반면, align-content는 두 줄부터 사용하는데 의미가 있다',
      created_at: '2020-01-01',
      user_id: 'hujii0711',
      isComment: true,
    },
    {
      id: '3',
      title: '게시글3',
      contents:
        'align-items는 한 줄을 기준으로 정렬하는 반면, align-content는 두 줄부터 사용하는데 의미가 있다',
      created_at: '2020-01-01',
      user_id: 'hujii0711',
      isComment: false,
    },
    {
      id: '4',
      title: '게시글4',
      contents:
        'align-items는 한 줄을 기준으로 정렬하는 반면, align-content는 두 줄부터 사용하는데 의미가 있다',
      created_at: '2020-01-01',
      user_id: 'hujii0711',
      isComment: true,
    },
  ];
  return (
    <>
      <ScreenWrapper>
        <List.AccordionGroup>
          <List.Subheader>자주하는 질문</List.Subheader>
          {listData.map(elem => {
            return (
              <List.Accordion
                title={elem.title}
                id={elem.id}
                key={elem.id}
                titleStyle={{fontSize: 12}}
                style={{
                  borderBottomColor: Color.divider,
                  borderBottomWidth: 1,
                }}>
                <View>
                  <Text style={{padding: 30}}>{elem.contents}</Text>
                </View>
              </List.Accordion>
            );
          })}
        </List.AccordionGroup>
      </ScreenWrapper>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Color.sub_main,
  },
});

export default Faq;
