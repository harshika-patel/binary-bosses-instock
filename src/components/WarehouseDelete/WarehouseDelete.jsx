import { useState, useEffect } from "react";
import React from "react";
import "./WarehouseDelete.scss";

const WarehouseDelete = ({ onClick }) => {
    return (
        <button className="delete-button" onClick={onClick}>Delete Icon</button>
    );
};
export default WarehouseDelete;



