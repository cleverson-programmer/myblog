import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;
console.log('BASE_URL:', BASE_URL);

//Fetch all articles
export const fetchArticles = async (page = 1) => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.get(`${BASE_URL}/articles`, {
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

// Buscar categorias e tags
export const fetchCategoriesTags = async () => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.get(`${BASE_URL}/articles/categories-tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch categories and tags');
  }
};

// Fetch article by ID
export const fetchArticleById = async (id) => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.get(`${BASE_URL}/articles/${id}`, {
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
    const token = localStorage.getItem('authToken');
    
    const response = await axios.get(`${BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { query },

  });
    console.log(response.data)
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
      `${BASE_URL}/articles/new`,
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
      `${BASE_URL}/articles/put/${id}`,
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
    const response = await axios.delete(`${BASE_URL}/articles/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete article');
  }
};

