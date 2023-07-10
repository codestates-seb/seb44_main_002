import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination]);

import tw from 'tailwind-styled-components';
import './Swiper.css';

export default function Subscribe({ userInfo }) {
  const deleteSubscriber = (id) => {
    // id
  };

  const UserList = () => {
    return (
      <div id="userpage">
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          slidesPerGroup={2}
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
          breakpoints={{
            500: { slidesPerView: 3, slidesPerGroup: 3 },
            850: { slidesPerView: 4, slidesPerGroup: 4 },
            1200: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
          }}
        >
          {userInfo.subscribe.map((user) => {
            return (
              <SwiperSlide key={user.userId}>
                <div key={user.userId}>
                  <img src={user.profileImageUrl} alt="user profile" />
                  <p id="name">{user.name}</p>
                  <CloseP
                    id="close"
                    role="presentation"
                    onClick={() => deleteSubscriber(user.userId)}
                    onKeyDown={() => {}}
                  >
                    x
                  </CloseP>
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
const CloseP = tw.p`
cursor-pointer
hover:text-pointPurple-100
`;
