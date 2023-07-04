//import { Button } from '@mui/base';
import { useState } from 'react';
import {
  CategoryFilter,
  tagFrequencyData,
  tagTasteData,
} from '../../common/Data';
import CategoryBtn from './CategoryBtn';

import TagFrequencyButton from './TagFrequencyButton';
import ClickButton from '../../common/Buttons/ClickButton';
export default function Filter() {
  const [focusCategory, setfocusCategory] = useState(CategoryFilter[0].type);
  const [focusFrequencyTag, setfocusFrequencyTag] = useState(
    tagFrequencyData[0].type
  );

  // /cocktails/filter?category=**&tag=**&page=**&size=**&sort=**
  // ,  로 구분

  //필터링 클릭했을 때 카테고리/태그/정렬 타입 인지 검사후 idx 적용
  const selectMenuHandler = (idx, type) => {
    if (type === 'category') {
      //  setfitlerCondtion({ category });
    }
    //setfitlerCondtion({});
    // setType(filterBtnData[idx].type);
  };

  return (
    <div className="w-[100%] ">
      {/* 카테고리 */}
      <div className="flex border-b-2 border-solid border-white">
        {CategoryFilter.map((data, idx) => (
          <CategoryBtn
            key={data.id}
            data={data}
            idx={idx}
            focusCategory={focusCategory}
            setfocusCategory={setfocusCategory}
            selectMenuHandler={selectMenuHandler}
          />
        ))}
      </div>

      {/* 태그 */}
      <div className="flex pt-10 pb-10 gap-3">
        {/* 도수별 태그 */}
        {tagFrequencyData.map((data, idx) => (
          <TagFrequencyButton
            key={data.id}
            data={data}
            idx={idx}
            focusFrequencyTag={focusFrequencyTag}
            setfocusFrequencyTag={setfocusFrequencyTag}
            selectMenuHandler={selectMenuHandler}
          />
        ))}
        {tagTasteData.map((data, idx) => (
          <ClickButton
            key={data.id}
            data={data}
            idx={idx}
            radius="rounded-[30px]"
            fontSize="text-[1rem]"
            size="w-[75px] h-[30px]"
          >
            # {data.title}
          </ClickButton>
        ))}
      </div>
      {/* sortFilter */}
      <div className="flex justify-end text-white pt-10 pb-2">sortFilter</div>
    </div>
  );
}
