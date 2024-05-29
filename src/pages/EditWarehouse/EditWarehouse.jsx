import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditWarehouse.scss";
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import ArrowBack from "../../assets/icons/arrow_back.svg";

function EditWarehouse() {
  const { REACT_APP_API_URL } = process.env;
  const { warehouseId } = useParams();
  const navigate = useNavigate();

  async function updateWarehouse(e, formValues, formValid) {
    e.preventDefault();

    if (!formValid) return;

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

    try {
      const response = await axios.put(`${REACT_APP_API_URL}/api/warehouses/${warehouseId}`, formattedFormValues);
      navigate(`../warehouses/${warehouseId}`);
    } catch (err) {
      return console.error("PUT request failed: ", err);
    }
  }

  return (
    <div className="edit-warehouse__container">
      <div className="edit-warehouse__title-bar">
        <Link to={`/warehouses/${warehouseId}`}>
          <img
            className="edit-warehouse__back-link"
            src={ArrowBack}
            alt="Arrow Back Icon"
          />
        </Link>
        <h1 className="edit-warehouse__heading">Edit Warehouse</h1>
      </div>
      <WarehouseForm handleSubmit={updateWarehouse} warehouseId={warehouseId} />
    </div>
  );
}

export default EditWarehouse;
