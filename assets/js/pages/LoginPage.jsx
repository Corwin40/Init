import React, {useState, useContext} from 'react';
import authAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Fields";
import {toast} from "react-toastify";

const LoginPage = ({ history }) => {

    // Gestion de l'authentification par les contexts de Réact
    const { setIsAuthenticated} = useContext(AuthContext);

    // State pour l'alimentation du mot de passe
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    // Gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value});
    };

    //gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();  // Pas de rechargement de la page au submit du formulaire
        try{
            await authAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes maintenant connecté.");
            history.replace("/home");
        }catch(error){
            console.log(error.response);
            toast.error("Des erreurs sont apparues dans le formulaire !!");
            setError("Aucun compte n'existe avec cette adresse ou les informations ne correspondent pas ! ")
        }
    };
    return (
        <>
            <h1>Page de connexion</h1>

            <form onSubmit={handleSubmit}>
                <Field
                    name="username"
                    label="Identifiant"
                    placeholder="Adresse E-mail de connexion"
                    type="text"
                    error={error}
                    onChange={handleChange}
                    value={credentials.username}
                />
                {error && <p className="invalid-feedback">{error}</p>}
                <Field
                    name="password"
                    label="Mot de passe"
                    placeholder=""
                    type="password"
                    onChange={handleChange}
                    value={credentials.password}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Se connecter</button>
                </div>

            </form>
        </>
        );
};

export default LoginPage;