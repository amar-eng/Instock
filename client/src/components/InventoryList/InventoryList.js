import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/Icons/delete_outline-24px.svg';
import editIcon from '../../assets/Icons/edit-24px.svg';
import chevronIcon from '../../assets/Icons/chevron_right-24px.svg';
import './InventoryList.scss'
import Modal from '../Modal/Modal'

class InventoryList extends Component {
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
        const { warehouseName, itemCat, itemName, itemQty, itemStatus, id, updatedList } = this.props 
        return (
            <div>
                 <div className='inventory-list' >
                     <div className='inventory-list__container'>
                         <h3 className='inventory-list__label inventory-list__label--hidden'>INVENTORY ITEM</h3>
                         <Link to={'/inventory/' + id} className='inventory-list__link'>{itemName}<img src={chevronIcon} alt=''/></Link>
                     </div>
                     <div className='inventory-list__container'>
                         <h3 className='inventory-list__label inventory-list__label--hidden'>STATUS</h3>
                         <p className={itemStatus === 'In Stock' ? 'inventory-list__status inventory-list__status--is' : 'inventory-list__status inventory-list__status--oos'}>{itemStatus}</p>
                     </div>
                     <div className='inventory-list__container inventory-list__container--category'>
                         <h3 className='inventory-list__label inventory-list__label--hidden'>CATEGORY</h3>
                         <p className='inventory-list__paragraph'>{itemCat}</p>
                     </div>
                     <div className='inventory-list__container'>
                         <h3 className='inventory-list__label inventory-list__label--hidden'>QTY</h3>
                         <p className='inventory-list__paragraph'>{itemQty}</p>
                     </div>
                     <div className='inventory-list__container inventory-list__container--margin'>
                         <h3 className='inventory-list__label inventory-list__label--hidden'>WAREHOUSE</h3>
                         <p className='inventory-list__paragraph'>{warehouseName}</p>
                     </div>
                     <div className='inventory-list__container inventory-list__container--buttons'>
                         <button onClick={this.clickHandler} className='inventory-list__button btn-openModal'><img src={deleteIcon} alt=''/></button>
                         <Link className='inventory-list__button' to={'/inventory/edit/' + id}><img src={editIcon} alt=''/></Link>
                     </div>
                 </div>
                 <Modal item={itemName} show ={this.state.show} closed = {this.closeModalHandler} id ={id} updatedList ={updatedList} name= 'inventory item' place ="inventory"/>
                
            </div>
        );
    }
}

export default InventoryList;


