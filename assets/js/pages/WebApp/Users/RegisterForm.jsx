import React, {useState, UseEffect} from 'react';
import Field from "../../../components/forms/Fields";
import {Link} from "react-router-dom";
import moment from 'moment';
import UsersAPI from "../../../services/WebApp/UsersAPI";

const RegisterForm = ({history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD-MM-YYYY');

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        createAt:formatDate(date),
        updateAt:formatDate(date)
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({... user, [name]:value});
    };

    // Gestion de la soumission du formulaire et des erreurs
    const handleSubmit = async event => {
        event.preventDefault();
        // gestion js pour le cas de mots de passe différents
        const apiErrors = {};
        if(user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Attention, les mots de passe ne correspondent pas !!";
            setErrors(apiErrors);
            return;
        }

        try{
            const response = await UsersAPI.register(user);
            setErrors({});
            history.replace("/login");
        } catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }
    };

    return(
        <>
            <h1>S'inscrire</h1>

            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    label="Prénom"
                    type="text"
                    placeholder="Entrez votre Prénom"
                    onChange={handleChange}
                    value={user.firstName}
                    error={errors.firstName}
                />
                <Field
                    name="lastName"
                    label="Nom de famille"
                    type="text"
                    placeholder="Entrez votre nom"
                    onChange={handleChange}
                    value={user.lastName}
                    error={errors.lastName}
                />
                <Field
                    name="email"
                    label="E-Mail"
                    type="email"
                    placeholder="votre E-Mail"
                    onChange={handleChange}
                    value={user.email}
                    error={errors.email}
                />
                <Field
                    name="password"
                    label="Mot de passe"
                    type="text"
                    onChange={handleChange}
                    value={user.password}
                    error={errors.password}
                />
                <Field
                    name="passwordConfirm"
                    label="Confirmation de votre mot de passe"
                    type="text"
                    onChange={handleChange}
                    value={user.passwordConfirm}
                    error={errors.passwordConfirm}
                />

                <div className="form-group">
                    <button className="btn btn-sm btn-success mr-1">Confirmation</button>
                    <Link to="/login" className="btn btn-sm btn-secondary">J'ai déja un compte</Link>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;