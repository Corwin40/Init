import '../css/admin.scss';
import NavBar from "./components/Navbar";
import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";

//Appel Bootstrap - JQuery && dépendances
const $ = require('jquery');
require('bootstrap');

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

const Admin =() => {
    return (
        <>
            <NavBar/>

            <main className="container-fluid pt-5">
                <HomePage/>
            </main>
        </>
    );
};

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);