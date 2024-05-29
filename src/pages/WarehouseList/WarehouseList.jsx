import React from 'react';
import Header from '../../components/Header/Header';
import WarehouseListComp from '../../components/WarehouseListComp/WarehouseListComp';
import Footer from '../../components/Footer/Footer';
import './WarehouseList.scss';

const WarehouseList = () => {
  return (
    <div className="warehouse-list-page">
      <div className="warehouse-list-comp-wrapper">
        <WarehouseListComp />
      </div>
    </div>
  );
};

export default WarehouseList;
