import { useState } from 'react';
import tw from 'tailwind-styled-components';

export default function TagButton({
  type = 'button',
  onClick,
  selected,
  color = 'text-[#7B7B7B] bg-transparent',
  changeColor = 'text-[#BB40F1] bg-transparent',
  borderColor = 'border-[#7B7B7B]',
  changeBorderColor = 'border-[#BB40F1]',
  size = 'w-[93px] h-[36px]',
  fontSize = 'text-md',
  radius = 'rounded-lg',
  children,
}) {
  const [isClicked, setIsClicked] = useState(selected || false);

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
      color={selected ? changeColor : color}
      borderColor={selected ? changeBorderColor : borderColor}
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
  ${({ borderColor }) => borderColor}
  ${({ size }) => size}
  ${({ fontSize }) => fontSize}
  ${({ radius }) => radius}
`;
