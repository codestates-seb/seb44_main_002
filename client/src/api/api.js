//import useLogout from '../service/index';
const API_BASE = process.env.REACT_APP_BASE_URL;
const localAccessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

//리프래쉬 재발급 요청
const fetchrefreshToken = async () => {
  try {
    const response = await fetch(`${API_BASE}auth/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Refresh: localStorage.getItem('refreshToken'),
      },
    });
    //완전히 만료 ->로그아웃진행
    if (response.status === 401) {
      return false;
    }
    //재발급 성공
    if (response.ok) {
      localStorage.setItem(
        'accessToken',
        response.headers.get('Authorization')
      );
      const token = response.headers.get('Authorization');
      return token;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fetch API 인터셉터 함수
const fetchWithInterceptor = async (url, options) => {
  const response = await fetch(url, options);
  // 엑세스 토큰 만료로 리프래쉬로 토큰 재발급
  if (response.status === 401) {
    const newToken = await fetchrefreshToken();

    if (newToken) {
      // 새로 발급받은 토큰을 헤더에 포함하여 다시 요청
      options.headers.Authorization = newToken;
      const response = await fetch(url, options);
      return response;
    } else {
      return 401;
    }
  }
  //   200 이면 성공
  if (response.status === 200) {
    console.log('요청 성공');
  }
  return response;
};

export default {
  //회원가입
  async signupApi(userinfo) {
    try {
      const response = await fetch(`${API_BASE}users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userinfo),
      });
      if (response.ok) {
        return 201;
      }
      if (response.status === 409) {
        return 409;
      }
      if (response.status === 500) {
        return 500;
      }
    } catch (error) {
      console.error(error);
    }
  },
  //로그인
  async loginApi(form) {
    try {
      const response = await fetch(`${API_BASE}auth/signin`, {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (response.ok) {
        localStorage.setItem(
          'accessToken',
          response.headers.get('Authorization')
        );
        localStorage.setItem('userId', response.headers.get('userId'));
        localStorage.setItem('IsAdmin', response.headers.get('IsAdmin'));
        localStorage.setItem('refreshToken', response.headers.get('Refresh'));

        return response;
      }
      if (response.status === 401) {
        return 401;
      }
    } catch (error) {
      console.log(error);
      handleClose();
      navigate('/error');
    }
  },
  //로그아웃
  async logoutApi() {
    try {
      const response = await fetch(`${API_BASE}auth/signout`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('accessToken'),
          Refresh: localStorage.getItem('refreshToken'),
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  },
  //유저 조회
  async getUserinfoApi(memberId) {
    try {
      const response = await fetch(`${BASE_URL}users/${memberId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  //북마크 추가
  async createbookmarkApi(item) {
    try {
      const response = await fetchWithInterceptor(
        `${API_BASE}bookmark/create/${item.cocktailId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );

      if (response === 401) {
        console.log('로그아웃해야함.');
        return 401;
      }
    } catch (error) {
      console.error(error);
    }
  },

  //북마크 삭제
  async deletebookmarkApi(item) {
    try {
      const response = await fetchWithInterceptor(
        `${API_BASE}bookmark/delete/${item.cocktailId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );
      if (response === 401) {
        console.log('로그아웃해야함.');
        return 401;
      }
    } catch (error) {
      console.error(error);
    }
  },
};
