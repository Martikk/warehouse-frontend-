import "./EditInventoryItem.scss";
import arrowBackIcon from "../../assets/icons/arrow_back.svg";
import InventoryForm from "../../components/InventoryForm/InventoryForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditInventoryItem() {
    const url = process.env.REACT_APP_API_URL;
    const isNew = false;

    const { inventoryId } = useParams();

    const navigate = useNavigate();

    const editItem = async (event, name, description, category, status, quantity, warehouse) => {
        event.preventDefault();

        const formattedItem = {
            item_name: name,
            description: description,
            category: category,
            status: status,
            quantity: quantity
        };

        try {
            const response = await axios.get(`${url}/api/warehouses`);
            const selectedWarehouse = response.data.find((item) => item.warehouse_name === warehouse);
            formattedItem.warehouse_id = selectedWarehouse.id;
        } catch (error) {
            console.error('Error getting a list of warehouse', error);
        }

        try {
            await axios.put(`${url}/api/inventories/${inventoryId}`, formattedItem);
            navigate("/inventory");
        } catch (error) {
            console.error('Error editing an old inventory item', error);
        }
    }

    return (
        <>
            <div className="inventory-edit__titleContainer">
                <div className="inventory-edit__wrapper">
                <Link to="/inventory" ><img src={arrowBackIcon} alt="Arrow Back Icon" className="inventory-edit__backArrow" /> </Link>
                <h1 className="inventory-edit__title">Edit Inventory Item</h1>
                </div>
            </div>
            <InventoryForm isNew={isNew} inventoryId={inventoryId} handleSubmit={editItem} />
        </>
    );
}

export default EditInventoryItem;