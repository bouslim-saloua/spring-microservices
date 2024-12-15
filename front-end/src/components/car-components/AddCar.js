import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CarServices from "../../services/CarService";
import ClientServices from "../../services/ClientService";

export default function AddCar() {
    const [car, setCar] = useState({
        marque: "",
        model: "",
        matricule: ""
    }); 
    const [clients, setClients] = useState([]); 
    const [selectedClientId, setSelectedClientId] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        ClientServices.findALL()
            .then((response) => {
                setClients(response.data); 
                console.log(response.data); 
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
                toast.error("Erreur lors de la récupération des clients.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    }, []);

    const handleSave = (e) => {
        e.preventDefault();

        if (!selectedClientId) {
            toast.error("Veuillez sélectionner un client.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        const updatedCar = { ...car, clientId: selectedClientId }; 

        CarServices.saveVoiture(updatedCar, selectedClientId)
            .then(() => {
                navigate('/');
                toast.success('Voiture ajoutée avec succès!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .catch((error) => {
                console.error("Erreur d'enregistrement :", error);
                toast.error("Erreur lors de l'enregistrement ...!!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value }); 
    };

    return (
        <div>
            <h3>Ajout d'une nouvelle voiture</h3>
            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label>Marque</label>
                    <input
                        type="text"
                        name="marque"
                        value={car.marque}
                        className="form-control"
                        onChange={handleInputChange}
                        required
                    />
                </div>

             
                <div className="form-group">
                    <label>Modèle</label>
                    <input
                        type="text"
                        name="model"
                        value={car.model}
                        className="form-control"
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Matricule</label>
                    <input
                        type="text"
                        name="matricule"
                        value={car.matricule}
                        className="form-control"
                        onChange={handleInputChange}
                        required
                    />
                </div>

              
                <div className="form-group">
                    <label>Client</label>
                    <select
                        value={selectedClientId}
                        onChange={(e) => setSelectedClientId(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">Sélectionner un client</option>
                        {clients.length > 0 ? (
                            clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.nom}
                                </option>
                            ))
                        ) : (
                            <option disabled>Aucun client disponible</option>
                        )}
                    </select>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Ajouter la voiture</button>
                <br/>
                <br/>
            </form>
            <ToastContainer />
        </div>
    );
}
