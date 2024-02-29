import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FaUser } from "react-icons/fa";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/userCount');
        console.log("Réponse de l'API :", response.data);
        setUserCount(response.data.userCount);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre d\'utilisateurs', error);
      }
    };

    fetchUserCount();
  }, []);

  const data = [
    { nom: "Page A", valeur: 400 },
    { nom: "Page B", valeur: 300 }
  ];


  return (
    <div>
      <h1 className=' font-bold text-xl lg:text-7xl'>Dashboard</h1>
      
      <div className='p-2'>
        <div className='card shadow-xl bg-sky-500 w-48'>
          <div className='card-body'>
            <section className=' flex justify-center items-center'>
            <div className=''>
            <FaUser className=' text-4xl pr-3'/>
            </div>
            <h1 className='card-title container'>Nombre d'utilisateurs</h1>
            </section>
            <h2 className='text-center text-4xl font-bold m-2'>{userCount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
