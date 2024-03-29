
import {
   Modal,Box,Button
  } from "@mui/material";
  import moment from "moment";
  import CloseIcon from '@mui/icons-material/Close';
  import React,{useState,useEffect} from 'react';
import  Input  from "../../Component/input";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
const ModalUpdateddKaryawan =(props)=>{
   
    const [lokasiStore,setLokasiStore] = useState('')
    const [idStore,setIdStore] = useState('')
   
    const data = props?.data
    
    useEffect(()=>{
     
        setIdStore(data?.id_store)
       
        setLokasiStore(data?.lokasi_store)
      
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
        overflow: "hidden",
          overflowY: "scroll",
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height:'90%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4, }}>
                <div style={{display: 'flex', flexDirection:'row' }}>
                    <h2 style={{width: '100%'}} id="parent-modal-title">Pindah Store Karyawan</h2>
                <CloseIcon onClick={()=>props?.onClickOpen()} />
                </div>
                <div>
                   
                     <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Store</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={idStore}
                            label="Store"
                            onChange={(v)=>{setIdStore(v?.target?.value)}}
                          >
                            {props?.store?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.store_name}-{d?.alamat}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit( 
                           
                            lokasiStore,
                            idStore,
                            data)} variant="contained">Pindah</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalUpdateddKaryawan