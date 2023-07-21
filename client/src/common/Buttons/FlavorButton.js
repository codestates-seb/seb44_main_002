import { useState } from 'react';

import tw from 'tailwind-styled-components';

export default function FlavorButton({
  type = 'button',
  onClick,
  color = 'text-[#7B7B7B] bg-transparent',
  changeColor = 'text-[#BB40F1] bg-transparent',
  borderColor = 'border-[#7B7B7B]',
  changeBorderColor = 'border-[#BB40F1]',
  size = 'w-[93px] h-[36px]',
  fontSize = 'text-md',
  radius = 'rounded-lg',
  children,
  isSelected,
}) {
  const [isClicked, setIsClicked] = useState(false);

  const buttonClicked = () => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      type={type}
      onClick={buttonClicked}
      color={isSelected ? changeColor : color} // isSelected가 true인 경우 changeColor를 사용하여 색깔 변경
      borderColor={isSelected ? changeBorderColor : borderColor} // isSelected가 true인 경우 changeBorderColor를 사용하여 보더 색깔 변경
      size={size}
      fontSize={fontSize}
      radius={radius}
    >
      {children}
    </Button>
  );
}

const Button = tw.button`
  flex
  justify-center
  items-center
  cursor-pointer
  shadow-lg
  border
  border-solid
  font-extrabold
  ${({ color }) => color}
  ${({ size }) => size}
  ${({ radius }) => radius}
  ${({ fontSize }) => fontSize}
  ${({ borderColor }) => borderColor}
`;
