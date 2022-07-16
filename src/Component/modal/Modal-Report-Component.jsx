
import {
   Modal,Box,Button
  } from "@mui/material";
  import {FormControl,InputLabel } from '@mui/material';  
import Select from '@mui/material/Select';
import React,{useState,useEffect} from 'react';
import  Input  from "../../Component/input";
import moment from 'moment'
import MenuItem from '@mui/material/MenuItem';
const ModalAddBank =(props)=>{
    const d = props?.d
    const [idOffice,setIdOffice] = useState('')
    const [idStore,setIdStore] = useState('')
    const [article,setArticle] = useState('')
    const [hp,setHp] = useState('')
    const [start,setStart] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [end,setEnd] = useState(moment(new Date()).format('YYYY-MM-DD'))
    useEffect(()=>{
        
    },[props?.open])
    const submit = ()=>{
      
      if(d?.i===0||d?.i===13){
        props?.submit({start,end,idOffice})
      }else if(d?.i===1){
        props?.submit({start,end,idStore})
      }else if(d?.i===11){
        props?.submit({start,end,article})
      }else if(d?.i===12){
        props?.submit({start,end,hp})
      }else if(d?.i===2||d?.i===3||d?.i===4
        ||d?.i===5||d?.i===6||d?.i===7
        ||d?.i===8||d?.i===9||d?.i===10
        ||d?.i===14
        ){
        props?.submit({start,end})
      }

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
                <h2 id="parent-modal-title">{d?.v}</h2>
                <div>
                  
                <div style={{width:'100%',marginRight:10,marginTop:10}}>
                    <Input 
                    value={start}
                    disable={false}
                    type={'date'}
                    label={'Start Date'}
                    onChange={(v)=>setStart(v?.target?.value)}
                    style={{width:'100%'}}
                    />
                    </div>
                    <div style={{width:'100%',marginRight:10,marginTop:20}}>
                    <Input 
                    value={end}
                    disable={false}
                    type={'date'}
                    label={'End Date'}
                    onChange={(v)=>setEnd(v?.target?.value)}
                    style={{width:'100%'}}
                    />
                    </div>
                    {d?.i===0||d?.i===13?
                    <FormControl sx={{  width: '100%',marginRight:10,marginTop:2 }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Office</InputLabel>
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
                        :null}
                         {d?.i===1?
                          <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Store</InputLabel>
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
                          :null}
                          {d?.i===11?
                          <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={article}
                            label="Product"
                            onChange={(v)=>{setArticle(v?.target?.value)}}
                          >
                            {props?.prod?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.artikel_product} >{d?.nama_product}-{d?.artikel_product}</MenuItem>
                                
                              )
                            })}
                          </Select>
                      </FormControl>
                          :null}
                           {d?.i===12?
                          <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Pelanggan</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={hp}
                            label="Product"
                            onChange={(v)=>{setHp(v?.target?.value)}}
                          >
                            {props?.pelanggan?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.no_hp} >{d?.nama_pelanggan}-{d?.no_hp}</MenuItem>
                                
                              )
                            })}
                          </Select>
                      </FormControl>
                          :null}
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>submit()} variant="contained">Download</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddBank