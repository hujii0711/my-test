import React, {useRef, useState} from 'react';
//import RNFetchBlob from 'rn-fetch-blob';
import {
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  View,
  Text,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import {useQuery} from 'react-query';
import ImageViewer from 'react-native-image-zoom-viewer';
import ScreenWrapper from '../../commons/utils/ScreenWapper';
import {selectImageList} from '../../api/images';
import {ActivityIndicator} from 'react-native-paper';
import Color from '../../commons/style/Color';

const RNFetchBlob = NativeModules.RNFetchBlob;
const path = RNFetchBlob.DownloadDir;

const ImageViewerAndZoom = () => {
  console.log('ImageViewerAndZoom 렌더링!!!!!!!!!!!!');
  const [modalVisible, setModalVisible] = useState(false);
  const [_index, setIndex] = useState(0);
  const images = useRef([]);

  const selectImageListQuery = useQuery(['selectImageList'], () =>
    selectImageList(),
  );

  if (!selectImageListQuery?.data) {
    return (
      <ActivityIndicator size="small" style={{flex: 1}} color={Color.blue2} />
    );
  }

  const data = selectImageListQuery.data;

  if (data) {
    const imageArr = data.reduce((returnObj, cur) => {
      returnObj.push({
        url: cur,
      });
      return returnObj;
    }, []);
    images.current = imageArr;
  }

  return (
    <ScreenWrapper contentContainerStyle={styles.content}>
      {modalVisible && (
        <ImageZoom
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          images={images.current}
          index={_index}
        />
      )}
      {images.current.map((elem, index) => {
        // 다단 뷰어
        return (
          <Pressable
            key={index}
            onPress={() => {
              setModalVisible(true);
              setIndex(index);
            }}
            style={styles.item}>
            <Image key={index} source={{uri: elem.url}} style={styles.photo} />
          </Pressable>
        );
      })}
    </ScreenWrapper>
  );
};

const ImageZoom = ({modalVisible, setModalVisible, images, index}) => {
  const renderImage = ({source, style}) => {
    const _style = {
      ...style,
      borderWidth: 1,
      borderColor: 'red',
    };
    return (
      <View>
        <Image source={source} style={_style} />
        <TouchableOpacity
          style={{position: 'absolute', bottom: 0, right: 0}}
          onPress={() => saveImageToLocal(source.uri)}>
          <Text style={{color: 'red'}}>다운로드</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{padding: 10}}>
      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <ImageViewer
          imageUrls={images}
          index={index}
          renderImage={renderImage}
        />
      </Modal>
    </View>
  );
};

// 이미지를 로컬에 저장하는 함수
const saveImageToLocal = async imageUrl => {
  try {
    const response = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', imageUrl);
    const imagePath = response.path();

    // 로컬에 이미지 저장
    await RNFetchBlob.fs.cp(imagePath, path + '/image.jpg');

    console.log('이미지 다운로드 완료:', path + '/image.jpg');
  } catch (error) {
    console.log('이미지 다운로드 실패:', error);
  }
};

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

// const RenderImageComponent = ({photoInfo, index}) => {
//   // console.log('photoInfo=====', photoInfo);
//   console.log('index=====', index);
//   // const {source, props} = photoInfo;
//   // console.log('props=====', ...props);
//   // console.log('source=====', source);

//   return (
//     <View style={{flex: 1}}>
//       {/* <Image {...props} /> */}
//       <Image source={{uri: photoInfo[index].url}} style={styles.photo} />
//       <TouchableOpacity
//         style={{position: 'absolute', bottom: 10, right: 10}}
//         onPress={() => saveImageToLocal(photoInfo[index].url)}>
//         <Text>다운로드</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
