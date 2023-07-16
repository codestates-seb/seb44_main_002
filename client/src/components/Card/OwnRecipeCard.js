import { Link } from 'react-router-dom';

import tw from 'tailwind-styled-components';

export default function OwnRecipeCard({ item }) {
  return (
    <Link to={`/detail/${item.cocktailId}`}>
      <Container>
        {/* 좌측 칵테일 이미지 */}
        <ImgButton>
          <CocktailImg src={item.imageUrl} alt="칵테일 사진" />
        </ImgButton>
        {/* 우측 설명 */}
        <ContainerP>
          <Title>{item.name}</Title>
          <Content>
            <p>별점 : 4.5</p>
            <p>조회수 : 12</p>
          </Content>
        </ContainerP>
      </Container>
    </Link>
  );
}
const Container = tw.div`
flex
relative
drop-shadow-3xl
text-gray-100
cursor-pointer
opacity-70
hover:opacity-100
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
bg-black
bg-opacity-50
box-border
`;
const ContainerP = tw.div`
w-24
p-2 
ml-4 
flex 
flex-col 
items-end 
justify-between 
border-2 
border-l-0
rounded-br-2xl
`;
const Title = tw.p`
text-xl
font-bold
`;
const Content = tw.div`
flex 
flex-col 
items-end 
text-sm
`;
