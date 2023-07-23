import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../hook/useLogout';

import ImageModal from './ImgaeModal';
import RecipeApi from '../../api/RecipeApi';
import { ALERT_MESSAGE } from '../../constants/constants';

import tw from 'tailwind-styled-components';
import { PiUserCircleFill } from 'react-icons/pi';

export default function RecipeInfo({
  cocktailDetail,
  getTime,
  isLogin,
  localData,
}) {
  const navigate = useNavigate();
  const logout = useLogout();

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const deleteRecipe = async () => {
    try {
      const response = await RecipeApi.deleteCocktails(
        cocktailDetail.cocktailId
      );
      if (response === 401) {
        alert(ALERT_MESSAGE.TOKEN_OVER);
        logout();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modifyScore = async (score2) => {
    try {
      const response = await RecipeApi.modifyRate(
        cocktailDetail.cocktailId,
        score2
      );
      if (response === 401) {
        alert(ALERT_MESSAGE.TOKEN_OVER);
        logout();
        return;
      }
      const json = await response.json();
      setTotal(json.rating);
    } catch (error) {
      console.log(error);
    }
  };

  const changeScore = (idx) => {
    // 로그인 여부 확인
    if (localData.userId === cocktailDetail.userId) {
      alert(ALERT_MESSAGE.RATE_OWN_RECIPE);
      return;
    }
    if (isLogin) {
      setScore(idx + 1);
      modifyScore(idx + 1);
    } else {
      alert(ALERT_MESSAGE.LOGIN_FIRST);
    }
  };
  const deletePost = () => {
    // 삭제
    if (window.confirm(ALERT_MESSAGE.DOUBLE_CHECK_DELETE)) {
      alert(ALERT_MESSAGE.DELETE);
      deleteRecipe();
      navigate('/category');
    }
  };

  const copyToClipBoard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert(ALERT_MESSAGE.PATH_CLIPBOARD);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const encodingUrl = (liquor) => {
    const baseurl =
      'https://pocketcu.co.kr/search/stock/product/main?searchWord=';
    return encodeURI(baseurl + liquor);
  };

  const DrawStar = () => {
    const repetitions = 5;
    const star = process.env.PUBLIC_URL + '/images/star.webp';
    const selectedStar = process.env.PUBLIC_URL + '/images/star_selected.webp';
    return (
      <DrawStarContainer>
        <StarP>자신이 부여한 평점</StarP>
        <FlexContainer>
          {Array.from({ length: repetitions }, (_, index) => (
            <StarIcon
              key={index}
              src={index < score ? selectedStar : star}
              onClick={() => changeScore(index)}
              alt="star"
            />
          ))}
        </FlexContainer>
      </DrawStarContainer>
    );
  };

  useEffect(() => {
    setScore(cocktailDetail.userRate);
  }, [cocktailDetail]);

  return (
    <InfoContainer>
      <ImageModal imageUrl={cocktailDetail.imageUrl} />
      <InfoRightContainer>
        <StarCotiner>
          <DrawStar />
          <ModifyContainer>
            {(localData.IsAdmin ||
              cocktailDetail.userId === localData.userId) && (
              <>
                <Link to={`/cocktail/${cocktailDetail.cocktailId}`}>
                  <ModifyP>수정하기</ModifyP>
                </Link>
                <Separator></Separator>
                <ModifyP onClick={deletePost}>삭제하기</ModifyP>
                <Separator></Separator>
              </>
            )}
            <button onClick={copyToClipBoard}>
              <ModifyP>주소복사</ModifyP>
            </button>
          </ModifyContainer>
        </StarCotiner>
        <TitleContainer>
          <InfoTitle>{cocktailDetail.name}</InfoTitle>
          <StarAverage>{`별점 평균 : ${
            total === 0 ? cocktailDetail.rating : total
          }`}</StarAverage>
        </TitleContainer>
        <UserContainer>
          <WriterInfo>
            {cocktailDetail.activeUserWritten ? (
              cocktailDetail.userId === 1 ? (
                <FlexContainer>
                  <PiUserCircleFill size="24px" />
                  <NameP>관리자</NameP>
                </FlexContainer>
              ) : (
                <Link to={`/userpage/${cocktailDetail.userId}`}>
                  <FlexContainer>
                    <PiUserCircleFill size="24px" />
                    <NameP>{cocktailDetail.userName}</NameP>
                  </FlexContainer>
                </Link>
              )
            ) : (
              <FlexContainer>
                <PiUserCircleFill size="24px" />
                <NameP>탈퇴한 유저입니다.</NameP>
              </FlexContainer>
            )}
            <p className="mt-1 text-[10px]">
              {getTime(cocktailDetail.modifiedAt)}
            </p>
          </WriterInfo>
          <LinkToCU href={encodingUrl(cocktailDetail.liquor)} target="_blank">
            <img
              src={process.env.PUBLIC_URL + '/images/btn_cu.webp'}
              alt="편의점 앱으로 이동"
              width={'160px'}
            />
          </LinkToCU>
        </UserContainer>
        <RecipeContiner>
          <RecipeHeader>
            <p>재료</p>
            <RecipeHr />
          </RecipeHeader>
          <RecipeList>
            {cocktailDetail.ingredients.map((ele) => {
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
const InfoRightContainer = tw.section`
ml-8
w-full
max-md:ml-0
max-md:mt-4
`;
const StarCotiner = tw.section`
flex
flex-wrap-reverse
justify-between
text-xl
max-lg:flex-col-reverse
`;
const StarIcon = tw.img`
mr-1
cursor-pointer
`;
const DrawStarContainer = tw.div`
flex
flex-col
max-lg:items-start 
`;
const StarP = tw.p`
mb-1
text-gray-300 
text-xs
`;
const StarAverage = tw.p`
ml-1
text-yellow-400 
text-xs
max-lg:ml-0
max-lg:mt-2
max-md:ml-2
`;
const ModifyContainer = tw.div`
flex
flex-wrap
items-start
text-white
text-xs
max-lg:mb-2
max-lg:justify-end
`;
const ModifyP = tw.p`
ml-2
cursor-pointer
hover:text-pointPurple-100
`;
const Separator = tw.div`
ml-2
h-4
border-r-[1px]
border-white
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
const NameP = tw.p`
mt-0.5
ml-0.5 
mr-2.5 
text-sm
`;
const WriterInfo = tw(FlexWrapContainer)`
mb-2
mr-2
`;
const LinkToCU = tw.a`
flex
items-center
justify-end
text-gray-300
hover:text-pointPurple-100
text-xs
`;
const RecipeContiner = tw.div`
mt-5
pb-4
text-xs
border-b-[1px]
border-[#7b7b7b]/50
max-md:pb-0
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
w-[calc(100%-31px)]
`;
const RecipeList = tw.div`
text-[#b3b3b3]
h-[calc(20rem-185px)]
overflow-y-auto
scrollbar
max-md:h-full
`;
const RecipeEle = tw.p`
mb-2.5
hover:text-pointPurple-100
`;
