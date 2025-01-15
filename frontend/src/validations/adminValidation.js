import jwt from "jsonwebtoken";

export const isAdminUser = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwt.decode(token); // Decodifica o token
    return decodedToken.profileId === 1; // Verifica se o usuário é administrador
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return false;
  }
};