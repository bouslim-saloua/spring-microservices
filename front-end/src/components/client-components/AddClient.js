import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientServices from "../../services/ClientService"; 

export default function AddClient() {
    const [client, setClient] = useState({
        nom: "",
        age: "",
    }); 
    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();

        if (!client.nom || !client.age) {
            toast.error("Veuillez remplir tous les champs.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        ClientServices.saveClient(client)
            .then(() => {
                navigate("/client-list"); 
                toast.success("Client ajouté avec succès!", {
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
                toast.error("Erreur lors de l'enregistrement du client.", {
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
        setClient({ ...client, [name]: value }); 
    };

    return (
        <div>
            <h3>Ajout d'un nouveau client</h3>
            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={client.nom}
                        className="form-control"
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Âge</label>
                    <input
                        type="number"
                        name="age"
                        value={client.age}
                        className="form-control"
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <br/>
                <button type="submit" className="btn btn-primary">
                    Ajouter le client
                </button>
                <br/>
                <br/>
            </form>
            <ToastContainer />
        </div>
    );
}
