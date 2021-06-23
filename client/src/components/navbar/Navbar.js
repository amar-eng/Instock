import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../assets/Logo/InStock-Logo.svg'; 
import './Navbar.scss';
class Navbar extends Component {

    render() {
        return (
            <div className='navbar__container'>
                <div className = "navbar">
                    <Link to = '/' className="navbar__link">
                        <img src= {logo} className= 'navbar__logo' alt = 'Instock-logo' />
                    </Link>
                    <div className = "navbar__content">
                        <NavLink to='/warehouse' className='navbar__item' activeClassName='is-active'>Warehouse</NavLink>
                        <NavLink to='/inventory' className='navbar__item' activeClassName='is-active'>Inventory</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;