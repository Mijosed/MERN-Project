import React, { useState, useEffect, useMemo } from "react";
import { useForm, useController } from "react-hook-form";
import axios from "axios";
import Pagination from "./Pagination";
import { BiSolidFilePdf } from "react-icons/bi"; // Assurez-vous d'avoir importé ce composant

const ListeUsers = () => {
  const [users, setUsers] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);

  const { control, watch } = useForm();
  const globalSearchField = useController({
    name: "globalSearch",
    control,
    defaultValue: "",
  });

  useEffect(
    () => {
      setIsLoading(true);
      axios
        .get("http://localhost:3001/api/users/utilisateurs", {
          // Mettez à jour l'appel API pour inclure les paramètres de filtres et de pagination
        })
        .then((response) => {
          console.log("Réponse reçue:", response.data);
          setUsers(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching users", error);
          setError(error);
          setIsLoading(false);
        });
    },
    [
      /* Ajoutez les dépendances ici */
    ]
  );

  const searchTerm = watch("globalSearch");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Ajoutez ici la logique pour filtrer les échantillons
      return true; // Cette ligne est un exemple, remplacez-la par votre logique de filtrage
    });
  }, [users, searchTerm]);

  const pageCount = Math.ceil(filteredUsers.length / pageSize);

  const paginatedUsers = useMemo(() => {
    const startIndex = pageIndex * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, pageIndex, pageSize]);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPageIndex(0); // Réinitialiser l'index de page pour commencer depuis la première page
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/users/users/${editingUser._id}`,
        {
          email: editingUser.email,
          roles: editingUser.roles,
          status: editingUser.status,
        }
      );

      // Mise à jour de la liste des utilisateurs dans l'état local
      setUsers(
        users.map((user) => {
          if (user._id === editingUser._id) {
            return { ...response.data.user }; // Assurez-vous que la réponse contient les données de l'utilisateur mis à jour
          }
          return user;
        })
      );

      setEditingUser(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    }
  };

  return (
    <div className="p-3">
      <h2 className="text-center font-bold text-4xl p-6">Liste des Users :</h2>
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Une erreur est survenue: {error.message}</p>
      ) : (
        <>
          <div>
            <label className="p-2">Recherche globale :</label>
            <input
              type="text"
              {...globalSearchField.field}
              className="input input-bordered input-xs m-2"
            />
          </div>
          <table className="table table-lg mb-2">
            {/* En-têtes de tableau */}
            <thead className=" bg-lime-500">
              <tr>
                <th className="border px-4 py-2">Emails</th>
                <th className="border px-4 py-2">Roles</th>
                <th className="border px-4 py-2">isDeleted</th>
                <th className="border px-4 py-2">Last Login</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr className="hover" key={user._id}>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.roles}</td>
                  <td className="border px-4 py-2">{user.isDeleted}</td>
                  <td className="border px-4 py-2">{user.lastLogin}</td>
                  <td className="border px-4 py-2">{user.status}</td>
                  <td className="border px-4 py-2">
                    <div>
                      <button
                        className="btn btn-warning mr-2 no-animation"
                        onClick={() => {
                          setEditingUser(user);
                          document.getElementById("editUserModal").showModal();
                        }}
                      >
                        EDIT
                      </button>

                      <button className="btn bg-red-600">DELETE</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingUser && (
            <dialog id="editUserModal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Modifier l'utilisateur</h3>
                <form onSubmit={handleEditSubmit}>
                  {/* Champ Email */}
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />

                  {/* Cases à Cocher pour les Rôles */}
                  <div>
                    {["user", "admin"].map((role) => (
                      <label key={role}>
                        <input
                          type="checkbox"
                          checked={editingUser.roles.includes(role)}
                          onChange={(e) => {
                            let newRoles = editingUser.roles.includes(role)
                              ? editingUser.roles.filter((r) => r !== role)
                              : [...editingUser.roles, role];
                            setEditingUser({ ...editingUser, roles: newRoles });
                          }}
                        />
                        {role}
                      </label>
                    ))}
                  </div>

                  {/* Boutons Radio pour le Statut */}
                  <div>
                    {["active", "inactive"].map((status) => (
                      <label key={status}>
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={editingUser.status === status}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              status: e.target.value,
                            })
                          }
                        />
                        {status}
                      </label>
                    ))}
                  </div>

                  <div className="modal-action">
                    <button type="submit" className="btn">
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        document.getElementById("editUserModal").close()
                      }
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          )}
          <div className="flex justify-end items-center">
            <div className="pl-3 pr-3">
              <label htmlFor="pageSize">Lignes par page :</label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="select select-bordered ml-3"
              >
                {[5, 10, 15, 20, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="pr-3">
              {filteredUsers.length > 0 ? (
                <Pagination
                  pageIndex={pageIndex}
                  pageCount={pageCount}
                  setPageIndex={setPageIndex}
                />
              ) : (
                <p>
                  Aucun utilisateurs correspondant aux critères de filtrage.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListeUsers;
