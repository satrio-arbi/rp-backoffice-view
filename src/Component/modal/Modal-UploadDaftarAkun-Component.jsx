import { Modal, Box, Button } from "@mui/material";
import { alertSuccess, alertError } from "../../Component/alert/sweetalert";
import React, { useState, useEffect, useRef } from "react";
import { importDaftarAkun } from "../../Config/Api-new";
import CloseIcon from "@mui/icons-material/Close";
//  import  Input  from "../../Component/input";
const ModalUploadDaftarAkun = (props) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const inputRefUploadImage = useRef(null);
  useEffect(() => {
    setFile(null);
    setName(null);
  }, [props?.open]);
  const atChangeFile = async (e) => {
    const fileStrem = e.target?.files[0];
    setFile(fileStrem);
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      // setImageAddress(this.result);
    });
    reader.readAsDataURL(fileStrem);
    console.log({ fileStrem });
    setName(fileStrem?.name);
    const formData = new FormData();
    formData.append("file", fileStrem);
    let res = await importDaftarAkun(formData);
    if (res?.status) {
      props?.onClickOpen();
      props?.mutate();
      alertSuccess("Success", "");
    } else {
      alertError("Error", "Fail upload data");
    }
  };
  const atClickUploadHandler = async () => {
    inputRefUploadImage?.current?.click();
  };
  return (
    <>
      <Modal
        open={props?.open}
        onClose={props?.onClickOpen}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2 style={{ width: "100%" }} id="parent-modal-title">
              Upload kategori
            </h2>
            <CloseIcon onClick={() => props?.onClickOpen()} />
          </div>
          <div>
            <p>Upload Kategori</p>
            <p>{name}</p>
            {/* <Button 
                     style={{marginTop:10}}
                     onClick={()=>atClickUploadHandler()}
                     variant="contained">Chose file</Button>
                     <input   onChange={(e)=>atChangeFile(e)} 
                     accept="
                     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                     application/vnd.ms-excel
                     " type="file" 
                     hidden
                     ref={inputRefUploadImage}
                     /> */}
            <Button
              variant="contained"
              component="label"
              onChange={(e) => atChangeFile(e)}
            >
              Upload File
              <input
                accept="
                    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                    application/vnd.ms-excel
                    "
                type="file"
                hidden
              />
            </Button>
            {/* <Input 
                     value={name}
                     disable={false}
                     type='file'
                     label={'Nama Kategori'}
                     onChange={(v)=>setName(v?.target?.value)}
                     style={{width:'100%'}}
                     /> */}
            {/* <div style={{marginTop:10}}>
                         <Button onClick={()=>props?.submit(file)} variant="contained">Upload</Button>
                     </div> */}
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ModalUploadDaftarAkun;
