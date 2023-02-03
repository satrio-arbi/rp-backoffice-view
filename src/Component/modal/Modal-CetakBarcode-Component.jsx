import { Modal, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Barcode from "react-barcode";
const ModalCetakBarcode = (props) => {
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
            overflow: "hidden",
            overflowY: "scroll",
            width: "40%",
            height: "55%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* <h2 style={{ width: "100%" }} id="parent-modal-title"></h2>
            <CloseIcon onClick={() => props?.onClickOpen()} /> */}
          </div>
          <div>
            <p style={{ marginBottom: 1 }}>{props?.nama_product}</p>
            <p style={{ marginTop: 1 }}>{props?.type_name}</p>
            <Barcode value={props?.artikel_product} width="3" />

            <p style={{ marginBottom: 1 }}>{props?.nama_product}</p>
            <p style={{ marginTop: 1 }}>{props?.type_name}</p>
            <Barcode value={props?.artikel_product} width="3" />
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ModalCetakBarcode;
