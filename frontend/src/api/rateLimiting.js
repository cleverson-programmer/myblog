import axios from 'axios';

// Configuração do Axios
const apiRating = axios.create({
  baseURL: process.env.API_URL, // URL base da API
});

export default apiRating;
