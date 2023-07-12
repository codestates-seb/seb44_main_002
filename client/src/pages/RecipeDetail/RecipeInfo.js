import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import tw from 'tailwind-styled-components';

import { BsArrowRightShort } from 'react-icons/bs';
import { MdIosShare } from 'react-icons/md';
import { PiUserCircleFill } from 'react-icons/pi';

export default function RecipeInfo({ cocktailDetail }) {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const urlCu = encodeURI(
    `https://pocketcu.co.kr/search/stock/product/main?searchWord=${cocktailDetail.liquor}`
  );

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('현재 주소가 클립보드에 복사되었습니다.');
  };
  const changeScore = (idx) => {
    // 로그인 여부 확인
    setScore(idx);
  };
  const deletePost = () => {
    // 삭제
    navigate('/category');
  };

  const DrawStar = () => {
    const repetitions = 5;
    const star = process.env.PUBLIC_URL + '/images/star.webp';
    const selectedStar = process.env.PUBLIC_URL + '/images/star_selected.webp';
    return (
      <DrawStarContainer>
        <FlexContainer>
          {Array.from({ length: repetitions }, (_, index) => (
            <StarIcon
              key={index}
              src={index - 1 < score ? selectedStar : star}
              onClick={() => changeScore(index)}
              alt="star"
            />
          ))}
        </FlexContainer>
        <StarAverage>{`평균 : ${cocktailDetail.rating}`}</StarAverage>
      </DrawStarContainer>
    );
  };

  return (
    <InfoContainer>
      <InfoImage
        src="https://2bob.co.kr/data/recipe/20210707095408-69BNH.jpg"
        alt="와인사진"
      />
      <InfoRightContainer>
        <StarCotiner>
          <DrawStar num={1} />
          {cocktailDetail.userId === 1 && (
            <ModifyContainer>
              <Link to={`/modifyPost/${cocktailDetail.cocktailId}`}>
                <ModifyP>수정하기</ModifyP>
              </Link>
              <Separator>|</Separator>
              <ModifyP onClick={deletePost}>삭제하기</ModifyP>
            </ModifyContainer>
          )}
        </StarCotiner>
        <TitleContainer>
          <InfoTitle>체리주</InfoTitle>
          <ShareContainer onClick={copyToClipBoard}>
            <p>공유하기</p>
            <MdIosShare />
          </ShareContainer>
        </TitleContainer>
        <UserContainer>
          <FlexWrapContainer>
            <FlexContainer>
              <PiUserCircleFill size="24px" />
              <NameP>{cocktailDetail.name}</NameP>
            </FlexContainer>
            <p className="mt-1 text-[10px]">{cocktailDetail.createdAt}</p>
          </FlexWrapContainer>
          <LinkToCU href={urlCu} target="_blank">
            <LinkToCUP>편의점 앱으로 이동</LinkToCUP> <BsArrowRightShort />
          </LinkToCU>
        </UserContainer>
        <RecipeContiner>
          <RecipeHeader>
            <p>재료</p>
            <RecipeHr />
          </RecipeHeader>
          <RecipeList>
            {cocktailDetail.Ingredients.map((ele) => {
              return (
                <RecipeEle key={ele.ingredient}>{ele.ingredient}</RecipeEle>
              );
            })}
          </RecipeList>
        </RecipeContiner>
      </InfoRightContainer>
    </InfoContainer>
  );
}
const FlexContainer = tw.div`
flex
`;
const FlexWrapContainer = tw.div`
flex 
flex-wrap
`;
const InfoContainer = tw.section`
flex
max-md:flex-col
`;
const InfoImage = tw.img`
w-80
rounded-[0.625rem]
`;
const InfoRightContainer = tw.section`
ml-8
w-full
max-md:ml-0
max-md:mt-4
`;
const StarCotiner = tw.section`
flex
justify-between
text-xl
max-lg:flex-col
`;
const StarIcon = tw.img`
mr-1
cursor-pointer
`;
const DrawStarContainer = tw.div`
flex 
items-end 
max-lg:flex-col 
max-lg:items-start 
max-md:flex-row
`;
const StarAverage = tw.p`
ml-4 
text-yellow-400 
text-xs
max-lg:ml-0
max-lg:mt-2
max-md:ml-2
`;
const ModifyContainer = tw.div`
flex
text-gray-300 
text-xs
max-lg:mt-2
`;
const ModifyP = tw.p`
cursor-pointer
hover:text-white
`;
const Separator = tw.p`
mx-2
`;
const TitleContainer = tw.div`
flex 
flex-wrap 
items-end
`;
const UserContainer = tw.div`
flex 
flex-wrap 
mt-6 
justify-between 
text-sm 
text-gray-100
`;
const InfoTitle = tw.p`
mt-5
mr-4
text-3xl
text-gray-100
font-bold
`;
const ShareContainer = tw.div`
flex 
h-6 
ml-4 
px-2 
py-1 
text-xs 
text-gray-200 
items-center 
bg-gray-300 
rounded-full
cursor-pointer
hover:text-gray-300
hover:bg-white
max-lg:ml-0
max-lg:mt-2
`;
const NameP = tw.p`
mt-0.5
ml-0.5 
mr-2.5 
text-sm
`;
const LinkToCU = tw.a`
flex
items-center
justify-end
text-gray-300
hover:text-pointPurple-100
text-xs
`;
const LinkToCUP = tw.p`
cursor-pointer
`;
const RecipeContiner = tw.div`
mt-5
pb-4
text-xs
border-b-[1px]
border-[#7b7b7b]/50
`;
const RecipeHeader = tw.div`
flex
mb-2.5
text-[#7b7b7b]
font-bold
items-center
`;
const RecipeHr = tw.hr`
ml-2 
border-1 
border-solid 
border-[#7b7b7b]/50
w-[calc(100%-30px)]
`;
const RecipeList = tw.div`
text-[#b3b3b3]
h-[calc(20rem-185px)]
overflow-y-scroll
scrollbar
`;
const RecipeEle = tw.p`
mb-2.5
`;
