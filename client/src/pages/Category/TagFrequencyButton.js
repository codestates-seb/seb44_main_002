import { useEffect, useState } from 'react';
import HoverButton from '../../common/Buttons/HoverButton';

export default function TagFrequencyButton({
  data,
  idx,
  selectMenuHandler,
  onClick,
  filterCondtion,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({
    size: 'w-[110px] h-[30px]',
    fontSize: 'text-[1rem]',
    radius: 'rounded-[30px]',
  });
  //console.log(fitlerCondtion.frequencyTag === data.type);
  const buttonClicked = () => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick();
    }
  };

  const handleResize = () => {
    const width = window.innerWidth;
    // console.log(width);
    if (width <= 700) {
      setButtonStyle({
        size: 'w-[90px] h-[30px]',
        fontSize: 'text-[0.8rem]',
        radius: 'rounded-[30px]',
      });
    } else {
      setButtonStyle({
        size: 'w-[110px] h-[30px]',
        fontSize: 'text-[1rem]',
        radius: 'rounded-[30px]',
      });
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HoverButton
      size={buttonStyle.size}
      fontSize={buttonStyle.fontSize}
      radius={buttonStyle.radius}
      color={`${
        filterCondtion.frequencyTag === data.type
          ? 'text-[#BB40F1] bg-transparent'
          : 'text-[#7B7B7B] bg-transparent'
      }`}
      borderColor={`${
        filterCondtion.frequencyTag === data.type
          ? 'border-[#BB40F1]'
          : 'border-[#7B7B7B]'
      }`}
      onClick={() => {
        // setfocusFrequencyTag(data.type);
        selectMenuHandler(idx, 'frequencyTag');
        buttonClicked();
      }}
    >
      # {data.title}
    </HoverButton>
  );
}
