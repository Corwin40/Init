import React from "react"
import {NavLink} from "react-router-dom";

const NavBar =() => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Init</NavLink>
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
                    <li className="nav-item">
                        <NavLink className="btn btn-secondary" to="/register">S'inscrire</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="btn btn-primary" to="/login">Connexion</NavLink>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-success">Déconnection</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;