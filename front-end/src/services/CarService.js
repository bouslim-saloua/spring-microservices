import axios from 'axios';

const base_url = 'http://localhost:8888/voitures';

const findALL = () => {
    return axios.get(`${base_url}`);
};
const saveVoiture = (voiture, clientId) => {
    return axios.post(`${base_url}/${clientId}`, voiture);
}
const findById = (id) => {
    return axios.get(`${base_url}/${id}`);
}

const findAllByClient = (clientId) => {
    return axios.get(`${base_url}/client/${clientId}`);
}

const CarServices = {
    findALL,
    findById,
    saveVoiture,
    findAllByClient
}

export default CarServices;