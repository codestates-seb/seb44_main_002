import { Link } from 'react-router-dom';

import tw from 'tailwind-styled-components';

import { BsArrowRightShort } from 'react-icons/bs';
import { MdIosShare } from 'react-icons/md';
import Card from '../../components/Card/Card';

export default function RecipeDetail() {
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
  const DrawBookmark = ({ isSelected = 1 }) => {
    const bookmark = process.env.PUBLIC_URL + '/images/bookmark.png';
    const selectedMookmark =
      process.env.PUBLIC_URL + '/images/bookmark_selected.png';
    return (
      <img src={isSelected ? bookmark : selectedMookmark} alt="bookmark" />
    );
  };
  return (
    <>
      <Background>
        <Container>
          <BookmarkIcon>
            <DrawBookmark />
          </BookmarkIcon>
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
                <p className="text-sm text-gray-300 w-20">
                  {cocktailDetail.name}
                </p>
                <LinkToCU href={urlCu} target="_blank">
                  <LinkToCUP>편의점 앱으로 이동</LinkToCUP>{' '}
                  <BsArrowRightShort />
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
          <ProcessContainer>
            <ProcessHeader>
              <p>제조과정</p>
              <ProcessHr />
            </ProcessHeader>
            {cocktailDetail.recipe.map((ele, idx) => {
              return (
                <ProcessP key={idx}>
                  <ProcessNum>{idx + 1}</ProcessNum>
                  <p>{ele}</p>
                </ProcessP>
              );
            })}
          </ProcessContainer>
          <CommunityContainer>
            <CommunityHeader>댓글을 작성해보세요!</CommunityHeader>
            <InputContainer>
              <InputTextArea placeholder="댓글을 입력하세요." />
              <InputButton>전송하기</InputButton>
            </InputContainer>
            <div>
              {cocktailDetail.comments.map((ele) => {
                return (
                  <>
                    <CommentContainer key={ele.userId}>
                      <div>
                        <CommentWriter>{ele.name}</CommentWriter>
                        <CommentContent>{ele.content}</CommentContent>
                        <CommentDate>{ele.date}</CommentDate>
                      </div>
                      {ele.userId === 3 ? (
                        <div>
                          <CommentButton>삭제하기</CommentButton>
                          <CommentButton>수정하기</CommentButton>
                          <CommentButton>답변하기</CommentButton>
                        </div>
                      ) : (
                        <CommentButton>답변하기</CommentButton>
                      )}
                    </CommentContainer>
                    {ele.replies.map((rp) => {
                      return (
                        <ReplyContainer key={rp.userId}>
                          <div>
                            <CommentWriter>{rp.name}</CommentWriter>
                            <CommentContent>
                              {'@' + rp.taggedUserName + ' ' + rp.content}
                            </CommentContent>
                            <CommentDate>{rp.date}</CommentDate>
                          </div>
                          <CommentButton>답변하기</CommentButton>
                        </ReplyContainer>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </CommunityContainer>
          <RecommendContainer>
            <RecommentP>이런 칵테일은 어떠세요?</RecommentP>
            <CardContainer>
              {cocktailDetail.recommends.map((ele) => {
                const item = {
                  itemid: ele.cocktailId,
                  img: ele.imageUrl,
                  title: ele.name,
                };
                return (
                  <Link to={`/detail/${ele.cocktailId}`} key={ele.cocktailId}>
                    <Card item={item} isBookmarked={ele.isBookmarked} />
                  </Link>
                );
              })}
            </CardContainer>
          </RecommendContainer>
        </Container>
      </Background>
    </>
  );
}

const Background = tw.div`
bg-gradient-to-r 
from-gradi-to
to-gradi-from
px-12
py-52
w-full
`;
const Container = tw.main`
relative
mx-auto
px-[4.6875rem]
py-32
w-[80vw]
bg-[#000000]/40
rounded-ss-[3.125rem]
rounded-ee-[3.125rem]
`;
const BookmarkIcon = tw.div`
absolute
top-0 right-14
text-7xl
cursor-pointer
`;
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
const ProcessContainer = tw.div`
mt-14
pb-4
text-[#7b7b7b]
text-xs
border-b-[1px]
border-[#7b7b7b]/50
`;
const ProcessHeader = tw.div`
flex
items-center
`;
const ProcessHr = tw.hr`
ml-2 
border-1 
border-solid 
border-[#7b7b7b]/50
w-[calc(100%-53px)]
`;
const ProcessP = tw.div`
flex
mt-2
hover:text-pointPurple-100
`;
const ProcessNum = tw.p`
flex
items-center
mr-2
px-1
py-0.5
border-[1px] 
border-[#7b7b7b]/50
h-5
text-[10px]
`;
const CommunityContainer = tw.div`
mt-24
`;
const CommunityHeader = tw.p`
text-xl 
text-gray-200 
text-center
font-bold 
`;
const InputContainer = tw.div`
flex 
p-4 
my-5 
border-[1px] 
border-gray-300/50 
text-xs 
text-gray-200 
items-end
`;
const InputTextArea = tw.textarea`
h-24 
w-[calc(100%-100px)]
bg-transparent 
`;
const InputButton = tw.button`
h-8 
w-20 
ml-6
pb-0.5 
border-[1px] 
border-gray-400
rounded-md  
inline-block 
text-gray-400
hover:text-pointPurple-100
hover:border-pointPurple-100
`;
const CommentContainer = tw.div`
flex
items-end
justify-between
py-3
border-b-[1px]
border-gray-300/50
`;
const CommentWriter = tw.p`
text-gray-200 
text-xs
`;
const CommentContent = tw.p`
text-gray-100
text-sm
`;
const CommentDate = tw.p`
mt-1.5
text-gray-200 
text-xs
`;
const ReplyContainer = tw(CommentContainer)`
ml-12
`;
const CommentButton = tw.button`
w-13
h-7
ml-2
border-[1px]
border-gray-400
rounded-md
text-xs
text-gray-400
px-2
hover:text-white
hover:border-white
`;
const RecommendContainer = tw.div`
mt-24
`;
const RecommentP = tw.p`
text-xl
text-gray-200
font-bold
text-center
`;
const CardContainer = tw.div`
flex
justify-around
mt-14
`;

const recipeList = [
  'Light rum',
  'Lime',
  'Sugar',
  'Mint',
  'Soda water',
  'Tonic water',
  'Tonic water',
  'Tonic water',
];
const cocktailDetail = {
  cocktailId: 1,
  name: 'sample',
  imageUrl: 'sample image url',
  liquor: '럼',
  Ingredients: [
    {
      ingredient: '설탕',
    },
    {
      ingredient: '레몬즙',
    },
  ],
  recipe: [
    `Pour the rum and top with soda water.`,
    'Pour the rum and top with soda water.with soda water.',
    'Pour the rum and top with soda water.Pour the rum and top with soda water.',
    'Pour the rum and top with soda water.',
    'Pour he rum and top with soda water. with soda water with soda water',
    'Pour the rum and top with soda water.',
  ],
  tags: [
    {
      tag: 'value',
    },
  ],
  rating: 4.5,
  comments: [
    {
      userId: 2,
      name: 'kim',
      content: '깔끔하고 맛있네요!',
      date: '2023-02-16',
      replies: [
        {
          userId: 3,
          name: 'chan',
          content: '저도 그렇게 생각합니다!',
          taggedUserId: 2,
          taggedUserName: 'kim',
          date: '2023-02-16',
        },
      ],
    },
    {
      userId: 3,
      name: 'chan',
      content: '그놈은 멋있었다...백엔드는 멋있었다.',
      date: '2023-02-16',
      replies: [
        {
          userId: 4,
          name: 'jae',
          content: '백엔드는 멋있다.',
          taggedUserId: 3,
          taggedUserName: 'kim',
          date: '2023-02-16',
        },
        {
          userId: 5,
          name: 'euni',
          content: '이제 아셨습니까. 휴면',
          taggedUserId: 4,
          taggedUserName: 'kim',
          date: '2023-02-16',
        },
      ],
    },
  ],
  recommends: [
    {
      cocktailId: 1,
      name: '라떼 밀크주',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210707094952-WOE78.jpg',
      isBookmarked: true,
    },
    {
      cocktailId: 2,
      name: '논알콜 청포도 모히토',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210706172910-2B1WD.jpg',
      isBookmarked: false,
    },
    {
      cocktailId: 3,
      name: '시트러스 주스',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210706173724-7B5QW.jpg',
      isBookmarked: true,
    },
  ],
  isBookmarked: 'true',
};
