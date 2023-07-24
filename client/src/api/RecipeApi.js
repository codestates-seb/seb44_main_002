import { ALERT_MESSAGE } from '../constants/constants';

const API_BASE = process.env.REACT_APP_BASE_URL;

export default {
  // 칵테일 정보 가져오기
  async getCocktailData(cocktailId) {
    try {
      const response = await fetch(`${API_BASE}cocktails/${cocktailId}`, {
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
          const data = await fetch(`${API_BASE}cocktails/${cocktailId}`, {
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
        console.log(ALERT_MESSAGE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 북마크 추가
  async postBookmark(cocktailId) {
    try {
      const response = await fetch(`${API_BASE}bookmark/create/${cocktailId}`, {
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
          const data = await fetch(`${API_BASE}bookmark/create/${cocktailId}`, {
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
        console.log(ALERT_MESSAGE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 북마크 삭제
  async deleteBookmark(cocktailId) {
    try {
      const response = await fetch(`${API_BASE}bookmark/delete/${cocktailId}`, {
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
          const data = await fetch(`${API_BASE}bookmark/delete/${cocktailId}`, {
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
        console.log(ALERT_MESSAGE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 별점 등록, 수정
  async modifyRate(cocktailId, score) {
    try {
      const response = await fetch(
        `${API_BASE}cocktails/${cocktailId}/rate?value=${score}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
            Refresh: localStorage.getItem('refreshToken'),
          },
        }
      );
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
          const data = await fetch(
            `${API_BASE}cocktails/${cocktailId}/rate?value=${score}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: response.headers.get('Authorization'),
                Refresh: localStorage.getItem('refreshToken'),
              },
            }
          );
          return data;
        }

        return response;
      } else {
        console.log(ALERT_MESSAGE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 댓글 등록
  async PostComments(cocktailId, commentInfo) {
    try {
      const response = await fetch(`${API_BASE}comments/${cocktailId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
          Refresh: localStorage.getItem('refreshToken'),
        },
        body: JSON.stringify(commentInfo),
      });
      if (response.ok) {
        location.reload();
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
          const data = await fetch(`${API_BASE}comments/${cocktailId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: response.headers.get('Authorization'),
              Refresh: localStorage.getItem('refreshToken'),
            },
            body: JSON.stringify(commentInfo),
          });
          return data;
        }

        return response;
      } else {
        console.log(ALERT_MESSAGE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 대댓글 등록
  async PostReplys(commentId, replyInfo) {
    try {
      const response = await fetch(`${API_BASE}replies/${commentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
          Refresh: localStorage.getItem('refreshToken'),
        },
        body: JSON.stringify(replyInfo),
      });
      if (response.ok) {
        location.reload();
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
          const data = await fetch(`${API_BASE}replies/${commentId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: response.headers.get('Authorization'),
              Refresh: localStorage.getItem('refreshToken'),
            },
            body: JSON.stringify(replyInfo),
          });
          return data;
        }

        return response;
      } else {
        console.log(ALERT_MESSAGE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 댓글 삭제
  async deleteComments(commentId, cocktailId) {
    try {
      const response = await fetch(
        `${API_BASE}comments/${commentId}?cocktail-id=${cocktailId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
            Refresh: localStorage.getItem('refreshToken'),
          },
        }
      );
      if (response.ok) {
        location.reload();
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
          const data = await fetch(
            `${API_BASE}comments/${commentId}?cocktail-id=${cocktailId}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: response.headers.get('Authorization'),
                Refresh: localStorage.getItem('refreshToken'),
              },
            }
          );
          return data;
        }

        return response;
      } else {
        console.log(ALERT_MESSAGE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 칵테일 레시피 삭제
  async deleteCocktails(cocktailId) {
    try {
      const response = await fetch(`${API_BASE}cocktails/${cocktailId}`, {
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
          const data = await fetch(`${API_BASE}cocktails/${cocktailId}`, {
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
        console.log(ALERT_MESSAGE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 대댓글 삭제
  async deleteReplies(replyId) {
    try {
      const response = await fetch(`${API_BASE}replies/${replyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
          Refresh: localStorage.getItem('refreshToken'),
        },
      });
      if (response.ok) {
        location.reload();
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
          const data = await fetch(`${API_BASE}replies/${replyId}`, {
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
        console.log(ALERT_MESSAGE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
