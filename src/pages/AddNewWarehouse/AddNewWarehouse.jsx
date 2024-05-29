import "./AddNewWarehouse.scss";
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import ArrowBack from "../../assets/icons/arrow_back.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddNewWarehouse() {
  const navigate = useNavigate();

  function handleBack() {
    navigate("/warehouses");
  }

  async function createWarehouse(e, formValues, formValid) {
    e.preventDefault();

    const formattedFormValues = {
      warehouse_name: formValues.warehouseName,
      address: formValues.address,
      city: formValues.city,
      country: formValues.country,
      contact_name: formValues.contactName,
      contact_position: formValues.position,
      contact_phone: formValues.phone,
      contact_email: formValues.email,
    };

    if (!formValid) return;

    //create new database record
    try {
      await axios.post(
        "http://localhost:8080/api/warehouses",
        formattedFormValues
      );
      navigate("..");
    } catch (error) {
      console.error("Error updating database", error);
    }
  }

  return (
    <div className="add-new-warehouse">
      <div className="add-new-warehouse__title-bar">
        <Link
          to="/warehouses"
          className="add-new-warehouse__back-link"
        >
          <img src={ArrowBack} alt="Arrow Back Icon" />
        </Link>
        <h1 className="add-new-warehouse__heading">
          Add New Warehouse
        </h1>
      </div>
      <WarehouseForm handleSubmit={createWarehouse} />
    </div>
  );
}

export default AddNewWarehouse;
