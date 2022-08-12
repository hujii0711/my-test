import React, {useState} from 'react';
import axios from 'axios';

function FileUploadScreen() {
  const BASE_URL = 'http://localhost:4000';
  const [content, setContent] = useState('');

  const [uploadedImg, setUploadedImg] = useState({
    fileName: '',
    fillPath: '',
  });

  const onChange = e => {
    setContent(e.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', content);
    axios
      .post('/upload', formData)
      .then(res => {
        const {fileName} = res.data; // axios를 통해 받은 response는 fileName을 받아올 수 있도록 서버 코드
        console.log(fileName);
        setUploadedImg({fileName, filePath: `${BASE_URL}/img/${fileName}`});
        //alert('The file is successfully uploaded');
      })
      .catch(err => {
        console.error(err);
      });
  };
  //uploadedImg 즉 서버로부터 반응을 받았는지 확인하고 받았다면 이미지 자체와 이미지를 보여줍니다.
  return (
    <>
      <form onSubmit={onSubmit}>
        {uploadedImg ? (
          <>
            <img src={uploadedImg.filePath} alt="" />
            <h3>{uploadedImg.fileName}</h3>
          </>
        ) : (
          ''
        )}
        <input type="file" onChange={onChange} />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default FileUploadScreen;
