import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import Dashboard from "../components/Dashboard";

const Accueil = () => {
  const { t } = useTranslation("global");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Stocker le token dans le localStorage pour l'utiliser dans les requêtes subséquentes
      localStorage.setItem('token', token);

      // Rediriger vers un tableau de bord ou une page protégée par authentification
      // Si votre Dashboard est la page à afficher après la connexion, vous pouvez omettre cette redirection
      // navigate('/dashboard'); // Commentez ou ajustez selon votre logique de navigation
    }
  }, [location, navigate]);

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col ">
        <h1 className="from-lime-500 bg-gradient-to-r bg-clip-text to-sky-500 text-transparent font-bold text-center sm:text-3xl md:text-4xl lg:text-4xl">
          Bienvenue sur mon site React !
        </h1>
      </div>
      <Dashboard />
      <Footer />
    </div>
  );
};

export default Accueil;
