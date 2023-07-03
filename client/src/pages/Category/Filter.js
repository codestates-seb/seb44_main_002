import { Button } from '@mui/base';
import { useState } from 'react';
import {
  CategoryFilter,
  tagFrequencyData,
  tagTasteData,
} from '../../common/Data';
import CategoryBtn from './CategoryBtn';
import ClickButton from '../../common/Buttons/ClickButton';
export default function Filter({ setfitlerCondtion }) {
  // /cocktails/filter?category=**&tag=**&page=**&size=**&sort=**
  //카테고리 category_one / category_two / cateory_three

  // ,  로 구분

  //필터링 클릭했을 때 카테고리/태그/정렬 타입 인지 검사후 idx 적용
  const selectMenuHandler = (idx, type) => {
    // setfitlerCondtion(idx);
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
            selectMenuHandler={selectMenuHandler}
          />
        ))}
      </div>

      {/* 태그 */}
      <div className="flex pt-10 pb-10 gap-3">
        {tagFrequencyData.map((data, idx) => (
          <ClickButton
            key={data.id}
            data={data}
            idx={idx}
            radius="rounded-[30px]"
            fontSize="text-[1rem]"
            size="w-[110px] h-[30px]"
          >
            # {data.title}
          </ClickButton>
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
      <div>sortFilter</div>
    </div>
  );
}
