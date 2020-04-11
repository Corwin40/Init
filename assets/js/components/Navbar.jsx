import React, {useContext, useState} from 'react';
import {NavDropdown, Dropdown} from 'react-bootstrap';
import authAPI from "../services/authAPI";
import {NavLink} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import UsersAPI from "../services/Admin/UsersAPI";
import {toast} from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCopyright} from '@fortawesome/free-regular-svg-icons';


authAPI.setup();

const NavBar =({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const [user, setUser] = useState(
        authAPI.valueUser()
    );

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes déconnecté");
        history.push("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand d-flex align-items-center" to={(!isAuthenticated && "/home") || "/dashboard"}><FontAwesomeIcon icon={faCopyright} style={{ fontSize: '1.75em' }}/><div className="mx-2">Structure</div></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                    aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">

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
                            <NavDropdown title={"Bienvenue " + user.firstname + " " + user.lastname} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#/home">Mon Compte</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Déconnexion</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;