import fetchWithInterceptor from './api';
export const PostCocktailForm = async (form) => {
  const cocktailData = await fetchWithInterceptor(
    `${process.env.REACT_APP_BASE_URL}cocktails`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(form),
    }
  ).then((res) => {
    if (res === 401) {
      return 401;
    }
    res.json();
  });
  return cocktailData;
};

export const PatchCocktailForm = async (form, params) => {
  const cocktailData = await fetchWithInterceptor(
    `${process.env.REACT_APP_BASE_URL}cocktails/${params}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(form),
    }
  ).then((res) => res.json());
  return cocktailData;
};

export const GetCocktailForm = async (params) => {
  const cocktailData = await fetchWithInterceptor(
    `${process.env.REACT_APP_BASE_URL}cocktails/${params}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
    }
  ).then((res) => res.json());
  return cocktailData;
};
