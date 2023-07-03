import { useState } from 'react';
import Card from '../../components/Card/Card';
import Filter from './Filter';

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
    <section className="bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-screen flex items-center justify-center">
      {/* 필터 */}
      <Filter setfitlerCondtion={setfitlerCondtion} />
      {/* 필터에 따라 출력되는 데이터 */}
      <div>
        <Card item={item} isBookmarked={isBookmarked} />
      </div>
    </section>
  );
}
