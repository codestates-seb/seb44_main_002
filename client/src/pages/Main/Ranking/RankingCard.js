import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import tw from 'tailwind-styled-components';
import './RankingCard.css';

export default function RankingCard({ item, idx }) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative cursor-pointer">
      <Item
        className="duration-0"
        key={item.cocktailId}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onClick={() => navigate(`/detail/${item.cocktailId}`)}
        isHover={isHover}
      >
        <ImageContainer className="overflow-hidden">
          <Image
            className={`ease-in duration-300 ${
              isHover ? 'scale-110 ' : 'scale-100'
            }`}
            src={item.imageUrl}
            alt="sample"
          />
        </ImageContainer>
        <ItemText className="z-10">{item.name}</ItemText>
      </Item>
      <RankingNumber id="text-outline" isHover={isHover}>
        {idx + 1}
      </RankingNumber>
    </div>
  );
}

const Item = tw.div`flex flex-col w-[170px] max-[884px]:w-full max-[884px]:mb-8 min-[885px]:h-[220px] ${(
  props
) => (props.isHover ? `text-pointPurple-100` : `text-gray-300`)}`;
const ImageContainer = tw.div`flex-[3] relative cursor-pointer rounded-full w-full max-[884px]:rounded-none max-[884px]:w-full`;
const Image = tw.img`rounded-full h-full w-full max-[884px]:rounded-none max-[884px]:w-full`;
const ItemText = tw.div`flex flex-[1] items-center w-full font-bold max-[884px]:text-2xl`;
const RankingNumber = tw.div`absolute font-black text-7xl top-[100px] max-[884px]:hidden ${(
  props
) => (props.isHover ? `text-pointPurple-100` : `text-[#1A344A]`)}`;
