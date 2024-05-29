import React from 'react';
import WarehouseDetailsComp from '../../components/WarehouseDetailsComp/WarehouseDetailsComp';
import './WarehouseDetails.scss';

const WarehouseDetails = () => {
  return (
    <div className="warehouse-details-page">
      <div className="warehouse-details-comp-wrapper">
        <WarehouseDetailsComp />
      </div>
    </div>
  );
};

export default WarehouseDetails;
