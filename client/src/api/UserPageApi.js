const API_BASE = process.env.REACT_APP_BASE_URL;

export default {
  // 회원 정보 조회
  async getUserData(userId, accessToken) {
    try {
      const response = await fetch(`${API_BASE}users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      });
      if (response.ok) {
        return response;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 회원 정보 수정
  async modifyUser(userId, password, accessToken) {
    try {
      const response = await fetch(`${API_BASE}users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        body: JSON.stringify(password),
      });
      if (response.ok) {
        return response;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 회원 탈퇴
  async deleteUser(userId, accessToken) {
    try {
      const response = await fetch(`${API_BASE}users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      });
      if (response.ok) {
        return response;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 구독하기
  async createfollow(userId, accessToken) {
    try {
      const response = await fetch(`${API_BASE}follow/create/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      });
      if (response.ok) {
        return response;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 구독취소
  async cancelfollow(userId, accessToken) {
    try {
      const response = await fetch(`${API_BASE}follow/cancel/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      });
      if (response.ok) {
        return response;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  },
};
