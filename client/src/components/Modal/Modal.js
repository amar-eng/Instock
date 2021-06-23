import React, { Component } from 'react';
import './Modal.scss'
import close from '../../assets/Icons/close-24px.svg'
import Axios from 'axios';
import { BASE_URL } from '../../utils/utils'; 
class Modal extends Component {
    
    deleteHandler = (e) =>{
        e.preventDefault();
        // window.location.reload() ; 
        
        console.log('the id: ', this.props.id)

        Axios.delete(`${BASE_URL}/inventory/${this.props.id}`)
        .then(response =>{
            console.log(response.data)
            this.props.updatedList(response.data.inventory)
            this.props.closed(); 
        })
        .catch(error => console.log('Error: ',error))

        Axios.delete(`${BASE_URL}/warehouse/${this.props.id}`)
        .then(response =>{
            // console.log('updated list',this.props.updatedList)
            this.props.updatedList(response.data.warehouse)

            this.props.closed(); 
        })
        .catch(error => console.log('Error: ',error))
    }
        
    



    render() {
        const {show,closed,item,name, place} = this.props;
        
        const showHideClassName = show ? "modal-wrapper" : " display-none";
        return (
            <div className = {showHideClassName}>
             <div className = 'modal' >
                 <img src = {close} className = "modal__close" alt = "Modal-close" onClick={closed}/>
                 <div className = "modal__header">
                     <p className="modal__title">Delete {item} {name}?</p>
                 </div>
                 <div className = "modal__content">
                     <p className="modal__body"> Please confirm that you'd like to delete {item} from the {place} list. You won't be able to undo this action</p>
                 </div>
                 <div className = "modal__footer">
                    <p className="modal__cancel" onClick={closed}>Cancel</p>
                     
                    <p className="modal__delete" onClick={this.deleteHandler} >Delete</p> 
            
                 </div>
             </div>
         </div>
        );
    }
}

export default Modal;



