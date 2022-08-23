
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
import {getProdukBySKU,getProdukByArtikel} from '../../Config/Api-new'
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
const ModalEditStokeOpname =(props)=>{
    // const [detail_pengiriman,setDetail_pengiriman] = useState([])
    const [tanggal_pengiriman,setTanggal_pengiriman] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [id_store_asal,setId_store_asal] = useState('')
    const [sku,setSku] = useState('')
    const [ukuran,setUkuran] = useState('')
    const [kuantitas,setKuantitas] = useState('')
    const [id_store_tujuan,setId_store_tujuan] = useState('')
    const [article,setArticle] = useState('')
    const [detail,setDetail] = useState('')
    const [stock_opname,setStock_opname] = useState('')
    const [listDetail,setListDetail] = useState([])
    const data =props?.data
    useEffect(()=>{
       setSku(data.sku_code)
       setArticle(data?.artikel)
       setStock_opname(data?.stock_opname)
       getSKUFirst(data.sku_code)
    },[props?.open])
    const getSKUFirst = async (e)=>{
    
        
      let res = await getProdukBySKU(e)
      setDetail(res?.data)
      
   
      
    }
    const getSKU = async (e)=>{
      
      if(e.charCode === 13){
        e.preventDefault();
        
      let res = await getProdukBySKU(sku)
      setDetail(res?.data)
      setArticle(res?.data?.artikel_product)
   
      }
    }
    const getArticle = async (e)=>{
      if(e.charCode === 13){
        e.preventDefault();
      let res = await getProdukByArtikel(article)
      setDetail(res?.data)
      setSku(res?.data?.sku_code)
      
      }
    }
    const convertToko = (v) =>{
        let idx = props?.store?.findIndex(a=>a.id==v)
        
        return props?.store?props?.store[idx]?.alamat:''
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
                    <h2 style={{width: '100%'}} id="parent-modal-title">Edit Stock Opname</h2>
                <CloseIcon onClick={()=>props?.onClickOpen()} />
                </div>
                <div>
                    {/* <p>Tanggal Pengiriman</p> */}
                   
                        <div style={{ display: 'flex',flexDirection:'row'}}>
                            <div style={{width:'100%',marginRight:10}}>
                              <p style={{textColor:'gray',fontSize:'13px'}}>Kode SKU</p>
                                <Input 
                                value={sku}
                                disable={false}
                                // type='date'
                                onKeyPress={(e)=>getSKU(e)}
                                // label={'Kode SKU'}
                                onChange={(v)=>setSku(v?.target?.value)}
                                style={{width:'100%'}}
                                />
                                <p style={{textColor:'gray',fontSize:'13px'}}>Artikel</p>
                                <Input 
                                value={article}
                                disable={false}
                                // type='date'
                                onKeyPress={(e)=>getArticle(e)}
                                // label={'Artikel'}
                                onChange={(v)=>setArticle(v?.target?.value)}
                                style={{width:'100%'}}
                                />
                                <p style={{textColor:'gray',fontSize:'13px'}}>Tipe</p>
                                <Input 
                                value={detail?.type_name}
                                readOnly={true}
                                // type='date'
                                // label={'Tipe'}
                                // onChange={(v)=>setTanggal_pengiriman(v?.target?.value)}
                                style={{width:'100%'}}
                                />
                                <p style={{textColor:'gray',fontSize:'13px'}}>Kategori</p>
                                <Input 
                                value={detail?.nama_kategori}
                                readOnly={true}
                                // type='date'
                                // label={'Kategori'}
                                // onChange={(v)=>setTanggal_pengiriman(v?.target?.value)}
                                style={{width:'100%'}}
                                />
                                <p style={{textColor:'gray',fontSize:'13px'}}>Nama produk</p>
                                <Input 
                                value={detail?.nama_product}
                                readOnly={true}
                                // type='date'
                                // label={'Nama Produk'}
                                // onChange={(v)=>setTanggal_pengiriman(v?.target?.value)}
                                style={{width:'100%'}}
                                />
                            </div>
                            <div style={{width:'100%',marginRight:10}}>
                            <p style={{textColor:'gray',fontSize:'13px'}}>Stock Opname</p> 
                                <Input 
                                value={stock_opname}
                                // disabe={true}
                                // type='date'
                                // label={'Kuantitas'}
                                onChange={(v)=>setStock_opname(v?.target?.value)}
                                style={{width:'100%'}}
                                />
                                {/* <p style={{textColor:'gray',fontSize:'13px'}}>Select Ukuran</p> */}
                            
                        {/* <p style={{textColor:'gray',fontSize:'13px'}}>Hpp</p> 
                                <Input 
                                value={detail?.hpp}
                                readOnly={true}
                                // type='date'
                                // label={'Hpp'}
                                // onChange={(v)=>setTanggal_pengiriman(v?.target?.value)}
                                style={{width:'100%'}}
                                />
                                 <p style={{textColor:'gray',fontSize:'13px'}}>Harga Jual</p> 
                                <Input 
                                value={detail?.harga_jual}
                                readOnly={true}
                                // type='date'
                                // label={'Harga jual'}
                                // onChange={(v)=>setTanggal_pengiriman(v?.target?.value)}
                                style={{width:'100%'}}
                                />
                                <div style={{marginTop:10}}>
                                <p style={{textColor:'gray',fontSize:'13px'}}>Foto Barang</p> 
                                
                                  {detail?.image?<img src={convertImage(detail?.image)} style={{width:200,height:200}} />:null}
                                  </div> */}
                            </div>
                        </div>
                    
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit(
                          detail?.artikel_product,
                          detail?.kategori,
                          detail?.nama_product,
                          detail?.nama_kategori,
                          detail?.sku_code,
                          stock_opname,
                          detail?.type,
                          detail?.type_name
                          )} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalEditStokeOpname