import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { open } from '../../../redux/slice/isModalSlice';

import HoverButton from '../../../common/Buttons/HoverButton';

import tw from 'tailwind-styled-components';

export default function Advice() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin.isLogin);
  const dispatch = useDispatch();

  const registrationHandler = () => {
    if (isLogin) {
      // 로그인
      navigate('/cocktail');
    } else {
      // 로그아웃
      dispatch(open());
    }
  };

  return (
    <AdviceContainer>
      <ImgContainer>
        <img
          className="w-[90%] h-[full] object-contain"
          src="images/mainPromotion.webp"
          alt="advice"
        />
      </ImgContainer>
      <div></div>
      <TextContainer>
        <TextSection>
          <p>특별한 자신만의 칵테일 레시피를</p>
          <p className="text-end max-[884px]:text-center max-[884px]:mb-4">
            공유해보세요!
          </p>
          <p className="text-lg font-normal text-gray-200 max-[884px]:mb-4">
            해당 페이지에 대한 상세설명
          </p>
          <HoverButton
            onClick={registrationHandler}
            size="w-40 h-[42px]"
            fontSize="text-lg"
          >
            등록하러가기
          </HoverButton>
        </TextSection>
      </TextContainer>
    </AdviceContainer>
  );
}

const AdviceContainer = tw.div`
  flex
  h-[720px]
  justify-between
  max-[884px]:flex-col
`;

const ImgContainer = tw.div`
  flex
  relative
  flex-[10]
  items-end
  z-0
  max-[884px]:order-2
  max-[884px]:flex-[0]
`;

const TextContainer = tw.div`
  flex
  flex-[1]
  justify-start
  items-center
  z-10 font-bold
  max-[884px]:justify-center
  max-[884px]:flex-[0]
`;

const TextSection = tw.div`
  flex
  flex-col
  w-[80%]
  h-[40%]
  justify-between
  items-end
  text-white
  whitespace-nowrap
  text-4xl
  max-[884px]:order-1
  max-[884px]:items-center
  max-[884px]:text-2xl
`;
