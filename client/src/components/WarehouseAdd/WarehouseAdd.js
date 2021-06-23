import React, { Component } from "react";
import "./WarehouseAdd.scss";
import icon from "../../assets/Icons/arrow_back-24px.svg";
import { API_URL } from "../../utils/api";
import axios from "axios";
import WarehouseForm from "../WarehouseForm/WarehouseForm";

class WarehouseAdd extends Component {
  state = {
    warehouseName: {
      value: "",
      error: false,
    },
    address: {
      value: "",
      error: false,
    },
    city: {
      value: "",
      error: false,
    },
    country: {
      value: "",
      error: false,
    },
    contactName: {
      value: "",
      error: false,
    },
    position: {
      value: "",
      error: false,
    },
    number: {
      value: "",
      error: false,
    },
    email: {
      value: "",
      error: false,
    },
    submitted: false,
  };

  componentDidMount() {
    this.baseState = this.state;
  }

  createNewWareHouse = (data) => {
    axios
      .post(API_URL + "/warehouse/add", {
        name: data.warehouseName,
        address: data.address,
        city: data.city,
        country: data.country,
        contact: {
          name: data.contactName,
          position: data.position,
          phone: data.number,
          email: data.email,
        },
      })
      .then((response) => {
        this.setState(this.baseState);
      })
      .catch((error) => console.log(error));
  };

  onChangeField = (e) => {
    this.setState({
      [e.target.name]: {
        value: e.target.value,
        error: false,
      },
    });
  };

  onSubmitForm = (e) => {
    const {
      warehouseName,
      address,
      city,
      country,
      contactName,
      position,
      number,
      email,
    } = e.target;

    const data = {
      warehouseName: warehouseName.value,
      address: address.value,
      city: city.value,
      country: country.value,
      contactName: contactName.value,
      position: position.value,
      number: number.value,
      email: email.value,
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
      this.createNewWareHouse(data);
    }
  };
  goBack = (e) => {
    e.preventDefault();

    this.props.history.goBack();
  };

  render() {
    return (
      <div className="warehouse-add">
        <h1 className="warehouse-add__title">
          <button className="warehouse-add__button" onClick={this.goBack}>
            <img src={icon} alt={"icon"} />
          </button>
          Add New Warehouse
        </h1>
        <WarehouseForm
          onChangeField={this.onChangeField}
          onSubmitForm={this.onSubmitForm}
          label="+ Add Warehouse"
          {...this.state}
        />
      </div>
    );
  }
}

export default WarehouseAdd;
