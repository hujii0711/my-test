import client from './client';

/********************************** 
 1. 이미지 조회 | /images/viewer | get
**********************************/
export const selectImageList = async () => {
  console.log(
    'API >>> selectImageList###################################################',
  );
  const response = await client.get('/images/viewer', {
    params: {folder: 'images/original'},
  });
  const result = response?.data;
  result.shift();
  return result;
};
