import * as React from 'react';
import {Appbar} from 'react-native-paper';
const isFirst = false;

const MyComponent = () => (
  <Appbar.Header
    elevated={true}
    style={{backgroundColor: 'red'}}
    mode="small"
    theme={{mode: 'adaptive'}}>
    {isFirst ? (
      <Appbar.BackAction onPress={() => {}} />
    ) : (
      <Appbar.Action icon="apps" onPress={() => {}} />
    )}
    <Appbar.Content title="Title" subtitle={'Subtitle'} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
    <Appbar.Action icon="dots-vertical" onPress={() => {}} />
  </Appbar.Header>
);

export default MyComponent;
