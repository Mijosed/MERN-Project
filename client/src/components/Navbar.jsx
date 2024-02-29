import myImage from "../../dist/assets/mxns.png";
import { NavLink } from "react-router-dom";
import myAvatar from "../images/avatar.png";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Avatar from "./Avatar";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";
import Logout from "./Logout"
const Navbar = () => {
  const { t } = useTranslation("global");
  const [userData, setUserData] = useState(null);
  const userRoles = userData ? userData.roles : null;

  useEffect(() => {
    // Appel de l'API pour obtenir les informations de l'utilisateur
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get("http://localhost:3001/api/auth/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données de l'utilisateur", error);
        });
    }
  }, []);

  return (
    <div className="navbar bg-gray-900 shadow-md mb-3 w-full">
      <nav className="flex justify-between items-center flex-wrap">
        <NavLink to="/">
          <img src={myImage} alt="logo Mxns" className="w-32 p-3" />
        </NavLink>
        <ul className="menu menu-horizontal text-white font-bold items-center flex flex-wrap">
          <li className="mb-2 md:mb-0">
            <NavLink to="/">{t("navbar.home")}</NavLink>
          </li>
          {userRoles && userRoles.includes("admin") && (
            <li className="mr-3 hover:text-gray-600">
              <NavLink to="/admin">ADMIN</NavLink>
            </li>
          )}
          <li>
          <Avatar/>
          </li>
          <li>
          <Logout/>
          </li>
        </ul>
        
      </nav>
    </div>
  );
};

export default Navbar;
