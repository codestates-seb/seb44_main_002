import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination]);

import tw from 'tailwind-styled-components';
import './Swiper.css';

export default function Subscribe({ userInfo }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let slidesPerView = 5; // 창 너비에 따라 slidesPerView 값 설정

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (windowWidth <= 500) {
    slidesPerView = 2;
  } else if (windowWidth <= 850) {
    slidesPerView = 3;
  } else if (windowWidth <= 1200) {
    slidesPerView = 4;
  }

  const UserList = () => {
    return (
      <div id="userpage">
        <Swiper
          spaceBetween={10}
          slidesPerView={slidesPerView}
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {userInfo.subscribe.map((user) => {
            return (
              <SwiperSlide key={user.userId}>
                <div key={user.userId}>
                  <img src={user.profileImageUrl} alt="user profile" />
                  <p id="name">{user.name}</p>
                  <p id="close">x</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };
  return (
    <Container>
      <Title>{userInfo.name + '님이  구독한 사람.'}</Title>
      <UserList />
    </Container>
  );
}
const Container = tw.div`
text-white
mt-32
mx-12
`;
const Title = tw.p`
text-2xl
`;
