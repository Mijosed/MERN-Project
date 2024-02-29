import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CiLogout } from "react-icons/ci";


const Sidebar = ({ open, setOpen }) => {
  
  const handleLogout = () => {
    // Logique de déconnexion
    window.location.href = "http://localhost:3001/api/auth/logout";
  };
  const { t } = useTranslation("global");

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-lime-500 min-h-screen p-5 pt-8 sticky duration-300 flex flex-col justify-between`}
    >
      <div>
        <img
          src="./src/images/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-lime-500
          border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className={`flex ${open ? "justify-start" : "justify-center"} items-center`}>
          <img src="./src/images/logo.png" className=" w-10 h-10" />
          {open && <h1 className="text-4xl font-bold text-white ml-2">NOVA</h1>}
        </div>
        {open && (
          <nav>
            <ul className="text-white font-bold mt-10">
              <li>
                <NavLink to="/" activeClassName="selected">{t("navbar.home")}</NavLink>
              </li>
              <li>
                <NavLink to="/formulaire" activeClassName="selected">{t("navbar.form")}</NavLink>
              </li>
              <li>
                <NavLink to="/playground" activeClassName="selected">{t("navbar.playground")}</NavLink>
              </li>
              {/* Ajoutez d'autres liens de navigation ici si nécessaire */}
            </ul>
          </nav>
        )}
      </div>

      {/* Icône de déconnexion ici */}
      <div className={`flex ${open ? "justify-start" : "justify-center"} items-center cursor-pointer`} onClick={handleLogout}>
        
        <CiLogout className=" text-3xl" />
        {open && <span className="text-white font-bold ml-2">Logout</span>}
      </div>
    </div>
  );
};

export default Sidebar;
