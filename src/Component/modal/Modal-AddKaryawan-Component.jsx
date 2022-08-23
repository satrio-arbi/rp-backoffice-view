
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
const ModalAddKaryawan =(props)=>{
    const [name,setName] = useState('')
    const [hp,setHp] = useState('')
    const [lokasiOffice,setLokasiOffice] = useState('')
    const [tgl,setTgl] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [jabatan,setJabatan] = useState('')
    const [lokasiStore,setLokasiStore] = useState('')
    const [idStore,setIdStore] = useState('')
    const [lahir,setLahir] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [email,setEmail] = useState('')
    const [idOffice,setIdOffice] = useState('')
    const [alamat,setAlamat] = useState('')
    const [image,setImage] = useState(null)
    const [imageAddress,setImageAddress] = useState(null)
    useEffect(()=>{
        // setName('')
        // setTgl(moment(new Date()).format('YYYY-MM-DD'))
    },[props?.open])
    const atChangeFile = async(e) => {
          
        const fileStrem = e.target?.files[0];   
        setImage(fileStrem);
        const reader = new FileReader();        
        reader.addEventListener('load', function(){      
          setImageAddress(this.result);
        });
        reader.readAsDataURL(fileStrem);
        let a = fileStrem instanceof Blob
        console.log({fileStrem,a})
        
        // setName(fileStrem?.name)
       
        
      }
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
                    <h2 style={{width: '100%'}} id="parent-modal-title">Add Karyawan</h2>
                  <CloseIcon onClick={()=>props?.onClickOpen()} />
                </div>
                <div>
                    {/* <p>Nama Kategori</p> */}
                    <Input 
                    value={name}
                    disable={false}
                    label={'Nama Karyawan'}
                    onChange={(v)=>setName(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    <Input 
                    value={hp}
                    disable={false}
                    label={'No. Hp'}
                    onChange={(v)=>setHp(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={lahir}
                    disable={false}
                    type='date'
                    label={'Tanggal Lahir'}
                    onChange={(v)=>setLahir(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                   
                     <Input 
                    value={email}
                    disable={false}
                    label={'Email'}
                    onChange={(v)=>setEmail(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                        <Input 
                    value={alamat}
                    disable={false}
                    label={'Alamat'}
                    onChange={(v)=>setAlamat(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    
                     <Input 
                    value={jabatan}
                    disable={false}
                    label={'Jabatan'}
                    onChange={(v)=>setJabatan(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={tgl}
                    disable={false}
                    type='date'
                    label={'Tanggal join'}
                    onChange={(v)=>setTgl(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                    
                      {/* <Input 
                    value={idStore}
                    disable={false}
                    label={'Store'}
                    onChange={(v)=>setIdStore(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    /> */}
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
                      
                    
                    {/* <Input 
                    value={idOffice}
                    disable={false}
                    label={'Office'}
                    onChange={(v)=>setIdOffice(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    /> */}
                      <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Office</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={idOffice}
                            label="Office"
                            onChange={(v)=>{setIdOffice(v?.target?.value)}}
                          >
                            {props?.office?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.office_name}-{d?.alamat}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                     
                 
                    {imageAddress?
                    <img style={{marginTop:10}} 
                    src={imageAddress} 
                    height="400px" width="100%"/>
                    :null}
                       <Button
                    variant="contained"
                    component="label"
                    style={{marginTop:10}}
                    onChange={(e)=>atChangeFile(e)} 
                    >
                    Upload Image
                    <input
                 
                        type="file"
                        hidden
                    />
                    </Button>
                   
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit( 
                             hp,
                            lokasiOffice,
                            moment(tgl).toDate(),
                            jabatan,
                            name,
                            lokasiStore,
                            idStore,
                            moment(lahir).toDate(),
                            email,
                            idOffice,
                            alamat,
                            image)} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddKaryawan