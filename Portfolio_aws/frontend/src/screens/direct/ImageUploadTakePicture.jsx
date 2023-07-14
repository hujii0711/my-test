import React, {useState} from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import Config from 'react-native-config';
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
      // - width와 height: 촬영된 이미지의 크기를 지정할 수 있습니다. 이미지가 이 크기보다 크면 자동으로 크기가 조정됩니다.
      // - cropping: 부울 값입니다. 촬영한 이미지를 자르는 기능을 활성화할지 여부를 지정합니다. true로 설정하면 사용자가 촬영한 이미지를 자를 수 있습니다.
      // - cropperCircleOverlay: 부울 값입니다. 이미지 자르기 기능을 사용할 때 자르기 영역을 원형으로 표시할지 여부를 지정합니다.
      // - mediaType: 문자열 배열 또는 mixed로 설정할 수 있습니다. 촬영 가능한 미디어 유형을 제한할 수 있습니다. 예를 들어, ['photo', 'video']로 설정하면 사진과 비디오만 촬영할 수 있습니다.
      // - maxWidth와 maxHeight: 촬영된 이미지의 최대 크기를 지정할 수 있습니다. 이미지가 이 크기를 초과하면 자동으로 크기가 조정됩니다.
      // - compressImageQuality: 0에서 1 사이의 부동 소수점 값입니다. 이미지 압축 품질을 지정합니다. 1은 최상의 품질을 나타내고, 0에 가까울수록 압축률이 높아집니다.
      // - includeBase64: 부울 값입니다. 촬영한 이미지의 base64 인코딩을 결과에 포함할지 여부를 지정합니다.
      // - includeExif: 부울 값입니다. 촬영한 이미지의 EXIF 데이터를 결과에 포함할지 여부를 지정합니다.
      // 카메라를 어떤 방향으로 들고 찍었냐에 따른 숫자 표시를 해줌, 휴대폰을 어떤 방향으로 들고 사진을 찍었는지에 대한 정보를 말한다.)
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
