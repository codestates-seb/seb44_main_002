import { useState } from 'react';
import HoverButton from '../../common/Buttons/HoverButton';

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
    <HoverButton
      size="w-[110px] h-[30px]"
      fontSize="text-[1rem]"
      radius="rounded-[30px]"
      color={`${
        focusFrequencyTag === data.type
          ? 'text-[#BB40F1] bg-transparent'
          : 'text-[#7B7B7B] bg-transparent'
      }`}
      borderColor={`${
        focusFrequencyTag === data.type
          ? 'border-[#BB40F1]'
          : 'border-[#7B7B7B]'
      }`}
      onClick={() => {
        setfocusFrequencyTag(data.type);
        selectMenuHandler(idx, 'TagFrequency');
        buttonClicked();
      }}
    >
      # {data.title}
    </HoverButton>
  );
}
