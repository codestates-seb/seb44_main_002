import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CategoryFilter, sortTypeData } from '../../common/Data';
import { useLogout } from '../../hook/useLogout';
import useFilterurl from '../../components/FIlterUrl/Filterurl';

import Card from '../../components/Card/Card';
import SkeletonCard from '../../components/Card/SkeletonCard';
import Filter from './Filter';
import HoverButton from '../../common/Buttons/HoverButton';
import Pagination2 from '../../components/Pagination/Pagination2';

import tw from 'tailwind-styled-components';
import api from '../../api/api';
import { PATH, ALERT_MESSAGE, TOTAL_PAGE } from '../../constants/constants';

// 페이지네이션 추가
export default function Category() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  const logout = useLogout();

  //리덕스 임시 저장
  const isLogin = useSelector((state) => state.isLogin.isLogin);

  //선택된 카테고리조건 (카테고리&태그&정렬)
  const [filterCondtion, setFilterCondtion] = useState({
    category: CategoryFilter[0].type,
    frequencyTag: null,
    tasteTag: [],
    descendingOrder: true,
    sortType: sortTypeData[0].type,
  });

  //현재 페이지 인덱스
  const [currentPage, setCurrentPage] = useState(0);
  const [cocktailData, setCocktailData] = useState([]);
  const [dataInfo, setDataInfo] = useState({
    totalCount: 0,
    totalPages: 0,
  });
  //console.log(dataInfo);
  //에러처리
  const [errormsg, setErrormsg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const useSkeleton = () => {
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  };

  useEffect(() => {
    setCurrentPage(0);
    useSkeleton();
    const fetchCocktails = async () => {
      const url = useFilterurl(BASE_URL, currentPage, filterCondtion);

      try {
        const response = await api.getfilter(url);
        if (response === 401) {
          alert(`${ALERT_MESSAGE.TOKEN_OVER}`);
          logout();
          return;
        }
        const data = await response.json();
        //console.log(data.data);
        setCocktailData(data.data);
        setErrormsg(null);
        const dataAmount = data.data.length;
        setDataInfo({
          totalCount: dataAmount,
          totalPages: Math.ceil(dataAmount / TOTAL_PAGE.COCKTAIL_PER_PAGE),
        });
        if (data.length === 0) {
          setErrormsg(`${ALERT_MESSAGE.SUCCESS_NULL}`);
        }
        return data;
      } catch (error) {
        console.error('Error:', error);
        setErrormsg(`${ALERT_MESSAGE.ERROR}`);
      }
    };

    fetchCocktails();
  }, [filterCondtion]);

  // 필터 변경하면 현재 페이지를 다시 1로 변경합니다.
  useEffect(() => {
    useSkeleton();
  }, [currentPage]);

  return (
    <DivContainer>
      <Container>
        {/* 배경 음표 */}
        {/* <BackgroundImg /> */}
        <img
          src="/images/background/music-dynamic-gradient.png"
          alt="음표"
          className="absolute top-0 right-[-400px] pointer-events-none"
        />
        {/* 배경 왕별 */}
        <img
          src="/images/background/star-dynamic-gradient.png"
          alt="별"
          className="absolute bottom-[-400px] right-[900px] pointer-events-none"
        />
        {/* 가운데정렬을 위한 block */}
        <Main>
          {/* 레시피 등록 버튼 */}
          <PostButtonContainer>
            {/* 등록버튼 더 강조해서 css 하기 -> border-gradient border border-solid from-red-500 to-yellow-500 */}
            <HoverButton
              size="w-[15.6rem] h-[60px] max-[990px]:w-[10rem] max-[700px]:w-[8rem] max-[700px]:h-[40px] "
              className="absolute bottom-0 right-0"
              radius="rounded-[30px]"
              color="text-[#BB40F1] bg-transparent"
              fontSize="max-[990px]:text-sm max-[700px]:text-xs max-[500px]:text-[10px]"
              borderColor="border-[#BB40F1] "
              hoverColor="hover:text-[#BB40F1] hover:bg-[#F0F0F0]"
              onClick={() =>
                isLogin
                  ? navigate(`${PATH.COCKTAIL_PAGE}`)
                  : alert(`${ALERT_MESSAGE.LOGIN_FIRST}`)
              }
            >
              나만의 레시피 등록하기
            </HoverButton>
          </PostButtonContainer>

          <Section>
            {/* 필터 */}
            <Filter
              id="filter"
              setFilterCondtion={setFilterCondtion}
              filterCondtion={filterCondtion}
              setCurrentPage={setCurrentPage}
            />
            {/* 필터에 따라 출력되는 데이터 */}
            <CardContainer>
              {cocktailData
                .slice(
                  currentPage * TOTAL_PAGE.COCKTAIL_PER_PAGE,
                  (currentPage + 1) * TOTAL_PAGE.COCKTAIL_PER_PAGE
                )
                .map((item, index) =>
                  isLoaded ? (
                    <Card
                      item={item}
                      className="pr-4"
                      key={index + 1}
                      data={cocktailData}
                      setData={setCocktailData}
                    />
                  ) : (
                    <SkeletonCard key={index + 1} />
                  )
                )}
            </CardContainer>
            {/* 에러메시지 */}
            {errormsg && <ErrorMessage>{errormsg}</ErrorMessage>}
            {/* 페이지네이션 */}
            <PaginationContainer>
              {dataInfo && (
                <>
                  {dataInfo.totalCount > TOTAL_PAGE.COCKTAIL_PER_PAGE && (
                    <>
                      <Pagination2
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPage={dataInfo.totalPages}
                      />
                    </>
                  )}
                </>
              )}
            </PaginationContainer>
          </Section>
        </Main>
      </Container>
    </DivContainer>
  );
}
const DivContainer = tw.div`overflow-hidden`;

const Container = tw.div`
relative
bg-gradient-to-r 
from-gradi-to 
to-gradi-from
w-screen
h-100% 
pt-[10rem]
flex 
justify-center 
`;
const Main = tw.main`
w-[55rem] 
max-[990px]:w-[40rem] 
max-[700px]:w-[30rem] 
max-[500px]:w-[20rem]
animate-fadeInDown1
`;
const PostButtonContainer = tw.div`
flex justify-end pb-5
`;

const Section = tw.section`
border-1 border-solid border-red
`;
const CardContainer = tw.div`
w-[100%]   
grid grid-cols-4 
gap-10 
mb-[100px] 
max-[990px]:grid-cols-3 
max-[700px]:flex 
max-[700px]:justify-between 
max-[700px]:flex-wrap 
max-[500px]:flex 
max-[500px]:justify-center 
max-[500px]:flex-wrap `;

const ErrorMessage = tw.p`
text-error mb-4`;

const PaginationContainer = tw.div`
flex justify-center mb-[100px] gap-2
`;
