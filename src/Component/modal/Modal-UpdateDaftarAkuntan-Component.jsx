
import {
   Modal,Box,Button
  } from "@mui/material";
  import CloseIcon from '@mui/icons-material/Close';
import React,{useState,useEffect} from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import  Input  from "../../Component/input";
import {saldo_normal_akutansi,kelompok_akutansi,tipe_akutansi} from '../../Config/helper/constant'
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
const ModalUpdateDaftarAkuntan =(props)=>{
    const [noAkun ,setNoAkun ] = useState('')
    const [saldo_normal,setSaldo_normal] = useState('')
    const [kelompok,setKelompok] = useState('')
    const [tipe,setTipe] = useState('')
    const [nama_akun,setNama_akun] = useState('')
    const [saldo_awal,setSaldo_awal] = useState('')
    const [read,setRead] = useState(false)
    const data =  props?.data
    useEffect(()=>{
        setNoAkun(data?.noAkun)
        setSaldo_normal(data?.saldo_normal)
        setKelompok(data?.kelompok)
        setTipe(data?.tipe)
        setNama_akun(data?.namaAkun)
        setSaldo_awal(data?.saldo_awal)
        setRead(data?.is_delets===1)
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
                    <h2 style={{width: '100%'}} id="parent-modal-title">Add Daftar Akuntansi</h2>
                <CloseIcon onClick={()=>props?.onClickOpen()} />
                </div>
                <div>
                    {/* <p>Nama Kategori</p> */}
                    <Input 
                    value={noAkun}
                    
                    disable={read}
                    label={'Nomor Account'}
                    onChange={(v)=>setNoAkun(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={nama_akun}
                    disable={read}
                    label={'Nama Akun'}
                    onChange={(v)=>setNama_akun(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={saldo_awal}
                    disable={false}
                    type='number'
                    label={'Saldo Awal'}
                    onChange={(v)=>setSaldo_awal(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                  <FormControl disabled={read} sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Saldo Normal</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={saldo_normal}
                            label="Toko Asal"
                            onChange={(v)=>{setSaldo_normal(v?.target?.value)}}
                          >
                            {saldo_normal_akutansi?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d} >{d}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                        <FormControl disabled={read} sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Kelompok</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={kelompok}
                            label="Toko Asal"
                            onChange={(v)=>{setKelompok(v?.target?.value)}}
                          >
                            {kelompok_akutansi?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d} >{d}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                        <FormControl disabled={read} sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">tipe</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tipe}
                            label="Toko Asal"
                            onChange={(v)=>{setTipe(v?.target?.value)}}
                          >
                            {tipe_akutansi?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d} >{d}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                    
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit({noAkun,
                          namaAkun:nama_akun,saldo_awal,
                          kelompok,tipe,saldo_normal,
                          id:data?.id})} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalUpdateDaftarAkuntan