import React from 'react';
import Header from '../../components/Header/Header';
import InventoryItemDetailsComp from '../../components/InventoryItemDetailsComp/InventoryItemDetailsComp';
import Footer from '../../components/Footer/Footer';
import './InventoryItemDetails.scss';

const InventoryItemDetails = () => {
  return (
    <div className="inventory-item-details-page">
      <div className="inventory-item-details-comp-wrapper">
        <InventoryItemDetailsComp />
      </div>
    </div>
  );
};

export default InventoryItemDetails;
