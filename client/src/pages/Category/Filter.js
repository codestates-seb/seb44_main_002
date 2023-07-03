import { useState } from 'react';
import { CategoryFilter } from '../../common/Data';
import CategoryBtn from './CategoryBtn';

export default function Filter({ setfitlerCondtion }) {
  // /cocktails/filter?category=**&tag=**&page=**&size=**&sort=**
  //카테고리 category_one / category_two / cateory_three

  // ,  로 구분
  //   const selectMenuHandler = (idx) => {
  //     setfitlerCondtion(idx);
  //     setType(filterBtnData[idx].type);
  //   };

  return (
    <div className="w-[100%] border-2 border-solid border-red ">
      {/* CategoryFilter */}
      <div>
        {CategoryFilter.map((data, idx) => (
          <CategoryBtn key={data.id} data={data} idx={idx} />
        ))}
      </div>
      {/* TagFilter */}
      <div></div>
      {/* sortFilter */}
      <div></div>
    </div>
  );
}
