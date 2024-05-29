import searchIcon from "../../assets/icons/search.svg";
import sortIcon from "../../assets/icons/sort.svg";
import arrowrightIcon from "../../assets/icons/chevron_right.svg";
import DeleteIcon from "../../assets/icons/delete_outline.svg";
import editIcon from "../../assets/icons/edit.svg";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./InventoryList.scss";
import axios from "axios";
import ExitIcon from "../../assets/icons/close.svg";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#13182C1A",
  },
  content: {
    // height: "100%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    margin: "0",
    padding: "0",
    transform: "translate(-50%, -50%)",
  },
};

function InventoryList() {
  const url = process.env.REACT_APP_API_URL;
  const [inventoryList, setInventoryList] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [inventoryToDelete, setInventoryToDelete] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${url}/api/inventories`);
        setInventoryList(response.data);
      } catch (error) {
        console.error(
          "Error getting a list of inventory from all warehouses",
          error
        );
      }
    };
    fetchInventory();
  }, []);

  function openModal(id) {
    setInventoryToDelete(id);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    setInventoryToDelete(null);
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/inventories/${inventoryToDelete}`)
      .then(() =>
        setInventoryList((prevInventory) =>
          prevInventory.filter((inventory) => inventory.id !== inventoryToDelete)
        )
      )
      .catch((error) => console.error("Error deleting inventory:", error));
    closeModal();
  };

  return (
    <div className="inventory-list">
      <article className="inventory-list__pageTitle">
        <h1 className="inventory-list__title">Inventory</h1>
        <input
          type="text"
          placeholder="Search..."
          className="inventory-list__search"
        />
        <Link to="/inventory/new" className="inventory-list__linkAddNew">
          {" "}
          <button type="button" className="inventory-list__addNewBtn">
            +Add New Item
          </button>
        </Link>
      </article>
      <div className="inventory-list__fieldTitle">
        <article className="inventory-list__itemContainer">
          <p>INVENTORY ITEM</p>
          <img
            src={sortIcon}
            alt="Sort Icon"
            className="inventory-list__sort"
          />
        </article>
        <article className="inventory-list__categoryContainer">
          <p>CATEGORY</p>
          <img
            src={sortIcon}
            alt="Sort Icon"
            className="inventory-list__sort"
          />
        </article>
        <article className="inventory-list__statusContainer">
          <p>STATUS</p>
          <img
            src={sortIcon}
            alt="Sort Icon"
            className="inventory-list__sort"
          />
        </article>
        <article className="inventory-list__qtyContainer">
          <p>QTY</p>
          <img
            src={sortIcon}
            alt="Sort Icon"
            className="inventory-list__sort"
          />
        </article>
        <article className="inventory-list__warehouseContainer">
          <p>WAREHOUSE</p>
          <img
            src={sortIcon}
            alt="Sort Icon"
            className="inventory-list__sort"
          />
        </article>
        <p>ACTIONS</p>
      </div>
      <ul className="inventory-itemList">
        {inventoryList?.map((item) => (
          <li key={item.id} className="inventory-item">
            <article className="inventory-item__top">
              <div className="inventory-item__left">
                <article className="inventory-item__nameContainer">
                  <label className="inventory-item__label">
                    INVENTORY ITEM
                  </label>
                  <div className="inventory-item__link">
                    <Link to={`/inventory/${item.id}`}>
                      {" "}
                      <button
                        type="button"
                        className="inventory-item__linkName"
                      >
                        {item.item_name}
                      </button>
                    </Link>
                    <Link to={`/inventory/${item.id}`}>
                      {" "}
                      <img
                        src={arrowrightIcon}
                        alt="Chevron Right Arrow"
                        className="inventory-item__linkIcon"
                      />
                    </Link>
                  </div>
                </article>
                <article className="inventory-item__categoryContainer">
                  <label className="inventory-item__label">CATEGORY</label>
                  <p className="inventory-item__category">{item.category} </p>
                </article>
              </div>
              <div className="inventory-item__right">
                <article className="inventory-item__statusContainer">
                  <label className="inventory-item__label">STATUS</label>
                  <p
                    className={`inventory-item__status inventory-item__status--${
                      item.status === "In Stock" ? "in" : "out"
                    }`}
                  >
                    {item.status.toUpperCase()}{" "}
                  </p>
                </article>
                <article className="inventory-item__qtyContainer">
                  <label className="inventory-item__label">QTY</label>
                  <p className="inventory-item__qty">{item.quantity} </p>
                </article>
                <article className="inventory-item__warehouseContainer">
                  <label className="inventory-item__label">WAREHOUSE</label>
                  <p className="inventory-item__warehouse">
                    {item.warehouse_name}{" "}
                  </p>
                </article>
              </div>
            </article>
            <article className="inventory-item__bottom">
              {/* <button type="button" className="inventory-item__deleteBtn">
                <img
                  src={DeleteIcon}
                  alt="Delete Icon"
                  className="inventory-item__deleteIcon"
                />
              </button> */}
              <button
                className="inventory-list__action-button"
                onClick={() => openModal(item.id)}
              >
                <img src={DeleteIcon} alt="Delete" />
              </button>
              <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className="delete">
                  <div class="delete__content">
                    <div className="delete__text-container">
                      <button className="delete__exit-button">
                        <img
                          src={ExitIcon}
                          alt="exit icon"
                          onClick={() => closeModal()}
                        />
                      </button>
                      <h1 className="delete__heading">
                        Delete{" "}
                        {inventoryToDelete &&
                          inventoryList.find((w) => w.id === inventoryToDelete)
                            ?.item_name}
                        ?
                      </h1>
                      <p className="delete__description">
                        Please confirm that you'd like to delete the{" "}
                        {inventoryToDelete &&
                          inventoryList.find((w) => w.id === inventoryToDelete)
                            ?.item_name}{" "}
                        from the list of warehouses.
                      </p>
                    </div>

                    <div className="delete__button-container">
                      <button
                        className="delete__cancel-button"
                        onClick={() => closeModal()}
                      >
                        cancel
                      </button>
                      <button
                        className="delete__delete-button"
                        onClick={handleDelete}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
              <button type="button" className="inventory-item__editBtn">
                <Link to={`/inventory/${item.id}/edit`}>
                <img
                  src={editIcon}
                  alt="Edit Icon"
                  className="inventory-item__editIcon"
                />
                </Link>
              </button>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;
