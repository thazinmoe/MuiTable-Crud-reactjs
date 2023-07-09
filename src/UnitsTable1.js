import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableSortLabel } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Select from "react-select";
import AddVehicleIcon from "./Assets/Images/icons/car1.png";
import modal from "./ModalTable.module.css";
import CheckIcon from "@mui/icons-material/Check";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
     backgroundColor: "#202B60",
  },
  '&:nth-of-type(even)': {
    // backgroundColor: theme.palette.action.hover,
     backgroundColor: "#16204E",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const headers = [
  { label: "Company", key: "company" },
  { label: "Grouping", key: "grouping" },
  { label: "Plate No.", key: "plate_number" },
  { label: "Model", key: "model" },
  { label: "Cargo type", key: "cargo_type" },
  { label: "Fuel type", key: "fuel_type" },
  { label: "Brand", key: "brand" },
  {
    label: "OEM",
    key: "oem",
    icon: (
      <span 
        style={{
          paddingLeft: "6px",
          cursor: "pointer",
          color: "rgb(198, 198, 198)",
        }
      }>
        <InfoIcon/>
      </span>
    ),
  },
  { label: "GPS", key: "gps" },
  { label: "CANbus", key: "CAMbus" },
  { label: "Action", key: "action" },
];

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

const assetsTypesOption = [
  {
    value: "0",
    label: "All",
  },
  {
    value: "vehicle",
    label: "Vehicles",
  },
  {
    value: "equipment",
    label: "Equipment",
  },
  {
    value: "infrastructure",
    label: "Infrastructure",
  },
];

export default function CustomizedTables({todos, handleModalOpen, input}) {

  // Search for one key & one column in todos
  // const filteredData = todos.filter((el) => {
  //   if(input === ''){
  //     return el
  //   }else {
  //     console.log("el",el,"--",`${el.brand && el.brand.toLowerCase().includes(input.toLowerCase())}`,input.toLowerCase())
  //     // return el.brand && el.brand.toLowerCase().includes(input.toLowerCase());
  //     return el.oem && el.oem.includes(input);
  //   }
  // })
  
  // console.log("input",input)
  // console.log("keys======>", Object.keys(todos));

  // Search for all columns & public search in todos
  const filteredData = todos.filter((todo) => {
    for (const key in todo) {
      const value = todo[key];
      // console.log("value==",value,"===",key)
      if (typeof value === 'string' && value.toLowerCase().includes(input.toLowerCase())) {
        return true;
      }
      if (key === 'oem' && typeof value === 'number' && value.toString().includes(input.toLowerCase())) {
        return true;
      }
    }
    return false;
  });
  
  console.log("filteredData==", filteredData);

  return (
    <>
      <div className="d-flex justify-content-between my-2">
        <div className="mt-3">
            <button
              type="button"
              className={modal.addButton}
              // className={`addButton ${modal.addButton}`}
              onClick={handleModalOpen}
            >
              <span>
                <img className="pe-1" src={AddVehicleIcon} height="20px" />
                Add New Vehicle
              </span>
            </button>
          </div>
          <span className="col-3">
            <label  style={{
                            fontWeight: "bold",
                            color: "#919191",
                        }}
            >Asset Type:</label>
            <br />
            <Select
            classNamePrefix="my-custom-select"
            styles={customStyles}
              menuListColor="black"
              isSearchable={false}
              options={assetsTypesOption}
              defaultValue={[assetsTypesOption[0]]}
            />
            </span>
      </div>
      <TableContainer component={Paper} style={{ background: "none" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            {headers.map((headCell, index) => (
                <TableCell
                  key={index}
                  align={"left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                  style={{ background: "#29325B" }}
                >
                  {headCell.label === "" || (
                    <TableSortLabel
                      style={{
                        minWidth: 80,
                        color: "#919191",
                      }}
                    >
                      <span className="fw-bold d-flex">
                        {headCell.label} {headCell.icon}
                      </span>
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
          {filteredData?.length > 0 &&
            filteredData.map((todo,index)=> (
                      <StyledTableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {Object.values(todo).map((t,k) => 
                          k !==0 && (
                              <TableCell
                                key={k}
                                sx={{
                                  color: "#c6c6c6",
                                  borderBottom: "none"
                                }}
                              >
                                {t}
                              </TableCell>
                          )
                        )}
                        <TableCell
                          sx={{
                            color: "#c6c6c6",
                            borderBottom: "none",
                          }}
                        >
                        <div className="d-flex">
                          <span className="py-2">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm p-1 mx-2"
                            >
                              <ModeEditIcon
                              //  onClick={handleModalOpen}
                               />
                            </button>
                          </span>

                          <span className="py-2">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm p-1 mx-1"
                            >
                              <DeleteForeverIcon />
                            </button>
                          </span>
                        </div>
                      </TableCell>
                      </StyledTableRow>
                     ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}