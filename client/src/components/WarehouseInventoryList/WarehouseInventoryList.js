import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/Icons/delete_outline-24px.svg';
import editIcon from '../../assets/Icons/edit-24px.svg';
import chevronIcon from '../../assets/Icons/chevron_right-24px.svg';
import './WarehouseInventoryList.scss'
import Modal from '../Modal/Modal'

class WarehouseInventoryList extends Component {

    state = {
        show : false, 
        
    }

    clickHandler = () =>{
     
        this.setState({
            show : true
        })
    }
    closeModalHandler = () =>{
    this.setState({
        show:false
    })
}
   
    render() {
        

        const {itemCat, itemName, itemQty, itemStatus, id, updatedList } = this.props

        return (
        <>
        <div className='warehouse-inventory-list'>
            <div className='warehouse-inventory-list__container'>
                <h3 className='warehouse-inventory-list__label warehouse-inventory-list__label--hidden'>INVENTORY ITEM</h3>
                <Link to={`/inventory/${id}`} className='warehouse-inventory-list__link'>{itemName}<img src={chevronIcon} alt=''/></Link>
            </div>
            <div className='warehouse-inventory-list__container'>
                <h3 className='warehouse-inventory-list__label warehouse-inventory-list__label--hidden'>STATUS</h3>
                <p className={itemStatus === 'In Stock' ? 'warehouse-inventory-list__status warehouse-inventory-list__status--is' : 'warehouse-inventory-list__status warehouse-inventory-list__status--oos'}>{itemStatus}</p>
            </div>
            <div className='warehouse-inventory-list__container warehouse-inventory-list__container--category'>
                <h3 className='warehouse-inventory-list__label warehouse-inventory-list__label--hidden'>CATEGORY</h3>
                <p className='warehouse-inventory-list__paragraph'>{itemCat}</p>
            </div>
            <div className='warehouse-inventory-list__container'>
                <h3 className='warehouse-inventory-list__label warehouse-inventory-list__label--hidden'>QTY</h3>
                <p className='warehouse-inventory-list__paragraph'>{itemQty}</p>
            </div>
            <div className='warehouse-inventory-list__container warehouse-inventory-list__container--buttons'>
                <button onClick={this.clickHandler} className='warehouse-inventory-list__button'><img src={deleteIcon} alt=''/></button>
                <Link to={'/inventory/edit/' + id} className='warehouse-inventory-list__button'><img src={editIcon} alt=''/></Link>
            </div>
        </div>
        <Modal item={itemName} show ={this.state.show} closed = {this.closeModalHandler} id ={id} updatedList ={updatedList} name= 'inventory item' place ="inventory"/>
        </>
        );
    }
}

export default WarehouseInventoryList;