import React, { Component } from 'react';
import WarehouseList from '../WarehouseList/WarehouseList';
import axios from 'axios';
import { BASE_URL, sortingData } from '../../utils/utils';

import sortIcon from '../../assets/Icons/sort-24px.svg';
import './HomePage.scss'
import {Link} from 'react-router-dom'; 

class HomePage extends Component {
    state = {
        warehouseList: null,
        sortOrder: null,
        sortColumn: null
    }
    
    fetchInventory = () => {
        axios
            .get(`${BASE_URL}/warehouse`)
                .then(result => {
                    console.log(result.data[0].contact);
                    this.setState({
                        warehouseList: result.data
                    });
                })
                .catch(error => {
                    console.log('Error: ' + error);
                })
    }

    sortTable = (column, column2) => {
        const warehouseData = this.state.warehouseList;
        
        // Conditionals
        const isColumn = this.state.sortColumn === column;
        const isAscending = this.state.sortOrder === 'asc';
        const isColumnAsc = isColumn && isAscending;

        // Validate column being clicked to dictate sorting order and update state
        if (!isColumn || isColumnAsc) {
            const sortArr = sortingData(warehouseData, column, 'asc', column2)
            this.setState ({
                warehouseList: sortArr,
                sortOrder: 'desc',
                sortColumn: column
            })
        } else {
            const sortArr = sortingData(warehouseData, column, 'desc', column2)
            this.setState ({
                warehouseList: sortArr,
                sortOrder: 'asc',
                sortColumn: column
            })
        }
    }

    componentDidMount() {
        this.fetchInventory();
        this.updateList =(updateData)=>{
            this.setState ({
                warehouseList:updateData
            })
        }
    }


    render() {
        return (
            
            <section className='warehouse-main'>
            <div className='warehouse-main__container'>
                <div className='warehouse-main__header'>
                    <h2 className='warehouse-main__title'>Warehouses</h2>
                    <input className='warehouse-main__search' placeholder='Search...'></input>
                    <Link to ='/warehouse/add'>
                        <button className='warehouse-main__addbutton'>+ Add New Warehouse</button>
                    </Link>
                </div>
                <div className='warehouse-main__heading-container'>
                    <p className='warehouse-main__table-heading warehouse-main__table-heading--item' onClick={() => {this.sortTable('name')}}>WAREHOUSE<img src={sortIcon} alt=''/></p>
                    <p className='warehouse-main__table-heading warehouse-main__table-heading--address' onClick={() => {this.sortTable('address')}}>ADDRESS<img src={sortIcon} alt=''/></p>
                    <p className='warehouse-main__table-heading warehouse-main__table-heading--name' onClick={() => {this.sortTable('contact', 'name')}}>CONTACT NAME<img src={sortIcon} alt=''/></p>
                    <p className='warehouse-main__table-heading warehouse-main__table-heading--info' onClick={() => {this.sortTable('contact', 'phone')}}>CONTACT INFORMATION <img src={sortIcon} alt=''/></p>
                    <p className='warehouse-main__table-heading'>ACTIONS</p>
                </div>
                <div className='warehouse__table'>
                {this.state.warehouseList && this.state.warehouseList.map( warehouse => 
                    <WarehouseList 
                    key={warehouse.id}
                    id={warehouse.id}
                    name={warehouse.name}
                    address={warehouse.address}
                    city={warehouse.city}
                    country={warehouse.country}
                    contactName={warehouse.contact.name}
                    contactPhone={warehouse.contact.phone}
                    contactemail={warehouse.contact.email}
                    updatedList={this.updateList}
                    />)}
                </div>
            </div>
        </section>
            
        );
    }
}

export default HomePage;