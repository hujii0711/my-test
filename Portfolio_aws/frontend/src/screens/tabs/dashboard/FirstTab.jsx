import * as React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Chip, FAB, Portal, Card, Paragraph, Divider} from 'react-native-paper';
import ScreenWrapper from '../../../commons/utils/ScreenWapper';

const FirstTab = () => {
  const [toggleStackOnLongPress, setToggleStackOnLongPress] =
    React.useState(false);
  const [open, setOpen] = React.useState(false);
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.chipsContainer}
          contentContainerStyle={styles.chipsContent}>
          <Chip
            selected
            onPress={() => {}}
            style={styles.chip}
            showSelectedOverlay>
            Latest
          </Chip>
          <Chip onPress={() => {}} style={styles.chip}>
            Popular
          </Chip>
          <Chip onPress={() => {}} style={styles.chip}>
            Interviews
          </Chip>
          <Chip onPress={() => {}} style={styles.chip}>
            Transfers
          </Chip>
          <Chip onPress={() => {}} style={styles.chip}>
            League
          </Chip>
        </ScrollView>
        <Portal>
          <FAB.Group
            //visible={visible}
            open={open}
            icon={open ? 'calendar-today' : 'plus'}
            toggleStackOnLongPress={toggleStackOnLongPress}
            actions={[
              {icon: 'plus', onPress: () => {}},
              {icon: 'star', label: 'Star', onPress: () => {}},
              {icon: 'email', label: 'Email', onPress: () => {}},
              {
                icon: 'bell',
                label: 'Remind',
                onPress: () => {},
                size: 'medium',
              },
              {
                icon: toggleStackOnLongPress
                  ? 'gesture-tap'
                  : 'gesture-tap-hold',
                label: toggleStackOnLongPress
                  ? 'Toggle on Press'
                  : 'Toggle on Long Press',
                onPress: () => {
                  setToggleStackOnLongPress(!toggleStackOnLongPress);
                },
              },
            ]}
            enableLongPressWhenStackOpened
            onStateChange={({open}) => setOpen(open)}
            onPress={() => {
              if (toggleStackOnLongPress) {
                //Alert.alert('Fab is Pressed');
                // do something on press when the speed dial is closed
              } else if (open) {
                // Alert.alert('Fab is Pressed');
                // do something if the speed dial is open
              }
            }}
            onLongPress={() => {
              if (!toggleStackOnLongPress || open) {
                //Alert.alert('Fab is Long Pressed');
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </View>
      <Divider />
      <Text style={styles.largeText}>싼타페 풀체인지 출시1</Text>
      <Card style={styles.card} mode={'elevated'}>
        <Card.Cover source={require('../../../assets/images/santafe01.png')} />
        <Card.Title title="Ship" />
        <Card.Content>
          <Paragraph variant="bodyMedium">
            The Abandoned Ship is a wrecked ship located on Route 108 in Hoenn,
            originally being a ship named the S.S. Cactus. The second part of
            the ship can only be accessed by using Dive and contains the
            Scanner.
          </Paragraph>
        </Card.Content>
      </Card>
      <Divider />
      <Text style={styles.largeText}>싼타페 풀체인지 출시2</Text>
      <Card style={styles.card} mode={'elevated'}>
        <Card.Cover source={require('../../../assets/images/santafe01.png')} />
        <Card.Title title="Ship" />
        <Card.Content>
          <Paragraph variant="bodyMedium">
            The Abandoned Ship is a wrecked ship located on Route 108 in Hoenn,
            originally being a ship named the S.S. Cactus. The second part of
            the ship can only be accessed by using Dive and contains the
            Scanner.
          </Paragraph>
        </Card.Content>
      </Card>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
  },
  chipsContent: {
    paddingLeft: 8,
    paddingVertical: 8,
  },
  chip: {
    marginRight: 8,
  },
  card: {
    margin: 4,
  },
  largeText: {
    fontSize: 16,
    marginVertical: 20, // 수직
    marginHorizontal: 10, // 수평
  },
});

export default FirstTab;
