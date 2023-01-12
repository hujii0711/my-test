import * as React from 'react';
import {
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ScreenWrapper from '../../commons/ScreenWapper';

const ImageViewerAndZoom = ({route}) => {
  const PHOTOS = Array(24)
    .fill()
    .map((_, i) => {
      return {
        url: `https://unsplash.it/300/300/?random&__id=${route.key}${i}`,
        freeHeight: true,
      };
    });

  const [modalVisible, setModalVisible] = React.useState(false);
  const [_index, setIndex] = React.useState(0);

  return (
    <ScreenWrapper contentContainerStyle={styles.content}>
      {modalVisible && (
        <ImageZoom
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          photos={PHOTOS}
          index={_index}
        />
      )}
      {PHOTOS.map((elem, index) => {
        const url_ = elem.url;
        return (
          <Pressable
            key={index}
            onPress={() => {
              setModalVisible(true);
              setIndex(index);
            }}
            style={styles.item}>
            <Image key={index} source={{uri: url_}} style={styles.photo} />
          </Pressable>
        );
      })}
    </ScreenWrapper>
  );
};

const ImageZoom = ({modalVisible, setModalVisible, photos, index}) => (
  <View style={{padding: 10}}>
    <Modal
      visible={modalVisible}
      transparent
      onRequestClose={() => setModalVisible(false)}>
      <ImageViewer
        imageUrls={photos}
        index={index}
        onSwipeDown={() => console.log('onSwipeDown')}
        //onMove={data => console.log('data===', data)}
      />
    </Modal>
  </View>
);

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  item: {
    height: Dimensions.get('window').width / 2,
    width: '50%',
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default ImageViewerAndZoom;
