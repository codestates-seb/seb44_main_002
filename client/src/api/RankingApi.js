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
    };
  }
  const rankingData = await fetch(url, {
    method: 'GET',
    headers: headers,
  }).then((res) => {
    if (!res.ok) {
      throw new Error('네트워크 응답이 정상이 아닙니다');
    }
    return res.json();
  });
  return rankingData;
};
