import RankingCard from './RankingCard';

import tw from 'tailwind-styled-components';

const dummyData = [
  {
    cocktailId: 1,
    name: 'sample cocktail',
    imageUrl: 'images/슬라이더샘플.webp',
    isBookmarked: true,
  },
  {
    cocktailId: 2,
    name: 'sample cocktail',
    imageUrl: 'images/슬라이더샘플.webp',
    isBookmarked: true,
  },
  {
    cocktailId: 3,
    name: 'sample cocktail',
    imageUrl: 'images/슬라이더샘플.webp',
    isBookmarked: true,
  },
  {
    cocktailId: 4,
    name: 'sample cocktail',
    imageUrl: 'images/슬라이더샘플.webp',
    isBookmarked: true,
  },
  {
    cocktailId: 5,
    name: 'sample cocktail',
    imageUrl: 'images/슬라이더샘플.webp',
    isBookmarked: true,
  },
];

export default function Ranking() {
  return (
    <Container>
      <Title>가장 핫한 레시피글만 모아봤어요!</Title>
      <ItemContainer>
        {dummyData.map((item, index) => (
          <RankingCard key={index} item={item} idx={index} />
        ))}
      </ItemContainer>
    </Container>
  );
}

const Container = tw.div`flex flex-col duration-0 text-white h-[500px] mt-[70px] w-screen max-[884px]:h-full`;
const Title = tw.div`flex flex-[1] font-bold text-2xl ml-24 max-[884px]:justify-center max-[884px]:ml-0 max-[884px]:mb-10`;
const ItemContainer = tw.div`flex flex-[10] justify-around items-center max-[884px]:flex-col max-[884px]:w-full`;
