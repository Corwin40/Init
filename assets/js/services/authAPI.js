import axios from 'axios';
import jwtDecode from 'jwt-decode';

/**
 * Déconnexion (suppression du token enregistré dans le localStorage
 */
function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Requête HTTP d'authentification et stockage du token dans le localStorage
 *
 * @param credentials
 * @returns {Promise<AxiosResponse<any>>}
 */
function authenticate(credentials) {
    return axios  // const data = créé une variable qui stocke les données du JWT en cas de validation user
        .post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            //token stocké dans le local storage
            window.localStorage.setItem("authToken", token);
            // alimentation d'un header par défault sur toutes les requètes HTTP
            setAxiosToken(token);
        });
}

/**
 * Positionne le token sur axios
 * @param token
 */
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application
 */
function setup() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration *1000 > new Date().getTime()) {
            setAxiosToken(token);
            console.log("AuthSetup fonctionnel")
        }
    }
}

/**
 * Permet de savoir si on est authentifié ou non
 * @returns {boolean}
 */
function isAuthenticated(){
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration *1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

function valueUser(){
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {season: season} = jwtDecode(token);
        return season;
    }
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
    valueUser
}