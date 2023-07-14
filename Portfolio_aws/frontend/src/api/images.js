import client from './client';

/********************************** 
 1. 이미지 조회 | /images/viewer | get
**********************************/
export async function selectImageList() {
  try {
    const response = await client.get('/images/viewer', {
      params: {folder: 'images/original'},
    });
    const arr = response?.data;
    arr.shift();
    return arr;
  } catch (err) {
    console.log('err====', err);
  }
}
