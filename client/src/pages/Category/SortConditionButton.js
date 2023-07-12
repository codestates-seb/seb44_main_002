import { useState } from 'react';
import HoverButton from '../../common/Buttons/HoverButton';

export default function SortConditionButton({
  filterCondtion,
  data,
  idx,
  selectMenuHandler,
  onClick,
}) {
  const [isClicked, setIsClicked] = useState(false);

  const buttonClicked = () => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick();
    }
  };

  return (
    <HoverButton
      size="w-[58px] h-[21px]"
      fontSize="text-[13px]"
      radius="rounded-[5px]"
      color={`${
        filterCondtion.sortType === data.type
          ? 'text-[#BB40F1] bg-transparent'
          : 'text-[#7B7B7B] bg-transparent'
      }`}
      borderColor={`${
        filterCondtion.sortType === data.type
          ? 'border-[#BB40F1]'
          : 'border-[#7B7B7B]'
      }`}
      // hoverColor="hover:text-[#BB40F1] hover:bg-transparent"
      onClick={() => {
        selectMenuHandler(idx, 'sortType');
        buttonClicked();
      }}
    >
      {data.title}
    </HoverButton>
  );
}
