import * as React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {List, FAB} from 'react-native-paper';

const MyComponent = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <List.AccordionGroup>
        <List.Accordion title="Accordion 1" id="1">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 2" id="2">
          <List.Item title="Item 2" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="3">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="4">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="5">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="6">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="7">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="8">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="9">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="10">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="11">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="12">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="13">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="14">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="15">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="1">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="1">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="1">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="1">
          <List.Item title="Item 1" />
        </List.Accordion>
        <List.Accordion title="Accordion 1" id="1">
          <List.Item title="Item 1" />
        </List.Accordion>
      </List.AccordionGroup>
    </ScrollView>
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={() => console.log('Pressed')}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    paddingTop: 5,
  },
  scrollView: {
    marginHorizontal: 5,
  },
});

export default MyComponent;
