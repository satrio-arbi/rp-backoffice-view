
import {
   Modal,Box,Button
  } from "@mui/material";
  
  import React,{useState,useEffect} from 'react';
  import DeleteIcon from '@mui/icons-material/Delete';
  import moment from 'moment';
import  Input  from "../../Component/input";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {getProdukBySKU,getProdukByArtikel} from '../../Config/Api-new'
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
const ModalAddReturGudang =(props)=>{
    // const [detail_pengiriman,setDetail_pengiriman] = useState([])
    const [tanggal_pengiriman,setTanggal_pengiriman] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [id_store_asal,setId_store_asal] = useState('')
    const [sku,setSku] = useState('')
    const [ukuran,setUkuran] = useState('')
    const [kuantitas,setKuantitas] = useState('')
    const [id_office_tujuan,setId_office_tujuan] = useState('')
    const [article,setArticle] = useState('')
    const [detail,setDetail] = useState('')
    const [listDetail,setListDetail] = useState([])
  
    useEffect(()=>{
        setTanggal_pengiriman(moment(new Date()).format('YYYY-MM-DD'))
        setId_store_asal('')
        setSku('')
        setUkuran('')
        setListDetail([])
        setDetail('')
        setArticle('')
        setId_office_tujuan('')
        setKuantitas('')
    },[props?.open])
    const getSKU = async (e)=>{
      
      if(e.charCode === 13){
        e.preventDefault();
        
      let res = await getProdukBySKU(sku)
      setDetail(res?.data)
      setArticle(res?.data?.artikel_product)
      setUkuran(res?.data?.ukuran)
      setKuantitas(res?.data?.kuantitas)
      }
    }
    const getArticle = async (e)=>{
      if(e.charCode === 13){
        e.preventDefault();
      let res = await getProdukByArtikel(article)
      setDetail(res?.data)
      setSku(res?.data?.sku_code)
      setUkuran(res?.data?.ukuran)
      setKuantitas(res?.data?.kuantitas)
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
        nama_kategori:detail?.nama_kategori,
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
            <Box sx={{     position: 'absolute',
        top: '50%',
        left: '50%',
        overflow: "hidden",
          overflowY: "scroll",
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height:500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4, }}>
                <h2 id="parent-modal-title">Add Retur gudang</h2>
                <div>
                    {/* <p>Tanggal Pengiriman</p> */}
                    <Input 
                    value={tanggal_pengiriman}
                    disable={false}
                    type='date'
                    label={'Tanggal Pengiriman'}
                    onChange={(v)=>setTanggal_pengiriman(v?.target?.value)}
                    style={{width:'100%'}}
                    />
                     <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Toko Asal</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={id_store_asal}
                            label="Select Toko Asal"
                            onChange={(v)=>{setId_store_asal(v?.target?.value)}}
                          >
                            {props?.store?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.store_name}-{d?.alamat}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                        <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Office Tujuan</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={id_office_tujuan}
                            label="Select Toko Tujuan"
                            onChange={(v)=>{setId_office_tujuan(v?.target?.value)}}
                          >
                            {props?.office?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.office_name}-{d?.alamat}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                        <p>Produk</p>
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
                            <p style={{textColor:'gray',fontSize:'13px'}}>Kuantitas</p> 
                                <Input 
                                value={kuantitas}
                                // disabe={true}
                                // type='date'
                                // label={'Kuantitas'}
                                onChange={(v)=>setKuantitas(v?.target?.value)}
                                style={{width:'100%'}}
                                />
                                {/* <p style={{textColor:'gray',fontSize:'13px'}}>Select Ukuran</p> */}
                                <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Ukuran</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ukuran}
                            label="Select Toko Tujuan"
                            onChange={(v)=>{ukuran(v?.target?.value)}}
                          >
                            {props?.ukuran?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.ukuran} >{d?.ukuran}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                        <p style={{textColor:'gray',fontSize:'13px'}}>Hpp</p> 
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
                                  </div>
                            </div>
                        </div>
                        <div style={{marginTop:10,justifyContent:'end',display:'flex'}}>
                          <Button onClick={()=>addDetailProduk()} variant="contained">Save Produk detail</Button>
                        </div>
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
                                     
                                }}>Artikel</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Tipe</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Kategori</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Nama barang</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Kuantitas</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Ukuran</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Hpp</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Harga jual</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Delete</th>
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
                                      {d?.artikel}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      {d?.type_name}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      {d?.nama_kategori}
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
                                      {d?.kuantitas}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      {d?.ukuran}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      {d?.hpp}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      {d?.harga_jual}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                    <DeleteIcon onClick={()=>deleteData(i)}/>
                                    </td>
                                </tr>
                                )})}
                            </tbody>
                        </tabel>
                        </div>
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit(  listDetail,
  moment(tanggal_pengiriman).format('YYYY-MM-DD'),
  id_store_asal,
  convertToko(id_store_asal),
  id_office_tujuan,
  convertOffice(id_office_tujuan))} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddReturGudang