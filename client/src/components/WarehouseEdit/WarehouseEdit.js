import React, { Component } from "react";
import "./WarehouseEdit.scss";
import icon from "../../assets/Icons/arrow_back-24px.svg";
import { API_URL } from "../../utils/api";
import axios from "axios";
import WarehouseForm from "../WarehouseForm/WarehouseForm";

class WarehouseEdit extends Component {
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

  isValidPhone = (phone) => {
    //https://stackoverflow.com/questions/2113908/what-regular-expression-will-match-valid-international-phone-numbers
    var phoneRegex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/;
    return phoneRegex.test(phone);
  };

  isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
  };

  getCurrentWarehouse = () => {
    axios
      .get(API_URL + "/warehouse/" + this.props.match.params.warehouseid)
      .then((response) => {
        const { name, address, city, country, contact } = response.data[0];
        this.setState({
          ...this.state,
          warehouseName: {
            value: name,
            error: false,
          },
          address: {
            value: address,
            error: false,
          },
          city: {
            value: city,
            error: false,
          },
          country: {
            value: country,
            error: false,
          },
          contactName: {
            value: contact.name,
            error: false,
          },
          position: {
            value: contact.position,
            error: false,
          },
          number: {
            value: contact.phone,
            error: false,
          },
          email: {
            value: contact.email,
            error: false,
          },
        });
      });
  };

  componentDidMount() {
    this.getCurrentWarehouse();
  }

  editWarehouse = (data) => {
    axios
      .put(API_URL + "/warehouse/" + this.props.match.params.warehouseid, {
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
        this.props.history.goBack();
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

  validateFields = (data) => {
    let validation = true;
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        validation = false;
        this.setState({
          [key]: { value: "", error: true },
        });
      }
    });

    if (!this.isValidPhone(this.state.number.value)) {
      console.log(">> 1");
      validation = false;
      this.setState({
        number: {
          value: this.state.number.value,
          error: true,
        },
      });
    }
    if (!this.isValidEmail(this.state.email.value)) {
      console.log(">> 2");
      validation = false;
      this.setState({
        email: {
          value: this.state.email.value,
          error: true,
        },
      });
    }

    return validation;
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

    if (this.validateFields(data)) {
      this.editWarehouse(data);
    }
  };
  goBack = (e) => {
    e.preventDefault();

    this.props.history.goBack();
  };

  render() {
    return (
      <div className="warehouse-edit">
        <h1 className="warehouse-edit__title">
          <button className="warehouse-edit__button" onClick={this.goBack}>
            <img src={icon} alt={"icon"} />
          </button>
          Edit Warehouse
        </h1>
        <WarehouseForm
          onChangeField={this.onChangeField}
          onSubmitForm={this.onSubmitForm}
          label="Save"
          {...this.state}
        />
      </div>
    );
  }
}

export default WarehouseEdit;
