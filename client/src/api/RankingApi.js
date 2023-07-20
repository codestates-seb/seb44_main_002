export const RankingApi = async (isLogin) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let url = `${BASE_URL}recommend/unsigned`;
  console.log(url);
  let headers = {
    'Content-Type': 'application/json',
  };

  if (isLogin) {
    url = `${BASE_URL}recommend/signed`;
    headers = {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('accessToken'),
      Refresh: localStorage.getItem('refreshToken'),
    };
  }
  const rankingData = await fetch(url, {
    method: 'GET',
    headers: headers,
  });
  if (rankingData.status === 401) {
    console.log('로그아웃해야함.');
    return 401;
  }
  if (rankingData.status === 218) {
    console.log('재발급받고 엑세스 토큰담겨있음.');

    localStorage.setItem(
      'accessToken',
      rankingData.headers.get('Authorization')
    );
    localStorage.setItem('refreshToken', rankingData.headers.get('Refresh'));
    return rankingData;
  }
  return rankingData;
};
