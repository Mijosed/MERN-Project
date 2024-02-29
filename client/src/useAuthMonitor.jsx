import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// Définissez la fonction pour vérifier l'expiration du token en dehors du composant
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Utilisez ce hook personnalisé dans vos composants pour surveiller l'expiration du token
export const useAuthMonitor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const monitorTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (!token || isTokenExpired(token)) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    // Vérifier l'expiration du token à intervalles réguliers
    const intervalId = setInterval(monitorTokenExpiration, 60 *  60 * 1000);

    // Nettoyage à la suppression du composant
    return () => clearInterval(intervalId);
  }, [navigate]);
};
