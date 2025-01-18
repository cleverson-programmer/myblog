import axios from 'axios';

export const loginApi = async (email, password) => {
  const response = await axios.post('http://localhost:3000/login', { email, password });
  console.log(response)
  return response.data; // Retorna usuário e token
};

export const registerApi = async (email, password) => {
    const response = await axios.post('http://localhost:3000/user/new', { email, password });
    console.log(response)
    return response.status // Retorna 201 caso o usuário tenha sido criado com sucesso!
};

export const registerAdminApi = async (email, password) => {
  try {
    const token = localStorage.getItem('authToken'); // Certifique-se que o token está definido
    const response = await axios.post(
      'http://localhost:3000/admin/user/new',
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
        'http://localhost:3000/logout',
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