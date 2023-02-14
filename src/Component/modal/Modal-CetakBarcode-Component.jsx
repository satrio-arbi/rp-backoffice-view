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
    size: 40mm 30mm;
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
      <style>
        {`
          td {
            vertical-align: top;
            padding-top: 0px;
            padding-bottom: 0px;
          }
      `}
      </style>
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
            height: "30%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}></div>
          <div>
            <div
              ref={ref}
              style={{
                display: "table",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              <Barcode
                value={props?.artikel_product}
                width={1}
                height={15}
                textMargin={1}
                fontSize={5}
                marginBottom={1}
              />
              <table>
                <tr>
                  <td>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 5,
                        fontSize: 5,
                        textAlign: "left",
                      }}
                    >
                      Name
                    </p>
                  </td>
                  <td>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: 5,
                        textAlign: "left",
                      }}
                    >
                      :
                    </p>
                  </td>
                  <td>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: 5,
                        textAlign: "left",
                      }}
                    >
                      {props?.nama_product}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 5,
                        fontSize: 5,
                        textAlign: "left",
                      }}
                    >
                      Type
                    </p>
                  </td>
                  <td>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: 5,
                        textAlign: "left",
                      }}
                    >
                      :
                    </p>
                  </td>
                  <td>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: 5,
                        textAlign: "left",
                      }}
                    >
                      {props?.type_name}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        marginTop: 1,
                        marginLeft: 5,
                        fontSize: 5,
                        textAlign: "left",
                      }}
                    >
                      Price
                    </p>
                  </td>
                  <td>
                    <p
                      style={{
                        marginTop: 1,
                        fontSize: 5,
                        textAlign: "left",
                      }}
                    >
                      :
                    </p>
                  </td>
                  <td>
                    <p
                      style={{
                        marginTop: 1,
                        fontSize: 6,
                        textAlign: "left",
                      }}
                    >
                      Rp
                      {numberWithCommas(props?.harga_jual)}
                    </p>
                  </td>
                </tr>
              </table>
              <Barcode
                value={props?.sku_code}
                width={1}
                height={15}
                textMargin={1}
                fontSize={6}
                marginBottom={1}
              />
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
