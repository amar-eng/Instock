import React, { Component } from 'react';
import './Homepage.scss'
import Headers from '../components/header/Header'
import SearchBar from '../components/searchbar/Searchbar'; 
import InfoContent from '../components/infoContent/InfoContent'
class HomePage extends Component {
    render() {
        return (
            <div className= "home">
                <div className = "home__card">
                    <div className = "home__header-items">
                        <Headers title ="Warehouses"/>
                        <SearchBar/>
                        <div className ="home__button">+Add New Warehouse </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default HomePage;