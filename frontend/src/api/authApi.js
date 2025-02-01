import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;
console.log('BASE_URL:', BASE_URL);
//Fetch all users
export const fetchUsers = async (page = 1) => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.get(`${BASE_URL}/users`, {
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

export const loginApi = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  console.log(response)
  return response.data; // Retorna usuário e token
};

export const registerApi = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/user/new`, { email, password });
    console.log(response)
    return response.status // Retorna 201 caso o usuário tenha sido criado com sucesso!
};

export const registerAdminApi = async (email, password) => {
  try {
    const token = localStorage.getItem('authToken'); // Certifique-se que o token está definido
    const response = await axios.post(
      `${BASE_URL}/admin/user/new`,
      { email, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status; // Deve retornar 201
  } catch (error) {
    throw error;
  }
};

export const logoutApi = async (token) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {}, // Corpo vazio
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status;
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
      throw error; // Repropaga o erro para o thunk lidar
    }
};

//Delete user
export const deleteUser = async (id) => {

  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.delete(`${BASE_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};