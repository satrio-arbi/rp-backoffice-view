
import {
  Modal,Box,Button
 } from "@mui/material";
 import CloseIcon from '@mui/icons-material/Close';
 import React,{useState,useEffect} from 'react';
 import DeleteIcon from '@mui/icons-material/Delete';
 import moment from 'moment';
import  Input  from "../../Component/input";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {getPembelian,getProdukByArtikel} from '../../Config/Api-new'
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
const ModalPenerimaanAddSupplier =(props)=>{
   // const [detail_pengiriman,setDetail_pengiriman] = useState([])
   const [tanggal_pengiriman,setTanggal_pengiriman] = useState(moment(new Date()).format('YYYY-MM-DD'))
   const [id_office,setId_office] = useState('')
   const [sku,setSku] = useState('')
   const [ukuran,setUkuran] = useState('')
   const [kuantitas,setKuantitas] = useState('')
   const [id_store,setId_store] = useState('')
   const [article,setArticle] = useState('')
   const [detail,setDetail] = useState('')
   const [listDetail,setListDetail] = useState([])
   const [pengiriman,setPengiriman] = useState('')
   const [nama_supplier,setNama_supplier] = useState('')
   useEffect(()=>{
       setTanggal_pengiriman(moment(new Date()).format('YYYY-MM-DD'))
       setId_office('')
       setSku('')
       setUkuran('')
       setListDetail([])
       setDetail('')
       setArticle('')
       setId_store('')
       setKuantitas('')
   },[props?.open])
   const getSKU = async (e)=>{
     
     if(e.charCode === 13){
       e.preventDefault();
       
     let res = await getPembelian(pengiriman)
     setNama_supplier(res?.data?.nama_supplier)
     // console.log({a:res?.data[0]?.detailPengirimanList,b:res?.data})
     setDetail(res?.data)
       let arr = []
       res?.data?.detail_pembelian?.map((d,i)=>{
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
 
   const changeTabel = (type,i,v)=>{
     let datas = [...listDetail]
     datas[i][type] = v
     setListDetail(datas)
   }
   const convertToko = (v) =>{
       let idx = props?.store?.findIndex(a=>a.id==v)
       
       return props?.store?props?.store[idx]?.store_name:''
     }
     const convertOffice=(v) =>{
       let idx = props?.office?.findIndex(a=>a.id==v)
       
       return props?.office?props?.office[idx]?.office_name:''
     }
     const convertImage = (v) => {
   
       return 'data:image/png;base64,'+v
     };
   const addDetailProduk = ()=>{
     let arr = [...listDetail]
     
     arr.push({
       id:detail?.id,
       sku_code:sku,
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
                <div style={{display: 'flex', flexDirection:'row' }}>
                    <h2 style={{width: '100%'}} id="parent-modal-title">Add Penerimaan Supplier</h2>
                    <CloseIcon onClick={()=>props?.onClickOpen()} />
                </div>
               <div>
               <Input 
                               value={pengiriman}
                               disable={false}
                               // type='date'
                               onKeyPress={(e)=>getSKU(e)}
                               label={'Kode Pembelian'}
                               onChange={(v)=>setPengiriman(v?.target?.value)}
                               style={{width:'100%'}}
                               />
                   
                   <Input 
                   value={tanggal_pengiriman}
                   disable={false}
                   type='date'
                   label={'Tanggal Penerimaan'}
                   onChange={(v)=>setTanggal_pengiriman(v?.target?.value)}
                   style={{width:'100%',marginTop:20}}
                   />
                   <Input 
                   value={nama_supplier}
                   disable={false}
                  readOnly={true}
                  //  type='date'
                   label={'Supplier'}
                  //  onChange={(v)=>setTanggal_pengiriman(v?.target?.value)}
                   style={{width:'100%',marginTop:20}}
                   />
                  
                        
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
                       <Button onClick={()=>props?.submit(  listDetail,
 moment(tanggal_pengiriman).format('YYYY-MM-DD'),
 detail?.id_supplier,
 detail?.nama_supplier,
 pengiriman)} variant="contained">Save</Button>
                   </div>
               </div>
              
           </Box>
           </Modal>
          
       </>
   )

}
export default ModalPenerimaanAddSupplier