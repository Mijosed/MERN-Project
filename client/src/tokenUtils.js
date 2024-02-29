import jwtDecode from 'jwt-decode';

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // convertir en secondes
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Considérer le token comme expiré en cas d'erreur
  }
};
