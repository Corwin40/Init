import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Field from "../../../components/forms/Fields";
import UsersAPI from "../../../services/Admin/UsersAPI";
import moment from "moment";

const UserPage = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD-MM-YYYY');

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [user, setUser] = useState({
        firstname: "",
        lastname:"",
        email:"",
        isactive:"",
        createat:formatDate(date),
        updateat:formatDate(date)
    });

    const [errors, setErrors] = useState({
        firstname: "",
        lastname:"",
        email:"",
        isactive:"",
        createat:"",
        updateat:""
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchUser = async id =>{
        try{
            const {firstname, lastname, email, isactive, updateat} = await UsersAPI.findOne(id);
            setUser({firstname, lastname, email, isactive, updateat})
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
                const response = await UsersAPI.updateOne(id, user);
            }else{
                const response = await UsersAPI.newOne(user);
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
                    name="firstname"
                    label="Prénom de l'utilisateur"
                    placeholder="Entrer le prénom"
                    type="text"
                    value={user.firstname}
                    onChange={handleChange}
                    error={errors.firstname}
                />
                <Field
                    name="lastname"
                    label="Nom de l'utilisateur"
                    placeholder="Entrer le nom"
                    type="text"
                    value={user.lastname}
                    onChange={handleChange}
                    error={errors.lastname}
                />
                <Field
                    name="email"
                    label="E-mail de l'utilisateur"
                    placeholder="Entrer l'E-mail"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                {!editing &&
                <Field
                    name="createat"
                    label="Créer le"
                    type="text"
                    value={user.createat}
                    onChange={handleChange}
                    error={errors.createat}
                />
                ||
                <Field
                    name="updateat"
                    label="Mise à jour"
                    type="text"
                    value={formatDate(date)}
                    onChange={handleChange}
                    error={errors.updateat}
                />
                }


                <div className="form-group">
                    {!editing && <button className="btn btn-sm btn-success mr-1">Ajouter</button> || <button className="btn btn-sm btn-success mr-1">Modifier</button>}

                    <Link to="/users" className="btn btn-sm btn-secondary">Retour à la liste</Link>
                </div>


            </form>
        </>
    )
};

export default UserPage;