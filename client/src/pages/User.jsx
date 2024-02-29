import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

export const User = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.get("http://localhost:3001/api/auth/userinfo", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true // Ajoutez cette option pour prendre en charge les cookies HTTP
        })
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            console.error("Il y a eu un problème avec la requête", error);
        });
    }
}, []);



  // La logique pour afficher les rôles peut rester inchangée
  const userRoles = userData ? userData.roles : null;

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}

        className=" font-semibold text-3xl"
      >
        <h1 className="text-4xl text-sky-500 font-bold p-4">
          Page utilisateur
        </h1>
        <div className=" bg-sky-500 card card-body items-center text-center shadow-sm font-semibold">
          {userData && (
            <div>
              <p>Email: {userData.email}</p>
              <p>Rôles :</p>
              <ul>
                {userRoles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
