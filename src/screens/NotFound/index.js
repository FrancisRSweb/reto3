import React from 'react';
// importing components
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index';
// Not Found Component
const NotFound = () => (
  <div>
     <nav className="navbar navbar-expand-lg navbar-expand-xl navbar-dark bg-danger fixed-top">
              <div className="container">
                <a className="navbar-brand" href="/#top">React Movies</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                      <a className="nav-link" href="/#top"><i className="fas fa-home"></i> Inicio</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/#premiere"><i className="fas fa-ticket-alt"></i> Estrenos</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/#trend"><i className="fas fa-medal"></i> Más populares</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/#favs"><i className="fas fa-star"></i> Favoritas</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>        
      <div className="col-12 text-center m-8">
          <h1>Lo sentimos. </h1>
          <p>No encontramos esta página.</p>
          <Link to="/">Aquí puedes volver al Inicio.</Link>
      </div>
      <Footer />
  </div>
);

export default NotFound;