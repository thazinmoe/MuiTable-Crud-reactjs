import React, { useState, useRef } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  root: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center"
    // height: "117px",
    background: "#12193D",
  },
  // button: {
  //   margin: 10
  // }
  img:{
    position: 'relative',
  },
  closeButton:{
    // background: 'transparent',
    color:"#DC3545",
    width: '0px',
    border: 0,
    position: 'absolute',
    bottom: '65%',
    right: '10%',
    fontSize: '18px',
    stroke:'#DC3545', 
    strokeWidth: '2px',
  }
};

const ImageUploadCard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // const handleUploadClick = event => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setSelectedFile(reader.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }else {
  //     // Reset the file input value and clear the selected file state
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = null;
  //     }
  //     setSelectedFile(null);
  //   }
  // };

  const handleUploadClick = event => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };

      reader.readAsDataURL(file);
      console.log("selected", selectedFile); 
    }
  };


  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
  }

  return (
    <div className="p-0 mb-2">
      {/* {console.log("selected",selectedFile)} */}
      <Card className="py-3" style={styles.root}>
        <CardContent className="p-0">
          {!selectedFile && (
            <>
              <input
                accept="image/*"
                type="file"
                onChange={handleUploadClick}
                style={{ display: "none", }}
                id="contained-button-file"
                ref={fileInputRef}
              />
              <label htmlFor="contained-button-file" className="w-100">
                {/* <Fab component="span" style={styles.button}> */}
                <span className="d-flex flex-column justify-content-center align-items-center">
                  {/* <AddPhotoAlternateIcon className="text-light"/> */}
                  <p className="p-5 mb-4">
                  <CloudUploadIcon className="text-light"/>
                  </p>
                  <div className="text-white p-0">Add an Image</div>
                  </span>
                {/* </Fab> */}
              </label>
            </>
          )}
        </CardContent>
        {selectedFile && (
          <div className="d-flex justify-content-center align-items-center m-0">          
            <span style={styles.img}>
              <img
                src={selectedFile}
                alt="Uploaded"
                height={'84px'}
                onClick={handleImageClick}
              />
              <Fab
                size="small"
                color="secondary"
                style={styles.closeButton}
                onClick={handleRemoveImage}
              >
                <CloseIcon fontSize="inherit" />
              </Fab>
            </span>
            <input
              accept="image/*"
              type="file"
              onChange={handleUploadClick}
              style={{ display: "none" }}
              id="contained-button-file"
              ref={fileInputRef}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ImageUploadCard;



