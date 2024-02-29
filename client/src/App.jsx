import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import LanguageSelector from "./components/LanguageSelector";
import User from "./pages/User";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { useAuthMonitor } from "./useAuthMonitor.jsx";

function App() {
  useAuthMonitor();

  return (
    <div>
      <LanguageSelector />
      <Routes>
        {/* <Route path='/' element={isUserLoggedIn ? <Accueil /> : <Navigate to="/login" />} />
  <Route path='/formulaire' element={isUserLoggedIn ? <Formulaire /> : <Navigate to="/login" />} />
  <Route path='/playground' element={isUserLoggedIn ? <Playground /> : <Navigate to="/login" />} />
  <Route path='/utilisateur' element={isUserLoggedIn ? <Utilisateur /> : <Navigate to="/login" />} /> */}
        <Route path="/" element={<Accueil />} />


        <Route path="/user" element={<User />} />


        <Route path="/admin" element={<Admin />} />

        <Route
          path="/login"
          element={<Login />}
          //element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      

    </div>
  );
}

export default App;
