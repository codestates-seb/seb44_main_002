import { Link } from 'react-router-dom';

import tw from 'tailwind-styled-components';

export default function OwnRecipeCard({ item }) {
  const handleError = (event) => {
    event.target.src = process.env.PUBLIC_URL + '/images/cocktail_error.jpeg';
  };
  return (
    <Link to={`/detail/${item.cocktailId}`}>
      <Container>
        {/* 좌측 칵테일 이미지 */}
        <ImgButton>
          <CocktailImg
            src={item.imageUrl}
            alt="칵테일 사진"
            onError={handleError}
          />
        </ImgButton>
        {/* 우측 설명 */}
        <ContainerP>
          <Title>{item.name}</Title>
          <Content>
            <ContentP>{'별점 : ' + item.userRate}</ContentP>
            <ContentP>{'조회수 : ' + item.viewCount}</ContentP>
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
max-sm:w-36
max-sm:h-40
 `;
const CocktailImg = tw.img`
w-[11.25rem]
h-[12.5rem]
object-cover
rounded-tl-2xl
bg-black
bg-opacity-50
box-border
max-sm:w-36
max-sm:h-40
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
w-full
text-xl
font-bold
truncate
max-sm:text-lg
`;
const Content = tw.div`
flex 
flex-col 
w-full
items-end 
text-sm
`;
const ContentP = tw.p`
w-full
truncate
`;
