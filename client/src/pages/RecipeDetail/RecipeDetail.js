import { useState, useEffect } from 'react';

import tw from 'tailwind-styled-components';

import RecipeInfo from './RecipeInfo';
import Process from './Process';
import Community from './Community';
import Recommend from './Recommend';
import BookmarkBtn from '../../components/BookmarkButton/BookmarkBtn';
export default function RecipeDetail() {
  // const [cocktail, setCocktail] = useState({});
  const [isBookmarked, setIsBookmarked] = useState(cocktailDetail.isBookmarked);

  const setBookmark = () => {
    // 로그인 조건 추가 예정
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    // 데이터 가져올 구문 추가 예정
  }, []);

  const BackgroundImg = () => {
    return (
      <>
        <img
          src="/images/background/music-dynamic-gradient.png"
          alt="음표"
          className="absolute top-0 right-[-400px] pointer-events-none"
        />
        {/* 배경 왕별 */}
        <img
          src="/images/background/star-dynamic-gradient.png"
          alt="별"
          className="absolute bottom-0 right-[900px] pointer-events-none"
        />
      </>
    );
  };
  const DrawBookmark = () => {
    const bookmark =
      process.env.PUBLIC_URL + '/images/bookmark/bookmarkOff.png';
    const selectedMookmark =
      process.env.PUBLIC_URL + '/images/bookmark/bookmarkOn.png';
    const item = {
      cocktailId: cocktailDetail.cocktailId,
      name: cocktailDetail.name,
      imageUrl: cocktailDetail.imageUrl,
      isBookmarked: cocktailDetail.isBookmarked,
    };

    return (
      // <BookmarkIcon onClick={setBookmark}>
      //   <img
      //     width={50}
      //     src={isBookmarked ? selectedMookmark : bookmark}
      //     alt="bookmark"
      //   />
      // </BookmarkIcon>
      // <div
      //   className="absolute
      // top-0 right-14
      // cursor-pointer"
      // >
      //   <BookmarkButton item={item} />
      // </div>
      //북마크 적용--이은희
      <BookmarkBtn
        onClick={setBookmark}
        isBookmarked={isBookmarked}
        absolute="true"
        top="top-0"
        right="right-14"
      />
    );
  };
  return (
    <>
      <Background>
        <BackgroundImg />
        <Container>
          <DrawBookmark />
          <RecipeInfo cocktailDetail={cocktailDetail} />
          <Process cocktailDetail={cocktailDetail} />
          <Community cocktailDetail={cocktailDetail} />
          <Recommend cocktailDetail={cocktailDetail.recommends} />
        </Container>
      </Background>
    </>
  );
}

const Background = tw.div`
relative
bg-gradient-to-r 
from-gradi-to
to-gradi-from
px-12
py-52
w-full
overflow-hidden
`;
const Container = tw.main`
relative
mx-auto
px-[4.6875rem]
py-32
w-[80vw]
max-w-6xl
bg-[#000000]/40
rounded-ss-[3.125rem]
rounded-ee-[3.125rem]
`;
const BookmarkIcon = tw.div`
absolute
top-0 right-14
cursor-pointer
`;

