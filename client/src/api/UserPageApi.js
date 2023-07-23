const API_BASE = process.env.REACT_APP_BASE_URL;

export default {
  // 회원 정보 조회
  async getUserData(userId) {
    try {
      const response = await fetch(`${API_BASE}users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
          Refresh: localStorage.getItem('refreshToken'),
        },
      });
      if (response.ok) {
        return response;
      }
      if (response.status === 401) {
        return 401;
      }
      if (response.status === 500) {
        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem(
            'accessToken',
            response.headers.get('Authorization')
          );
          const data = await fetch(`${API_BASE}users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: response.headers.get('Authorization'),
              Refresh: localStorage.getItem('refreshToken'),
            },
          });
          return data;
        }

        return response;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 회원 정보 수정
  async modifyUser(userId, password) {
    try {
      const response = await fetch(`${API_BASE}users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
          Refresh: localStorage.getItem('refreshToken'),
        },
        body: JSON.stringify(password),
      });
      if (response.ok) {
        return response;
      }
      if (response.status === 401) {
        return 401;
      }
      if (response.status === 500) {
        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem(
            'accessToken',
            response.headers.get('Authorization')
          );
          const data = await fetch(`${API_BASE}users/${userId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: response.headers.get('Authorization'),
              Refresh: localStorage.getItem('refreshToken'),
            },
            body: JSON.stringify(password),
          });
          return data;
        }

        return response;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 회원 탈퇴
  async deleteUser(userId) {
    try {
      const response = await fetch(`${API_BASE}users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
          Refresh: localStorage.getItem('refreshToken'),
        },
      });
      if (response.ok) {
        return response;
      }
      if (response.status === 401) {
        return 401;
      }
      if (response.status === 500) {
        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem(
            'accessToken',
            response.headers.get('Authorization')
          );
          const data = await fetch(`${API_BASE}users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: response.headers.get('Authorization'),
              Refresh: localStorage.getItem('refreshToken'),
            },
          });
          return data;
        }

        return response;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 구독하기
  async createfollow(userId) {
    try {
      const response = await fetch(`${API_BASE}follow/create/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
          Refresh: localStorage.getItem('refreshToken'),
        },
      });
      if (response.ok) {
        return response;
      }
      if (response.status === 401) {
        return 401;
      }
      if (response.status === 500) {
        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem(
            'accessToken',
            response.headers.get('Authorization')
          );
          const data = await fetch(`${API_BASE}follow/create/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: response.headers.get('Authorization'),
              Refresh: localStorage.getItem('refreshToken'),
            },
          });
          return data;
        }

        return response;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 구독취소
  async cancelfollow(userId) {
    try {
      const response = await fetch(`${API_BASE}follow/cancel/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
          Refresh: localStorage.getItem('refreshToken'),
        },
      });
      if (response.ok) {
        return response;
      }
      if (response.status === 401) {
        return 401;
      }
      if (response.status === 500) {
        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem(
            'accessToken',
            response.headers.get('Authorization')
          );
          const data = await fetch(`${API_BASE}follow/cancel/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: response.headers.get('Authorization'),
              Refresh: localStorage.getItem('refreshToken'),
            },
          });
          return data;
        }

        return response;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  },
};
