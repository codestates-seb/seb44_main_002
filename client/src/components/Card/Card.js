import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateBookmark } from '../../redux/slice/userInfoSlice';
import BookmarkBtn from '../BookmarkButton/BookmarkBtn';
import tw from 'tailwind-styled-components';
{
  /* 사용법
  <Card
  item={item}
  onClick={() => handleBookmarkClick(item.cocktailId, item)}
/>; */
}
//item 칵테일에 대한 정보가 객체형태로 담겨있습니다.
export default function Card({ item, data, setData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };
  const handleBookmarkClick = (cocktailId, item) => {
    console.log('동작');
    const id = cocktailId;
    dispatch(updateBookmark({ id, item }));

    const newDate = data.map((el, idx) => {
      const isBookmarked = el.isBookmarked;
      //console.log(isBookmarked);
      if (el.cocktailId === item.cocktailId) {
        return { ...el, isBookmarked: !isBookmarked };
      }
      return el;
    });
    setData(newDate);
    // /cocktails/{cocktail-id}/bookmark
    // const handleBookmark = () => {
    //   fetch(`/cocktails/${item.cocktailId}/bookmark`, {
    //     method: 'POST',
    //     // 필요한 경우 헤더 등을 설정하세요.
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error('Bookmarking failed.'); // 요청이 실패한 경우 에러 처리
    //       }
    //       // 요청이 성공한 경우 추가적인 작업을 수행할 수 있습니다.
    //     })
    //     .catch((error) => {
    //       console.error(error); // 에러 처리
    //     });
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
