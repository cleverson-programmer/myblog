import axios from 'axios';

//Fetch all articles
export const fetchArticles = async (page = 1) => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.get(`http://localhost:3000/articles`, {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`, // Adicione o token aqui
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch articles');
  }
};

// Fetch article by ID
export const fetchArticleById = async (id) => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.get(`http://localhost:3000/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch article');
  }
};