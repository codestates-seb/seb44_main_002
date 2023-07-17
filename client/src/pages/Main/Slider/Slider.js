import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { open } from '../../../redux/slice/isModalSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import tw from 'tailwind-styled-components';
import './Slider.css';
import 'animate.css';

export default function Slider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin.isLogin);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const cocktailFormHandler = () => {
    if (isLogin) {
      navigate('/cocktail');
    } else {
      dispatch(open());
    }
  };

  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {/* TODO: 커스텀이미지 안쓰고 사진만 넣을거면 밑에 복붙해서 링크만 바꾸면 됨 */}
        <SwiperSlide className="swiper-slide relative">
          <img
            className="w-full h-full object-cover absolute"
            src="images/swiper/슬라이더샘플3.png"
            alt="sample"
          />
          <div className="text-white absolute left-24 text-7xl font-bold max-[768px]:text-center max-[768px]:text-4xl max-[768px]:left-12">
            <p className="flex justify-start mb-2 animate__animated animate__slideInRight">
              안녕하세요
            </p>
            <p className="flex justify-start mb-6 animate__animated animate__slideInRight">
              <span className="text-pointPurple-100 mr-2">편한</span>
              <span>사이트입니다</span>
            </p>
            <p className="text-lg flex justify-start animate__animated animate__slideInRight">
              편의점 한잔이라는 뜻을 가지고 있습니다
            </p>
          </div>
        </SwiperSlide>
        {/* TODO: 커스텀이미지 넣을거면 밑에 코드 사용할것 */}
        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomText>
            <p className="animate__animated animate__slideInRight">
              <span className="text-pointPurple-100">오늘</span>
              <span>은,</span>
            </p>
            <p className="animate__animated animate__slideInRight">
              안먹고 자면
            </p>
            <p className="animate__animated animate__slideInRight">아쉽잖아.</p>
            <p className="text-lg text-gray-200 mt-10 animate__animated animate__slideInRight">
              오늘 하루를 깔끔하게 마무리해보세요
            </p>
            <button
              onClick={() => navigate('/category')}
              className="text-lg animate__animated animate__slideInRight"
            >
              레시피 찾아보기 ➡️
            </button>
          </SliderCustomText>
          <SliderCustomImg src="images/swiper/slideimg.webp" alt="sliderimg" />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomText>
            <p className="animate__animated animate__slideInRight">
              <span className="text-pointPurple-100">댓글</span>
              <span>로,</span>
            </p>
            <p className="animate__animated animate__slideInRight">
              다양한 유저와
            </p>
            <p className="animate__animated animate__slideInRight">
              소통해보세요!
            </p>
            <p className="text-lg text-gray-200 mt-10 animate__animated animate__slideInRight">
              술을 좋아하는 사람들의 이야기!
            </p>
          </SliderCustomText>
          <SliderCustomImg src="images/swiper/chat.png" alt="chat" />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomText>
            <p className="animate__animated animate__slideInRight">
              <span className="text-pointPurple-100">이중필터</span>
              <span>로,</span>
            </p>
            <p className="animate__animated animate__slideInRight">
              원하는 레시피를
            </p>
            <p className="animate__animated animate__slideInRight">
              쉽게 찾아보세요!
            </p>
            <p className="text-lg text-gray-200 mt-10 animate__animated animate__slideInRight">
              오늘 뭐 마실지 고민하지마세요
            </p>
          </SliderCustomText>
          <SliderCustomImg src="images/swiper/filter.png" alt="filter" />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomText>
            <p className="animate__animated animate__slideInRight">
              <span className="text-pointPurple-100">나만의 레시피</span>
              <span>를</span>
            </p>
            <p className="animate__animated animate__slideInRight">
              다른 사람들에게
            </p>
            <p className="animate__animated animate__slideInRight">
              뽐내보세요!
            </p>
            <p className="text-lg text-gray-200 mt-10 animate__animated animate__slideInRight">
              세상에 하나뿐인 당신만의 레시피
            </p>
            <button onClick={cocktailFormHandler} className="text-lg">
              레시피 등록하러 가기 ➡️
            </button>
          </SliderCustomText>
          <SliderCustomImg src="images/swiper/recipe.png" alt="recipe" />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}

const SliderCustomText = tw.div`
  ml-2 
  text-start 
  text-6xl 
  leading-snug 
  whitespace-nowrap 
  max-[768px]:text-center 
  max-[768px]:text-4xl 
  max-[768px]:order-2
`;

const SliderCustomImg = tw.img`
  w-[40%]
  h-[40rem] 
  object-contain 
  max-[768px]:w-[24rem] 
  max-[768px]:h-[24rem] 
  max-[768px]:order-1
`;
