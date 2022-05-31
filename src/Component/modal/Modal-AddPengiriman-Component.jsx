
import {
   Modal,Box
  } from "@mui/material";
  import * as React from 'react';
const ModalAddPengiriman =(props)=>{
    const style = {
      
      };
    const rootRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
        
        <Modal
            open={props?.open}
            onClose={props?.onClickOpen}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
            <Box sx={{      position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height:500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4, }}>
                <h2 id="parent-modal-title">Text in a modal</h2>
                <p id="parent-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddPengiriman