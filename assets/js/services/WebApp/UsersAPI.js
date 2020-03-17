import axios from 'axios';

function findAll() {
    return axios
        .get("http://localhost:8000/api/users")                 // Requete en GET
        .then(response => response.data['hydra:member'])              // Filtre la requête Json sur hydra.member de la requête API
}

function deleteCustomers(id) {
    axios
        .delete("http://localhost:8000/api/users/" + id)          // Requete en DELETE
};

export default {
    findAll:findAll,
    deleteCustomers
};