export default function useFilterurl(BASE_URL, currentPage, filterCondtion) {
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

  return url;
}
