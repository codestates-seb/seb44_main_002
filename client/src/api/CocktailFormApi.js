//칵테일 등록
export const PostCocktailForm = async (form) => {
  const cocktailData = await fetch(
    `${process.env.REACT_APP_BASE_URL}cocktails`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
        Refresh: localStorage.getItem('refreshToken'),
      },
      body: JSON.stringify(form),
    }
  );
  if (cocktailData.status === 401) {
    console.log('로그아웃해야함.');
    return 401;
  }
  if (cocktailData.status === 500) {
    const token = cocktailData.headers.get('Authorization');
    console.log(token);
    if (token) {
      console.log('재발급받고 엑세스 토큰담겨있음.');
      localStorage.setItem(
        'accessToken',
        cocktailData.headers.get('Authorization')
      );
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}cocktails/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: cocktailData.headers.get('Authorization'),
          Refresh: localStorage.getItem('refreshToken'),
        },
        body: JSON.stringify(form),
      });
      return data;
    }

    return cocktailData;
  }
  return cocktailData;
};
//칵테일 수정
export const PatchCocktailForm = async (form, params) => {
  const cocktailData = await fetch(
    `${process.env.REACT_APP_BASE_URL}cocktails/${params}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
        Refresh: localStorage.getItem('refreshToken'),
      },
      body: JSON.stringify(form),
    }
  );
  if (cocktailData.status === 401) {
    console.log('로그아웃해야함.');
    return 401;
  }
  if (cocktailData.status === 500) {
    const token = cocktailData.headers.get('Authorization');
    console.log(token);
    if (token) {
      console.log('재발급받고 엑세스 토큰담겨있음.');
      localStorage.setItem(
        'accessToken',
        cocktailData.headers.get('Authorization')
      );
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}cocktails/${params}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: cocktailData.headers.get('Authorization'),
            Refresh: localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(form),
        }
      );
      return data;
    }

    return cocktailData;
  }
  return cocktailData;
};
//칵테일 수정시 정보조회
export const GetCocktailForm = async (params) => {
  const cocktailData = await fetch(
    `${process.env.REACT_APP_BASE_URL}cocktails/${params}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
        Refresh: localStorage.getItem('refreshToken'),
      },
    }
  );
  if (cocktailData.status === 401) {
    console.log('로그아웃해야함.');
    return 401;
  }
  if (cocktailData.status === 500) {
    const token = cocktailData.headers.get('Authorization');
    console.log(token);
    if (token) {
      console.log('재발급받고 엑세스 토큰담겨있음.');
      localStorage.setItem(
        'accessToken',
        cocktailData.headers.get('Authorization')
      );
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}cocktails/${params}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: cocktailData.headers.get('Authorization'),
            Refresh: localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(form),
        }
      );
      return data;
    }

    return cocktailData;
  }
  return cocktailData;
};
