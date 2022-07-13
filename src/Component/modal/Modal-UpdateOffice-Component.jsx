
import {
   Modal,Box,Button
  } from "@mui/material";
  
  import React,{useState,useEffect} from 'react';
import  Input  from "../../Component/input";
const ModalUpdateOffice =(props)=>{
    const [alamat,setAlamat] = useState('')
    const [atasan,setAtasan] = useState('')
    const [hp,setHp] = useState('')
    const [office,setOffice] = useState('')
    const dats = props?.data
    useEffect(()=>{
        
        setAlamat(dats?.alamat)
        setAtasan(dats?.kepala_office )
        setHp(dats?.no_tlpn)
        setOffice(dats?.office_name )
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
                <h2 id="parent-modal-title">Update Office</h2>
                <div>
                    {/* <p>Nama Kategori</p> */}
                    <Input 
                    value={office}
                    disable={false}
                    label={'Nama Office'}
                    onChange={(v)=>setOffice(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={atasan}
                    disable={false}
                    label={'Kepala Office'}
                    onChange={(v)=>setAtasan(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    
                    <Input 
                    value={hp}
                    disable={false}
                    label={'No.HP atasan'}
                    onChange={(v)=>setHp(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    
                    <Input 
                    value={alamat}
                    disable={false}
                    label={'Alamat Store'}
                    onChange={(v)=>setAlamat(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit(alamat,atasan,hp,office)} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalUpdateOffice