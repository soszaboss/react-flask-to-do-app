import React from 'react';
import './SearchBar.css'


const SearchBar = () => {
    return (
        <div className="row height d-flex justify-content-center align-items-center w-25">
              <div className="col">
                <div className="search-form">
                  <i class="bi bi-search"></i>
                  <input type="text" className="form-control search-form-input" placeholder="Search anything..." />
                </div>
              </div>
        </div>
    );
}

export default SearchBar;