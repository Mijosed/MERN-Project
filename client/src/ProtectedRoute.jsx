import { Navigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // convertir en secondes
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Considérer le token comme expiré en cas d'erreur
  }
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    // Rediriger vers la page de connexion en conservant l'URL de redirection
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;