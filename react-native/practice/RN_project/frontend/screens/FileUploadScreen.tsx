import React from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

export default function App() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit = data => console.log(data);

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="lastName"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'red',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
});
// import React, {useState} from 'react';
// import axios from 'axios';

// interface File {
//   fileName: string;
//   filePath: string;
// }

// function FileUploadScreen() {
//   const BASE_URL = 'http://10.0.2.2:4000';
//   const [content, setContent] = useState('');

//   const [uploadedImg, setUploadedImg] = useState<File>({
//     fileName: '',
//     filePath: '',
//   });

//   const onChange = e => {
//     setContent(e.target.files[0]);
//   };

//   const onSubmit = e => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('img', content);
//     axios
//       .post('/upload', formData)
//       .then(res => {
//         const {fileName} = res.data; // axios를 통해 받은 response는 fileName을 받아올 수 있도록 서버 코드
//         console.log(fileName);
//         setUploadedImg({fileName, filePath: `${BASE_URL}/img/${fileName}`});
//         //alert('The file is successfully uploaded');
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   };
//   //uploadedImg 즉 서버로부터 반응을 받았는지 확인하고 받았다면 이미지 자체와 이미지를 보여줍니다.
//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         {uploadedImg ? (
//           <>
//             <img src={uploadedImg.filePath} alt="" />
//             <h3>{uploadedImg.fileName}</h3>
//           </>
//         ) : (
//           ''
//         )}
//         <input type="file" onChange={onChange} />
//         <button type="submit">Upload</button>
//       </form>
//     </>
//   );
// }

// export default FileUploadScreen;
