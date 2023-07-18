import {useQuery} from 'react-query';
import {selectImageList} from '../../../../api/images';

const useImage = () => {
  console.log('useImage33333333333333');
  return useQuery('selectImageList', () => selectImageList(), {
    cacheTime: 1000,
  });
};

export default useImage;
