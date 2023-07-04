import { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import './Slider.css';

export default function Slider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

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
        <SwiperSlide className="swiper-slide">
          <img src="images/슬라이더샘플.jpg" alt="sample" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="images/슬라이더샘플2.jpg" alt="sample" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="images/슬라이더샘플.jpg" alt="sample" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="images/슬라이더샘플2.jpg" alt="sample" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="images/슬라이더샘플.jpg" alt="sample" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="images/슬라이더샘플2.jpg" alt="sample" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="images/슬라이더샘플.jpg" alt="sample" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="images/슬라이더샘플2.jpg" alt="sample" />
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
