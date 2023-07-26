export const RankingApi = async (isLogin) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let url = `${BASE_URL}rank/unsigned`;
  let headers = {
    'Content-Type': 'application/json',
  };

  if (isLogin) {
    url = `${BASE_URL}rank/signed`;
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
    return 401;
  }
  if (rankingData.status === 500) {
    localStorage.setItem(
      'accessToken',
      rankingData.headers.get('Authorization')
    );
    localStorage.setItem('refreshToken', rankingData.headers.get('Refresh'));
    return rankingData;
  }
  return rankingData;
};
