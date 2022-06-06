import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagBox from '../../components/write/TagBox';
import { changeField } from '../../modules/write';

const TagBoxContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.write.tags);

  const onChangeTags = (nextTags) => {
    dispatch(
      changeField({
        key: 'tags',
        value: nextTags,
      }),
    );
  };

  const _tags = tags.reduce((accVal, curVal) => {
    accVal.push(curVal.key);
    return accVal;
  }, []);

  return <TagBox onChangeTags={onChangeTags} tags={_tags} />;
};

export default TagBoxContainer;
