// import { useState, useEffect } from "react";
import React from "react";
import "./WarehouseDeleteButton.scss";

const WarehouseDeleteButton = ({ onClick }) => {
    return (
        <button className="delete-button" onClick={onClick}>Delete Icon</button>
    );
};
export default WarehouseDeleteButton;



