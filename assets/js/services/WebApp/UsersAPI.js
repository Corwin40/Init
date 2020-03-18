import axios from 'axios';

function findAll() {
    return axios
        .get("http://localhost:8000/api/users")                 // Requete en GET
        .then(response => response.data['hydra:member'])              // Filtre la requête Json sur hydra.member de la requête API
}

function findOne(id) {
    return axios
        .get("http://localhost:8000/api/users/" + id )
        .then(response => response.data);
}
function updateOne(id, user) {
    return axios
        .put("http://localhost:8000/api/users/" + id, user);
}

function newOne(user) {
    return axios
        .post("http://localhost:8000/api/users", user);
}

function deleteUsers(id) {
    axios
        .delete("http://localhost:8000/api/users/" + id)          // Requete en DELETE
}

export default {
    findAll:findAll,
    findOne,
    newOne,
    updateOne,
    delete:deleteUsers
};