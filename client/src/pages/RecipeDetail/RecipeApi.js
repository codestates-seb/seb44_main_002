const API_BASE = process.env.REACT_APP_BASE_URL;

export default {
  async getCocktailData(cocktailId) {
    try {
      const response = await fetch(`${API_BASE}cocktails/${cocktailId}`, {
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
};
