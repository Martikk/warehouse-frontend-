import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SortIcon from "../../assets/icons/sort.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete_outline.svg";
import EditIconWhite from "../../assets/icons/edit-white.svg";
import BackIcon from "../../assets/icons/arrow_back.svg";
import ChevronRightIcon from "../../assets/icons/chevron_right.svg";
import "./WarehouseDetailsComp.scss";

const WarehouseDetailsComp = () => {
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "item_name",
    direction: "ascending",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/warehouses/${warehouseId}`)
      .then((response) => setWarehouse(response.data))
      .catch((error) =>
        console.error("Error fetching warehouse details:", error)
      );

    axios
      .get(`http://localhost:8080/api/warehouses/${warehouseId}/inventories`)
      .then((response) => setInventory(response.data))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, [warehouseId]);

  const sortedInventory = React.useMemo(() => {
    let sortableInventory = [...inventory];
    if (sortConfig !== null) {
      sortableInventory.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableInventory;
  }, [inventory, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  if (!warehouse) return <p>Loading...</p>;

  return (
    <div className="warehouse">
      <div className="warehouse-details">
        <div className="warehouse-details-btn">
          <button
            onClick={() => navigate("/warehouses")}
            className="warehouse-details__back-button"
          >
            <img src={BackIcon} alt="Back" />
          </button>
          <h1 className="warehouse-details__title">
            {warehouse.warehouse_name}
          </h1>
        </div>
        <button
          className="warehouse-details__edit-button"
          onClick={() => navigate(`/warehouses/${warehouseId}/edit`)}
        >
          <img
            className="White-edit-button"
            src={EditIconWhite}
            alt="RightLink"
          />
          Edit
        </button>
      </div>

      <div className="warehouse-details__info">
        <div className="warehouse-details__address">
          <h2>Warehouse Address:</h2>
          <p>{warehouse.address}</p>
          <p>
            {warehouse.city}, {warehouse.country}
          </p>
        </div>
        <div className="warehouse-details__contact">
          <div>
            <h2>Contact Name:</h2>
            <p>{warehouse.contact_name}</p>
            <p>{warehouse.contact_position}</p>
          </div>
          <div>
            <h2>Contact Information:</h2>
            <p>{warehouse.contact_phone}</p>
            <p>{warehouse.contact_email}</p>
          </div>
        </div>
      </div>

      <ul className="warehouse-details__list">
        <li className="warehouse-details__list-header">
          <div onClick={() => requestSort("item_name")}>
            INVENTORY ITEM
            <img src={SortIcon} alt="Sort" className="sort-icon" />
          </div>
          <div onClick={() => requestSort("category")}>
            CATEGORY
            <img src={SortIcon} alt="Sort" className="sort-icon" />
          </div>
          <div onClick={() => requestSort("status")}>
            STATUS
            <img src={SortIcon} alt="Sort" className="sort-icon" />
          </div>
          <div onClick={() => requestSort("quantity")}>
            QUANTITY
            <img src={SortIcon} alt="Sort" className="sort-icon" />
          </div>
          <div>ACTIONS</div>
        </li>
        {sortedInventory.map((item) => (
          <li key={item.id} className="warehouse-details__list-row">
            <div className="warehouse-details__item-name">
              <p className="hidden-desktop">INVENTORY ITEM</p>

              <div className="warehouse-details__item-warehouse-ChevronRightIcon">
                <Link to={`/inventory/${item.id}`}>{item.item_name}</Link>
                <img
                  className="ChevronRightIcon"
                  src={ChevronRightIcon}
                  alt="RightLink"
                />
              </div>
            </div>

            <div className="warehouse-details__item-status">
              <p className="hidden-desktop">STATUS</p>
              <div
                className={`status ${item.status
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                {item.status}
              </div>
            </div>

            <div className="warehouse-details__item-category">
              <p className="hidden-desktop">CATEGORY</p>
              <div>{item.category}</div>
            </div>

            <div>
              <p className="hidden-desktop">QTY</p>
              <div>{item.quantity}</div>
            </div>

            <div className="warehouse-list__actions">
              <div className="warehouse-list__action-button-delete">
                <button className="warehouse-details__action-button">
                  <img src={DeleteIcon} alt="Delete" />
                </button>
              </div>
              <div className="warehouse-list__action-button-edit">
                <button className="warehouse-details__action-button" onClick={() => navigate(`../inventory/${item.id}/edit`)}>
                  <img src={EditIcon} alt="Edit" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseDetailsComp;
