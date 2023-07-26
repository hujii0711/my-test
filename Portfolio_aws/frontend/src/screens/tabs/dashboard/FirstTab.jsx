import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Chip, FAB, Portal} from 'react-native-paper';
import ScreenWrapper from '../../../commons/utils/ScreenWapper';

const FirstTab = () =>{
  const [toggleStackOnLongPress, setToggleStackOnLongPress] = React.useState(false);
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
              { icon: 'plus', onPress: () => {} },
              { icon: 'star', label: 'Star', onPress: () => {} },
              { icon: 'email', label: 'Email', onPress: () => {} },
              {
                icon: 'bell',
                label: 'Remind',
                onPress: () => {},
                size:'medium',
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
            onStateChange={({ open }) => setOpen(open)}
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
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginVertical: 15,
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
});

export default FirstTab;