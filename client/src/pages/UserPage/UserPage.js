import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserInfo from './UserInfo';
import Subscribe from './Subscribe';
import UserRecipe from './UserRecipe';
import UserBookmarked from './UserBookmarked';
import UserPageApi from '../../api/UserPageApi';

import tw from 'tailwind-styled-components';

export default function UserPage() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/')[2];

  const [userInfo, setUserInfo] = useState(dummyData);
  const [localData, setLocalData] = useState({
    userId: '',
    IsAdmin: false,
  });

  const isLogin = useSelector((state) => state.isLogin.isLogin);

  const getUser = async () => {
    try {
      const response = await UserPageApi.getUserData(location);
      const json = await response.json();
      setUserInfo(json);
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  };

  useEffect(() => {
    getUser();
    const local_userId = parseInt(localStorage.getItem('userId'));
    const local_IsAdmin = JSON.parse(localStorage.getItem('IsAdmin'));
    setLocalData({
      userId: local_userId,
      IsAdmin: local_IsAdmin,
    });
  }, [location]);

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
          <UserInfo
            userInfo={userInfo}
            isLogin={isLogin}
            localData={localData}
          />
          <Subscribe userInfo={userInfo} localData={localData} />
          <UserRecipe userInfo={userInfo} localData={localData} />
          <UserBookmarked userInfo={userInfo} />
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
max-sm:py-8
`;
const Container = tw.main`
w-full
max-w-6xl
mx-auto
animate-fadeInDown1
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
  userId: 3,
  name: '',
  profileImageUrl: 'sample image url',
  gender: '',
  age: 0,
  email: '',
  subscriberCount: 0,
  cocktails: [],
  bookmarkedCocktails: [
    //   cocktailId: 6,
    //   name: '시트러스 주스',
    //   imageUrl: 'https://2bob.co.kr/data/recipe/20210706173724-7B5QW.jpg',
    //   isBookmarked: true,
    // },
  ],
  boards: [
    // {
    //   boardId: 1,
    //   title: 'title1',
    //   content: 'content1',
    // },
  ],
  follows: [],
  subscribe: [
    // {
    //   userId: 1,
    //   name: 'park1',
    //   profileImageUrl:
    //     'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    // },
  ],
  subscribed: false,
};
