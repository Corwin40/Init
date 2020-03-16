import '../css/admin.scss';
import NavBar from "./components/Navbar";
import React from "react";
import ReactDOM from "react-dom";

//Appel Bootstrap - JQuery && dépendances
const $ = require('jquery');
require('bootstrap');

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

const Admin =() => {
    return (
        <>
            <NavBar/>
        </>
    );
};

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);