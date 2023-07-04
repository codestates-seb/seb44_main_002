//import { Button } from '@mui/base';
import { useState } from 'react';
import {
  CategoryFilter,
  tagFrequencyData,
  tagTasteData,
  sortTypeData,
} from '../../common/Data';
import CategoryBtn from './CategoryBtn';
import TagFrequencyButton from './TagFrequencyButton';
import ClickButton from '../../common/Buttons/ClickButton';
import Sort from './Sort';
import SortConditionButton from './SortConditionButton';
export default function Filter({ fitlerCondtion, setfitlerCondtion }) {
  // 포커싱된 카테고리
  // const [focusCategory, setfocusCategory] = useState(CategoryFilter[0].type);
  // //포커싱된 도수별 태그->도수높음 default
  // const [focusFrequencyTag, setfocusFrequencyTag] = useState(
  //   tagFrequencyData[0].type
  // );
  // //내림차순 여부 ->내림차순 default
  // const [descendingOrder, setdescendingOrder] = useState(true);
  // //정렬조건 조회순인지/별점순인지 ->조회순 default
  // const [sortType, setSortType] = useState(sortTypeData[0].type);

  // /cocktails/filter?category=**&tag=**&page=**&size=**&sort=**
  // ,  로 구분

  // const [fitlerCondtion, setfitlerCondtion] = useState({
  //   category: CategoryFilter[0].type,
  //   frequencyTag: tagFrequencyData[0].type,
  //   tasteTag: null,
  //   descendingOrder: true,
  //   sortType: sortTypeData[0].type,
  // });
  //필터링 클릭했을 때 카테고리/태그/정렬 타입 인지 검사후 idx 적용
  const selectMenuHandler = (idx, type) => {
    switch (type) {
      case 'category':
        setfitlerCondtion({
          ...fitlerCondtion,
          category: CategoryFilter[idx].type,
        });
        break;
      case 'frequencyTag':
        setfitlerCondtion({
          ...fitlerCondtion,
          frequencyTag: tagFrequencyData[idx].type,
        });
        break;
      case 'tasteTag':
        //그전에 눌렀던걸 또 눌렀다면 취소
        if (fitlerCondtion.tasteTag.length === 0) {
          const ClickedTag = fitlerCondtion.tasteTag;
          const tag = tagTasteData[idx].type;
          ClickedTag.push(tag);

          setfitlerCondtion({ ...fitlerCondtion, tasteTag: ClickedTag });
          break;
        }

        const alreadyClickedTag = [...fitlerCondtion.tasteTag];
        const Tag = tagTasteData[idx].type;

        if (alreadyClickedTag.indexOf(Tag) > 0) {
          //이미클릭된태그를 지울때
          console.log('제거해야할때');
          const newclickedList = alreadyclickedTag.filter((number, index) => {
            return number !== tagTasteData[idx].type;
          });
          setfitlerCondtion({ ...fitlerCondtion, tasteTag: newclickedList });
        } else {
          //태그를 추가할때
          alreadyClickedTag.push(tagTasteData[idx].type);

          setfitlerCondtion({
            ...fitlerCondtion,
            tasteTag: [...alreadyClickedTag],
          });
        }

        break;
      case 'descendingOrder':
        setfitlerCondtion({
          ...fitlerCondtion,
          descendingOrder: descendingOrder[idx].type,
        });
        break;
      case 'sortType':
        setfitlerCondtion({
          ...fitlerCondtion,
          sortType: CategoryFilter[idx].type,
        });
        break;
      default:
        break;
    }
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
            fitlerCondtion={fitlerCondtion}
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
            fitlerCondtion={fitlerCondtion}
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
            onClick={() => {
              selectMenuHandler(idx, 'tasteTag');
            }}
          >
            # {data.title}
          </ClickButton>
        ))}
      </div>
      {/* sortFilter */}
      <div className="flex justify-end text-[#B3B3B3] pt-10 pb-2 items-center mr-2 gap-2 text-[13px]">
        <Sort
        // setdescendingOrder={setdescendingOrder}
        // descendingOrder={descendingOrder}
        />
        {/* <SortConditionButton setSortType={setSortType} sortType={sortType} /> */}

        {sortTypeData.map((data, idx) => (
          <SortConditionButton
            key={data.id}
            data={data}
            idx={idx}
            // setSortType={setSortType}
            // sortType={sortType}
            selectMenuHandler={selectMenuHandler}
          />
        ))}
      </div>
    </div>
  );
}
