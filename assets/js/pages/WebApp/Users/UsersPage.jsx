import React, { useEffect, useState } from 'react';
import moment from "moment";
import Pagination from "../../../components/Pagination";
import UsersAPI from "../../../services/WebApp/UsersAPI";
import {Link} from "react-router-dom";

const UsersPage = (props) => {

    // Déclaration des constantes React
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        try {
            const data = await UsersAPI.findAll();
            setUsers(data);
        } catch (error) {
            console.log(error.response)
        }
    };

    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchUsers();
    }, []);

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // mise en place de la fonction de suppression d'un customer
    const handleDelete = async id => {
        const originalUsers = [...users];                        // copie du tableau des customers
        setUsers(users.filter(user => user.id !== id));
        try {
            await UsersAPI.delete;
        }catch(error){
            setUsers(originalUsers);
            console.log(error.response);
        }
    };

    // fonction pour capturer la nouvelle valeur de pagination
    const handleChangePage = page => setCurrentPage(page);

    // Mise en place de la fonction de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;

    // Moteur de recherche sur la requète
    const filteredUsers = users.filter(
        u =>
            u.firstName.toLowerCase().includes(search.toLowerCase()) ||
            u.lastName.toLowerCase().includes(search.toLowerCase())
    );

    // mise en place de l'alimentation des pages de paginations
    const paginatedUsers = Pagination.getStart(
        filteredUsers,
        currentPage,
        itemsPerPage
    );

    return(
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Tableau de bord : <small>Gestion des utilisateurs</small></h1>
                <Link to="/" className="btn btn-sm btn-secondary">Ajouter un adhérent</Link>
            </div>

            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..."/>
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Nom et Prénom</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Créer le</th>
                    <th>Modifier le</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedUsers.map(user => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><a href="#">{user.firstName} {user.lastName}</a></td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{formatDate(user.createAt)}</td>
                        <td>{formatDate(user.updateAt)}</td>

                        <td>
                            <Link className="btn btn-sm btn-primary mr-1" to={"/users/" + user.id}>Editer</Link>
                            <button
                                onClick={() => handleDelete(user.id)}                       // Active la fonction "handleDelete"
                                className="btn btn-sm btn-danger">Supprimer</button></td>
                    </tr>
                ))}
                </tbody>
            </table>

            {itemsPerPage < filteredUsers.length && <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredUsers.length}
                onPageChanged={handleChangePage}
            />}
        </>
    );
};

export default UsersPage;