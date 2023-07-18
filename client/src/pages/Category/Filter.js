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
export default function Filter({ setFilterCondtion, filterCondtion }) {
  //필터링 클릭했을 때 카테고리/태그/정렬 타입 인지 검사후 필터상태 저장

  const selectMenuHandler = (idx, type) => {
    switch (type) {
      case 'category':
        setFilterCondtion({
          ...filterCondtion,
          category: CategoryFilter[idx].type,
        });
        break;
      case 'frequencyTag':
        setFilterCondtion({
          ...filterCondtion,
          frequencyTag: tagFrequencyData[idx].type,
        });
        break;
      case 'tasteTag': {
        //그전에 눌렀던걸 또 눌렀다면 취소
        if (filterCondtion.tasteTag.length === 0) {
          const ClickedTag = filterCondtion.tasteTag;
          const tag = tagTasteData[idx].type;
          ClickedTag.push(tag);

          setFilterCondtion({ ...filterCondtion, tasteTag: ClickedTag });
          break;
        }

        const alreadyClickedTag = [...filterCondtion.tasteTag];
        const Tag = tagTasteData[idx].type;

        if (filterCondtion.tasteTag.indexOf(Tag) >= 0) {
          //이미클릭된태그를 지울때
          const newclickedList = filterCondtion.tasteTag.filter((number) => {
            return number !== tagTasteData[idx].type;
          });
          setFilterCondtion({ ...filterCondtion, tasteTag: newclickedList });
        } else {
          //태그를 추가할때
          alreadyClickedTag.push(tagTasteData[idx].type);
          setFilterCondtion({
            ...filterCondtion,
            tasteTag: [...alreadyClickedTag],
          });
        }

        break;
      }
      case 'descendingOrder':
        setFilterCondtion({
          ...filterCondtion,
          descendingOrder: !filterCondtion.descendingOrder,
        });
        break;
      case 'sortType':
        setFilterCondtion({
          ...filterCondtion,
          sortType: sortTypeData[idx].type,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-[100%] ">
      {/* 카테고리 */}
      <div className="flex border-b-2 border-solid border-white ">
        {CategoryFilter.map((data, idx) => (
          <CategoryBtn
            key={data.id}
            data={data}
            idx={idx}
            filterCondtion={filterCondtion}
            selectMenuHandler={selectMenuHandler}
          />
        ))}
      </div>
      {/* 태그 */}
      <div className="flex pt-10 pb-10 gap-3  max-[500px]:flex-wrap max-[500px]:pb-0">
        {/* 도수별 태그 */}
        {tagFrequencyData.map((data, idx) => (
          <TagFrequencyButton
            key={data.id}
            data={data}
            idx={idx}
            filterCondtion={filterCondtion}
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
      <div className="flex justify-end text-[#B3B3B3] pt-10 pb-2 items-center  gap-2 text-[13px] max-[500px]:justify-center   max-[500px]:mb-3 mb-5">
        <Sort
          filterCondtion={filterCondtion}
          selectMenuHandler={selectMenuHandler}
        />

        {sortTypeData.map((data, idx) => (
          <SortConditionButton
            key={data.id}
            data={data}
            idx={idx}
            filterCondtion={filterCondtion}
            selectMenuHandler={selectMenuHandler}
          />
        ))}
      </div>
    </div>
  );
}
