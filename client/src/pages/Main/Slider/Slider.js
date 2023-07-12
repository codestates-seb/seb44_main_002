import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import tw from 'tailwind-styled-components';
import './Slider.css';

export default function Slider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const navigate = useNavigate();

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
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
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
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
              레시피에 대한 설명이 들어갈듯
            </p>
            <button onClick={() => navigate('/category')} className="text-lg">
              레시피 찾아보기 ➡️
            </button>
          </SliderCustomText>
          <></>
          <SliderCustomImg src="images/slideimg.webp" alt="sample" />
        </SwiperSlide>
        {/* TODO: 커스텀이미지 안쓰고 사진만 넣을거면 밑에 복붙해서 링크만 바꾸면 됨 */}
        <SwiperSlide className="swiper-slide">
          <img
            className="w-full h-full object-cover"
            src="images/슬라이더샘플2.webp"
            alt="sample"
          />
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
