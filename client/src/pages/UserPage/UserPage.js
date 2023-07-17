import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserInfo from './UserInfo';
import Subscribe from './Subscribe';
import UserRecipe from './UserRecipe';
import UserPageApi from './UserPageApi';

import tw from 'tailwind-styled-components';
import UserBookmarked from './UserBookmarked';

export default function UserPage() {
  const [userInfo, setUserInfo] = useState(dummyData);
  const location = useLocation().pathname.split('/')[2];
  const logginUser = useSelector((state) => state.userinfo);

  const getUser = async () => {
    try {
      const response = await UserPageApi.getUserData(location);
      const json = await response.json();
      setUserInfo(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 칵테일 정보 fetch 추가예정
    getUser();
  }, []);

  const BackgroundImg = () => {
    return (
      <>
        <NoteImg
          src="/images/background/music-dynamic-gradient.png"
          alt="음표"
        />
        <StarImg src="/images/background/star-dynamic-gradient.png" alt="별" />
      </>
    );
  };
  return (
    <Background>
      <BackgroundImg />
      <OuterContainer>
        <Container>
          <UserInfo userInfo={userInfo} logginUser={logginUser} />
          {/* <Subscribe userInfo={userInfo} logginUser={logginUser} /> */}
          <UserRecipe userInfo={userInfo} />
          <UserBookmarked userInfo={userInfo} logginUser={logginUser} />
        </Container>
      </OuterContainer>
    </Background>
  );
}

const Background = tw.div`
relative
bg-gradient-to-r 
from-gradi-to
to-gradi-from
pt-32
w-full
overflow-hidden
`;
const OuterContainer = tw.div`
w-full
bg-[#000000]/40
px-[4.6875rem]
py-32
max-md:px-4
`;
const Container = tw.main`
w-full
max-w-6xl
mx-auto
`;
const NoteImg = tw.img`
absolute 
top-0 
right-[-400px] 
pointer-events-none
`;
const StarImg = tw.img`
absolute 
bottom-0 
right-[900px] 
pointer-events-none
`;

const dummyData = {
  userId: 1,
  name: '숨니',
  profileImageUrl: 'sample image url',
  gender: '여',
  age: 20,
  email: 'kim@example.com',
  subscriberCount: 1200,
  bookmarkedCocktails: [
    {
      cocktailId: 1,
      name: '라떼 밀크주',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210707094952-WOE78.jpg',
      isBookmarked: true,
    },
    {
      cocktailId: 2,
      name: '논알콜 청포도 모히토',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210706172910-2B1WD.jpg',
      isBookmarked: false,
    },
    {
      cocktailId: 3,
      name: '시트러스 주스',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210706173724-7B5QW.jpg',
      isBookmarked: true,
    },
    {
      cocktailId: 4,
      name: '라떼 밀크주',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210707094952-WOE78.jpg',
      isBookmarked: true,
    },
    {
      cocktailId: 5,
      name: '논알콜 청포도 모히토',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210706172910-2B1WD.jpg',
      isBookmarked: false,
    },
    {
      cocktailId: 6,
      name: '시트러스 주스',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210706173724-7B5QW.jpg',
      isBookmarked: true,
    },
  ],
  boards: [
    {
      boardId: 1,
      title: 'title1',
      content: 'content1',
    },
    {
      boardId: 2,
      title: 'title2',
      content: 'content2',
    },
  ],
  subscribe: [
    {
      userId: 1,
      name: 'park1',
      profileImageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      userId: 2,
      name: 'park2',
      profileImageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      userId: 3,
      name: 'park3',
      profileImageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      userId: 4,
      name: 'park4',
      profileImageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      userId: 5,
      name: 'park5',
      profileImageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      userId: 6,
      name: 'park6',
      profileImageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      userId: 7,
      name: 'park7',
      profileImageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      userId: 8,
      name: 'park8',
      profileImageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      userId: 9,
      name: 'park9',
      profileImageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
  ],
};
