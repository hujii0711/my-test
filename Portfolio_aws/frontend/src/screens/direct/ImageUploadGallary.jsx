import React, {useState} from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import com from '../../commons/utils/common';

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
      //images============= [{"height": 1536, "mime": "image/png", "modificationDate": "1688877043000", "path": "file:///storage/emulated/0/Android/data/polaris.portfolio.frontend.dev/cache/temp/1688877043189.png", "size": 181940, "width": 864}]
      const imageArr = images.reduce((returnObj, cur) => {
        returnObj.push({
          base64: cur.data,
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
    } catch (err) {
      console.log('err------', err);
    }
  };

  const uploadImage = () => {
    if (selectedImages.length > 0) {
      try {
        axios
          .post(
            'https://7k5z63s4tk.execute-api.ap-northeast-2.amazonaws.com/dev/upload',
            {
              fileInfo: selectedImages, //base64, mime, fileName, size, path
              key: 'images/original',
            },
          )
          .then(function (res) {
            ToastAndroid.show(
              '이미지 업로드가 정상 수행되었습니다.',
              ToastAndroid.SHORT,
            );
            console.log('이미지 업로드 성공============', res);
          })
          .catch(function (err) {
            ToastAndroid.show(
              '이미지 업로드가 수행 도중 에러가 발생하였습니다.',
              ToastAndroid.SHORT,
            );
            console.log('이미지 업로드 실패==========', err);
          });
      } catch (error) {
        console.log('에러가 발생했습니다:', error);
      }
    } else {
      console.log('이미지를 선택해주세요.');
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
