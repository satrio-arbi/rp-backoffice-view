
import {
    Modal,Box,Button
   } from "@mui/material";
   
   import React,{useState,useEffect} from 'react';
   import Select, { SelectChangeEvent } from '@mui/material/Select';
 import MenuItem from '@mui/material/MenuItem';
 import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
 import  Input  from "../../Component/input";
 import {getProduk, getProdukByType} from '../../Config/Api-new'
 const ModalAddMasterProdukCostum =(props)=>{
     const [ukuran,setUkuran] = useState('')
     const [type_name,setType_name] = useState('')
     const [hpp,setHpp] = useState('')
     const [kategori,setKategori] = useState('')
     const [type,setType] = useState('')
     const [kuantitas,setKuantitas] = useState('')
     const [artikel_produk,setArtikel_produk] = useState('')
     const [artikel_frame,setArtikel_frame] = useState('')
     const [nama_produk,setNama_produk] = useState('')
     const [artikel_lens,setArtikel_lens] = useState('')
     const [harga_jual,setHarga_jual] = useState('')
     const [sku_code,setSku_code] = useState('')
     const [remarks,setRemarks] = useState('')
     const [nama_kategori,setNama_kategori] = useState('')
     const [image,setImage] = useState('')
     const [imageAddress,setImageAddress] = useState(null)
     const [prodOption,setProdOption] = useState(null)
     const [artikel_frame_ns,setArtikel_frame_ns] = useState('')
     const [artikel_lens_ns,setArtikel_lens_ns] = useState('')
     const [sku_code_s,setSku_code_s] = useState(null)
     const [sku_code_f,setSku_code_f] = useState(null)
    const [lens,setLens] = useState(null)
    const [frame,setFrame] = useState(null)
     useEffect(()=>{
         setLens(null)
         setFrame(null)
        setProdOption(null)
        setArtikel_frame_ns('')
        setArtikel_lens_ns('')
        setSku_code_s(null)
        setSku_code_f(null)
       setUkuran('')
       setHpp('')
       setKategori('')
       setType('')
       setKuantitas('')
       setArtikel_produk('')
       setArtikel_frame('')
       setNama_produk('')
       setArtikel_lens('')
       setHarga_jual('')
       setSku_code('')
       setRemarks('')
       setImage('')
       setImageAddress('')
     },[props?.open])
     useEffect(()=>{
         getProduk(type)
     },[type])
     useEffect(()=>{
        getFrame()
    },[sku_code_s,sku_code_f])
    const getFrame = (v) =>{
        let idx = prodOption?.findIndex(a=>a.id==sku_code_f)
        let idx1 = prodOption?.findIndex(a=>a.id==sku_code_s)
        let a 
        let b
        if(sku_code_f&&sku_code_s){
            a = [{value:prodOption[idx].artikel_product,label:prodOption[idx].artikel_frame},{value:prodOption[idx1].artikel_product,label:prodOption[idx1].artikel_frame}]
            b = [{value:prodOption[idx].artikel_product,label:prodOption[idx].artikel_lens},{value:prodOption[idx1].artikel_product,label:prodOption[idx1].artikel_lens}]
            setFrame(a)
            setLens(b)
        }
       
        
        // return props?.type?props?.type[idx]?.type_name:''
      }
     const getProduk =async(v)=>{
       if(v){
        let res = await getProdukByType(v)
        console.log({s:res?.data})
        setProdOption(res?.data)
      }
     }
     const convertSku = (v) =>{
        let idx = prodOption?.findIndex(a=>a.id==v)
        
        return prodOption?prodOption[idx]?.sku_code:''
      }
      const convertArtikel = (v) =>{
        let idx = prodOption?.findIndex(a=>a.id==v)
        
        return prodOption?prodOption[idx]?.artikel_product:''
      }
     const convertType = (v) =>{
         let idx = props?.type?.findIndex(a=>a.id==v)
         
         return props?.type?props?.type[idx]?.type_name:''
       }
       const convertKategori = (v) =>{
         let idx = props?.kategori?.findIndex(a=>a.id==v)
         
         return props?.kategori?props?.kategori[idx]?.kategori_name:''
       }
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
                 transform: 'translate(-50%, -50%)',
                 overflow: "hidden",
                 overflowY: "scroll",
                 width: 700,
                 height:500,
                 bgcolor: 'background.paper',
                 border: '2px solid #000',
                 boxShadow: 24,
                 p: 4, 
         }}>
                 <h2 id="parent-modal-title">Add Master Produk Costum</h2>
                 <div>
                 <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                           <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={type}
                             label="Store"
                             onChange={(v)=>{setType(v?.target?.value);}}
                           >
                             {props?.type?.map((d,i)=>{
                               return(
                                 
                                   <MenuItem value={d?.id} >{d?.type_name}</MenuItem>
                                 
                               )
                             })}
                           </Select>
                         </FormControl>
                         {prodOption?.length>0?
                        <>
                         <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                           <InputLabel id="demo-simple-select-label">Barang 1</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={sku_code_f}
                             label="Store"
                             onChange={(v)=>{setSku_code_f(v?.target?.value);}}
                           >
                             {prodOption?.map((d,i)=>{
                               return(
                                 
                                   <MenuItem value={d?.id} >{d?.nama_product}</MenuItem>
                                 
                               )
                             })}
                           </Select>
                         </FormControl>
                         
                            <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                           <InputLabel id="demo-simple-select-label">Barang 2</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={sku_code_s}
                             label="Store"
                             onChange={(v)=>{setSku_code_s(v?.target?.value);}}
                           >
                             {prodOption?.map((d,i)=>{
                               return(
                                 
                                   <MenuItem value={d?.id} >{d?.nama_product}</MenuItem>
                                 
                               )
                             })}
                           </Select>
                         </FormControl>
                        </> :null}
                         {sku_code_f&&sku_code_s?
                         <>
                         <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                           <InputLabel id="demo-simple-select-label">Frame</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={artikel_frame_ns}
                             label="Store"
                             onChange={(v)=>{setArtikel_frame_ns(v?.target?.value);}}
                           >
                             {frame?.map((d,i)=>{
                               return(
                                 
                                   <MenuItem value={d?.value} >{d?.label}</MenuItem>
                                 
                               )
                             })}
                           </Select>
                         </FormControl>
                         <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                           <InputLabel id="demo-simple-select-label">Lensa</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={artikel_lens_ns}
                             label="Store"
                             onChange={(v)=>{setArtikel_lens_ns(v?.target?.value);}}
                           >
                             {lens?.map((d,i)=>{
                               return(
                                 
                                   <MenuItem value={d?.value} >{d?.label}</MenuItem>
                                 
                               )
                             })}
                           </Select>
                         </FormControl>
                         </>:null
                         }
                 <Input 
                         value={artikel_produk}
                         disable={false}
                         label={'Produk Artikel'}
                         onChange={(v)=>setArtikel_produk(v?.target?.value)}
                         style={{width:'100%',marginTop:10}}
                         />
                     <Input 
                         value={nama_produk}
                         disable={false}
                         label={'Nama Produk'}
                         onChange={(v)=>setNama_produk(v?.target?.value)}
                         style={{width:'100%',marginTop:10}}
                         />
                    
                     <Input 
                         value={artikel_frame}
                         disable={false}
                         label={'Artikel frame'}
                         onChange={(v)=>setArtikel_frame(v?.target?.value)}
                         style={{width:'100%',marginTop:10}}
                         />
                    
                    <Input 
                         value={artikel_lens}
                         disable={false}
                         label={'Artikel lens'}
                         onChange={(v)=>setArtikel_lens(v?.target?.value)}
                         style={{width:'100%',marginTop:10}}
                         />
                     <Input 
                         value={sku_code}
                         disable={false}
                         label={'SKU code'}
                         onChange={(v)=>setSku_code(v?.target?.value)}
                         style={{width:'100%',marginTop:10}}
                         />
                     <Input 
                         value={harga_jual}
                         disable={false}
                         label={'Harga jual'}
                         onChange={(v)=>setHarga_jual(v?.target?.value)}
                         style={{width:'100%',marginTop:10}}
                         />
                      <Input 
                         value={hpp}
                         disable={false}
                         label={'HPP'}
                         onChange={(v)=>setHpp(v?.target?.value)}
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
                         value={remarks}
                         disable={false}
                         label={'Remarks'}
                         onChange={(v)=>setRemarks(v?.target?.value)}
                         style={{width:'100%',marginTop:10}}
                         />
                            <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Ukuran</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ukuran}
                            label="Select Toko Tujuan"
                            onChange={(v)=>{setUkuran(v?.target?.value)}}
                          >
                            {props?.ukuran?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.ukuran} >{d?.ukuran}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                             
                         <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                           <InputLabel id="demo-simple-select-label">Select Kategori</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={kategori}
                             label="Store"
                             onChange={(v)=>{setKategori(v?.target?.value)}}
                           >
                             {props?.kategori?.map((d,i)=>{
                               return(
                                 
                                   <MenuItem value={d?.id} >{d?.kategori_name}</MenuItem>
                                 
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
                         <Button onClick={()=>
                         props?.submit(
                            artikel_frame_ns,
                            artikel_lens_ns,
                            convertArtikel(sku_code_s),
                            convertArtikel(sku_code_f),
                             ukuran,
                             convertType(type),
                             hpp,
                             kategori,
                             type,
                             kuantitas,
                             artikel_produk,
                             artikel_frame,
                             nama_produk,
                             artikel_lens,
                             harga_jual,
                             sku_code,
                             remarks,
                             convertKategori(kategori),
                             image
                         )
                         
                         } variant="contained">Save</Button>
                     </div>
                 </div>
                
             </Box>
             </Modal>
            
         </>
     )
 
 }
 export default ModalAddMasterProdukCostum