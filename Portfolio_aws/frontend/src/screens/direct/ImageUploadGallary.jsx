import React, {useState} from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  Text,
  ToastAndroid,
  NativeModules,
} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import Config from 'react-native-config';
import com from '../../commons/utils/common';

const RNFetchBlob = NativeModules.RNFetchBlob;
const downloadDir = RNFetchBlob.DownloadDir;

const ImageUploadGallary = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const selectImages = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        includeBase64: true,
        width: 100,
        height: 200,
        //cropping: true,
      });
      // - width와 height: 선택한 이미지의 크기를 지정할 수 있습니다. 이미지가 이 크기보다 크면 자동으로 크기가 조정됩니다.
      // cropping: 부울 값입니다. 이미지를 자르는 기능을 활성화할지 여부를 지정합니다. true로 설정하면 사용자가 선택한 이미지를 자를 수 있습니다.
      // - cropperCircleOverlay: 부울 값입니다. 이미지 자르기 기능을 사용할 때 자르기 영역을 원형으로 표시할지 여부를 지정합니다.
      // - multiple: 부울 값입니다. 다중 이미지 선택을 허용할지 여부를 지정합니다.
      // - mediaType: 문자열 배열 또는 mixed로 설정할 수 있습니다. 선택 가능한 미디어 유형을 제한할 수 있습니다. 예를 들어, ['photo', 'video']로 설정하면 사진과 비디오만 선택할 수 있습니다.
      // - maxWidth와 maxHeight: 선택한 이미지의 최대 크기를 지정할 수 있습니다. 이미지가 이 크기를 초과하면 자동으로 크기가 조정됩니다.
      // - compressImageQuality: 0에서 1 사이의 부동 소수점 값입니다. 이미지 압축 품질을 지정합니다. 1은 최상의 품질을 나타내고, 0에 가까울수록 압축률이 높아집니다.
      // - includeBase64: 부울 값입니다. 선택한 이미지의 base64 인코딩을 결과에 포함할지 여부를 지정합니다.
      // - includeExif: 부울 값입니다. 선택한 이미지의 EXIF 데이터를 결과에 포함할지 여부를 지정합니다.

      //images============= [{"height": 1536, "mime": "image/png", "modificationDate": "1688877043000", "path": "file:///storage/emulated/0/Android/data/polaris.portfolio.frontend.dev/cache/temp/1688877043189.png", "size": 181940, "width": 864}]

      setBodyData(images);
    } catch (err) {
      console.log('err------', err);
    }
  };

  const setBodyData = async images => {
    const resizedBase64Arr = await setResizeBase64(images);
    const imageArr = images.reduce((returnObj, cur, idx) => {
      returnObj.push({
        base64: resizedBase64Arr[idx],
        mime: cur.mime,
        fileName: `${com.currentFormatDate('yyyyMMddHHmmss')}_${cur.path
          .split('/')
          .pop()}`, //pop() 메서드는 배열에서 마지막 요소를 제거하고 그 요소를 반환합니다.
        size: cur.size,
        path: cur.path,
      });
      return returnObj;
    }, []);
    //imageArr============= [{"base64": asdasdasdasdasdasdasd, "mime": "image/png", "fileName": "1688877043000.png", "size":16888, "path": "file:///storage/emulated/0/Android/data/polaris.portfolio.frontend.dev/cache/temp/1688877043189.png"}]
    setSelectedImages(imageArr);
  };

  const setResizeBase64 = async images => {
    const resizedBase64 = [];
    for (let i = 0; i < images.length; i++) {
      const resizedImage = await ImageResizer.createResizedImage(
        images[i].path,
        100,
        100,
        images[i].mime.split('/')[1].toUpperCase(), //images[0].mime.includes('jpeg') ? 'JPEG' : 'PNG',
        80,
        0,
        downloadDir,
      );
      const base64 = await RNFS.readFile(resizedImage.uri, 'base64');

      resizedBase64.push(base64);
    }
    return resizedBase64;
  };

  const uploadImage = async () => {
    if (selectedImages.length > 0) {
      try {
        await axios.post(Config.API_GATEWAY_UPLOAD_URL, {
          fileInfo: selectedImages,
          key: 'images/original',
        });
        console.log('이미지 업로드 성공!!!!');
        ToastAndroid.show(
          '이미지 업로드가 정상 수행되었습니다.',
          ToastAndroid.SHORT,
        );
      } catch (error) {
        ToastAndroid.show(
          '이미지 업로드가 수행 도중 에러가 발생하였습니다.',
          ToastAndroid.SHORT,
        );
        console.log('에러가 발생했습니다:', error);
      }
    } else {
      ToastAndroid.show('이미지를 선택해주세요.', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text>ImageUploadGallary</Text>
      {selectedImages.map(images => (
        <Image
          key={images.path}
          source={{uri: images.path}}
          style={{width: 200, height: 200, marginBottom: 10}}
        />
      ))}
      <Button title="사진 선택" onPress={selectImages} />
      <Button title="이미지 업로드" onPress={uploadImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageUploadGallary;
