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
  //console.log(filterCondtion);
  //현재 페이지 인덱스
  const [currentPage, setCurrentPage] = useState(0);
  const [cocktailData, setCocktailData] = useState([]);
  const [obj, setObj] = useState({
    totalCount: 200,
    totalPages: 5,
  });

  useEffect(() => {
    const fetchCocktails = async () => {
      console.log('동작');
      console.log(filterCondtion);
      //클릭한 페이지
      const page = currentPage + 1;
      //카테고리 전체보기일때는 빈문자열
      const categoryQuery =
        filterCondtion.category === 'all'
          ? ''
          : `category=${filterCondtion.category}&`;
      //맛 태그
      const tasteTagQuery =
        filterCondtion.tasteTag.length === 0
          ? ''
          : `,${filterCondtion.tasteTag.join(',')}`;

      // 정렬 조건 내림차순 + 조회수= 조회수 높은 순
      const getSortType = (descending, type) => {
        if (descending) {
          return type === 'viewed' ? 'most_viewed' : 'highest_rate';
        }
        return type === 'viewed' ? 'least_viewed' : 'lowest_rate';
      };

      const sort = getSortType(
        filterCondtion.descendingOrder,
        filterCondtion.sortType
      );

      const url = `${BASE_URL}cocktails/filter?${categoryQuery}tag=${filterCondtion.frequencyTag}${tasteTagQuery}&page=${page}&size=16&sort=${sort}`;

      //조건에 맞춰 필터링된 데이터
      // const fetchCocktails = async () => {
      //   // const url = `http://ec2-54-180-109-174.ap-northeast-2.compute.amazonaws.com:8080/cocktails/filter`;
      //   const url = `${BASE_URL}cocktails/filter?${
      //     fitlerCondtion.category === 'all'
      //       ? ''
      //       : `category=${fitlerCondtion.category}&`
      //   }tag=${fitlerCondtion.frequencyTag}${
      //     fitlerCondtion.tasteTag.length === 0
      //       ? ''
      //       : `,${fitlerCondtion.tasteTag.join(',')}`
      //   }&page=${page}&size=$16${
      //     fitlerCondtion.descendingOrder && fitlerCondtion.sortType === 'viewed'
      //       ? 'most_viewed'
      //       : fitlerCondtion.descendingOrder && fitlerCondtion.sortType === 'rate'
      //       ? 'highest_rate'
      //       : !fitlerCondtion.descendingOrder &&
      //         fitlerCondtion.sortType === 'viewed'
      //       ? 'least_viewed'
      //       : 'lowest_rate'
      //   }`;
      // 조회수 높은 순 : most_viewed
      // 조회수 낮은 순 : least_viewed
      // 별점 높은 순 : highest_rate
      // 별잠 낮은 순 : lowest_rate

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setCocktailData(data.data);
      } catch (error) {
        console.error('Error:', error);
        // navigate('/error');
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
      <div className="relative bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-100% pt-[10rem] flex justify-center  ">
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
        <section className="w-[55rem] max-[990px]:w-[40rem] max-[700px]:w-[30rem] max-[500px]:w-[20rem]">
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
            <div className="w-[100%]   grid grid-cols-4 gap-10 mb-[100px] max-[990px]:grid-cols-3 max-[700px]:flex max-[700px]:justify-between max-[700px]:flex-wrap max-[500px]:flex max-[500px]:justify-center max-[500px]:flex-wrap ">
              {cocktailData.map((item, index) => (
                <Card
                  item={item}
                  className="pr-4"
                  key={index + 1}
                  data={data}
                  setData={setData}
                />
              ))}
            </div>
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
        </section>
      </div>
    </div>
  );
}

// const dummyData = [
//   {
//     cocktailId: 1,
//     name: 'sample',
//     imageUrl: 'images/cocktail/cocktail1.jpg',
//     isBookmarked: true,
//   },
//   {
//     cocktailId: 2,
//     name: '체리주',
//     imageUrl: 'images/cocktail/cocktail2.jpg',
//     isBookmarked: true,
//   },
//   {
//     cocktailId: 3,
//     name: 'sample cocktail',
//     imageUrl: 'images/cocktail/cocktail3.jpg',
//     isBookmarked: false,
//   },
//   {
//     cocktailId: 4,
//     name: 'sample cocktail',
//     imageUrl: 'images/cocktail/cocktail4.jpg',
//     isBookmarked: false,
//   },
//   {
//     cocktailId: 5,
//     name: 'sample cocktail',
//     imageUrl: 'images/cocktail/cocktail3.jpg',
//     isBookmarked: false,
//   },
//   {
//     cocktailId: 6,
//     name: 'sample cocktail',
//     imageUrl: 'images/cocktail/cocktail4.jpg',
//     isBookmarked: false,
//   },
// ];
// const [data, setData] = useState(dummyData);
