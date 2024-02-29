import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListeUsers from "../components/ListeUsers";

function Admin() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const userRoles = userData ? userData.roles : null;

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

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3001/api/users/register", data);
      console.log("Utilisateur créé avec succès", data);
      reset(); // Réinitialise le formulaire après la soumission
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la création de l'utilisateur",
        error
      );
    }
  };

  // Vérifiez si l'utilisateur a le rôle "admin"
  const isAdmin = userRoles && userRoles.includes("admin");

  // Rediriger l'utilisateur s'il n'est pas admin
  useEffect(() => {
    if (!isAdmin && userData) {
      navigate("/login");
    }
  }, [isAdmin, userData, navigate]);

  // Affiche le formulaire uniquement si l'utilisateur est admin
  if (!isAdmin) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="card card-bordered bg-sky-500 w-1/2 p-4 shadow-xl">
        <div className="card-body">
          <h1 className="text-center font-bold text-4xl">
            Formulaire de création de compte
          </h1>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <form
            className="flex items-center justify-center flex-col font-semibold text-2xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="mb-2">Email :</label>
            <input
              className="input input-bordered mb-2"
              type="email"
              placeholder="Adresse email"
              required
              {...register("email")}
            />

            <label className="">Rôles :</label>
            <div className="flex mb-3 flex-col">
              <label className=" mb-3 mt-3">
                <input
                  type="checkbox"
                  {...register("roles")}
                  value="user"
                  className="checkbox"
                />
                <span className="p-2">User</span>
              </label>
              <label className="">
                <input
                  type="checkbox"
                  {...register("roles")}
                  value="admin"
                  className="checkbox "
                />
                <span className="p-2" >Admin</span>
              </label>
              {/* Ajoutez d'autres cases à cocher si nécessaire */}
            </div>
            <button className="btn btn-neutral mb-3" type="submit">
              Créer
            </button>
          </form>
        </div>
        </div>
      </div>
      <br></br>
      <div>
        <ListeUsers/>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
