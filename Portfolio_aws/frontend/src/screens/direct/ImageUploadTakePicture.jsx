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

const ImageUploadTakePicture = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const selectImages = async () => {
    try {
      const imageObj = await ImagePicker.openCamera({
        mediaType: 'photo',
        includeBase64: true,
        width: 100, // 사진 촬영은 해당 옵션에서 리사이즈가 됨
        height: 100,
        cropping: true,
      });
      const imageArr = Array(1)
        .fill()
        .map(_ => {
          return {
            base64: imageObj.data,
            mime: imageObj.mime,
            fileName: `${com.currentFormatDate(
              'yyyyMMddHHmmss',
            )}_${imageObj.path.split('/').pop()}`,
            size: imageObj.size,
            path: imageObj.path,
          };
        });
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
      <Text>ImageUploadTakePicture</Text>
      {selectedImages.map(images => (
        <Image
          key={images.path}
          source={{uri: images.path}}
          style={{width: 200, height: 200, marginBottom: 10}}
        />
      ))}
      <Button title="사진 촬영" onPress={selectImages} />
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

export default ImageUploadTakePicture;
