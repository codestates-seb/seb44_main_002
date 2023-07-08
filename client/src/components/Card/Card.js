import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkBtn from '../BookmarkButton/BookmarkBtn';
import tw from 'tailwind-styled-components';
//item 칵테일에 대한 정보가 객체형태로 담겨있습니다.
export default function Card({ item, onClick }) {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  return (
    <Container
      onMouseOver={() => handleMouseOver(item.cocktailId)}
      onMouseOut={handleMouseOut}
      ishovering={hoveredIndex === item.cocktailId}
    >
      {/* 칵테일 이미지 */}
      <ImgButton>
        <CocktailImg
          src={item.imageUrl}
          alt="칵테일 사진"
          onClick={() => navigate(`/detail/${item.cocktailId}`)}
        />
        {/* 투명한 검은 박스 */}
        <Hoverocktail ishovering={hoveredIndex === item.cocktailId} />
        {/* 북마크 */}
        <BookmarkBtn
          onClick={onClick}
          isBookmarked={item.isBookmarked}
          size="w-[20px] h-[30px]"
          absolute="true"
          top="top-0"
          right="right-2"
        />
      </ImgButton>
      {/* 하단 칵테일이름 */}
      <Title>{item.name}</Title>
    </Container>
  );
}
const Container = tw.div`
relative 
w-[11.25rem]
h-[15rem] 
${(props) => (props.ishovering ? `text-gray-100` : `text-gray-200 `)}
drop-shadow-3xl

`;

const ImgButton = tw.button`
w-[11.25rem]
h-[12.5rem] 
rounded-tl-2xl 
rounded-br-2xl 
box-border
 `;
const CocktailImg = tw.img`
w-[11.25rem]
 h-[12.5rem] 
  rounded-tl-2xl 
  rounded-br-2xl  
  bg-black 
bg-opacity-50
  box-border
`;
const Hoverocktail = tw.div`
absolute  top-0 right-0
w-[11.25rem]
 h-[12.5rem] 
  rounded-tl-2xl 
  rounded-br-2xl  
  bg-black 
bg-opacity-50
  box-border
  ${(props) => (props.ishovering ? `hidden` : ``)}
`;
const Title = tw.h3`
text-xl
font-bold
`;
