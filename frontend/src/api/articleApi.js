import axios from 'axios';

//Fetch all articles
export const fetchArticles = async (page = 1) => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.get(`http://localhost:3000/articles`, {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`,
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

//Search articles
export const searchArticlesApi = async (query) => {
  try {
    const response = await axios.get('http://localhost:3000/search', { params: { query } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar artigos:", error);
    throw error;
  }
};

// Post new article
export const postNewArticle = async (articleData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(
      'http://localhost:3000/articles/new',
      articleData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.insertedId)
    return response.data.insertedId
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to post new article');
  }
};

//Put edit article
export const putEditArticle = async (id, articleData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.put(
      `http://localhost:3000/articles/put/${id}`,
      articleData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to post new article');
  }
};

//Delete article
export const deleteArticle = async (id) => {

  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.delete(`http://localhost:3000/articles/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete article');
  }
};

