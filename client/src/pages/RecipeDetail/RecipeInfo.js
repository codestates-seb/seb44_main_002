import tw from 'tailwind-styled-components';
import { BsArrowRightShort } from 'react-icons/bs';
import { MdIosShare } from 'react-icons/md';

export default function RecipeInfo({ cocktailDetail, recipeList }) {
  const urlCu = encodeURI(
    `https://pocketcu.co.kr/search/stock/product/main?searchWord=${cocktailDetail.liquor}`
  );

  const CopyToClipBoard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('현재 주소가 클립보드에 복사되었습니다.');
  };

  const DrawStar = ({ num = 1 }) => {
    const repetitions = 5;
    const star = process.env.PUBLIC_URL + '/images/star.png';
    const selectedStar = process.env.PUBLIC_URL + '/images/star_selected.png';
    return (
      <div className="flex items-end">
        {Array.from({ length: repetitions }, (_, index) => (
          <StarIcon
            key={index}
            src={index < num ? selectedStar : star}
            alt="star"
          />
        ))}
        <StarAverage>{`평균 : ${cocktailDetail.rating}`}</StarAverage>
      </div>
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
          <div className="flex text-gray-300 text-xs">
            <ModifyP>수정하기</ModifyP>
            <p>|</p>
            <ModifyP>삭제하기</ModifyP>
          </div>
        </StarCotiner>
        <div className="flex items-end">
          <InfoTitle>체리주</InfoTitle>
          <ShareContainer onClick={CopyToClipBoard}>
            <p>공유하기</p>
            <MdIosShare />
          </ShareContainer>
        </div>
        <div className="flex items-end">
          <p className="text-sm text-gray-300 w-20">{cocktailDetail.name}</p>
          <LinkToCU href={urlCu} target="_blank">
            <LinkToCUP>편의점 앱으로 이동</LinkToCUP> <BsArrowRightShort />
          </LinkToCU>
        </div>
        <RecipeContiner>
          <RecipeHeader>
            <p>재료</p>
            <RecipeHr />
          </RecipeHeader>
          <RecipeList>
            {recipeList.map((ele) => {
              return <RecipeEle key={ele}>{ele}</RecipeEle>;
            })}
          </RecipeList>
        </RecipeContiner>
      </InfoRightContainer>
    </InfoContainer>
  );
}

const InfoContainer = tw.section`
flex
`;
const InfoImage = tw.img`
w-80
rounded-[0.625rem]
`;
const InfoRightContainer = tw.section`
ml-8
w-full
`;
const StarCotiner = tw.section`
flex
justify-between
text-xl
`;
const StarIcon = tw.img`
mr-1
`;
const StarAverage = tw.p`
ml-4 
text-yellow-400 
text-xs
`;
const ModifyP = tw.p`
mx-2
cursor-pointer
hover:text-white
`;
const InfoTitle = tw.p`
mt-5
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
items-end 
bg-gray-300 
rounded-full
cursor-pointer
hover:text-gray-300
hover:bg-white
`;
const LinkToCU = tw.a`
flex
w-full
mt-6
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
mt-7
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
`;
const RecipeEle = tw.p`
mb-2.5
`;
