import '../css/admin.scss';
import NavBar from "./components/Navbar";
import React, { useState, useContext} from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import UsersPage from "./pages/Admin/Users/UsersPage";
import UserPage from "./pages/Admin/Users/userPage";
import LoginPage from  "./pages/LoginPage";
import RegisterForm from "./pages/Admin/Users/RegisterForm";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import authAPI from "./services/authAPI";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//Appel Bootstrap - JQuery && dépendances
const $ = require('jquery');
require('bootstrap');

console.log('Hello Webpack Encore! Edit me in assets/js/admin.js');

authAPI.setup();

const Admin = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        authAPI.isAuthenticated()
    );

    const NavBarWithRouter = withRouter(NavBar);

    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated
        }}>
        <HashRouter>
            <NavBarWithRouter/>

            <main className="container-fluid pt-5">
                <Switch>

                    <Route path="/login"
                           render={props=>(<LoginPage onLogin={setIsAuthenticated} {...props} />
                           )}
                    />
                    <Route path="/register" component={RegisterForm}/>

                    <PrivateRoute path="/users/new" component={UserPage} />
                    <PrivateRoute path="/users/:id" component={UserPage} />
                    <PrivateRoute path="/users" component={UsersPage} />

                    <Route path="/home" component={HomePage}/>

                    <Route path="/" component={LoginPage}/>
                </Switch>
            </main>
        </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_CENTER}/>
        </AuthContext.Provider>
    );
};

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);