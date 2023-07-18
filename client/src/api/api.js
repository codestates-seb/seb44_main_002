const API_BASE = process.env.REACT_APP_BASE_URL;
const localAccessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
export default {
  // 토큰 재발급 요청 함수
  async refreshToken() {
    try {
      const response = await fetch(`${API_BASE}ndpoint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localAccessToken}`,
          refresh: `${refreshToken}`,
          // 만료된 토큰을 헤더에 포함하여 서버에 보냄
        },
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      jwtToken = data.token; // 새로운 토큰으로 기존의 토큰을 갱신
      return jwtToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // Fetch API 인터셉터 함수
  async fetchWithInterceptor(url, options) {
    const response = await fetch(url, options);

    // 만료된 토큰으로 인증이 실패했을 경우에만 토큰 재발급
    if (response.status === 403) {
      // 403이 달라질 수 있음
      const newToken = await refreshToken();

      localStorage.setItem('accessToken', newToken);

      if (newToken) {
        // 새로 발급받은 토큰을 헤더에 포함하여 다시 요청
        options.headers['Authorization'] = `${newToken}`;
        return fetch(url, options);
      }
    }

    return response;
  },

  //북마크 추가
  async createbookmarkApi({ item }) {
    try {
      const response = await fetchWithInterceptor(
        `${BASE_URL}bookmark/create/${item.cocktailId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localAccessToken, // 토큰을 헤더에 포함하여 보호된 API에 요청
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Data:', data);
      //  로그인이 풀렸을 때
      if (data.status === 401) {
        alert('토큰만료로 로그아웃되었습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  },

  //북마크 삭제
  async deletebookmarkApi(item) {
    try {
      const response = await fetchWithInterceptor(
        `${BASE_URL}bookmark/delete/${item.cocktailId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localAccessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Data:', data);
      //  로그인이 풀렸을 때
      if (data.status === 401) {
        alert('토큰만료로 로그아웃되었습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  },
};
