
import {
   Modal,Box,Button
  } from "@mui/material";
  import CloseIcon from '@mui/icons-material/Close';
  import React,{useState,useEffect} from 'react';
import  Input  from "../../Component/input";
import moment from 'moment'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
const ModalUpdateEntryJournal =(props)=>{
  const [rincian, setRincian] = React.useState('');
  const [akun, setAkun] = React.useState('');
  const [debit, setDebit] = React.useState(0);
  const [kredit, setKredit] = React.useState(0);
  const [project, setProject] = React.useState('');
  const [tgl, setTgl] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
  const data = props?.data
    useEffect(()=>{
      // console.log(props?.open)
       
      setRincian(data?.rincian_transaksi)
      setAkun(convAkunByNoAkun(data?.noAkun)?.id)
      setDebit(data?.debit_amount)
      setKredit(data?.credit_amount)
      setProject(data?.project_id)
      setTgl(moment(data?.tanggal_transaksi).format('YYYY-MM-DD'))
    },[props?.open ])
    const convAkunByNoAkun = (e)=>{
      let idx = props?.dataDaftarAkun?.findIndex(a=>a.noAkun==e)
  
      return props?.dataDaftarAkun[idx]
    }
    const convAkun = (e)=>{
      let idx = props?.dataDaftarAkun?.findIndex(a=>a.id==e)
  
      return props?.dataDaftarAkun[idx]
    }
    const convProject = (e)=>{
      let idx = props?.dataProject?.findIndex(a=>a.id==e)
  
      return props?.dataProject[idx]
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
                <div style={{display: 'flex', flexDirection:'row' }}>
                    <h2 style={{width: '100%'}} id="parent-modal-title">Update Jurnal Umum</h2>
                    <CloseIcon onClick={()=>props?.onClickOpen()} />
                </div>
                <div>
                  <div style={{ display: 'flex',flexDirection:'row'}}>
                      <div style={{width:'100%',marginRight:10}}>
                          <div>
                            <p>Tanggal</p>
                          
                            <Input 
                            value={tgl}
                            disable={false}
                            type='date'
                            // label={'Tanggal'}
                            onChange={(v)=>setTgl(v?.target?.value)}
                            style={{width:'100%' }}
                            />   
                            </div> 
                            <div>
                            <p>Rincian Transaksi</p>
                            <Input 
                            value={rincian}
                            disable={false}
                            type='text'
                            // label={'Rincian Transaksi'}
                            onChange={(v)=>setRincian(v?.target?.value)}
                            style={{width:'100%' }}
                            />  
                            </div> 
                            <div>
                            {/* <p>Akun</p> */}
                            <FormControl sx={{ marginTop:2,  width: '100%' }} variant="outlined">
                              <InputLabel id="demo-simple-select-label">Akun</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={akun}
                                label="ukuran"
                                onChange={(v)=>{setAkun(v?.target?.value)}}
                              >
                                {props?.dataDaftarAkun?.map((d,i)=>{
                                  return(
                                    
                                      <MenuItem value={d?.id} >{d?.noAkun}-{d?.namaAkun}</MenuItem>
                                    
                                  )
                                })}
                              </Select>
                            </FormControl>
                            </div> 
                        </div> 
                        <div style={{width:'100%',marginRight:10}}>
                        <div>
                            <p>Debit</p>
                          <Input 
                            value={debit}
                            disable={kredit>0?true:false}
                            type='text'
                            // label={'Debit'}
                            onChange={(v)=>setDebit(v?.target?.value)}
                            style={{width:'100%' }}
                            />  
                            </div> 
                            <div>
                            <p>Kredit</p>
                            <Input 
                            value={kredit}
                            disable={debit>0?true:false}
                            type='text'
                            // label={'Kredit'}
                            onChange={(v)=>setKredit(v?.target?.value)}
                            style={{width:'100%' }}
                            />  
                            </div> 
                            <div>
                            {/* <p>Project</p> */}
                        <FormControl sx={{  marginTop:2, width: '100%' }} variant="outlined">
                              <InputLabel id="demo-simple-select-label">Project</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={project}
                                label="Ukuran"
                                onChange={(v)=>{setProject(v?.target?.value)}}
                              >
                                {props?.dataProject?.map((d,i)=>{
                                  return(
                                    
                                      <MenuItem value={d?.id} > {d?.project_name}</MenuItem>
                                    
                                  )
                                })}
                              </Select>
                            </FormControl>
                            </div> 
                          <div style={{marginTop:30}}>
                                <Button onClick={()=>props?.submit([{
                                id:data?.id,
                                nomorJournal:data?.nomorJournal,
                                credit_amount:parseFloat(kredit===''?0:kredit),
                                debit_amount:parseFloat(debit===''?0:debit),
                                kelompok:convAkun(akun)?.kelompok,
                                nama_akun:convAkun(akun)?.namaAkun,
                                noAkun:convAkun(akun)?.noAkun,
                                project_id:convProject(project)?.id,
                                project_name:convProject(project)?.project_name,
                                tanggal_transaksi:tgl,
                                rincian_transaksi:rincian,
                                rowstatus:1
                              }])} variant="contained">Save</Button>
                          </div>
                      </div>
                  </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalUpdateEntryJournal