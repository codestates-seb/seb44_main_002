import { useState } from 'react';
import ClickButton from '../../common/Buttons/ClickButton';

export default function TagFrequencyButton({
  data,
  idx,
  selectMenuHandler,
  setfocusFrequencyTag,
  onClick,
  focusFrequencyTag,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const buttonClicked = () => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick();
    }
  };

  return (
    <ClickButton
      key={data.id}
      data={data}
      idx={idx}
      radius="rounded-[30px]"
      fontSize="text-[1rem]"
      size="w-[110px] h-[30px]"
      color={`${
        focusFrequencyTag === data.type
          ? 'text-[#ffffff] bg-transparent'
          : 'text-[#7B7B7B] bg-transparent'
      }`}
      borderColor={`${
        focusFrequencyTag === data.type
          ? 'border-[#ffffff]'
          : 'border-[#7B7B7B]'
      }`}
      onClick={() => {
        setfocusFrequencyTag(data.type);
        selectMenuHandler(idx, 'TagFrequency');
        buttonClicked();
      }}
      //    ${
      //     focusFrequencyTag === data.type
      //        ? 'text-[#ffffff] border-[#ffffff]'
      //        : ' text-[#8F8F8F] border-[#8F8F8F]'
      //    }
    >
      # {data.title}
    </ClickButton>
  );
}
