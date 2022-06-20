
import {
   Modal,Box,Button
  } from "@mui/material";
  
  import React,{useState,useEffect} from 'react';
  import Selects from 'react-select';
  import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import  Input  from "../../Component/input";
const ModalAddUser =(props)=>{
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [password,setPassword] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [lokasi_office,setLokasi_office] = useState('')
    const [lokasi_store,setLokasi_store] = useState('')
    const [akses_modul,setAkses_modul] = useState([])
    const [userName,setUserName] = useState('')
    const [id_store,setId_store] = useState('')
    const [id_office,setId_office] = useState('')
    const [email,setEmail] = useState('')
    const [menu,setMenu] = useState(null)
    const [menuOption,setMenuOption] = useState([])
    useEffect(()=>{
        setFirstName('')
        setLastName('')
        setPassword('')
        // setMenuOption([])
        setMenu(null)
        setPhoneNumber('')
        setLokasi_office('')
        setLokasi_store('')
        setAkses_modul([])
        setUserName('')
        setId_store('')
        setId_office('')
        setEmail('')
        
    },[props?.open])
    // useEffect(()=>{
    //   convertOptions()
    // },[])
    // const convertOptions = ()=>{
    //   let arr = [...menuOption]
      
    //   setMenuOption(arr)
      
    // }
    const change = (v)=>{
      setMenu(v)
     
    }
    
    const convertValue = (v)=>{
      let arr = []
      
      
      v?.map((d)=>{
        arr.push(d?.value)
      })
      
      return arr
    }
    const convertStore = (v) =>{
        let idx = props?.store?.findIndex(a=>a.id==v)
        console.log({s:props?.store,v,idx,a: props?.store?props?.store[idx]?.store_name:''})
        return props?.store?props?.store[idx]?.store_name:''
      }
      const convertOffice = (v) =>{
        let idx = props?.office?.findIndex(a=>a.id==v)
        return props?.office?props?.office[idx]?.office_name:''
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
        transform: 'translate(-50%, -50%)',
        overflow: "hidden",
          overflowY: "scroll",
          width: '90%',
        height:'90%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4, }}>
                <h2 id="parent-modal-title">Add User</h2>
                <div>
                    {/* <p>Nama Kategori</p> */}
                    <Input 
                    value={firstName}
                    disable={false}
                    label={'First Name'}
                    onChange={(v)=>setFirstName(v?.target?.value)}
                    style={{width:'100%'}}
                    />
                    <Input 
                    value={lastName}
                    disable={false}
                    label={'Last Name'}
                    onChange={(v)=>setLastName(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={userName}
                    disable={false}
                    label={'User Name'}
                    onChange={(v)=>setUserName(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                     <Input 
                    value={phoneNumber}
                    disable={false}
                    label={'Phone Number'}
                    onChange={(v)=>setPhoneNumber(v?.target?.value)}
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
                    value={password}
                    disable={false}
                    label={'password'}
                    type='password'
                    onChange={(v)=>setPassword(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                   
                      <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Store</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={id_store}
                            label="Store"
                            onChange={(v)=>{setId_store(v?.target?.value);convertStore(v?.target?.value)}}
                          >
                            {props?.store?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.store_name}-{d?.alamat}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                        <FormControl sx={{ marginTop:2, width: '100%',marginBottom:2}} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Office</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={id_office}
                            label="Office"
                            onChange={(v)=>{setId_office(v?.target?.value);}}
                          >
                            {props?.office?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.office_name}-{d?.alamat}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                        <Selects 
                        onChange={(v)=>change(v)}
                        value={menu}
                        isMulti
                        options={props?.menu}
                        />
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit(
                          
                          firstName,
      lastName,
      password,
      phoneNumber,
      convertOffice(id_office),
      convertStore(id_store),
      convertValue(menu),
      userName,
      id_store,
      id_office,
      email
           )} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddUser