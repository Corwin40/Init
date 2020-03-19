import '../css/admin.scss';
import NavBar from "./components/Navbar";
import React, { useState, useContext} from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import UsersPage from "./pages/WebApp/Users/UsersPage";
import UserPage from "./pages/WebApp/Users/userPage";
import LoginPage from  "./pages/LoginPage";
import RegisterForm from "./pages/WebApp/Users/RegisterForm";
import AuthContext from "./contexts/AuthContext";
import authAPI from "./services/authAPI";

//Appel Bootstrap - JQuery && dépendances
const $ = require('jquery');
require('bootstrap');

console.log('Hello Webpack Encore! Edit me in assets/js/admin.js');

authAPI.setup();

const Admin = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        authAPI.isAuthenticated()
    );

    const NavbarWithRouter = withRouter(Navbar);

    return (
        <HashRouter>
            <NavbarWithRouter/>

            <main className="container-fluid pt-5">
                <Switch>

                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterForm}/>

                    <Route path="/users/:id" component={UserPage} />
                    <Route path="/users" component={UsersPage} />

                    <Route path="/" component={HomePage}/>
                </Switch>
            </main>
        </HashRouter>
    );
};

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);