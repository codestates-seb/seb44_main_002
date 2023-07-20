import { useState } from 'react';

import tw from 'tailwind-styled-components';

export default function CategoryBtn({
  data,
  idx,
  selectMenuHandler,
  onClick,
  filterCondtion,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const buttonClicked = () => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick();
    }
  };
  return (
    <CategoryButton
      onClick={() => {
        selectMenuHandler(idx, 'category');
        buttonClicked();
      }}
      filterCondtion={filterCondtion}
      data={data}
    >
      {data.title}
    </CategoryButton>
  );
}

const CategoryButton = tw.button`
w-[20%]
h-[50px] 
border-2 
border-solid 
rounded-t-[40px] 
font-bold
text-[15px]
max-[990px]:h-11
max-[990px]:text-sm
max-[990px]:rounded-t-3xl
max-[700px]:text-[10px]
max-[700px]:leading-3
max-[700px]:h-10
max-[700px]:rounded-t-2xl

${(props) =>
  props.filterCondtion.category === props.data.type
    ? 'text-[#ffffff] border-[#ffffff]'
    : 'text-[#8F8F8F] border-[#8F8F8F]'}
`;
