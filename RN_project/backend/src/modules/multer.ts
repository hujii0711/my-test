import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const uploadFolder = () => {
  try {
    fs.readdirSync('uploads');
  } catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
};

//이 방법은 로컬 서버 폴더에 이미지를 저장하게 되는데 AWS S3 Bucket 등으로
//이미지 데이터를 클라우드 서버에 보관할 수 있습니다. 그 경우 이 Storage 코드를 다르게 작성해줍니다.
export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      //destination 옵션은 받아온 이미지를 어디에 저장할 것인지 정합니다
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      //done(콜백함수) 이 부분을 통하여 이미지의 이름을 정해줍니다.
      //타임스탬프와 파일의 확장자명을 정해서 저장할 수 있도록 해줍니다.
      //이렇게 하지 않으면 같은 이름의 파일이 저장되는 경우 버그가 생깁니다.
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  //다음은 업로드 옵션입니다.
  //어떤 storage를 사용할 것인지(로컬 또는 클라우드) 그리고 파일의 사이즈를 정합니다. 단위는 byte입니다.
});
