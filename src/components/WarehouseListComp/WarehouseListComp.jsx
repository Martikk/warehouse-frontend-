import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SortIcon from "../../assets/icons/sort.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete_outline.svg";
import ExitIcon from "../../assets/icons/close.svg";
import Modal from "react-modal";
import ChevronRightIcon from "../../assets/icons/chevron_right.svg";
import "./WarehouseListComp.scss";

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#13182C1A'
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    margin: "0",
    padding: "0",
    transform: "translate(-50%, -50%)",
  }
};

const WarehouseListComp = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "warehouse_name",
    direction: "ascending",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [warehouseToDelete, setWarehouseToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/warehouses")
      .then((response) => setWarehouses(response.data))
      .catch((error) => console.error("Error fetching warehouses:", error));
  }, []);

  const sortedWarehouses = React.useMemo(() => {
    let sortableWarehouses = [...warehouses];
    if (sortConfig !== null) {
      sortableWarehouses.sort((a, b) => {
        const aValue =
          sortConfig.key === "contact_info"
            ? `${a.contact_phone} ${a.contact_email}`
            : a[sortConfig.key];
        const bValue =
          sortConfig.key === "contact_info"
            ? `${b.contact_phone} ${b.contact_email}`
            : b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableWarehouses.filter(
      (warehouse) =>
        warehouse.warehouse_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        warehouse.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        warehouse.contact_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        warehouse.contact_phone
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        warehouse.contact_email
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [warehouses, sortConfig, searchQuery]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (id) => {
    navigate(`/warehouses/${id}/edit`);
  };

  const openModal = (id) => {
    setWarehouseToDelete(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setWarehouseToDelete(null);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/warehouses/${warehouseToDelete}`)
      .then(() =>
        setWarehouses((prevWarehouses) =>
          prevWarehouses.filter((warehouse) => warehouse.id !== warehouseToDelete)
        )
      )
      .catch((error) => console.error("Error deleting warehouse:", error));
    closeModal();
  };

  return (
    <div className="warehouse-list">
      <div className="warehouse-list__header">
        <h1>Warehouses</h1>
        <div className="warehouse-list__header-action">
          <input
            type="text"
            placeholder="Search..."
            className="warehouse-list__search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="warehouse-list__add-button"
            onClick={() => navigate("/warehouses/new")}
          >
            + Add New Warehouse
          </button>
        </div>
      </div>
      <ul className="warehouse-list__table">
        <li className="warehouse-list__table-header">
          <div onClick={() => requestSort("warehouse_name")}>
            WAREHOUSE
            <img src={SortIcon} alt="Sort" className="sort-icon" />
          </div>
          <div onClick={() => requestSort("address")}>
            ADDRESS
            <img src={SortIcon} alt="Sort" className="sort-icon" />
          </div>
          <div onClick={() => requestSort("contact_name")}>
            CONTACT NAME
            <img src={SortIcon} alt="Sort" className="sort-icon" />
          </div>
          <div onClick={() => requestSort("contact_info")}>
            CONTACT INFORMATION
            <img src={SortIcon} alt="Sort" className="sort-icon" />
          </div>
          <div>ACTIONS</div>
        </li>
        {sortedWarehouses.map((warehouse) => (
          <li key={warehouse.id} className="warehouse-list__table-row">
            <div className="warehouse-list__item-warehouse">
              <p className="hidden-desktop">Warehouse</p>
              <div className="warehouse-list__item-warehouse-ChevronRightIcon">
                <Link to={`/warehouses/${warehouse.id}`}>
                  {warehouse.warehouse_name}
                </Link>
                <img
                  className="ChevronRightIcon"
                  src={ChevronRightIcon}
                  alt="RightLink"
                />
              </div>
            </div>

            <div className="warehouse-list__item">
              <p className="hidden-desktop">CONTACT NAME</p>
              <div>{warehouse.contact_name}</div>
            </div>
            <div>
              <p className="hidden-desktop">ADDRESS</p>
              <div>{warehouse.address}</div>
            </div>

            <div className="warehouse-list__contact-info-li">
              <p className="hidden-desktop">CONTACT INFORMATION</p>
              <p>
                {warehouse.contact_phone}
                <br />
                {warehouse.contact_email}
              </p>
            </div>
            <div>
              <button
                className="warehouse-list__action-button"
                onClick={() => openModal(warehouse.id)}
              >
                <img src={DeleteIcon} alt="Delete" />
              </button>

              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className="delete">
                  <div className="delete__content">
                    <div className="delete__text-container">
                      <button className="delete__exit-button">
                        <img src={ExitIcon} alt="exit icon" onClick={closeModal} />
                      </button>
                      <h1 className="delete__heading">
                        Delete {warehouseToDelete && warehouses.find(w => w.id === warehouseToDelete)?.warehouse_name} warehouse?
                      </h1>
                      <p className="delete__description">
                        Please confirm that you’d like to delete the {warehouseToDelete && warehouses.find(w => w.id === warehouseToDelete)?.warehouse_name} from the list of warehouses. 
                        You won’t be able to undo this action.
                      </p>
                    </div>

                    <div className="delete__button-container">
                      <button className="delete__cancel-button" onClick={closeModal}>Cancel</button>
                      <button className="delete__delete-button" onClick={handleDelete}>Delete</button>
                    </div>
                  </div>
                </div>
              </Modal>

              <button
                className="warehouse-list__action-button"
                onClick={() => handleEdit(warehouse.id)}
              >
                <img src={EditIcon} alt="Edit" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseListComp;