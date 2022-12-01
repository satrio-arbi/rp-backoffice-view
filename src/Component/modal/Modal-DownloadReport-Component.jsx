import { Modal, Box, Button } from "@mui/material";

import React, { useState, useEffect } from "react";
import Input from "../../Component/input";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
const ModalDownloadReport = (props) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  useEffect(() => {
    setStart(moment(new Date()).format("YYYY-MM-DD"));
    setEnd(moment(new Date()).format("YYYY-MM-DD"));
  }, [props?.open]);

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
            width: "60%",
            height: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2 style={{ width: "100%" }} id="parent-modal-title">
              Report {props?.title}
            </h2>
            <CloseIcon onClick={() => props?.onClickOpen()} />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "100%", marginRight: 10 }}>
              <Input
                value={start}
                disable={false}
                type={"date"}
                label={"Start Date"}
                onChange={(v) => setStart(v?.target?.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ width: "100%", marginRight: 10 }}>
              <Input
                value={end}
                disable={false}
                type={"date"}
                label={"End Date"}
                onChange={(v) => setEnd(v?.target?.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <Button
              onClick={() =>
                props?.submit(
                  moment(start).format("YYYY-MM-DD"),
                  moment(end).format("YYYY-MM-DD")
                )
              }
              variant="contained"
            >
              Download
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ModalDownloadReport;
