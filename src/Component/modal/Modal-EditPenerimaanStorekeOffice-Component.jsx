
import {
  Modal,Box,Button
 } from "@mui/material";
 
 import React,{useState,useEffect} from 'react';
 import DeleteIcon from '@mui/icons-material/Delete';
 import moment from 'moment';
import  Input  from "../../Component/input";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {getReturGudangSearch,getProdukByArtikel} from '../../Config/Api-new'
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
const ModalPenerimaanUpdateOfficekeStore =(props)=>{
   // const [detail_pengiriman,setDetail_pengiriman] = useState([])
   const [tanggal_pengiriman,setTanggal_pengiriman] = useState(moment(new Date()).format('YYYY-MM-DD'))
   const [id_office,setId_office] = useState('')
   const [pengiriman,setPengiriman] = useState('')
   const [ukuran,setUkuran] = useState('')
   const [kuantitas,setKuantitas] = useState('')
   const [id_store,setId_store] = useState('')
   const [article,setArticle] = useState('')
   const [detail,setDetail] = useState('')
   const [listDetail,setListDetail] = useState([])
   const data = props?.data
   useEffect(()=>{
     
       setTanggal_pengiriman(moment(new Date(data?.tanggal_penerimaan)).format('YYYY-MM-DD'))
       setId_office(data?.id_office)
       setPengiriman(data?.retur_code)
       setUkuran('')
       setListDetail(data?.detailPenerimaanList) 
       setDetail('')
       setArticle('')
       setId_store(data?.id_store)
       setKuantitas('')
   },[props?.open])
   const getSKU = async (e)=>{
     
     if(e.charCode === 13){
       e.preventDefault();
       
     let res = await getReturGudangSearch(pengiriman)
     // console.log({a:res?.data[0]?.detailPengirimanList,b:res?.data})
     setDetail(res?.data)
     setId_store(res?.data[0]?.id_store_asal)
     setId_office(res?.data[0]?.id_office_tujuan)
       let arr = []
       res?.data[0]?.detailPengirimanList?.map((d,i)=>{
         arr.push({
           id:d?.id,
           sku_code:d?.sku_code,
           artikel:d?.artikel,
           harga_jual:d?.harga_jual,
           hpp:d?.hpp,
           kuantitas:d?.kuantitas,
           nama_barang:d?.nama_barang,
           nama_kategori:d?.nama_kategori,
           kategori:d?.kategori,
           pengiriman_code:d?.pengiriman_code,
           rowstatus:d?.rowstatus,
           tanggal_pengiriman:d?.tanggal_pengiriman,
           type:d?.type,
           type_name:d?.type_name,
           ukuran:d?.ukuran,
           keterangan:''
         })
       })
     // console.log({arr})
     setListDetail(arr)
     // setUkuran(res?.data?.ukuran)
     // setKuantitas(res?.data?.kuantitas)
     }
   }
  
   const convertToko = (v) =>{
       let idx = props?.store?.findIndex(a=>a.id==v)
       
       return props?.store?props?.store[idx]?.alamat:''
     }
     const convertImage = (v) => {
   
       return 'data:image/png;base64,'+v
     };
   const changeTabel = (type,i,v)=>{
     let datas = [...listDetail]
     datas[i][type] = v
     setListDetail(datas)
   }
   const addDetailProduk = ()=>{
     let arr = [...listDetail]
     
     arr.push({
       id:detail?.id,
       // sku_code:sku,
       artikel:article,
       type_name:detail?.type_name,
       tipe:detail?.type,
       kategori_name:detail?.nama_kategori,
       kategori:detail?.kategori,
       nama_barang:detail?.nama_product,
       kuantitas,
       ukuran,
       hpp:detail?.hpp,
       harga_jual:detail?.harga_jual
     })
     setListDetail(arr)
   }
   const convertOffice=(v) =>{
     let idx = props?.office?.findIndex(a=>a.id==v)
     
     return props?.office?props?.office[idx]?.alamat:''
   }
   const deleteData = (idx)=>{
     let datas = [...listDetail]
     // let idx = listDetail?.findIndex(a=>a.id==id)
     datas.splice(idx, 1);
     setListDetail(datas)
   }
   return (
       <>
       
       <Modal
           open={props?.open}
           onClose={props?.onClickOpen}
           aria-labelledby="parent-modal-title"
           aria-describedby="parent-modal-description"
           >
           <Box sx={{     position: 'absolute',
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
               <h2 id="parent-modal-title">Edit Penerimaan Office from Store</h2>
               <div>
                   {/* <p>Tanggal Pengiriman</p> */}
                   <Input 
                               value={pengiriman}
                               disable={false}
                               // type='date'
                               onKeyPress={(e)=>getSKU(e)}
                               label={'Kode Pengiriman'}
                               onChange={(v)=>setPengiriman(v?.target?.value)}
                               style={{width:'100%'}}
                               />
                   <Input 
                   value={tanggal_pengiriman}
                   disable={false}
                   type='date'
                   label={'Tanggal Pengiriman'}
                   onChange={(v)=>setTanggal_pengiriman(v?.target?.value)}
                   style={{width:'100%',marginTop:20}}
                   />
                     <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                         <InputLabel id="demo-simple-select-label">Select Office</InputLabel>
                         <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={id_office}
                           label="Select Toko Asal"
                           onChange={(v)=>{setId_office(v?.target?.value)}}
                         >
                           {props?.office?.map((d,i)=>{
                             return(
                               
                                 <MenuItem value={d?.id} >{d?.office_name}-{d?.alamat}</MenuItem>
                               
                             )
                           })}
                         </Select>
                       </FormControl>
                       <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                         <InputLabel id="demo-simple-select-label">Select Toko</InputLabel>
                         <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={id_store}
                           label="Select Toko Tujuan"
                           onChange={(v)=>{setId_store(v?.target?.value)}}
                         >
                           {props?.store?.map((d,i)=>{
                             return(
                               
                                 <MenuItem value={d?.id} >{d?.store_name}-{d?.alamat}</MenuItem>
                               
                             )
                           })}
                         </Select>
                       </FormControl>
                        
                     
                       <div style={{overflowX:'auto',marginTop:20}}>
                       <tabel style={{
                           // borderCollapse: 'collapse',
                           // borderSpacing: 0,
                           width: '100%',
                           // overflow:'hidden',
                           // border: '1px solid #ddd'
                       }}>
                           <tr>
                               <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                               }}>No</th>
                               <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                                    
                               }}>SKU CODE</th>
                               <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                                    
                               }}>Artikel</th>
                               <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                               }}>Nama Barang </th>
                               <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                               }}>Kuantitas</th>
                               <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                               }}>Keterangan</th>
                              
                           </tr>
                           <tbody>
                             {listDetail?.map((d,i)=>{return(
                             
                               <tr key={i}>
                                   <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     {i+1}
                                   </td>
                                   
                                    <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     {d?.sku_code}
                                   </td>
                                   <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     {d?.artikel}
                                   </td>
                                  
                                   <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     {d?.nama_barang}
                                   </td>
                                   <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     <input onChange={(v)=>changeTabel('kuantitas',i,v?.target?.value)} value={d?.kuantitas}/>
                                     {/* {d?.kuantitas} */}
                                   </td>
                                   <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     
                                     <input onChange={(v)=>changeTabel('keterangan',i,v?.target?.value)} value={d?.keterangan}/>
                                     {/* {d?.keterangan} */}
                                   </td>
                                  
                               </tr>
                               )})}
                           </tbody>
                       </tabel>
                       </div>
                   <div style={{marginTop:10}}>
                       <Button onClick={()=>props?.submit( listDetail,
 moment(tanggal_pengiriman).format('YYYY-MM-DD'),
 id_office,
 convertOffice(id_office),
 id_store,
 convertToko(id_store),
 pengiriman)} variant="contained">Save</Button>
                   </div>
               </div>
              
           </Box>
           </Modal>
          
       </>
   )

}
export default ModalPenerimaanUpdateOfficekeStore