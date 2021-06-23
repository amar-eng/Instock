import React, { Component } from "react";
import "./ItemAdd.scss";
import icon from "../../assets/Icons/arrow_back-24px.svg";
import { API_URL } from "../../utils/api";
import axios from "axios";
import InventoryForm from "../InventoryForm/InventoryForm";
import { Redirect } from 'react-router-dom'

class ItemAdd extends Component {
  state = {
    itemName: {
      value: "",
      error: false,
    },
    description: {
      value: "",
      error: false,
    },
    category: {
      value: "",
      error: false,
    },
    status: {
      value: "",
      error: false,
    },
    quantity: {
      value: "",
      error: false,
    },
    warehouse: {
      value: "",
      error: false,
    },
    warehouses: [],
    redirect: false
  };

  componentDidMount() {
    this.baseState = this.state;
    this.availableWarehouses();
  }

  createNewItem = (data) => {
    const objToSend = {
      warehouseID: this.state.warehouses[data.warehouse].id,
      warehouseName: this.state.warehouses[data.warehouse].name,
      itemName: data.itemName,
      description: data.description,
      status: data.status,
      category: data.category,
      quantity: data.quantity
    }

    //use axios to create new inventory item from backend
    axios
      .post(API_URL + "/inventory", objToSend)
      .then((response) => {
        this.setState(this.baseState);
        this.setRedirect();
      })
      .catch((error) => console.log(error));
  };

  //the following code is for redirecting after new item added
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/inventory' />
    }
  }

  availableWarehouses = () => {
    axios
        .get(API_URL + "/warehouse")
        .then(res => {
            const warehouses = res.data.map((warehouse) => 
            {return {name: warehouse.name, id: warehouse.id}})
            this.setState({warehouses: warehouses})
        })
  }

  onChangeField = (e) => {
    if(e.target.name !== "warehouse") {
        this.setState({
            [e.target.name]: {
              value: e.target.value,
              error: false,
            },
          });
    } else {
        this.setState({
            warehouse: {
              value: this.state.warehouses[e.target.value],
              error: false,
            },
          });
    }
  };

  onSubmitForm = (e) => {
    const {
      itemName,
      description,
      category,
      status,
      quantity,
      warehouse
    } = e.target;

    //Edge case where we are out of stock or didn't set status
    let quantityValue;
    if(!status.value || status.value==="Out of Stock"){
        quantityValue = 0;
    } else {
        quantityValue = parseInt(quantity.value, 10);
    }

    const data = {
      itemName: itemName.value,
      description: description.value,
      category: category.value,
      status: status.value,
      quantity: quantityValue,
      warehouse: warehouse.value
    };

    // if any object key's value is empty, then set error to
    // be true for that object
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        this.setState({
          [key]: { value: "", error: true },
        });
        return false;
      }
    });

    // if at least one item is empty set isEmpty to that value which is
    // just ""

    const isEmpty = Object.values(data).find((item) => {
      return item === "";
    });

    // if isEmpty does not exist it will return undefined and
    // finally we can submit the form

    if (isEmpty === undefined) {
      this.createNewItem(data);
    }
  };
  goBack = (e) => {
    e.preventDefault();

    this.props.history.goBack();
  };

  render() {
    return (
      <div className="item-add">
        {/* redirect to previous page if we need to */}
        {this.renderRedirect()} 
        <div className="item-add__title">
          <button className="item-add__button" onClick={this.goBack}>
            <img src={icon} alt={"icon"} />
          </button>
          <h1 className="item-add__title-text">Add New Inventory Item</h1>
        </div>
        <InventoryForm
          onChangeField={this.onChangeField}
          onSubmitForm={this.onSubmitForm}
          {...this.state}
        />
      </div>
    );
  }
}

export default ItemAdd;