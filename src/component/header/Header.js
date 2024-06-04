import React from 'react';
import './Header.css';
// import SearchBar from './search-bar/SearchBar'

const NavBar = () => {
  return (
    <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand fs-1 fw-bolder">To Do List</a>
              {/* <SearchBar /> */}
            </div>
    </nav>
  );
}
const Header = () => {
      return (
        <header className='container mb-4'>
          <NavBar />
        </header>
      );
}

export default Header;