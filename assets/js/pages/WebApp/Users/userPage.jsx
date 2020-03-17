import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Field from "../../../components/forms/Fields";
import UsersAPI from "../../../services/WebApp/UsersAPI";

const UserPage = ({match, history}) => {

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [user, setUser] = useState({
        firstName: "",
        lastName:"",
        email:"",
        phone:"",
        nfcUniq:""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName:"",
        email:"",
        phone:"",
        nfcUniq:""
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchUser = async id =>{
        try{
            const {firstName, lastName, email, phone, nfcUniq} = await UsersAPI.findOne(id);
            setUser({firstName, lastName, email, phone, nfcUniq})
        } catch (error) {
            console.log(error.response);
        }
    };

    const [editing, setEditing] = useState(false);
    useEffect(()=>{
        if(id!== "new")
            setEditing(true);
        fetchUser(id);
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({... user, [name]:value});
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            if (editing) {
                const response = await UsersAPI.updateOne(id, member);
            }else{
                const response = await UsersAPI.newOne(member);
                setErrors({});

                history.replace("/users");
            }

        } catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-content mb-3">
                {!editing && <h1>Ajout d'un utilisateur</h1> || <h1>Modification de l'utilisateur</h1>}
            </div>


            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    label="Prénom de l'adhérent"
                    placeholder="Entrer le prénom"
                    type="text"
                    value={user.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field
                    name="lastName"
                    label="Nom de l'adhérent"
                    placeholder="Entrer le nom"
                    type="text"
                    value={user.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="email"
                    label="E-mail de l'adhérent"
                    placeholder="Entrer l'E-mail"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field
                    name="phone"
                    label="Contact téléphonique"
                    placeholder="00.00.00.00.00"
                    type="text"
                    value={user.phone}
                    onChange={handleChange}
                    error={errors.phone}
                />
                <Field
                    name="nfcUniq"
                    label="Identifiant"
                    placeholder=""
                    type="text"
                    value={user.nfcUniq}
                    onChange={handleChange}
                />

                <div className="form-group">
                    <button className="btn btn-sm btn-success mr-1">Ajouter</button>
                    <Link to="/adherents" className="btn btn-sm btn-secondary">Retour à la liste</Link>
                </div>


            </form>
        </>
    )
};

export default UserPage;