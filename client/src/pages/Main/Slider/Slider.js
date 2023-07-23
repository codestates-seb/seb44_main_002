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

  const onSlideChangeHandler = () => {
    // 애니메이션을 다시 시작
    const animatedTexts = document.querySelectorAll('.animate-fadeInRight2');
    animatedTexts.forEach((textElement) => {
      textElement.classList.remove('animate-fadeInRight2');
      void textElement.offsetWidth; // reflow 강제 실행
      textElement.classList.add('animate-fadeInRight2');
    });
  };

  const randomHandler = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}cocktails/random`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // 성공
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        navigate(`/detail/${json.cocktailId}`);
      })
      // 실패
      .catch((error) => {
        console.log(error);
        navigate('/error');
      });
  };

  const cocktailFormHandler = () => {
    if (isLogin) {
      navigate('/cocktail');
    } else {
      dispatch(open());
    }
  };

  const commentHandler = () => {
    if (isLogin) {
      randomHandler();
    } else {
      dispatch(open());
    }
  };

  return (
    <div id="main" className="swiper-container">
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
        onSlideChange={onSlideChangeHandler}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {/* TODO: 커스텀이미지 안쓰고 사진만 넣을거면 밑에 복붙해서 링크만 바꾸면 됨 */}
        <SwiperSlide
          id="main"
          className="relative flex max-[520px]:items-center max-[520px]:justify-center swiper-slide"
        >
          <img
            className="absolute object-cover w-full h-full"
            src="images/swiper/슬라이더샘플3.png"
            alt="sample"
          />
          <SliderCustomText3>
            <p className="flex justify-start mb-6 max-[520px]:justify-center">
              안녕하세요
            </p>
            <p className="flex justify-start mb-6 ">
              <span className="mr-2">편의점 칵테일 레시피 사이트</span>
            </p>
            <p className="flex justify-start mb-8 max-[520px]:justify-center">
              <span className="text-pointPurple-100">편한</span>
              <span>입니다.</span>
            </p>
            <p className="flex mb-10 text-gray-200 justify-start text-lg max-[520px]:text-base max-[520px]:justify-center">
              편의점 한잔이라는 뜻을 가지고 있습니다
            </p>
            <button
              id="button-border-animate"
              onClick={() => navigate('/category')}
              className="flex items-center justify-center w-40 h-24 text-lg rounded-sm"
            >
              한잔 마시러 가기 ➡️
            </button>
          </SliderCustomText3>
        </SwiperSlide>
        {/* TODO: 커스텀이미지 넣을거면 밑에 코드 사용할것 */}
        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomText>
            <p>
              <span className="text-pointPurple-100">오늘</span>
              <span>은</span>
            </p>
            <p>안먹고 자면</p>
            <p>아쉽잖아.</p>
            <p className="mt-10 text-lg text-gray-200 max-[520px]:mt-4 max-[520px]:text-sm">
              오늘 하루를 깔끔하게 마무리해보세요
            </p>
            <button
              id="button-border-animate"
              onClick={() => navigate('/category')}
              className="w-40 h-24 text-lg rounded-sm max-[520px]:h-8"
            >
              레시피 찾아보기 ➡️
            </button>
          </SliderCustomText>
          <SliderCustomImg src="images/swiper/slideimg.webp" alt="sliderimg" />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomImg src="images/swiper/chat.png" alt="chat" />
          <SliderCustomText2>
            <p>
              <span className="text-pointPurple-100">댓글</span>
              <span>로</span>
            </p>
            <p>다양한 유저와</p>
            <p>소통해보세요!</p>
            <p className="mt-10 text-lg text-gray-200 max-[520px]:text-sm max-[520px]:mt-4">
              술을 좋아하는 사람들의 이야기!
            </p>
            <button
              id="button-border-animate"
              onClick={commentHandler}
              className="w-48 h-24 text-lg max-[520px]:h-8"
            >
              댓글 등록하러 가기 ➡️
            </button>
          </SliderCustomText2>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomImg src="images/swiper/recipe.png" alt="recipe" />
          <SliderCustomText2>
            <p>
              <span className="text-pointPurple-100">나만의 레시피</span>
              <span>를</span>
            </p>
            <p>다른 사람들에게</p>
            <p>뽐내보세요!</p>
            <p className="mt-10 mb-2 text-lg text-gray-200 max-[520px]:mt-4 max-[520px]:text-sm">
              세상에 하나뿐인 당신만의 레시피
            </p>
            <button
              id="button-border-animate"
              onClick={cocktailFormHandler}
              className="w-48 h-24 text-lg max-[520px]:h-8"
            >
              레시피 등록하러 가기 ➡️
            </button>
          </SliderCustomText2>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide flex justify-around max-[768px]:flex-col max-[768px]:justify-center">
          <SliderCustomText>
            <p>
              <span className="text-pointPurple-100">이중필터</span>
              <span>로</span>
            </p>
            <p>원하는 레시피를</p>
            <p>쉽게 찾아보세요!</p>
            <p className="mt-10 text-lg text-gray-200 max-[520px]:text-sm max-[520px]:mt-4">
              오늘 뭐 마실지 고민하지마세요
            </p>
            <button
              id="button-border-animate"
              onClick={() => navigate('/category')}
              className="w-48 h-24 text-lg max-[520px]:h-8"
            >
              레시피 찾아보기 ➡️
            </button>
          </SliderCustomText>
          <SliderCustomImg src="images/swiper/filter.png" alt="filter" />
        </SwiperSlide>

        <div id="main" className="autoplay-progress" slot="container-end">
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
  pl-32
  text-start 
  text-6xl 
  leading-snug
  whitespace-nowrap 
  max-[768px]:text-center 
  max-[768px]:text-4xl 
  max-[768px]:order-2
  animate-fadeInRight2

  max-[768px]:pl-2
`;

const SliderCustomText2 = tw.div`
  pr-32
  text-start 
  text-6xl 
  leading-snug
  whitespace-nowrap 
  
  animate-fadeInRight2

  max-[768px]:pr-2
  max-[768px]:text-center 
  max-[768px]:text-4xl 
  max-[768px]:order-2
`;

const SliderCustomText3 = tw.div`
  text-white
  pl-44
  leading-snug
  animate-fadeInRight2
  text-5xl
  flex
  flex-col
  

  max-[768px]:text-center
  max-[768px]:text-4xl
  max-[768px]:pl-12

  max-[520px]:pl-0
  max-[520px]:text-2xl
  max-[520px]:items-center
`;

const SliderCustomImg = tw.img`
  w-[50%]
  h-[50rem] 
  object-contain 
  max-[768px]:w-[24rem] 
  max-[768px]:h-[24rem] 
  max-[768px]:order-1
`;
