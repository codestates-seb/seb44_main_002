export default function useFilterurl(
  BASE_URL,
  currentPage = 0,
  filterCondtion
) {
  //페이지파라미터함수
  const getPageQuery = (page) => {
    if (page === 1) {
      return '';
    } else {
      return `page=${page}&`;
    }
  };
  //태그파라미터함수
  const getTagQuery = (frequencyTag, tasteTag) => {
    if (frequencyTag) {
      return tasteTag.length === 0
        ? `tag=${frequencyTag}&`
        : `tag=${frequencyTag},${tasteTag.join(',')}&`;
    }
    return tasteTag.length === 0 ? `` : `tag=${tasteTag.join(',')}&`;
  };
  // 정렬파라미터함수  조건 내림차순 + 조회수= 조회수 높은 순
  const getSortType = (descending, type) => {
    if (descending) {
      return type === 'viewed' ? 'most_viewed' : 'highest_rate';
    }
    return type === 'viewed' ? 'least_viewed' : 'lowest_rate';
  };

  //페이지
  const page = currentPage + 1;

  //카테고리쿼리
  const categoryQuery =
    filterCondtion.category === 'all'
      ? ''
      : `category=${filterCondtion.category}&`;

  //태그쿼리
  const tagQuery = getTagQuery(
    filterCondtion.frequencyTag,
    filterCondtion.tasteTag
  );
  //페이지쿼리
  const pageQuery = getPageQuery(page);

  const sortQuery = getSortType(
    filterCondtion.descendingOrder,
    filterCondtion.sortType
  );

  const url = `${BASE_URL}cocktails/filter?${categoryQuery}${tagQuery}${pageQuery}size=16&sort=${sortQuery}`;

  return url;
}
