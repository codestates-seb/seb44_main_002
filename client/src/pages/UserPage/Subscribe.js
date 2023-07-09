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
      // <div className="flex">
      //   {userInfo.subscribe.map((user) => {
      //     return (
      //       <div
      //         key={user.userId}
      //         className="mr-4 py-3 px-8 border-dotted border-[1px] rounded"
      //       >
      //         <img
      //           className="w-20 object-cover"
      //           src={user.profileImageUrl}
      //           alt="user profile"
      //         />
      //         <p className="mt-4">{user.name}</p>
      //       </div>
      //     );
      //   })}
      // </div>
    );
  };
  return (
    <Container>
      <p className="text-2xl">{userInfo.name + '님이  구독한 사람.'}</p>
      <UserList />
    </Container>
  );
}
const Container = tw.div`
text-white
mt-32
mx-12
`;
