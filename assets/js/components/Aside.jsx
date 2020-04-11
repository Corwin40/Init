import React, {useContext, useState} from 'react';
import {NavDropdown, Dropdown} from 'react-bootstrap';
import authAPI from "../services/authAPI";
import {NavLink, Link} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import CondensedContext from "../contexts/CondensedContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTachometerAlt, faCogs } from '@fortawesome/free-solid-svg-icons';

authAPI.setup();

const Aside =() => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const {isCondensed, setIsCondensed} = useContext(CondensedContext);

    const handleChangeAside = () =>{}

    return (
        <aside id="OpAside" className={(!isCondensed && "large col-12 col-md-2 p-0 bg-dark") || "condensed col-12 col-md-2 p-0 bg-dark" }>
            <header>
                <nav className="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start">
                    <NavLink className="navbar-brand d-flex align-items-center" to={(!isAuthenticated && "/home") || "/dashboard"}><FontAwesomeIcon icon={faBars} style={{ fontSize: '1.75em' }}/><div className="mx-2">OpenGaia</div></NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                            aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
            </header>
            <nav className="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start">
                <div className="collapse navbar-collapse">
                    <ul className="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                        <li className="nav-item">
                            <Link className="nav-link pl-0 d-flex align-items-center" to={(!isAuthenticated && "/home") || "/dashboard"}><FontAwesomeIcon icon={faTachometerAlt} style={{ fontSize: '1.75em' }}/><div className="mx-2">Tableau de bord</div></Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link pl-0 d-flex align-items-center" href="#"><FontAwesomeIcon icon={faCogs} style={{ fontSize: '1.75em' }}/><div className="mx-2">Paramètres</div></a>
                            <ul className="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                                <li className="nav-item">
                                    <Link className="nav-link pl-0 d-flex align-items-center" to="/users"><FontAwesomeIcon icon={faTachometerAlt} style={{ fontSize: '1em' }}/><div className="mx-2">Utilisateurs</div></Link>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </nav>
        </aside>
    );
};

export default Aside;