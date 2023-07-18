import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import UserPageApi from './UserPageApi';

SwiperCore.use([Navigation, Pagination]);

import tw from 'tailwind-styled-components';
import './Swiper.css';
import { Link } from 'react-router-dom';

export default function Subscribe({ userInfo }) {
  const cancleFollow = async (id) => {
    try {
      const response = await UserPageApi.cancelfollow(id);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubscriber = (event, id) => {
    event.stopPropagation();
    cancleFollow(id);
  };

  const UserList = () => {
    return (
      <div id="userpage">
        {userInfo.follows.length === 0 ? (
          <p className="mt-12 text-white text-center">
            구독한 유저가 없습니다.
          </p>
        ) : (
          <Swiper
            spaceBetween={10} //좌우측
            slidesPerView={2} //
            slidesPerGroup={2} // 한 화면에 나오는 슬라이드 넘어가는 수
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            className="mySwiper"
            breakpoints={{
              500: { slidesPerView: 3, slidesPerGroup: 2 },
              850: { slidesPerView: 4, slidesPerGroup: 2 },
            }}
          >
            {userInfo.follows.map((user) => {
              return (
                <SwiperSlide key={user.followingUserId}>
                  <Link to={`/userpage/${user.followingUserId}`}>
                    <div>
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="user profile"
                      />
                      <p id="name">{user.followingUserName}</p>
                      <CloseP
                        id="close"
                        role="presentation"
                        onClick={(event) =>
                          deleteSubscriber(event, user.followingUserId)
                        }
                        onKeyDown={() => {}}
                      >
                        x
                      </CloseP>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
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
px-2.5
pb-2.5
cursor-pointer
hover:text-pointPurple-100
`;
