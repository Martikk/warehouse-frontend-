import "./WarehouseForm.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import the validator for email
const { isEmail } = require("validator");

function WarehouseForm({ handleSubmit, warehouseId }) {
  const { REACT_APP_API_URL } = process.env;
  const navigate = useNavigate();
  
  const initialValues = {
    warehouseName: "",
    address: "",
    city: "",
    country: "",
    contactName: "",
    position: "",
    phone: "",
    email: "",
  };

  const [values, setValues] = useState(initialValues);
  const [valueErrors, setValueErrors] = useState(initialValues);
  //add valid form state
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (warehouseId) {
      async function getWarehouse() {
        try {
          const response = await axios.get(
            `${REACT_APP_API_URL}/api/warehouses/${warehouseId}`
          );

          // populate form with data from database
          setValues({
            warehouseName: response.data.warehouse_name,
            address: response.data.address,
            city: response.data.city,
            country: response.data.country,
            contactName: response.data.contact_name,
            position: response.data.contact_position,
            phone: response.data.contact_phone,
            email: response.data.contact_email,
          });

          // set all value errors to false after the form populates with data
          setValueErrors({
            warehouseName: false,
            address: false,
            city: false,
            country: false,
            contactName: false,
            position: false,
            phone: false,
            email: false,
          });
        } catch (err) {
          console.error("GET request to /api/warehouses/:id failed: ", err);
        }
      }
      getWarehouse();
    }
  }, []);

  // validate form after state updates with useEffect
  useEffect(() => {
    setFormValid(Object.values(valueErrors).every((error) => error === false));
  }, [valueErrors]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    const isPhone = name === "phone";
    const isAnEmail = name === "email";

    // check for invalid form submissions
    // checks if form fields are empty
    if (value === "") {
      setValueErrors({
        ...valueErrors,
        [name]: true,
      });
    } else {
      setValueErrors({
        ...valueErrors,
        [name]: false,
      });
    }

    // if name = phone, and phone not valid, apply error class
    if (isPhone) {
      setValueErrors({
        ...valueErrors,
        phone: value.replaceAll(/\D/g, "").length !== 11,
      });
    }
    // if name = email. and email not valid, apply error class
    if (isAnEmail) {
      setValueErrors({
        ...valueErrors,
        email: !isEmail(value),
      });
    }

    setValues({
      ...values,
      [name]: value,
    });
  }

  // added formValid to form class with handle submit so the handle submit function is only called if form valid is true
  return (
    <form
      className="warehouse-form"
      onSubmit={(e) => handleSubmit(e, values, formValid)}
    >
      <div className="warehouse-form__container warehouse-form__container--divider">
        <h2 className="warehouse-form__subheading">Warehouse Details</h2>

        <div className="warehouse-form__field-group">
          <label className="warehouse-form__label" htmlFor="name">
            Warehouse Name
          </label>
          <input
            type="text"
            id="name"
            name="warehouseName"
            placeholder="Warehouse Name"
            className={`warehouse-form__input ${
              valueErrors.warehouseName ? "warehouse-form__input--error" : ""
            }
        `}
            value={values.warehouseName}
            onInput={handleInputChange}
          />
        </div>

        <div className="warehouse-form__field-group">
          <label className="warehouse-form__label" htmlFor="address">
            Street Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Street Address"
            className={`warehouse-form__input ${
              valueErrors.address ? "warehouse-form__input--error" : ""
            }`}
            value={values.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="warehouse-form__field-group">
          <label className="warehouse-form__label" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            className={`warehouse-form__input ${
              valueErrors.city ? "warehouse-form__input--error" : ""
            }
   `}
            value={values.city}
            onChange={handleInputChange}
          />
        </div>

        <div className="warehouse-form__field-group">
          <label className="warehouse-form__label" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Country"
            className={`warehouse-form__input ${
              valueErrors.country ? "warehouse-form__input--error" : ""
            }
   `}
            value={values.country}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="warehouse-form__container">
        <h2 className="warehouse-form__subheading">Contact Details</h2>

        <div className="warehouse-form__field-group">
          <label className="warehouse-form__label" htmlFor="name">
            Contact Name
          </label>
          <input
            type="text"
            id="name"
            name="contactName"
            placeholder="Contact Name"
            className={`warehouse-form__input ${
              valueErrors.contactName ? "warehouse-form__input--error" : ""
            }
   `}
            value={values.contactName}
            onChange={handleInputChange}
          />
        </div>

        <div className="warehouse-form__field-group">
          <label className="warehouse-form__label" htmlFor="address">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            placeholder="Position"
            className={`warehouse-form__input ${
              valueErrors.position ? "warehouse-form__input--error" : ""
            }
   `}
            value={values.position}
            onChange={handleInputChange}
          />
        </div>

        <div className="warehouse-form__field-group">
          <label className="warehouse-form__label" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            className={`warehouse-form__input ${
              valueErrors.phone ? "warehouse-form__input--error" : ""
            }
   `}
            value={values.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="warehouse-form__field-group">
          <label className="warehouse-form__label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className={`warehouse-form__input ${
              valueErrors.email ? "warehouse-form__input--error" : ""
            }
   `}
            value={values.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="warehouse-form__btns-group">
        <button
          className="warehouse-form__btn warehouse-form__btn--cancel"
          type="button"
          onClick={() => navigate(`../warehouses/${warehouseId || ""}`)}
        >
          Cancel
        </button>

        <button className="warehouse-form__btn" type="submit">
          {warehouseId ? "Save" : "+ Add Warehouse"}
        </button>
      </div>
    </form>
  );
}

export default WarehouseForm;
