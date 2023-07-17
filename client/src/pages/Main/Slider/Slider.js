import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { open } from '../../../redux/slice/isModalSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import tw from 'tailwind-styled-components';
import './Slider.css';

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
        <SwiperSlide className="swiper-slide">
          <img
            className="w-full h-full object-cover"
            src="images/swiper/슬라이더샘플2.webp"
            alt="sample"
          />
        </SwiperSlide>
        {/* TODO: 커스텀이미지 넣을거면 밑에 코드 사용할것 */}
        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomText>
            <p>
              <span className="text-pointPurple-100">오늘</span>
              <span>은,</span>
            </p>
            <p>안먹고 자면</p>
            <p>아쉽잖아.</p>
            <p className="text-lg text-gray-200 mt-10">
              오늘 하루를 깔끔하게 마무리해보세요
            </p>
            <button onClick={() => navigate('/category')} className="text-lg">
              레시피 찾아보기 ➡️
            </button>
          </SliderCustomText>
          <SliderCustomImg src="images/swiper/slideimg.webp" alt="sliderimg" />
        </SwiperSlide>
        {/* 3번째 */}
        <SwiperSlide className="swiper-slide">
          <img
            className="w-full h-full object-cover"
            src="images/swiper/슬라이더샘플.webp"
            alt="sample"
          />
        </SwiperSlide>
        {/* 4번째 */}
        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomText>
            <p>
              <span className="text-pointPurple-100">댓글</span>
              <span>로,</span>
            </p>
            <p>다양한 유저와</p>
            <p>소통해보세요!</p>
            <p className="text-lg text-gray-200 mt-10">
              술을 좋아하는 사람들의 이야기!
            </p>
          </SliderCustomText>
          <SliderCustomImg src="images/swiper/chat.png" alt="chat" />
        </SwiperSlide>
        {/* 5번째 */}
        <SwiperSlide className="swiper-slide">
          <img
            className="w-full h-full object-cover"
            src="images/cocktail/cocktail1.jpg"
            alt="sample"
          />
        </SwiperSlide>
        {/* 6번째 */}
        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomText>
            <p>
              <span className="text-pointPurple-100">이중필터</span>
              <span>로,</span>
            </p>
            <p>원하는 레시피를</p>
            <p>쉽게 찾아보세요!</p>
            <p className="text-lg text-gray-200 mt-10">
              오늘 뭐 마실지 고민하지마세요
            </p>
          </SliderCustomText>
          <SliderCustomImg src="images/swiper/filter.png" alt="filter" />
        </SwiperSlide>
        {/* 7번째 */}
        <SwiperSlide className="swiper-slide">
          <img
            className="w-full h-full object-cover"
            src="images/cocktail/cocktail3.jpg"
            alt="sample"
          />
        </SwiperSlide>
        {/* 8번째 */}
        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomText>
            <p>
              <span className="text-pointPurple-100">나만의 레시피</span>
              <span>를</span>
            </p>
            <p>다른 사람들에게</p>
            <p>뽐내보세요!</p>
            <p className="text-lg text-gray-200 mt-10">
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
