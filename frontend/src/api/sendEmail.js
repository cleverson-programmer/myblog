import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;
console.log('BASE_URL:', BASE_URL);

// Post new email
export const postNewEmail = async (email) => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post(
        `${BASE_URL}/register/email`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.insertedId)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to post new email');
    }
};

//Post send email
export const sendEmail = async (content, subject) => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post(
        `${BASE_URL}/email/send`,
        { content, subject },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send email');
    }
};

//Route confirmed email register
export const confirmedEmail = async (email, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/confirm-email?email=${email}&token=${token}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Erro ao confirmar email.");
  }
};

//Função de enviar requisição de troca de senha
export const resetPassword = async (email) => {

  try{
    const response = await axios.post(
      `${BASE_URL}/password-reset/request`,
      { email },
    )
  } catch(error){
    throw new Error(error.response?.data?.message || 'Erro ao solicitar redefinição.')
  }
    
}

//Função de enviar nova senha e o token
export const confirmResetPassword = async (token, newPassword) => {

  try{
    const response = await axios.post(
      `${BASE_URL}/password-reset/confirm`,
      { 
        token,
        newPassword
      },
    )
  } catch(error){
    throw new Error(error.response?.data?.message || 'Erro ao redefinir senha.')
  }
    
}