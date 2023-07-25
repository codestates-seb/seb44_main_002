import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import tw from 'tailwind-styled-components';
import './RankingCard.css';

export default function RankingCard({ item, idx }) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const handleError = (event) => {
    event.target.src = process.env.PUBLIC_URL + '/images/cocktail_error.jpeg';
  };

  return (
    <div className="relative cursor-pointer">
      <Item
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
            src={item.cocktailImageUrl}
            alt="sample"
            referrerPolicy="no-referrer"
            onError={handleError}
          />
        </ImageContainer>
        <ItemText className="z-10">{item.cocktailName}</ItemText>
      </Item>
      <RankingNumber id="text-outline" isHover={isHover}>
        {idx + 1}
      </RankingNumber>
    </div>
  );
}

const Item = tw.div`flex flex-col justify-center items-center w-[170px] max-[884px]:w-full max-[884px]:mb-8 min-[885px]:h-[220px] ${(
  props
) => (props.isHover ? `text-pointPurple-100` : `text-gray-300`)}`;
const ImageContainer = tw.div`flex-[3] relative cursor-pointer rounded-full w-full max-[884px]:rounded-2xl max-[884px]:w-[80%] max-[884px]:drop-shadow-lg max-[884px]:w-[300px] max-[884px]:min-h-[260px] `;
const Image = tw.img`h-full w-full object-cover max-[884px]:min-h-[260px]`;
const ItemText = tw.div`flex flex-[1] items-center w-full font-bold max-[884px]:text-2xl`;
const RankingNumber = tw.div`absolute font-black text-7xl top-[100px] max-[884px]:hidden ${(
  props
) => (props.isHover ? `text-pointPurple-100` : `text-[#1A344A]`)}`;
