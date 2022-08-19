
import {
   Modal,Box
  } from "@mui/material";
  import * as React from 'react';
  import CloseIcon from '@mui/icons-material/Close';
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
        width: '90%',
        height:'90%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4, }}>
                <div style={{display: 'flex', flexDirection:'row' }}>
                    <h2 style={{width: '100%'}}  id="parent-modal-title">Text in a modal</h2>
                <CloseIcon onClick={()=>props?.onClickOpen()} />
                </div>
                <p id="parent-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddPengiriman