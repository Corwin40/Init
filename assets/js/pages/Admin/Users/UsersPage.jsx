import React, { useEffect, useState } from 'react';
import moment from "moment";
import Pagination from "../../../components/Pagination";
import UsersAPI from "../../../services/Admin/UsersAPI";
import {Link} from "react-router-dom";
import TableLoader from "../../../components/loaders/TableLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';




const UsersPage = (props) => {

    // Déclaration des constantes React
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");
    const [loading, setLoading] =useState(true);

    const fetchUsers = async () => {
        try {
            const data = await UsersAPI.findAll();
            setUsers(data);
            setLoading(false);
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
            await UsersAPI.delete(id);
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
            u.firstname.toLowerCase().includes(search.toLowerCase()) ||
            u.lastname.toLowerCase().includes(search.toLowerCase())
    );

    // mise en place de l'alimentation des pages de paginations
    const paginatedUsers = Pagination.getStart(
        filteredUsers,
        currentPage,
        itemsPerPage
    );

    return(
        <>
            <div className="row">
                <div className="col-8">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1>Tableau de bord : <small>Gestion des utilisateurs</small></h1>
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..."/>
                    </div>
                </div>
                <div className="col-2">
                    <Link to="/users/new" className="btn btn-sm btn-secondary"><FontAwesomeIcon icon={faPlusCircle} /> Ajouter un adhérent</Link>
                </div>
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Nom et Prénom</th>
                    <th>Email</th>
                    <th>Compte actif ?</th>
                    <th>Créer le</th>
                    <th>Modifier le</th>
                    <th></th>
                </tr>
                </thead>
                {!loading && <tbody>
                {paginatedUsers.map(user => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><a href="#">{user.firstname} {user.lastname}</a></td>
                        <td>{user.email}</td>
                        <td>{user.isactive > 0 && <p>Oui</p> || <p>Non</p> }</td>
                        <td>{formatDate(user.createat)}</td>
                        <td>{formatDate(user.updateat)}</td>
                        <td>
                            <Link
                                className="btn btn-sm btn-primary mr-1"
                                to={"/users/" + user.id}><FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <button
                                onClick={() => handleDelete(user.id)}                       // Active la fonction "handleDelete"
                                className="btn btn-sm btn-danger">
                                <FontAwesomeIcon icon={faUserTimes} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>}
            </table>
            {loading && <TableLoader/>}

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