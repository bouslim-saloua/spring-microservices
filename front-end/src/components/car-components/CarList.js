import React, { useEffect, useState } from 'react';
import CarServices from '../../services/CarService';

const CarList = () => {
  const [cars, setCars] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await CarServices.findALL(); 
        setCars(response.data); 
        setLoading(false); 
      } catch (error) {
        setError("Erreur lors du chargement des voitures");
        setLoading(false); 
      }
    };

    loadCars(); 
  }, []); 

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Liste des Voitures</h1>
      {cars.length > 0 ? (
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Marque</th>
              <th scope='col'>Modèle</th>
              <th scope='col'>Matricule</th>
              <th scope='col'>Client</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.marque}</td>
                <td>{car.model}</td>
                <td>{car.matricule}</td>
                <td>{car.client.nom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune voiture disponible.</p>
      )}
    </div>
  );
};

export default CarList;
