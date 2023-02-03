import { Modal, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

const ModalCetakBarcode = (props) => {
  const ref = useRef();
  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const pageStyle = `
  @page {
    size: 40mm 26mm;
  };

  @media all {
    .pageBreak {
      display: none
    }
  };

  @media print {
    .pageBreak {
      page-break-before: always;
    }
  }
`;
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
            width: "30%",
            height: "45%",
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
            <div ref={ref}>
              <Barcode
                value={props?.artikel_product}
                width={1}
                height={25}
                textMargin={2}
                fontSize={15}
                marginBottom={1}
              />
              <p
                style={{
                  marginTop: 0,
                  marginBottom: 1,
                  fontSize: 8,
                  textAlign: "right",
                }}
              >
                {props?.nama_product}
              </p>
              <p style={{ marginTop: 1, fontSize: 8, textAlign: "right" }}>
                Rp
                {numberWithCommas(props?.harga_jual)}
              </p>
            </div>

            <ReactToPrint
              trigger={() => <Button>Print</Button>}
              content={() => ref.current}
              pageStyle={pageStyle}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ModalCetakBarcode;
