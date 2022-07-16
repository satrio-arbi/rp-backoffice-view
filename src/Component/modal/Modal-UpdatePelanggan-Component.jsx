
import {
   Modal,Box,Button
  } from "@mui/material";
  
  import React,{useState,useEffect} from 'react';
import  Input  from "../../Component/input";
const ModalUpdatePelanggan =(props)=>{
    const [alamat,setAlamat] = useState('')
    const [email,setEmail] = useState('')
    const [kuantitas,setKuantitas] = useState('')
    const [nama_pelanggan,setNama_pelanggan] = useState('')
    const [no_hp,setNo_hp] = useState('')
    const [pembelian,setPembelian] = useState('')
    const [poin,setPoin] = useState('')
    const [total_kunjungan,setTotal_kunjungan] = useState('')
    const data = props?.data
    useEffect(()=>{
        setAlamat(data?.alamat)
        setEmail(data?.email)
        setKuantitas(data?.kuantitas)
        setNama_pelanggan(data?.nama_pelanggan)
        setNo_hp(data?.no_hp)
        setPembelian(data?.total_pembelian)
        setPoin(data?.poin)
        setTotal_kunjungan(data?.total_kunjungan)
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
                <h2 id="parent-modal-title">Add Pelanggan</h2>
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
                    value={kuantitas}
                    disable={false}
                    label={'Kuantitas'}
                    onChange={(v)=>setKuantitas(v?.target?.value)}
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
                     <Input 
                    value={pembelian}
                    disable={false}
                    label={'Pembelian pelanggan'}
                    onChange={(v)=>setPembelian(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={poin}
                    disable={false}
                    label={'Poin pelanggan'}
                    onChange={(v)=>setPoin(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={total_kunjungan}
                    disable={false}
                    label={'Total kunjungan pelanggan'}
                    onChange={(v)=>setTotal_kunjungan(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
             
                    
                    
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit(alamat,email,kuantitas,nama_pelanggan,
    no_hp,pembelian,poin,total_kunjungan)} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalUpdatePelanggan