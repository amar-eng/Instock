import React, { Component } from 'react';
import { BASE_URL } from '../../utils/utils';
import ItemDetails from '../ItemDetails/ItemDetails';
import axios from 'axios';
import './InventoryItem.scss';

class InventoryItem extends Component {
    state = {
        foundItem: null
    }

    fetchSingleItem = () => {
        const queryItemID = this.props.match.params.itemid;

        axios
            .get(`${BASE_URL}/inventory/${queryItemID}`)
                .then(result => {
                    this.setState({
                        foundItem: result.data
                    })
                })
                .catch(error => {
                    console.log('Error: ' + error);
                })
    }

    componentDidMount() {
        this.fetchSingleItem();
    }
    
    render() {
        return (
            <section className='inventory-item'>
                {this.state.foundItem &&
                    <ItemDetails 
                        key={this.state.foundItem.id}
                        itemId={this.state.foundItem.id}
                        itemName={this.state.foundItem.itemName}
                        itemDesc={this.state.foundItem.description}
                        itemCat={this.state.foundItem.category}
                        itemStatus={this.state.foundItem.status}
                        itemQty={this.state.foundItem.quantity}
                        itemWarehouse={this.state.foundItem.warehouseName}
                    />}
            </section>
        );
    }
}

export default InventoryItem;