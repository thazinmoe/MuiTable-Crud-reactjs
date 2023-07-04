import React, { useEffect, useRef, useState } from "react";
import AddVehicleIcon from "./Assets/Images/icons/car1.png";
import ImageUploadCard from "./ImageUpload";
import Select from "react-select";
import "./modal.css";

const AddVehicleModal = ({ handleModalClose, showModal, todos, handleAddTodo }) => {
  const modalRef = useRef();
  const [formvalue, setFormvalue] = useState({
    cargotype: "",
    carring: "",
    vehicleWidth: "",
    assetType: "",
    brand: "",
    vehiclepno: "",
    baseline: "",
    vehicleHeight: "",
    vehicleWeight: "",
    fuelType: "",
    model: "",
    vinNo: "",
    fueltankc: "",
    id: todos.length + 1,
  });

  const [formerror, setFormerror] = useState({});
  const [issubmit, setSubmit] = useState(false);
  const [assetTypeError, setAssetTypeError] = useState("");
  const [fuelTypeError, setFuelTypeError] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState(null);

  const handlevalidation = (e) => {
    const { name, value } = e.target;
    // setFormvalue({ ...formvalue, [name]: value });
    setFormvalue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value
    }));
    // Reset the select box error when it's changed
    if (name === "assetType") {
      setAssetTypeError("");
      setSelectedAssetType(value);
    }

    if (name === "fuelType") {
      setFuelTypeError("");
      setSelectedFuelType(value);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const formErrors = validationform(formvalue);
    setFormerror(formErrors);

    setSubmit(true);
    const grouping = selectedAssetType ? selectedAssetType.value : "";
    const fueltype = selectedFuelType ? selectedFuelType.value : "";
    console.log("formvalue:", formvalue);
    console.log("selectedAssetType:", selectedAssetType);
    console.log("selectedFuelType:", selectedFuelType);
    // Create a newTodo object with form values
    const newTodo = {
        id: formvalue.id,
      company: formvalue.baseline,
      grouping: grouping,
      plateno: formvalue.vehiclepno,
      model: formvalue.model,
      cargotype: formvalue.cargotype,
      fueltype: fueltype,
      brand: formvalue.brand,
      oem: formvalue.vinNo,
      gps: formvalue.gps,
      canbus: formvalue.canbus,
    };
    console.log("id==",newTodo)
    // Call the handleAddTodo function from props to update the todos state in the parent component
    handleAddTodo(newTodo, () => {
      setTimeout(() => {
        setFormvalue({
          cargotype: "",
          carring: "",
          vehicleWidth: "",
          assetType: "",
          brand: "",
          vehiclepno: "",
          baseline: "",
          vehicleHeight: "",
          vehicleWeight: "",
          fuelType: "",
          model: "",
          vinNo: "",
          fueltankc: "",
        });
        setSubmit(false);
      }, 0);
    });
  };
  

  const validationform = (value) => {
    const errors = {
      cargotype: "Please Enter Cargo Type",
      carring: "Please Enter Carrying Capacity (tonnes)",
      vehicleWidth: "Please Enter Vehicle Width (mm)",
      brand: "Please Enter Brand",
      vehiclepno: "Please Enter Vehicle Plate Number",
      baseline: "Please Enter Baseline Emission Factor (gCO₂/km)",
      vehicleHeight: "Please Enter Vehicle Height (mm)",
      vehicleWeight: "Please Enter Vehicle Weight (tonnes)",
      model: "Please Enter Model",
      vinNo: "Please Enter VIN Number",
      fueltankc: "Please Enter Fuel Tank Capacity (Litres)",
    };
  
    const selectErrors = {
      assetType: "Please select an asset type",
      fuelType: "Please select a fuel type",
    };
  
    const formErrors = {};
  
    for (const field in errors) {
      if (!value[field]) {
        formErrors[field] = errors[field];
      }
    }
  
    for (const field in selectErrors) {
      if (!value[field] || value[field] === "") {
        formErrors[field] = selectErrors[field];
      }
    }
  
    return formErrors;
  };
  
  const assetTypeOption = [
    { value: "Vehicle", label: "Vehicle" },
    { value: "Equipment", label: "Equipment" },
  ];

  const vehicleTypeOption = [
    { value: "Battery", label: "Battery" },
    { value: "Diesel", label: "Diesel" },
    { value: "Petrol", label: "Petrol" },
  ];

  useEffect(() => {
    const modalElement = modalRef.current;

    if (showModal) {
      modalElement.classList.add("show");
      modalElement.style.display = "block";
      document.body.classList.add("modal-open");
    } else {
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      document.body.classList.remove("modal-open");
    }

    if (Object.keys(formerror).length === 0 && issubmit) {
      console.log("formerror",formvalue);
    }

    // Update asset type error when form errors change
    if (formerror.assetType && selectedAssetType === null) {
      setAssetTypeError(formerror.assetType);
    } else {
      setAssetTypeError("");
    }

    // Update fuelType error when form errors change
    if (formerror.fuelType && selectedFuelType === null) {
      setFuelTypeError(formerror.fuelType);
    } else {
      setFuelTypeError("");
    }
    // },[showModal, formerror, formvalue, issubmit, selectedAssetType, selectedFuelType]);
  }, [showModal, formerror, formvalue, issubmit]);

  const closeModal = () => {
    handleModalClose();
  };

  const defaultStyle = {
    width: "100%",
    background: "#202b60",
    color: "#B0B1B8",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    boxShadow: "none",
    shapeOutline: "none",
    outline: "none",
    border: "1px solid #5E5E5E",
    borderRadius: 5,
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#202b60",
      color: "#919191",
      borderRadius: 3,
      borderColor: "#5E5E5E",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: "#919191",
        cursor: "pointer",
      },
    }),
    menu: (base) => ({
      ...base,
      borderBottomRadius: 10,
      zIndex: 100,
    }),
    menuList: (base) => ({
      ...base,
      color: "#000000",
    }),
    input: (base, state) => ({
      ...base,
      color: "#B0B1B8",
    }),
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      tabIndex="-1"
      aria-labelledby="addVehicleModalLabel"
      aria-hidden="true"
      ref={modalRef}
      onSubmit={handlesubmit}
    >
      <div className="modal-dialog modal-xl rounded">
        <div className="modal-content">
          <div className="modal-header">
            <h4
              className="modal-title modal-text py-1"
              id="addVehicleModalLabel"
            >
              <span className="pe-2">
                <img height="30px" src={AddVehicleIcon} />
              </span>
              Add Vehicle Model
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            {/* Add your form or content here */}
            <div className="row">
              <div className="col-4 col-sm-12 col-lg-4 col-md-4 col-xl-4 col-xs-4">
                <div className="pb-3">
                  <p className="modal-text mb-1">Vehicle Image</p>
                  <ImageUploadCard />
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">Cargo Type</p>
                  <input
                    type="text"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="Cargo Type"
                    name="cargotype"
                    value={formvalue.cargotype}
                    onChange={handlevalidation}
                  />
                  {formerror.cargotype && (
                    <span className="text-danger">*{formerror.cargotype}</span>
                  )}
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">Carrying Capacity (tonnes)</p>
                  <input
                    type="number"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="Carrying Capacity (tonnes)"
                    name="carring"
                    value={formvalue.carring}
                    onChange={handlevalidation}
                  />
                  {formerror.carring && (
                    <span className="text-danger">*{formerror.carring}</span>
                  )}
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">Vehicle Width (mm)</p>
                  <input
                    type="number"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="Vehicle Width (mm)"
                    name="vehicleWidth"
                    value={formvalue.vehicleWidth}
                    onChange={handlevalidation}
                  />
                  {formerror.vehicleWidth && (
                    <span className="text-danger">
                      *{formerror.vehicleWidth}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-4 col-sm-12 col-lg-4 col-md-4 col-xl-4 col-xs-4">
                <div className="pb-3">
                  <p className="modal-text mb-1">
                    <span style={{ color: "#ffc107" }}>*</span>
                    Asset Type
                  </p>
                  <Select
                    classNamePrefix="my-custom-select"
                    styles={customStyles}
                    options={assetTypeOption}
                    value={selectedAssetType}
                    onChange={(selectedOption) =>
                      setSelectedAssetType(selectedOption)
                    }
                  />
                  {assetTypeError && (
                    <span className="text-danger">*{assetTypeError}</span>
                  )}
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">
                    <span style={{ color: "#ffc107" }}>*</span>
                    Brand
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="Brand"
                    name="brand"
                    value={formvalue.brand}
                    onChange={handlevalidation}
                  />
                  {formerror.brand && (
                    <span className="text-danger">*{formerror.brand}</span>
                  )}
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">
                    <span style={{ color: "#ffc107" }}>*</span>
                    Vehicle Plate Number
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="Vehicle Plate Number"
                    name="vehiclepno"
                    value={formvalue.vehiclepno}
                    onChange={handlevalidation}
                  />
                  {formerror.vehiclepno && (
                    <span className="text-danger">*{formerror.vehiclepno}</span>
                  )}
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">
                    <span style={{ color: "#ffc107" }}>*</span>
                    Baseline Emission Factor (gCO₂/km)
                  </p>
                  <input
                    type="number"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="Baseline Emission Factor (gCO₂/km)"
                    name="baseline"
                    value={formvalue.baseline}
                    onChange={handlevalidation}
                  />
                  {formerror.baseline && (
                    <span className="text-danger">*{formerror.baseline}</span>
                  )}
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">Vehicle Height (mm)</p>
                  <input
                    type="number"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="Vehicle Height (mm)"
                    name="vehicleHeight"
                    value={formvalue.vehicleHeight}
                    onChange={handlevalidation}
                  />
                  {formerror.vehicleHeight && (
                    <span className="text-danger">
                      *{formerror.vehicleHeight}
                    </span>
                  )}
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">Vehicle Weight (tonnes)</p>
                  <input
                    type="number"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="Vehicle Weight (tonnes)"
                    name="vehicleWeight"
                    value={formvalue.vehicleWeight}
                    onChange={handlevalidation}
                  />
                  {formerror.vehicleWeight && (
                    <span className="text-danger">
                      *{formerror.vehicleWeight}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-4 col-sm-12 col-lg-4 col-md-4 col-xl-4 col-xs-4">
                <div className="pb-3">
                  <p className="modal-text mb-1">
                    <span style={{ color: "#ffc107" }}>*</span>
                    Fuel Type
                  </p>
                  <Select
                    classNamePrefix="my-custom-select"
                    styles={customStyles}
                    options={vehicleTypeOption}
                    value={selectedFuelType}
                    onChange={(selectedOption) =>
                      setSelectedFuelType(selectedOption)
                    }
                  />
                  {fuelTypeError && (
                    <span className="text-danger">*{fuelTypeError}</span>
                  )}
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">
                    <span style={{ color: "#ffc107" }}>*</span>
                    Model
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="Model"
                    name="model"
                    value={formvalue.model}
                    onChange={handlevalidation}
                  />
                  {formerror.model && (
                    <span className="text-danger">*{formerror.model}</span>
                  )}
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">
                    <span style={{ color: "#ffc107" }}>*</span>
                    VIN Number
                  </p>
                  <input
                    type="number"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="VIN Number"
                    name="vinNo"
                    value={formvalue.vinNo}
                    onChange={handlevalidation}
                  />
                  {formerror.vinNo && (
                    <span className="text-danger">*{formerror.vinNo}</span>
                  )}
                </div>
                <div className="pb-3">
                  <p className="modal-text mb-1">Fuel Tank Capacity (Litres)</p>
                  <input
                    type="number"
                    className="form-control"
                    style={defaultStyle}
                    placeholder="Fuel Tank Capacity (Litres)"
                    name="fueltankc"
                    onChange={handlevalidation}
                  />
                  {formerror.fueltankc && (
                    <span className="text-danger">*{formerror.fueltankc}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
                <button
                    type="button"
                    onClick={handlesubmit}
                    className="col-3 btn btn-success"
                >
                    Add
                </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleModal;

