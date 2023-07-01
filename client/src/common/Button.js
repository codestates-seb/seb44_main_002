import tw from 'tailwind-styled-components';

//버튼 컴포넌트 사용방법 :
// import CustomButton from './common/Button';

/* <CustomButton>버튼 이름</CustomButton> */

// 사용가능한 props : 아무것도 안적으면 기본값 적용됨
// -> onClick : 버튼 클릭시 실행할 함수
// -> color : 버튼색깔 커스텀
// -> hoverColor : hover시 변경할 버튼색깔 커스텀
// -> size : 버튼 사이즈 커스텀
// -> radius : 보더 라인 커스텀
// -> fontSize : 폰트 크기 커스텀
// -> borderColor : 보더 색깔 커스텀

export default function HoverButton({
  type = 'button',
  onClick,
  color = 'text-[#8F8F8F] bg-transparent',
  hoverColor = 'hover:text-[#808080] hover:bg-[#F0F0F0]',
  borderColor = 'border-[#8F8F8F]',
  size = 'w-[93px] h-[36px]',
  fontSize = 'text-md',
  radius = 'rounded-lg',
  children,
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      color={color}
      hoverColor={hoverColor}
      size={size}
      fontSize={fontSize}
      radius={radius}
      borderColor={borderColor}
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
  font-bold
  ${({ color }) => color}
  ${({ hoverColor }) => hoverColor}
  ${({ size }) => size}
  ${({ radius }) => radius}
  ${({ fontSize }) => fontSize}
  ${({ borderColor }) => borderColor}
`;
