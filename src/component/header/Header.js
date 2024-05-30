import './Header.css';
import React from 'react';
const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mx-auto">
                <div className="container-fluid">
                  <a className="navbar-brand" href="#">Cash Do What</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                      <a className="nav-link active" aria-current="page" href="#">Home</a>
                      <a className="nav-link" href="#">Features</a>
                      <a className="nav-link" href="#">Pricing</a>
                      <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                        <div className="col">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control input-text" placeholder="Search products...." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-primary btn-lg" type="button"><i className="bi bi-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </nav>
    );
}

export default Header;