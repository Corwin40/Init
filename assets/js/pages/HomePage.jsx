import React from "react";

const HomePage = (props) => {



    return(
        <div className="jumbotron">
            <h1 className="display-3">Bienvenue, visiteur !</h1>
            <p className="lead">Vous êtes actuellement sur la page d'accueil de l'application d'administration.</p>
            <hr className="my-4"/>
                <p>Si en cliquant sur un hyperlien, tu tomnes sur cette page, c'est que l'application est en cours de développement.<br/>Le module où la page sera bientôt disponible</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#" role="button">En savoir plus</a>
                </p>
        </div>
    );
};

export default HomePage;