import React from "react";
import { Link } from "react-router-dom";
import { BiSolidError } from "react-icons/bi";
//import { useTranslation } from "react-i18next";

function NotFound() {
  return (
    <div className="flex flex-col items-center text-4xl font-bold mt-72">
      <BiSolidError className="" />
      <h1>Page non trouvée</h1>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
      <p>
        Cliquez ici pour vous rediriger vers la page de connexion :{" "}
        <Link to="/login">
          <span className=" text-cyan-500">
            Page de connexion{" "}
          </span>
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
