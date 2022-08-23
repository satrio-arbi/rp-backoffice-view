
import {
   Modal,Box,Button
  } from "@mui/material";
  import CloseIcon from '@mui/icons-material/Close';
  import React,{useState,useEffect} from 'react';
import  Input  from "../../Component/input";
const ModalAddProject =(props)=>{
    const [project_name,setProject_name] = useState('')
    
    
    
    useEffect(()=>{
        setProject_name('')
    },[props?.open])

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
                    <h2 style={{width: '100%'}}  id="parent-modal-title">Add Project</h2>
                <CloseIcon onClick={()=>props?.onClickOpen()} />
                </div>
                <div>
                    {/* <p>Nama Kategori</p> */}
                    <Input 
                    value={project_name}
                    disable={false}
                    label={'Nama Project'}
                    onChange={(v)=>setProject_name(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    
                    
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit(project_name)} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddProject