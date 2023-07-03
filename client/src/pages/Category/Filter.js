import { filterBtnData } from '../../common/Data';
import FilterBtn from './FilterBtn';

export default function Filter({ setType }) {
  const selectMenuHandler = (idx) => {
    setCurrentTab(idx);
    setType(filterBtnData[idx].type);
  };

  return (
    <div>
      {filterBtnData.map((data, idx) => (
        <FilterBtn
          key={data.id}
          data={data}
          idx={idx}
          currentTab={currentTab}
          selectMenuHandler={selectMenuHandler}
        />
      ))}
    </div>
  );
}
