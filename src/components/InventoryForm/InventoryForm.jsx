import axios from "axios";
import "./InventoryForm.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InventoryForm({ isNew, inventoryId, handleSubmit }) {
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [inStock, setInStock] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const [warehouses, setWarehouses] = useState([]);

  // get a list of warehouses from the database when the page loads
  useEffect(() => {
    async function getWarehouses() {
      try {
        const response = await axios.get(`${url}/api/warehouses`);
        setWarehouses(response.data);
      } catch (err) {
        console.error("GET request to /api/warehouses failed: ", err);
      }
    }
    getWarehouses();
  }, []);

  // after warehouse list created, populate the form with data if the inventory item is not new
  useEffect(() => {
    if (!isNew) {
      const retrieveItem = async () => {
        try {
          const response = await axios.get(
            `${url}/api/inventories/${inventoryId}`
          );
          //   console.log(response.data.status);
          setItemName(response.data.item_name);
          setDescription(response.data.description);
          setQuantity(response.data.quantity);
          setSelectedCategory(response.data.category);
          setSelectedStatus(response.data.status);
          setInStock(response.data.status === "In Stock");
          setSelectedWarehouse(response.data.warehouse_name);
        } catch (error) {
          console.error("Error getting a specified inventory item", error);
        }
      };
      retrieveItem();
    }
  }, [warehouses]);

  //   validate the form whenever any form field changes
  useEffect(() => {
    const validateForm = () => {
      if (
        !itemName ||
        !description ||
        !selectedCategory ||
        !selectedStatus ||
        !quantity === "" ||
        !selectedWarehouse
      ) {
        return false;
      }
      return true;
    };
    setIsFormValid(validateForm);
  }, [
    itemName,
    description,
    selectedCategory,
    selectedStatus,
    quantity,
    selectedWarehouse,
  ]);

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleWarehouseChange = (event) => {
    setSelectedWarehouse(event.target.value);
  };

  const handleStatusChange = (event) => {
    if (event.target.value === "true") {
      setInStock(true);
      setSelectedStatus("In Stock");
      setQuantity(1);
    } else {
      setInStock(false);
      setSelectedStatus("Out of Stock");
      setQuantity(0);
    }
  };

  const handleClick = () => {
    navigate("/inventory");
  };

  return (
    <form
      className="inventory-form"
      onSubmit={(event) =>
        handleSubmit(
          event,
          itemName,
          description,
          selectedCategory,
          selectedStatus,
          quantity,
          selectedWarehouse
        )
      }
    >
      <div className="inventory-form__da-wrapper">
        <div className="inventory-form__detailsCat-wrapper">
          <div className="inventory-form__detailContainer">
            <h2 className="inventory-form__detailTitle">Item Details</h2>
            <div className="inventory-form__nameContainer">
              <label htmlFor="itemName" className="inventory-form__label">
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                onChange={handleNameChange}
                value={itemName}
                placeholder="Please enter a name"
                className={`inventory-form__itemName ${
                  itemName ? "" : "inventory-form__itemName--error"
                }`}
              />
            </div>
            <div className="inventory-form__descContainer">
              <label htmlFor="description" className="inventory-form__label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={handleDescriptionChange}
                value={description}
                placeholder="Please enter a brief item description"
                className={`inventory-form__desc ${
                  itemName ? "" : "inventory-form__desc--error"
                }`}
              />
            </div>
            <div className="inventory-form__categoryContainer">
              <label
                htmlFor="categoryOptions"
                className="inventory-form__label"
              >
                Category
              </label>
              <select
                id="categoryOptions"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="inventory-form__category"
              >
                <option value="">Please select</option>
                <option value="Accessories">Accessories</option>
                <option value="Apparel">Apparel</option>
                <option value="Electronics">Electronics</option>
                <option value="Gear">Gear</option>
                <option value="Health">Health</option>
              </select>
            </div>
          </div>
        </div>
        <div className="inventory-form__availabilityContainer">
          <h2 className="inventory-form__availabilityTitle">
            Item Availability
          </h2>
          <div className="inventory-form__statusContainer">
            <label className="inventory-form__label">Status</label>
            <article className="inventory-form__statusOptions">
              <label className="inventory-form__inStock">
                <input
                  type="radio"
                  name="status"
                  value="true"
                  className="inventory-form__radio"
                  checked={inStock}
                  onChange={handleStatusChange}
                />
                In stock
              </label>
              <label className="inventory-form__outOfStock">
                <input
                  type="radio"
                  name="status"
                  value="false"
                  className="inventory-form__radio"
                  checked={!inStock}
                  onChange={handleStatusChange}
                />
                Out of stock
              </label>
            </article>
          </div>
          <div
            className={`inventory-form__qtyContainer${inStock ? "" : "--hide"}`}
          >
            <label htmlFor="quantity" className="inventory-form__label">
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              onChange={handleQuantityChange}
              value={quantity}
              placeholder="1"
              className={`inventory-form__qty ${
                itemName ? "" : "inventory-form__qty--error"
              }`}
            />
          </div>
          <div className="inventory-form__warehouseContainer">
            <label htmlFor="warehouseOptions" className="inventory-form__label">
              Warehouse
            </label>
            <select
              id="warehouseOptions"
              value={selectedWarehouse}
              onChange={handleWarehouseChange}
              className="inventory-form__warehouse"
            >
              <option value="">Please select</option>
              {/* <option value="Boston">Boston</option>
              <option value="Jersey">Jersey</option>
              <option value="Manhattan">Manhattan</option>
              <option value="Miami">Miami</option>
              <option value="Santa Monica">Santa Monica</option>
              <option value="Seattle">Seattle</option>
              <option value="SF">SF</option>
              <option value="Washington">Washington</option> */}
              {warehouses?.map((warehouse) => {
                return (
                  <option key={warehouse.id} value={warehouse.warehouse_name}>
                    {warehouse.warehouse_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="inventory-form__btnContainer">
        <button
          className="inventory-form__cancelBtn"
          type="button"
          onClick={handleClick}
        >
          Cancel
        </button>
        <button
          className="inventory-form__addBtn"
          type="submit"
          disabled={!isFormValid}
        >{`${isNew ? "+Add Item" : "Save"}`}</button>
      </div>
    </form>
  );
}

export default InventoryForm;
