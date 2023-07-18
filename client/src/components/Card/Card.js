import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateBookmark } from '../../redux/slice/userInfoSlice';
import api from '../../api/api';

import BookmarkBtn from '../BookmarkButton/BookmarkBtn';
import tw from 'tailwind-styled-components';

export default function Card({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [bookmarked, setbookmarked] = useState(item.bookmarked);

  useEffect(() => {
    setbookmarked(item.bookmarked);
    // console.log(item.bookmarked);
  }, [item]);

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };
  const handleMouseOut = () => {
    setHoveredIndex(null);
  };
  const handleBookmarkClick = async (cocktailId, item) => {
    console.log('동작');
    const id = cocktailId;
    if (!bookmarked) {
      try {
        const response = await api.createbookmarkApi(cocktailId);
      } catch (error) {
        console.log(error);
        navigate('/error');
      }
    } else {
      try {
        const response = await api.deletebookmarkApi(cocktailId);
      } catch (error) {
        console.log(error);
        //navigate('/error');
      }
    }
    dispatch(updateBookmark({ id, item }));
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
          onClick={() => handleBookmarkClick(item.cocktailId, item)}
          bookmarked={bookmarked}
          setbookmarked={setbookmarked}
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
