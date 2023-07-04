import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import AddVehicleIcon from "./Assets/Images/icons/car1.png";
import CustomizedTables from './UnitsTable1';
import "bootstrap/dist/css/bootstrap.min.css";
import CheckIcon from "@mui/icons-material/Check";
import AddVehicleModal from './Modal';

function App() {
  const initialTodos = [
    {
      id: 1,
      company: "DSV Air & Sea(Singapore)Pie Ltd",
      grouping: "YQ9167H-1250728",
      plateno: "YQ9167H",
      model: "FUSO Fighter FM65FM6RDEA",
      cargotype: "Cargo",
      fueltype: "Diesel",
      brand: "Mitsubishi",
      oem: 95,
      gps:  <CheckIcon style={{ color: "#02A619" }} />,
      canbus:  <CheckIcon style={{ color: "#02A619" }} />,
    },
    {
      id: 2,
      company: "DSV Air & Sea(Singapore)Pie Ltd",
      grouping: "YQ9167H-1250728",
      plateno: "YQ9167H",
      model: "FUSO Fighter FM65FM6RDEA",
      cargotype: "Cargo",
      fueltype: "Diesel",
      brand: "Mitsubishi",
      oem: 92,
      gps:  <CheckIcon style={{ color: "#02A619" }} />,
      canbus:  <CheckIcon style={{ color: "#02A619" }} />,
    },

  ];
  
  const [todos, setTodos] = useState(initialTodos);
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    console.log("Modal opened");
    setShowModal(true);
  };

  const handleModalClose = () => {
    console.log("Modal closed");
    setShowModal(false);
  };

  const handleAddTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div className="container-fluid">
       <div className="row">
        <h3 className="my-2 text-light-emphasis">Units</h3>
        <h6 className="my-3 text-light-emphasis">
          Organisation : <img src={AddVehicleIcon} height="20px" />
        </h6>
      </div>
      <CustomizedTables todos={todos}  handleModalOpen={handleModalOpen} />
      <AddVehicleModal
        handleModalClose={handleModalClose}
        showModal={showModal}
        todos={todos}
        handleAddTodo={handleAddTodo}
      />
    </div>
  );
}

export default App;