const cocktailDetail = {
  cocktailId: 1,
  userId: 1,
  name: 'Admin',
  imageUrl: 'sample image url',
  liquor: '럼',
  viewCount: 1,
  createdAt: '2000-00-00',
  modifiedAt: '2000-00-00',
  Ingredients: [
    {
      ingredient: 'Light rum',
    },
    {
      ingredient: 'Lime',
    },
    {
      ingredient: 'Sugar',
    },
    {
      ingredient: 'Mint',
    },
    {
      ingredient: 'Soda water',
    },
    {
      ingredient: 'Tonic water',
    },
    {
      ingredient: 'Lemon water',
    },
    {
      ingredient: 'Lime water',
    },
  ],
  recipe: [
    `Pour the rum and top with soda water.`,
    'Pour the rum and top with soda water.with soda water.',
    'Pour the rum and top with soda water.Pour the rum and top with soda water.',
    'Pour the rum and top with soda water.',
    'Pour he rum and top with soda water. with soda water with soda water',
    'Pour the rum and top with soda water.',
  ],
  tags: [
    {
      tag: 'value',
    },
  ],
  rating: 4.5,
  comments: [
    {
      commentId: 1,
      userId: 2,
      userName: 'kim',
      content:
        '깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!',
      date: '2023-02-16',
      replies: [
        {
          replyId: 1,
          userId: 3,
          userName: 'chan',
          content: '저도 그렇게 생각합니다!',
          taggedUserInfo: [
            {
              taggedUserId: 2,
              taggedUserName: 'kimchi',
            },
          ],
          date: '2023-02-16',
        },
      ],
    },
    {
      commentId: 2,
      userId: 3,
      userName: 'chan',
      content:
        '그놈은 멋있었다...백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.',
      date: '2023-02-16',
      replies: [
        {
          replyId: 2,
          userId: 4,
          userName: 'jae',
          content: '백엔드는 멋있다.',
          taggedUserInfo: [
            {
              taggedUserId: 3,
              taggedUserName: 'chan',
            },
          ],

          date: '2023-02-16',
          //                   “createdAt” : 2000-00-00T00:00:00
          //                   “modifiedAt” : 2000-00-00T00:00:00
        },
        {
          userId: 3,
          userName: 'euni',
          content:
            '이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면',
          taggedUserInfo: [
            {
              taggedUserId: 4,
              taggedUserName: 'jae',
            },
          ],
          date: '2023-02-16',
        },
      ],
    },
  ],
  recommends: [
    //category idx 와 userinfo 리덕스 데이터와 겹쳐서 cocktailId와 isBookmarked  달리 수정했습니다.
    {
      cocktailId: 7,
      name: '라떼 밀크주',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210707094952-WOE78.jpg',
      isBookmarked: false,
    },
    {
      cocktailId: 8,
      name: '논알콜 청포도 모히토',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210706172910-2B1WD.jpg',
      isBookmarked: false,
    },
    {
      cocktailId: 9,
      name: '시트러스 주스',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210706173724-7B5QW.jpg',
      isBookmarked: false,
    },
  ],
  isBookmarked: true,
};

// {
//   “cocktailId” : 1,
//   “isAdminWritten” : “false”,
//   “userId” : 1,
//   “userName” : “kim”,
//   “name” : “sample”,
//   “imageUrl” : “sample image url”,
//   “recipe” : [
//       {
//           “process” : “step1”
//       },
//       {
//           “process” : “step2”
//       },
//   ],
//   “tags” : [
//       {
//           “tag” : “example1”
//       },
//       {
//           “tag” : “example2”
//       }
//   ],
//   “viewCount” : 1,
//   “createdAt” : 2000-00-00,
//   “modifiedAt” : 2000-00-00,
//   “comments” : [
//       {
//           “commentId” : 1,
//           “userId” : 1,
//           “userName” : “kim”,
//           “content” : “blah”,
//           “replies” : [
//               {
//                       “replyId” : 1,
//                       “userId” : 1,
//                       “userName” : “jjigae”,
//                       “taggedUserInfo” : [
//                                {
//                                              “taggedUserId” : 2,
//                                              “taggedUserName” : “kimchi”,
//                                 }
//                        ],
//                       “content” : “shut up”,
//                       “createdAt” : 2000-00-00T00:00:00
//                       “modifiedAt” : 2000-00-00T00:00:00
//           ],
//           “createdAt” : 2000-00-00T00:00:00
//       }
//   ],
//   “recommends” : [
//       {
//           “cocktailId” : 1,
//           “name” : “sample1”,
//           “imageUrl” : “sample image url”
//       },
//       {
//           “cocktailId” : 1,
//           “name” : “sample1”,
//           “imageUrl” : “sample image url”
//       }
//   ],
//   “isBookmarked” : “false”
// }
