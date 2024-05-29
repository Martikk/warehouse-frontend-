import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BackIcon from "../../assets/icons/arrow_back.svg";
import EditIconWhite from "../../assets/icons/edit-white.svg";
import "./InventoryItemDetailsComp.scss";

const InventoryItemDetailsComp = () => {
  const { inventoryId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    console.log("Fetching item details for ID:", inventoryId); // Debugging log
    axios
      .get(`http://localhost:8080/api/inventories/${inventoryId}`)
      .then((response) => {
        console.log("Item details fetched:", response.data); // Debugging log
        setItem(response.data);
      })
      .catch((error) => console.error("Error fetching item details:", error));
  }, [inventoryId]);

  if (!item) return <p>Loading...</p>;

  console.log("Current item state:", item); // Debugging log

  return (
    <div className="item-details">
      <div className="item-details__header">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="item-details__back-button"
          >
            <img src={BackIcon} alt="Back" />
            <h1 className="item-details__title">{item.item_name}</h1>
          </button>
        </div>
       <Link to ={`/inventory/${inventoryId}/edit`}> <button className="warehouse-details__edit-button">
          <img
            className="White-edit-button"
            src={EditIconWhite}
            alt="RightLink"
          />
          Edit
        </button> </Link>
      </div>
      <div className="item-details__info">
        <div className="item-details__info-left">
          <ul>
            <li className="item-details__description">
              <h2>ITEM DESCRIPTION:</h2>
              <p>{item.description}</p>
            </li>
            <li className="item-details__category">
              <h2>CATEGORY:</h2>
              <p>{item.category}</p>
            </li>
          </ul>
        </div>
        <div className="item-details__info-right">
          <ul className="item-details__info-right-ul">
            <li className="item-details__status">
              <h2>STATUS:</h2>
              <div
                className={`status ${item.status
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                {item.status}
              </div>
            </li>
            <li className="item-details__quantity">
              <h2>QUANTITY:</h2>
              <p>{item.quantity}</p>
            </li>
            <li className="item-details__warehouse">
              <h2>WAREHOUSE:</h2>
              <p>{item.warehouse_name}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemDetailsComp;
