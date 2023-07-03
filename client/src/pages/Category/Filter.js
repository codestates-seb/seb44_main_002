import { useState } from 'react';
import { CategoryFilter } from '../../common/Data';
import CategoryBtn from './CategoryBtn';

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
    <div className="w-[100%]  ">
      카테고리
      {/* CategoryFilter */}
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
      {/* TagFilter */}
      <div className=" ">TagFilter</div>
      {/* sortFilter */}
      <div>sortFilter</div>
    </div>
  );
}
