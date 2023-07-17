const API_BASE = process.env.REACT_APP_BASE_URL;
const localAccessToken = localStorage.getItem('accessToken');

export default {
  // 회원 정보 조회
  async getUserData(userId) {
    try {
      const response = await fetch(`${API_BASE}users/${userId}`, {
        method: 'GET',
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
          Authorization: localAccessToken,
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
      const response = await fetch(`${API_BASE}user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localAccessToken,
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
