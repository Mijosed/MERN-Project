import React, { useState, useEffect, useMemo } from "react";
import { useForm, useController } from "react-hook-form";
import axios from "axios";
import Pagination from "./Pagination";
import { BiSolidFilePdf } from 'react-icons/bi'; // Assurez-vous d'avoir importé ce composant

const ListeSamples = () => {
  const [samples, setSamples] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { control, watch } = useForm();
  const globalSearchField = useController({
    name: "globalSearch",
    control,
    defaultValue: "",
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/api/samples/liste-samples", {
        // Mettez à jour l'appel API pour inclure les paramètres de filtres et de pagination
      })
      .then((response) => {
        setSamples(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching samples", error);
        setError(error);
        setIsLoading(false);
      });
  }, [/* Ajoutez les dépendances ici */]);

  const searchTerm = watch("globalSearch");

  const filteredSamples = useMemo(() => {
    return samples.filter((sample) => {
      // Ajoutez ici la logique pour filtrer les échantillons
      return true; // Cette ligne est un exemple, remplacez-la par votre logique de filtrage
    });
  }, [samples, searchTerm]);

  const pageCount = Math.ceil(filteredSamples.length / pageSize);

  const paginatedSamples = useMemo(() => {
    const startIndex = pageIndex * pageSize;
    return filteredSamples.slice(startIndex, startIndex + pageSize);
  }, [filteredSamples, pageIndex, pageSize]);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPageIndex(0); // Réinitialiser l'index de page pour commencer depuis la première page
  };

  const generatePdf = (sample) => {
    // Ajoutez ici la logique pour générer un PDF
  };

  return (
    <div>
      <h2 className="text-center font-bold text-4xl p-6">Liste des Samples :</h2>
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Une erreur est survenue: {error.message}</p>
      ) : (
        <>
          <div>
            <label className="p-2">Recherche globale :</label>
            <input type="text" {...globalSearchField.field} className="input input-bordered input-xs m-2" />
          </div>
          <table className="table table-lg mb-2">
            {/* En-têtes de tableau */}
            <thead className=" bg-lime-500">
          <tr>
            <th className="border px-4 py-2">Nom du test</th>
            <th className="border px-4 py-2">Variation</th>
            <th className="border px-4 py-2">Site</th>
            <th className="border px-4 py-2">Résultat</th>
            <th className="border px-4 py-2">Critère</th>
            <th className="border px-4 py-2">Date de réception</th>
            <th className="border px-4 py-2">Nom du test</th>
            <th className="border px-4 py-2">Numéro d'échantillons</th>
            <th className="border px-4 py-2">PDF</th>
            
          </tr>
        </thead>
        <tbody>
        {paginatedSamples.map((sample) =>  (
          <tr className="hover" key={sample._id}>
              <td className="border px-4 py-2">{sample["Nom du Test"]}</td>
              <td className="border px-4 py-2">{sample.Variation}</td>
              <td className="border px-4 py-2">{sample.Site}</td>
              <td className="border px-4 py-2">{sample.Résultat}</td>
              <td className="border px-4 py-2">{sample.Critère}</td>
              <td className="border px-4 py-2">{sample["Date de réception"]}</td>
              <td className="border px-4 py-2">{sample["Nom du Test"]}</td>
              <td className="border px-4 py-2">{sample["N° d'échantillon"]}</td>
              <td className="border px-4 py-2">
                <BiSolidFilePdf className=" cursor-pointer" onClick={() => generatePdf(sample)} />
              </td>
              
              
            </tr>
            
          ))}
        </tbody>
          </table>
          <div className="flex justify-end items-center">
            <div className="pl-3 pr-3">
              <label htmlFor="pageSize">Lignes par page :</label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="select select-bordered ml-3"
              >
                {[5, 10, 15, 20].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <div className="pr-3">
              {filteredSamples.length > 0 ? (
                <Pagination
                  pageIndex={pageIndex}
                  pageCount={pageCount}
                  setPageIndex={setPageIndex}
                />
              ) : (
                <p>Aucun échantillon correspondant aux critères de filtrage.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListeSamples;
