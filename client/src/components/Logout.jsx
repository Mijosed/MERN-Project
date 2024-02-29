import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem("token");

    // Rediriger l'utilisateur vers la page de connexion ou la page d'accueil
    navigate("/login"); // Assurez-vous d'avoir useNavigate de react-router-dom si vous utilisez cette approche
  };

  return (
    <div>
      <button onClick={handleLogout}><BiLogOut className=" text-2xl" /></button>
    </div>
  );
};

export default Logout;