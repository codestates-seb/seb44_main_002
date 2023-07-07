import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import tw from 'tailwind-styled-components';

const dummyData = [
  {
    cocktailId: 1,
    name: 'sample cocktail',
    imageUrl: 'images/슬라이더샘플.jpg',
    isBookmarked: true,
  },
  {
    cocktailId: 2,
    name: 'sample cocktail',
    imageUrl: 'images/슬라이더샘플.jpg',
    isBookmarked: true,
  },
  {
    cocktailId: 3,
    name: 'sample cocktail',
    imageUrl: 'images/슬라이더샘플.jpg',
    isBookmarked: true,
  },
  {
    cocktailId: 4,
    name: 'sample cocktail',
    imageUrl: 'images/슬라이더샘플.jpg',
    isBookmarked: true,
  },
  {
    cocktailId: 5,
    name: 'sample cocktail',
    imageUrl: 'images/슬라이더샘플.jpg',
    isBookmarked: true,
  },
];

export default function Ranking() {
  const navigate = useNavigate();

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  return (
    <Container>
      <Title>가장 핫한 레시피글만 모아봤어요!</Title>
      <ItemContainer>
        {dummyData.map((item, index) => (
          <Item
            key={item.cocktailId}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
            isHovering={hoveredIndex === index}
            onClick={() => navigate(`/detail/${item.cocktailId}`)}
          >
            <ImageContainer>
              <Image src={item.imageUrl} alt="sample" />
              <RankingNumber>{index + 1}</RankingNumber>
            </ImageContainer>
            <ItemText>{item.name}</ItemText>
          </Item>
        ))}
      </ItemContainer>
    </Container>
  );
}

const Container = tw.div`flex flex-col text-white h-[500px] mt-[70px] w-screen max-[884px]:h-full`;
const Title = tw.div`flex flex-[1] font-bold text-2xl ml-24 max-[884px]:justify-center max-[884px]:ml-0 max-[884px]:mb-10`;
const ItemContainer = tw.div`flex flex-[10] justify-around items-center max-[884px]:flex-col max-[884px]:w-full`;
const Item = tw.div`flex flex-col w-[170px] max-[884px]:w-full max-[884px]:mb-8 min-[885px]:h-[220px] ${(
  props
) => (props.isHovering ? `text-pointPurple-100` : `text-gray-300`)}`;
const ImageContainer = tw.div`flex-[3] relative cursor-pointer rounded-full w-full max-[884px]:rounded-none max-[884px]:w-full`;
const Image = tw.img`rounded-full h-full w-full max-[884px]:rounded-none max-[884px]:w-full`;
const ItemText = tw.div`flex flex-[1] items-center w-full font-bold max-[884px]:text-2xl`;
const RankingNumber = tw.div`absolute font-extrabold text-7xl top-[100px] max-[884px]:hidden`;
