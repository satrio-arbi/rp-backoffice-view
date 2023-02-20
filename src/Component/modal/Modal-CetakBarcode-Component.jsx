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
              <table style={{ marginLeft: 5, marginRight: 5 }}>
                <tr>
                  <td align="center" colSpan={3}>
                    <Barcode
                      value={props?.artikel_product}
                      width={1.1}
                      height={19}
                      textMargin={1}
                      fontSize={9}
                      marginBottom={1}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 5,
                        fontSize: 7,
                        textAlign: "left",
                      }}
                    >
                      <b>Name</b>
                    </p>
                  </td>
                  <td>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: 7,
                        textAlign: "left",
                      }}
                    >
                      <b>:</b>
                    </p>
                  </td>
                  <td>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: 7,
                        textAlign: "left",
                      }}
                    >
                      <b>{props?.nama_product}</b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        marginTop: 1,
                        marginLeft: 5,
                        fontSize: 7,
                        textAlign: "left",
                      }}
                    >
                      <b>Price</b>
                    </p>
                  </td>
                  <td>
                    <p
                      style={{
                        marginTop: 1,
                        fontSize: 7,
                        textAlign: "left",
                      }}
                    >
                      <b>:</b>
                    </p>
                  </td>
                  <td>
                    <p
                      style={{
                        marginTop: 1,
                        fontSize: 7,
                        textAlign: "left",
                      }}
                    >
                      <b>Rp {numberWithCommas(props?.harga_jual)}</b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" colSpan={3}>
                    <Barcode
                      value={props?.sku_code}
                      width={1.1}
                      height={19}
                      textMargin={1}
                      fontSize={9}
                      marginBottom={1}
                    />
                  </td>
                </tr>
              </table>
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
