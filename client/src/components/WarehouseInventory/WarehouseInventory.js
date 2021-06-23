import './WarehouseInventory.scss';
import WarehouseInventoryList from '../WarehouseInventoryList/WarehouseInventoryList';
import WarehouseDetails from '../WarehouseDetails/WarehouseDetails';
//Import Icons
import sortIcon from '../../assets/Icons/sort-24px.svg';
import editIcon from '../../assets/Icons/edit-white-24px.svg';
import backIcon from '../../assets/Icons/arrow_back-24px.svg';
//Import packages
import axios from 'axios';
import {Link} from 'react-router-dom';
import { BASE_URL, sortingData } from '../../utils/utils';
import { Component } from 'react';

class WarehouseInventory extends Component {
    state = {
        inventoryList: null,
        warehouseData: null
    }
    //edited to only get the inventory for this warehouse
    fetchInventory = () => {
        axios
            .get(`${BASE_URL}/warehouse/${this.props.match.params.warehouseid}`)
                .then(result => {
                    //this api returns warehouse info at res.data[0] and also inventory at res.data[1]
                    this.setState({
                        inventoryList: result.data[1], warehouseData: result.data[0]
                    });
                    console.log(result.data[0]);
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
        if(this.state.warehouseData) {
            return (
                <section className='warehouse-inventory'>
                    <div className='warehouse-inventory__container'>
                        <div className='warehouse-inventory__header'>
                            <h2 className='warehouse-inventory__title'><Link to="/"><img src={backIcon} alt='' className="warehouse-inventory__back-icon"/></Link>{this.state.warehouseData.name}</h2>
                            <Link to={'/warehouse/edit/' + this.state.warehouseData.id} className='warehouse-inventory__button'><img src={editIcon} alt='' className="warehouse-inventory__button-image"/>
                                <p className="warehouse-inventory__button-text">Edit</p>
                            </Link>
                        </div>
                        <WarehouseDetails info={this.state.warehouseData}/>
                        <div className='warehouse-inventory__heading-container'>
                            <p className='warehouse-inventory__table-heading warehouse-inventory__table-heading--item' onClick={() => {this.sortTable('itemName')}}>INVENTORY ITEM<img src={sortIcon} alt=''/></p>
                            <p className='warehouse-inventory__table-heading' onClick={() => {this.sortTable('category')}}>CATEGORY<img src={sortIcon} alt=''/></p>
                            <p className='warehouse-inventory__table-heading' onClick={() => {this.sortTable('status')}}>STATUS<img src={sortIcon} alt=''/></p>
                            <p className='warehouse-inventory__table-heading' onClick={() => {this.sortTable('quantity')}}>QTY<img src={sortIcon} alt=''/></p>
                            <p className='warehouse-inventory__table-heading'>ACTIONS</p>
                        </div>
                        <div className='warehouse-inventory__table'>
                        {this.state.inventoryList && this.state.inventoryList.map(inventory => 
                            <WarehouseInventoryList 
                            key={inventory.id}
                            id ={inventory.id}
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
        } else return <p>Loading</p>
    }
};
export default WarehouseInventory;