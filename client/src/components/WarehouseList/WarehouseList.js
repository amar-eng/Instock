import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/Icons/delete_outline-24px.svg';
import editIcon from '../../assets/Icons/edit-24px.svg';
import chevronIcon from '../../assets/Icons/chevron_right-24px.svg';
import './WarehouseList.scss';
import Modal from '../Modal/Modal'

class WarehouseList extends Component {
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

        const { name, address, city, country, contactName, contactPhone, contactemail, id, updatedList } =this.props
        return (
            <div>
                <div className='warehouse'>
                    <div className='warehouse__container'>
                        <h3 className='warehouse__label warehouse__label--hidden'>WAREHOUSE</h3>
                        
                        <Link to={`/warehouse/inventory/${id}`} className='warehouse__link'>{name}<img src={chevronIcon} alt=''/></Link>
                        <div></div>
                    </div>
            
                    <div className='warehouse__container'>
                        <h3 className='warehouse__label warehouse__label--hidden'>CONTACT NAME</h3>
                        <p className='warehouse__paragraph warehouse__paragraph--name'>{contactName}</p>
                        <div></div>
                    </div>
            
                    <div className='warehouse__container warehouse__container--category'>
                        <h3 className='warehouse__label warehouse__label--hidden'>ADDRESS</h3>
                        <p className='warehouse__paragraph warehouse__paragraph--address'>{address}{"\n"}{city},{country}</p>
                        <div></div>
                    </div>
            
                    <div className='warehouse__container'>
                        <h3 className='warehouse__label warehouse__label--hidden'>CONTACT INFORMATION</h3>
                        <p className='warehouse__paragraph'>{contactPhone}{"\n"}{contactemail}</p>
                        <div></div>
                    </div>
            
                    <div className='warehouse__container warehouse__container--buttons'>
                        <button  onClick={this.clickHandler} className='warehouse__button'><img src={deleteIcon} alt=''/></button>

                       
                        <Link to={'warehouse/edit/' + id } className='warehouse__button'><img src={editIcon} alt=''/></Link>
                    </div>
                </div>
                <Modal item={name} show ={this.state.show} closed = {this.closeModalHandler} id ={id} updatedList ={updatedList} name= 'Warehouse' place ="warehouse"/>
            </div>
        );
    }
}

export default WarehouseList;