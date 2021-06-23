import "./WarehouseForm.scss";
import Error from "../Error/Error";
import { useHistory } from "react-router-dom";

const WarehouseForm = (props) => {
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
  return (
    <div className="warehouse-form">
      <div className=" warehouse-form__form">
        <form onSubmit={handleSubmit}>
          <div className="warehouse-form__container">
            <div className="warehouse-form__details">
              <h3 className="warehouse-form__sub-title">Warehouse Details</h3>

              <label className="warehouse-form__label" htmlFor="warehouseName">
                Warehouse Name
              </label>
              <input
                className={`warehouse-form__input ${
                  !props.warehouseName.value &&
                  props.warehouseName.error &&
                  "add-error__input"
                }`}
                type="text"
                id="warehouseName"
                name="warehouseName"
                placeholder="Warehouse Name"
                value={props.warehouseName.value}
                onChange={props.onChangeField}
              />
              {!props.warehouseName.value && props.warehouseName.error && (
                <Error />
              )}
              <label className="warehouse-form__label" htmlFor="address">
                Street Address
              </label>
              <input
                className={`warehouse-form__input ${
                  !props.address.value &&
                  props.address.error &&
                  "add-error__input"
                }`}
                type="text"
                id="address"
                name="address"
                placeholder="Street Address"
                value={props.address.value}
                onChange={props.onChangeField}
              />
              {!props.address.value && props.address.error && <Error />}
              <label className="warehouse-form__label" htmlFor="city">
                City
              </label>
              <input
                className={`warehouse-form__input ${
                  !props.city.value && props.city.error && "add-error__input"
                }`}
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={props.city.value}
                onChange={props.onChangeField}
              />
              {!props.city.value && props.city.error && <Error />}
              <label className="warehouse-form__label" htmlFor="country">
                Country
              </label>
              <input
                className={`warehouse-form__input ${
                  !props.country.value &&
                  props.country.error &&
                  "add-error__input"
                }`}
                type="text"
                id="country"
                name="country"
                placeholder="Country"
                value={props.country.value}
                onChange={props.onChangeField}
              />
              {!props.country.value && props.country.error && <Error />}
            </div>
            <div className="warehouse-form__contact">
              <h3 className="warehouse-form__sub-title">Contact Details</h3>
              <label className="warehouse-form__label" htmlFor="contactName">
                Contact Name
              </label>
              <input
                className={`warehouse-form__input ${
                  !props.contactName.value &&
                  props.contactName.error &&
                  "add-error__input"
                }`}
                type="text"
                id="contactName"
                name="contactName"
                placeholder="Contact Name"
                value={props.contactName.value}
                onChange={props.onChangeField}
              />
              {!props.contactName.value && props.contactName.error && <Error />}
              <label className="warehouse-form__label" htmlFor="position">
                Position
              </label>
              <input
                className={`warehouse-form__input ${
                  !props.position.value &&
                  props.position.error &&
                  "add-error__input"
                }`}
                type="text"
                id="position"
                name="position"
                placeholder="Position"
                value={props.position.value}
                onChange={props.onChangeField}
              />
              {!props.position.value && props.position.error && <Error />}
              <label className="warehouse-form__label" htmlFor="number">
                Phone Number
              </label>
              <input
                className={`warehouse-form__input ${
                  props.number.error && "add-error__input"
                }`}
                type="text"
                id="number"
                name="number"
                placeholder="Phone Number"
                value={props.number.value}
                onChange={props.onChangeField}
              />
              {props.number.error && <Error />}
              <label className="warehouse-form__label" htmlFor="email">
                Email
              </label>
              <input
                className={`warehouse-form__input ${
                  props.email.error && "add-error__input"
                }`}
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={props.email.value}
                onChange={props.onChangeField}
              />
              {props.email.error && <Error />}
            </div>
          </div>
          <div className="warehouse-form__buttons">
            <button className="warehouse-form__button-cancel" onClick={goBack}>
              Cancel
            </button>
            <button type="submit" className="warehouse-form__button-add">
              {props.label}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseForm;
