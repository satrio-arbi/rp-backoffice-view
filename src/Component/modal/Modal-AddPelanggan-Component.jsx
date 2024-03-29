
import {
   Modal,Box,Button
  } from "@mui/material";
  import CloseIcon from '@mui/icons-material/Close';
  import React,{useState,useEffect} from 'react';
import  Input  from "../../Component/input";
const ModalAddPelanggan =(props)=>{
    const [alamat,setAlamat] = useState('')
    const [email,setEmail] = useState('')
    const [nama_pelanggan,setNama_pelanggan] = useState('')
    const [no_hp,setNo_hp] = useState('')
    const [nik,setNik] = useState('')
    
    useEffect(()=>{
        setAlamat('')
        setEmail('')
        setNama_pelanggan('')
        setNo_hp('')
        setNik('')
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
        overflow: "hidden",
        overflowY: "scroll",
        width: '90%',
        height:'90%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4, }}>
                 <div style={{display: 'flex', flexDirection:'row' }}>
                    <h2 style={{width: '100%'}} id="parent-modal-title">Add Pelanggan</h2>
                    <CloseIcon onClick={()=>props?.onClickOpen()} />
                </div>
                <div>
                    {/* <p>Nama Kategori</p> */}
                    <Input 
                    value={alamat}
                    disable={false}
                    label={'Alamat pelanggan'}
                    onChange={(v)=>setAlamat(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    <Input 
                    value={email}
                    disable={false}
                    label={'Email pelanggan'}
                    onChange={(v)=>setEmail(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    <Input 
                    value={nik}
                    disable={false}
                    label={'NIK pelanggan'}
                    onChange={(v)=>setNik(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    <Input 
                    value={nama_pelanggan}
                    disable={false}
                    label={'Nama pelanggan'}
                    onChange={(v)=>setNama_pelanggan(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={no_hp}
                    disable={false}
                    label={'Nomor hp pelanggan'}
                    onChange={(v)=>setNo_hp(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit(alamat,email,nama_pelanggan,
    no_hp,nik)} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddPelanggan