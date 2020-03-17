import React, { useEffect, useState } from 'react';
import Pagination from "../../components/Pagination";
import UsersAPI from "../../services/WebApp/UsersAPI";

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

    // mise en place de la fonction de suppression d'un customer
    const handleDelete = async id => {
        const originalUsers = [...users];                        // copie du tableau des customers
        setUsers(users.filter(user => user.id !== id));
        try {
            await UsersAPI.deleteCustomers(id);
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
            <h1>Liste des utilisateurs</h1>

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
                        <td></td>
                        <td>{user.createat}</td>
                        <td>{user.updateat}</td>

                        <td>
                            <button
                                onClick={() => handleDelete(user.id)}                       // Active la fonction "handleDelete"
                                // disabled={user.invoices.length > 0}                         // Désactive le bouton si le nombre de facture est supérieur à zéro
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