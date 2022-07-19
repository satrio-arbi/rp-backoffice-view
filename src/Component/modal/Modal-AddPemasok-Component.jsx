
import {
   Modal,Box,Button
  } from "@mui/material";
  
  import React,{useState,useEffect} from 'react';
import  Input  from "../../Component/input";
const ModalAddPemasok =(props)=>{
    const [alamat,setAlamat] = useState('')
    const [email,setEmail] = useState('')
    const [harga_jual,setHarga_jual] = useState('')
    const [nama_pemasok,setNama_pemasok] = useState('')
    const [no_hp,setNo_hp] = useState('')
    const [kode_pemasok,setKode_pemasok] = useState('')
    const [hpp,setHpp] = useState('')
   
    
    useEffect(()=>{
        setAlamat('')
        setEmail('')
        setHarga_jual('')
        setNama_pemasok('')
        setNo_hp('')
        setKode_pemasok('')
        setHpp('')
        
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
                <h2 id="parent-modal-title">Add Pemasok</h2>
                <div>
                    {/* <p>Nama Kategori</p> */}
                    <Input 
                    value={alamat}
                    disable={false}
                    label={'Alamat pemasok'}
                    onChange={(v)=>setAlamat(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    <Input 
                    value={email}
                    disable={false}
                    label={'Email pemasok'}
                    onChange={(v)=>setEmail(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                       <Input 
                    value={nama_pemasok}
                    disable={false}
                    label={'Nama pemasok'}
                    onChange={(v)=>setNama_pemasok(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={no_hp}
                    disable={false}
                    label={'Nomor hp pemasok'}
                    onChange={(v)=>setNo_hp(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={kode_pemasok}
                    disable={false}
                    label={'kode pemasok '}
                    onChange={(v)=>setKode_pemasok(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                   
                     {/* <Input 
                    value={harga_jual}
                    disable={false}
                    label={'harga jual'}
                    onChange={(v)=>setHarga_jual(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                      <Input 
                    value={hpp}
                    disable={false}
                    label={'hpp '}
                    onChange={(v)=>setHpp(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     */}
                  
                    
                    
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit(alamat,email,harga_jual,nama_pemasok,
    no_hp,kode_pemasok,hpp)} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddPemasok