import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserPageApi from './UserPageApi';

import tw from 'tailwind-styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import './Swiper.css';

SwiperCore.use([Navigation, Pagination]);

export default function Subscribe({ userInfo }) {
  const [follows, setFollows] = useState([]);

  const cancleFollow = async (id) => {
    try {
      const response = await UserPageApi.cancelfollow(id);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubscriber = (event, id, name) => {
    event.stopPropagation();
    if (window.confirm(`${name} 님의 구독을 취소하시겠습니까?`)) {
      cancleFollow(id);
    }
  };

  useEffect(() => {
    // 슬라이더 무한루프 구현(5개 이상만 가능합니다.)
    if (userInfo.follows.length >= 5) {
      userInfo.follows = [...userInfo.follows, ...userInfo.follows];
    }
    setFollows(userInfo.follows);
  }, [userInfo]);

  const UserList = () => {
    return (
      <div id="userpage">
        {userInfo.follows.length === 0 ? (
          <p className="mt-12 text-white text-center">
            구독한 유저가 없습니다.
          </p>
        ) : (
          <Swiper
            spaceBetween={30} //좌우측
            slidesPerView={2}
            slidesPerGroup={2} // 한 화면에 나오는 슬라이드 넘어가는 수
            loop={userInfo.follows.length >= 5 ? true : false}
            navigation={true}
            className="mySwiper"
            breakpoints={{
              550: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 50 },
              950: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 50 },
              1200: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 55 },
            }}
          >
            {follows.map((user, idx) => {
              return (
                <SwiperSlide key={user.followingUserId + idx}>
                  <div>
                    <Link to={`/userpage/${user.followingUserId}`}>
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="user profile"
                      />
                      <UserName id="name">{user.followingUserName}</UserName>
                    </Link>
                    <CloseP
                      id="close"
                      role="presentation"
                      onClick={(event) =>
                        deleteSubscriber(
                          event,
                          user.followingUserId,
                          user.followingUserName
                        )
                      }
                      onKeyDown={() => {}}
                    >
                      x
                    </CloseP>
                  </div>
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
const UserName = tw.p`
text-center
truncate
`;
const CloseP = tw.p`
px-2.5
pb-2.5
z-10
cursor-pointer
hover:text-pointPurple-100
`;
