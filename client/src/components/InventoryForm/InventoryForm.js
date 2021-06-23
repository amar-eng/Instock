import "./InventoryForm.scss";
import Error from "../Error/Error.js";
import { useHistory } from "react-router-dom";

const InventoryForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmitForm(e);
    e.target.reset();
  };
  let history = useHistory();
  const goBack = function (e) {
    e.preventDefault();

    history.goBack();
  };

  const selectOptions = props.warehouses.map((warehouse, index) => 
    {
      return <option key={index} value={index}>{warehouse.name}</option>
    });
  return (
    <div className="inventory-form">
      <div className="inventory-form__form">
        <form onSubmit={handleSubmit}>
          <div className="inventory-form__container">
            <div className="inventory-form__details">
              <h3 className="inventory-form__sub-title">Item Details</h3>
              {/* The form input for the item name */}
              <label className="inventory-form__label" htmlFor="inventoryName">
                Item Name
              </label>
              <input
                className={`inventory-form__input ${
                  !props.itemName.value &&
                  props.itemName.error &&
                  "add-inventory-error__input"
                }`}
                type="text"
                id="itemName"
                name="itemName"
                placeholder="Item Name"
                value={props.itemName.value}
                onChange={props.onChangeField}
              />
              {!props.itemName.value && props.itemName.error && (
                <Error />
              )}
              {/* The form input area for the item description */}
              <label className="inventory-form__label" htmlFor="description">
                Description
              </label>
              <textarea
                className={`inventory-form__input inventory-form__description ${
                  !props.description.value &&
                  props.description.error &&
                  "add-inventory-error__input"
                }`}
                id="description"
                name="description"
                placeholder="Please enter a brief item description..."
                value={props.description.value}
                onChange={props.onChangeField}
              />
              {!props.description.value && props.description.error && (
                <Error />
              )}
              {/* The form element for the category drop down selector */}
              <label className="inventory-form__label" htmlFor="category">
                Category
              </label>
              <select
                className={`inventory-form__input inventory-form__select ${
                  !props.itemName.value &&
                  props.itemName.error &&
                  "add-inventory-error__input"
                }`}
                id="category"
                name="category"
                value={props.category.value}
                onChange={props.onChangeField}>
                    <option value={""} className="inventory-form__default-option" >Please select</option>
                    <option value={"Accessories"}>Accessories</option>
                    <option value={"Apparel"}>Apparel</option>
                    <option value={"Electronics"}>Electronics</option>
                    <option value={"Gear"}>Gear</option>
                    <option value={"Health"}>Health</option>
              </select>
              {!props.category.value && props.category.error && (
                <Error />
              )}
              
            </div>
            <div className="inventory-form__availability">
                <h3 className="inventory-form__sub-title">Item Availability</h3>
                {/* The radio selector for whether an item is in stock or out of stock */}
                <label className="inventory-form__label" htmlFor="status">
                    Status
                </label>
                <div className="inventory-form__radio-box">
                    <div className="inventory-form__radio-single">
                        <input
                            className={`inventory-form__radio ${
                            !props.status.value &&
                            props.status.error &&
                            "add-error__input"
                            }`}
                            type="radio"
                            id="status-in-stock"
                            name="status"
                            value={"In Stock"}
                            checked={props.status.value === "In Stock" ? true: null}
                            onChange={props.onChangeField}
                        />
                        <label className="inventory-form__radio-label" htmlFor="status-in-stock">
                            In Stock
                        </label>
                    </div>
                    <div className="inventory-form__radio-single">
                        <input
                            className={`inventory-form__radio ${
                            !props.status.value &&
                            props.status.error &&
                            "add-error__input"
                            }`}
                            type="radio"
                            id="status-out-of-stock"
                            name="status"
                            value={"Out of Stock"}
                            checked={props.status.value === "Out of Stock" ? true: null}
                            onChange={props.onChangeField}
                        />
                        <label className="inventory-form__radio-label" htmlFor="status-in-stock">
                            Out of Stock
                        </label>
                    </div>
              </div>
              {!props.status.value && props.status.error && (<Error />)}
              {/* we only see the item quantity if it is in stock  */}
              {props.status.value === "In Stock" && <>
                    <label className="inventory-form__label" htmlFor="quantity">
                        Quantity
                    </label>
                    <input
                        className={`inventory-form__input inventory-form__quantity ${
                        !props.quantity.value &&
                        props.quantity.error &&
                        "add-inventory-error__input"
                        }`}
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={props.quantity.value}
                        onChange={props.onChangeField}
                    />
                    {!props.quantity.value && props.quantity.error && <Error />}      
              </>}

              {/* The form element for the warehouse drop down selector */}
              <label className="inventory-form__label" htmlFor="warehouse">
                        Warehouse
                    </label>
                    <select
                        className={`inventory-form__input inventory-form__select ${
                        !props.itemName.value &&
                        props.itemName.error &&
                        "add-inventory-error__input"
                        }`}
                        id="warehouse"
                        name="warehouse"
                        value={props.warehouse.value}
                        onChange={props.onChangeField}>
                          <option value={""} className="inventory-form__default-option" disabled="disabled">Please select</option>
                          {selectOptions}
                    </select>
                    {!props.warehouse.value && props.warehouse.error && (
                        <Error />
                    )}
            </div>
          </div>
          <div className="inventory-form__buttons">
            <button className="inventory-form__button-cancel" onClick={goBack}>
              Cancel
            </button>
            <button type="submit" className="inventory-form__button-add">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;
