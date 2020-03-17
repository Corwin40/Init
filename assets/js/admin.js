import '../css/admin.scss';
import NavBar from "./components/Navbar";
import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/WebApp/UsersPage";
import {HashRouter, Switch, Route} from "react-router-dom";

//Appel Bootstrap - JQuery && dépendances
const $ = require('jquery');
require('bootstrap');

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

const Admin =() => {
    return (
        <HashRouter>
            <NavBar/>

            <main className="container-fluid pt-5">
                <Switch>
                    <route path="/users" component={UsersPage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </main>
        </HashRouter>
    );
};

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);