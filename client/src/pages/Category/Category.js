import { useState } from 'react';
import Card from '../../components/Card/Card';
import Filter from './Filter';
import HoverButton from '../../common/Buttons/HoverButton';

export default function Category() {
  //선택된 카테고리조건 (카테고리&태그&정렬)
  const [fitlerCondtion, setfitlerCondtion] = useState(null);

  //가상데이터
  const isBookmarked = true;
  const item = {
    itemid: '99',
    img: 'images/cocktailSample.jpg',
    title: '타이틀',
  };

  return (
    <div className="bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-screen pt-[12.5rem] flex justify-center ">
      <section className="w-[55rem] ">
        {/* 레시피 등록 버튼 */}
        <div className="flex justify-end pb-5">
          <HoverButton
            size="w-[240px] h-[36px]"
            className="absolute bottom-0 right-0"
          >
            나만의 레시피 등록하기
          </HoverButton>
        </div>

        <div className=" border-1 border-solid border-red">
          {/* 필터 */}
          <Filter setfitlerCondtion={setfitlerCondtion} />
          {/* 필터에 따라 출력되는 데이터 */}
          <div className="w-[100%] border-2 border-solid border-red flex justify-between">
            <Card item={item} isBookmarked={isBookmarked} />
            <Card item={item} isBookmarked={isBookmarked} />
            <Card item={item} isBookmarked={isBookmarked} />
            <Card item={item} isBookmarked={isBookmarked} />
          </div>
        </div>
      </section>
    </div>
  );
}
