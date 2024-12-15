import axios from 'axios';

const base_url = 'http://localhost:8888/clients';

const findALL = () => {
    return axios.get(`${base_url}`);
};

const findById = (id) => {
    return axios.get(`${base_url}/${id}`);
}

const saveClient= (client) => {
    return axios.post(`${base_url}`, client);
}

const ClientServices = {
    findALL,
    findById,
    saveClient
}

export default ClientServices;