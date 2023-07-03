import { useState } from 'react';
import { CategoryFilter } from '../../common/Data';
import FilterBtn from './FilterBtn';

export default function Filter({ isBookmarked }) {
  // /cocktails/filter?category=**&tag=**&page=**&size=**&sort=**
  //카테고리 category_one / category_two / cateory_three

  // ,  로 구분
  //   const selectMenuHandler = (idx) => {
  //     setfitlerCondtion(idx);
  //     setType(filterBtnData[idx].type);
  //   };

  return (
    <div>
      {/* CategoryFilter */}
      <div>
        {CategoryFilter.map((data, idx) => (
          <FilterBtn key={data.id} data={data} idx={idx} />
        ))}
      </div>
      {/* TagFilter */}
      <div></div>
      {/* sortFilter */}
      <div></div>
    </div>
  );
}
