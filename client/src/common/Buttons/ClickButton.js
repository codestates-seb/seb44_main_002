import { useState } from 'react';

import tw from 'tailwind-styled-components';

//버튼 컴포넌트 사용방법 :
// import ClickButton from './common/Buttons/ClickButton';

/* <ClickButton onClick={console.log('hi')}>버튼 이름</ClickButton> */

// 사용가능한 props : 아무것도 안적으면 기본값 적용됨
// -> onClick : 버튼 클릭시 실행할 함수
// -> color : 버튼색깔 커스텀
// -> changeColor : 눌렀을때 바뀌는 버튼색깔 커스텀
// -> size : 버튼 사이즈 커스텀
// -> radius : 보더 라인 커스텀
// -> fontSize : 폰트 크기 커스텀
// -> borderColor : 보더 색깔 커스텀
// -> changeBorderColor : 눌렀을때 바뀌는 보더 색깔 커스텀

export default function ClickButton({
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
      color={isClicked ? changeColor : color}
      size={size}
      fontSize={fontSize}
      radius={radius}
      borderColor={isClicked ? changeBorderColor : borderColor}
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
