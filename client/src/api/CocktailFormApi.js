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
  if (cocktailData.status === 218) {
    console.log('재발급받고 엑세스 토큰담겨있음.');

    localStorage.setItem(
      'accessToken',
      cocktailData.headers.get('Authorization')
    );
    localStorage.setItem('refreshToken', cocktailData.headers.get('Refresh'));
    return cocktailData;
  }
  return cocktailData;
};

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
  if (cocktailData.status === 218) {
    console.log('재발급받고 엑세스 토큰담겨있음.');

    localStorage.setItem(
      'accessToken',
      cocktailData.headers.get('Authorization')
    );
    localStorage.setItem('refreshToken', cocktailData.headers.get('Refresh'));
    return cocktailData;
  }
  return cocktailData;
};

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
  if (cocktailData.status === 218) {
    console.log('재발급받고 엑세스 토큰담겨있음.');

    localStorage.setItem(
      'accessToken',
      cocktailData.headers.get('Authorization')
    );
    localStorage.setItem('refreshToken', cocktailData.headers.get('Refresh'));
    return cocktailData;
  }
  return cocktailData;
};
