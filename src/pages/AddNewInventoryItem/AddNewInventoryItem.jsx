import "./AddNewInventoryItem.scss";
import arrowBackIcon from "../../assets/icons/arrow_back.svg";
import InventoryForm from "../../components/InventoryForm/InventoryForm";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";

function AddNewInventoryItem() {
    const url = process.env.REACT_APP_API_URL;
    const isNew = true;

    const id = null;

    const navigate = useNavigate();

    const addNewItem = async (event, name, description, category, status, quantity, warehouse) => {
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
            const response = await axios.post(`${url}/api/inventories`, formattedItem);
            console.log(response.data);
            navigate("/inventory");
        } catch (error) {
            console.error('Error posting a new inventory item', error);
        }   
    }

    return (
        <>
            <div className="inventory-addNew__titleContainer">
               <div className="inventory-addNew__wrapper">
                <Link to="/inventory" > <img src={arrowBackIcon} alt="Arrow Back Icon" className="inventory-addNew__backArrow" /> </Link>
                <h1 className="inventory-addNew__title">Add New Inventory Item</h1>
               </div>
            </div>
            <InventoryForm isNew={isNew} inventoryId={id} handleSubmit={addNewItem} />
        </>
    );
}

export default AddNewInventoryItem;