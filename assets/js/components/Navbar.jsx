import React, {useContext, useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import authAPI from "../services/authAPI";
import {NavLink} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import UsersAPI from "../services/Admin/UsersAPI";
import {toast} from "react-toastify";

authAPI.setup();

const NavBar =({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const [user, setUser] = useState([]);

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes déconnecté");
        history.push("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/home">Init</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                    aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users">Utilisateurs</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/Register" className="btn btn-secondary mr-1">
                                    Inscription
                                </NavLink>
                            </li>
                            <li className="navitem">
                                <NavLink to="/login" className="btn btn-success mr-1">
                                    Connexion
                                </NavLink>
                            </li>
                        </>
                    )) || (
                        <>
                            <Dropdown>
                                <Dropdown.Toggle variant="default" id="dropdown-basic">
                                    Mon Compte
                                </Dropdown.Toggle>

                                <Dropdown.Menu alignRight>
                                    <Dropdown.Item href="#/home">Gestion du compte</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;