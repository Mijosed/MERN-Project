import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import myAvatar from "../images/avatar.png"; // Image par défaut

export const Avatar = () => {
  const [userPhotoUrl, setUserPhotoUrl] = useState(myAvatar);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get("http://localhost:3001/api/auth/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          const userProfile = response.data;

          // Mise à jour pour utiliser l'URL de la photo directement depuis userProfile
          if (userProfile && userProfile.photoUrl) {
            setUserPhotoUrl(userProfile.photoUrl);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données de l'utilisateur", error);
        });
    }
  }, []);

  return (
    <div className="avatar ">
      <div className="w-8 rounded-full ring ring-offset-base-200 ">
        <NavLink to="/user">
          <img src={userPhotoUrl} alt="avatar" />
        </NavLink>
      </div>
    </div>
  );
};

export default Avatar;
