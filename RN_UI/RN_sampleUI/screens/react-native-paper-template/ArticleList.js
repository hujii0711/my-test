import * as React from 'react';
import {View, Text} from 'react-native';
import {List, Button} from 'react-native-paper';

const MyComponent = () => (
  <List.AccordionGroup>
    <List.Subheader>게시글 목록</List.Subheader>
    <List.Accordion title="게시글1" id="1">
      <View>
        <Text>
          게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1
          게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1
          게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1게시글상세1
          <Button
            icon="camera"
            mode="contained"
            onPress={() => console.log('Pressed')}>
            댓글
          </Button>
        </Text>
      </View>
    </List.Accordion>
    <List.Accordion title="게시글2" id="2">
      <List.Section>
        <List.Item
          title="First Item"
          right={() => <List.Icon icon="folder" />}
        />
        <List.Item
          title="Second Item"
          right={() => <List.Icon color="red" icon="folder" />}
        />
      </List.Section>
    </List.Accordion>
  </List.AccordionGroup>
);

export default MyComponent;
