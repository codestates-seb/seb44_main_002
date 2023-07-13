import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//북마크 기능 추가 페이지네이션 추가
import {
  CategoryFilter,
  tagFrequencyData,
  sortTypeData,
} from '../../common/Data';

import Card from '../../components/Card/Card';
import Filter from './Filter';
import HoverButton from '../../common/Buttons/HoverButton';
// import Pagination from '../../components/Pagination/Pagination';
import useFilterurl from '../../components/FIlterUrl/Filterurl';

import tw from 'tailwind-styled-components';

export default function Category() {
  //배포이후 baseUrl
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //리덕스 임시 저장
  // const bookmarkList = useSelector((state) => state.userinfo.bookmarked);
  //선택된 카테고리조건 (카테고리&태그&정렬)
  const [filterCondtion, setFilterCondtion] = useState({
    category: CategoryFilter[0].type,
    frequencyTag: tagFrequencyData[0].type,
    tasteTag: [],
    descendingOrder: true,
    sortType: sortTypeData[0].type,
  });

  //현재 페이지 인덱스
  const [currentPage, setCurrentPage] = useState(0);
  const [cocktailData, setCocktailData] = useState([]);
  const [obj, setObj] = useState({
    totalCount: 200,
    totalPages: 5,
  });

  //에러처리
  const [errormsg, setErrormsg] = useState(null);

  useEffect(() => {
    const fetchCocktails = async () => {
      const url = useFilterurl(BASE_URL, currentPage, filterCondtion);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setCocktailData(data.data);
        setErrormsg(null);
      } catch (error) {
        console.error('Error:', error);
        // navigate('/error');
        setErrormsg(
          '! 데이터요청에 실패했습니다. api가 열려있는지 확인해보세요'
        );
      }
    };

    fetchCocktails();
    setObj({
      totalCount: 200,
      totalPages: 5,
    });
  }, [filterCondtion, currentPage]);

  return (
    <div className="overflow-hidden">
      <Container>
        {/* 배경 음표 */}
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
        <Section>
          {/* 레시피 등록 버튼 */}
          <div className="flex justify-end pb-5 ">
            <HoverButton
              size="w-[15.6rem] h-[60px] max-[990px]:w-[10rem] max-[700px]:w-[8rem] max-[700px]:h-[40px] "
              className="absolute bottom-0 right-0"
              radius="rounded-[30px]"
              color="text-[#BB40F1] bg-transparent"
              fontSize="max-[990px]:text-sm max-[700px]:text-xs max-[500px]:text-[10px]"
              // border-gradient border border-solid from-red-500 to-yellow-500
              borderColor="border-[#BB40F1]"
              hoverColor="hover:text-[#BB40F1] hover:bg-[#F0F0F0]"
              onClick={() => navigate('/cocktail')}
            >
              나만의 레시피 등록하기
            </HoverButton>
          </div>

          <div className="border-1 border-solid border-red">
            {/* 필터 */}
            <Filter
              setFilterCondtion={setFilterCondtion}
              filterCondtion={filterCondtion}
            />
            {/* 필터에 따라 출력되는 데이터 */}
            {/* 배열 idx 에 bookmarkList 에 idx 가 같으면  */}
            <CardContainer>
              {cocktailData.map((item, index) => (
                <Card
                  item={item}
                  className="pr-4"
                  key={index + 1}
                  data={data}
                  setData={setData}
                />
              ))}
            </CardContainer>
            {/* 에러메시지 */}
            {errormsg && <p className="text-error mb-4">{errormsg}</p>}
            {/* 페이지네이션 */}
            <div className="flex justify-start mb-[100px] gap-2">
              {obj && (
                <>
                  {obj.totalCount > 16 && (
                    <>
                      {/* <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageInfo={obj}
                      /> */}
                      {[1, 2, 3].map((i, idx) => (
                        <HoverButton
                          size="w-[20px] h-[30px]"
                          key={idx}
                          color={`${
                            currentPage === idx
                              ? 'text-[#BB40F1] bg-transparent'
                              : 'text-[#7B7B7B] bg-transparent'
                          }`}
                          borderColor={`${
                            currentPage === idx
                              ? 'border-[#BB40F1]'
                              : 'border-[#7B7B7B]'
                          }`}
                          onClick={() => {
                            setCurrentPage(idx);
                          }}
                        >
                          {i}
                        </HoverButton>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
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
const Section = tw.section`
w-[55rem] 
max-[990px]:w-[40rem] 
max-[700px]:w-[30rem] 
max-[500px]:w-[20rem]`;
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
