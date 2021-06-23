import './TotalInventory.scss';
import InventoryList from '../InventoryList/InventoryList';
import sortIcon from '../../assets/Icons/sort-24px.svg';
import axios from 'axios';
import { BASE_URL, sortingData } from '../../utils/utils';
import { Component } from 'react';
import {Link} from 'react-router-dom';


class TotalInventory extends Component {
    state = {
        inventoryList: null,
        sortOrder: null,
        sortColumn: null
    }
    
    fetchInventory = () => {
        axios
            .get(`${BASE_URL}/inventory`)
                .then(result => {
                    this.setState({
                        inventoryList: result.data
                    });
                })
                .catch(error => {
                    console.log('Error: ' + error);
                })
    }

    sortTable = column => {
        const inventoryData = this.state.inventoryList;
        
        // Conditionals
        const isColumn = this.state.sortColumn === column;
        const isAscending = this.state.sortOrder === 'asc';
        const isColumnAsc = isColumn && isAscending;

        // Validate column being clicked to dictate sorting order and update state
        if (!isColumn || isColumnAsc) {
            const sortArr = sortingData(inventoryData, column, 'asc')
            this.setState ({
                inventoryList: sortArr,
                sortOrder: 'desc',
                sortColumn: column
            })
        } else {
            const sortArr = sortingData(inventoryData, column, 'desc')
            this.setState ({
                inventoryList: sortArr,
                sortOrder: 'asc',
                sortColumn: column
            })
        }
    }

    componentDidMount() {
        this.fetchInventory();
        this.updateList =(updateData)=>{
            this.setState ({
                inventoryList:updateData
            })
        }
    }
   
    render() {
        return (
            <section className='total-inventory'>
                <div className='total-inventory__container'>
                    <div className='total-inventory__header'>
                        <h2 className='total-inventory__title'>Inventory</h2>
                        <input className='total-inventory__search' placeholder='Search...'></input>
                        <Link to="/inventory/add"><button className='total-inventory__button'>+ Add New Item</button></Link>
                    </div>
                    <div className='total-inventory__heading-container'>
                        <p className='total-inventory__table-heading total-inventory__table-heading--item' onClick={() => {this.sortTable('itemName')}}>INVENTORY ITEM<img src={sortIcon} alt=''/></p>
                        <p className='total-inventory__table-heading' onClick={() => {this.sortTable('category')}}>CATEGORY<img src={sortIcon} alt=''/></p>
                        <p className='total-inventory__table-heading' onClick={() => {this.sortTable('status')}}>STATUS<img src={sortIcon} alt=''/></p>
                        <p className='total-inventory__table-heading' onClick={() => {this.sortTable('quantity')}}>QTY<img src={sortIcon} alt=''/></p>
                        <p className='total-inventory__table-heading' onClick={() => {this.sortTable('warehouseName')}}>WAREHOUSE<img src={sortIcon} alt=''/></p>
                        <p className='total-inventory__table-heading'>ACTIONS</p>
                    </div>
                    <div className='total-inventory__table'>
                    {this.state.inventoryList && this.state.inventoryList.map(inventory => 
                        <InventoryList 
                        key={inventory.id}
                        id ={inventory.id}
                        warehouseName={inventory.warehouseName}
                        itemCat={inventory.category}
                        itemName={inventory.itemName}
                        itemQty={inventory.quantity}
                        itemStatus={inventory.status}
                        updatedList={this.updateList}
                        />)}
                    </div>
                </div>
                
            </section>
        );
    }
};
export default TotalInventory;