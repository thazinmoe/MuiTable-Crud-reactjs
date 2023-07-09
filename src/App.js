import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
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
      company: "DSV Air & Sea(Singapore)Lion Ltd",
      grouping: "YQ9167H-1250728",
      plateno: "YQ9167H",
      model: "FUSO Fighter FM65",
      cargotype: "Not Type",
      fueltype: "Petrol",
      brand: "Honda fit",
      oem: 92,
      gps:  <CheckIcon style={{ color: "#02A619" }} />,
      canbus:  <CheckIcon style={{ color: "#02A619" }} />,
    },

  ];
  
  const [todos, setTodos] = useState(initialTodos);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const inputHandleChange = (event) => {
    //convert input text to lower case
    // var lowerCase = event.target.value.toLowerCase();
    // setSearchTerm(lowerCase);
    // no convert input text
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // handle search logic here
    console.log(`Searching for ${searchTerm}...`);
  };

  const handleModalOpen = () => {
    console.log("Modal opened");
    setShowModal(true);
  };

  const handleModalClose = () => {
    console.log("Modal closed");
    setShowModal(false);
  };

  const handleAddTodo = (newTodo) => {
    console.log('thisfinal==>',newTodo);
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
      <input type="text" value={searchTerm} onChange={inputHandleChange} />
      <button onClick={handleSearchSubmit} type="submit">
        Search
      </button>
      <CustomizedTables todos={todos}  handleModalOpen={handleModalOpen} input={searchTerm} />
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
