import tw from 'tailwind-styled-components';

import RecipeInfo from './RecipeInfo';
import Process from './Process';
import Community from './Community';
import Recommend from './Recommend';

export default function RecipeDetail() {
  const DrawBookmark = ({ isSelected = 1 }) => {
    const bookmark = process.env.PUBLIC_URL + '/images/bookmark.png';
    const selectedMookmark =
      process.env.PUBLIC_URL + '/images/bookmark_selected.png';
    return (
      <img src={isSelected ? bookmark : selectedMookmark} alt="bookmark" />
    );
  };
  return (
    <>
      <Background>
        <Container>
          <BookmarkIcon>
            <DrawBookmark />
          </BookmarkIcon>
          <RecipeInfo cocktailDetail={cocktailDetail} recipeList={recipeList} />
          <Process cocktailDetail={cocktailDetail} />
          <Community cocktailDetail={cocktailDetail} />
          <Recommend cocktailDetail={cocktailDetail} />
        </Container>
      </Background>
    </>
  );
}

const Background = tw.div`
bg-gradient-to-r 
from-gradi-to
to-gradi-from
px-12
py-52
w-full
`;
const Container = tw.main`
relative
mx-auto
px-[4.6875rem]
py-32
w-[80vw]
bg-[#000000]/40
rounded-ss-[3.125rem]
rounded-ee-[3.125rem]
`;
const BookmarkIcon = tw.div`
absolute
top-0 right-14
text-7xl
cursor-pointer
`;

const recipeList = [
  'Light rum',
  'Lime',
  'Sugar',
  'Mint',
  'Soda water',
  'Tonic water',
  'Tonic water',
  'Tonic water',
];
const cocktailDetail = {
  cocktailId: 1,
  name: 'sample',
  imageUrl: 'sample image url',
  liquor: '럼',
  Ingredients: [
    {
      ingredient: '설탕',
    },
    {
      ingredient: '레몬즙',
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
      userId: 2,
      name: 'kim',
      content: '깔끔하고 맛있네요!',
      date: '2023-02-16',
      replies: [
        {
          userId: 3,
          name: 'chan',
          content: '저도 그렇게 생각합니다!',
          taggedUserId: 2,
          taggedUserName: 'kim',
          date: '2023-02-16',
        },
      ],
    },
    {
      userId: 3,
      name: 'chan',
      content: '그놈은 멋있었다...백엔드는 멋있었다.',
      date: '2023-02-16',
      replies: [
        {
          userId: 4,
          name: 'jae',
          content: '백엔드는 멋있다.',
          taggedUserId: 3,
          taggedUserName: 'kim',
          date: '2023-02-16',
        },
        {
          userId: 5,
          name: 'euni',
          content: '이제 아셨습니까. 휴면',
          taggedUserId: 4,
          taggedUserName: 'kim',
          date: '2023-02-16',
        },
      ],
    },
  ],
  recommends: [
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
  ],
  isBookmarked: 'true',
};
