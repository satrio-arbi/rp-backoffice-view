
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
const ModalAddPembelian =(props)=>{
    // const [detail_pengiriman,setDetail_pengiriman] = useState([])
    const [tanggal_transaksi,setTanggal_transaksi] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [id_pemasok,setId_pemasok] = useState('')
    
    
    const [kuantitas,setKuantitas] = useState('')
    const [listDetail,setListDetail] = useState([])

    
    const [ukuran,setUkuran] = useState('')
    const [sku_code,setSku_code] = useState('')
    const [artikel,setArtikel] = useState('')
    const [nama_barang,setNama_barang] = useState('')
    const [hpp,setHpp] = useState('')
    const [tipe,setTipe] = useState('')
    const [kategori,setKategori] = useState('')
    const [harga_jual,setHarga_jual] = useState('')
    const [date_from,setDate_from] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [date_to,setDate_to] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [detail,setDetail]= useState({})
    useEffect(()=>{
        setTanggal_transaksi(moment(new Date()).format('YYYY-MM-DD'))
        setSku_code('')
        setId_pemasok('')
        setUkuran('')
        setArtikel('')
        setListDetail([])
        setTipe('')
        setKategori('')
        setKuantitas('')
        setHpp('')
        setHarga_jual('')
        setDate_from(moment(new Date()).format('YYYY-MM-DD'))
        setDate_to(moment(new Date()).format('YYYY-MM-DD'))
        setNama_barang('')
    },[props?.open])
    
    const changeTabel = (type,i,v)=>{
      let datas = [...listDetail]
      datas[i][type] = v
      setListDetail(datas)
    }
    const convertKategori = (v) =>{
        let idx = props?.kategori?.findIndex(a=>a.id==v)
        
        return props?.kategori?props?.kategori[idx]?.kategori_name:''
      }
      const convertType = (v) =>{
        let idx = props?.tipe?.findIndex(a=>a.id==v)
        
        return props?.tipe?props?.tipe[idx]?.type_name:''
      }
      const convertUkuran = (v) =>{
        let idx = props?.ukuran?.findIndex(a=>a.id==v)
        
        return props?.ukuran?props?.ukuran[idx]?.ukuran:''
      }
      const convertPemasok = (v) =>{
        let idx = props?.pemasok?.findIndex(a=>a.id==v)
        
        return props?.pemasok?props?.pemasok[idx]?.nama_pemasok:''
      }
    const addDetailProduk = ()=>{
      let arr = [...listDetail]
      
      arr.push({
        artikel,
        sku_code,
        hpp,
        harga_jual,
        type:tipe,
        type_name:convertType(tipe),
        kategori,
        nama_kategori:convertKategori(kategori),
        kuantitas,
        ukuran:convertUkuran(ukuran),
        nama_barang,

      })
      // setDetail({})
      setNama_barang('')
        setSku_code('')
        
        setUkuran('')
        setArtikel('')
      setTipe('')
      setKategori('')
      setKuantitas('')
      setHpp('')
      setHarga_jual('')
      setListDetail(arr)
    }
    const deleteData = (idx)=>{
      let datas = [...listDetail]
      // let idx = listDetail?.findIndex(a=>a.id==id)
      datas.splice(idx, 1);
      setListDetail(datas)
    }
    const getArticle = async (e)=>{
      if(e.charCode === 13){
        e.preventDefault();
      let res = await getProdukByArtikel(artikel)
      setSku_code(res?.data?.sku_code)
      setDetail(res?.data) 
      setUkuran(res?.data?.ukuran)
      setKuantitas(res?.data?.kuantitas)
      setNama_barang(res?.data?.nama_product)
      setTipe(res?.data?.type)
      setKategori(res?.data?.kategori)
      setKuantitas(res?.data?.kuantitas)
      setHpp(res?.data.hpp)
      setHarga_jual(res?.data?.harga_jual)
      }
    }
    const getSKU = async (e)=>{
     
      if(e.charCode === 13){
        e.preventDefault();
        
      let res = await getProdukBySKU(sku_code)
      // console.log({a:res?.data[0]?.detailPengirimanList,b:res?.data})
      setDetail(res?.data)
      setArtikel(res?.data?.artikel_product) 
      setUkuran(res?.data?.ukuran)
      setKuantitas(res?.data?.kuantitas)
      setNama_barang(res?.data?.nama_product)
      setTipe(res?.data?.type)
      setKategori(res?.data?.kategori)
      setKuantitas(res?.data?.kuantitas)
      setHpp(res?.data.hpp)
      setHarga_jual(res?.data?.harga_jual)
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
                    <h2 style={{width: '100%'}} id="parent-modal-title">Add Pembelian</h2>
                    <CloseIcon onClick={()=>props?.onClickOpen()} />
                </div>
                <div>
                {/* <Input 
                                value={pengiriman}
                                disable={false}
                                // type='date'
                                onKeyPress={(e)=>getsku_code(e)}
                                label={'Kode Pengiriman'}
                                onChange={(v)=>setPengiriman(v?.target?.value)}
                                style={{width:'100%'}}
                                /> */}
                    {/* <p>Tanggal Pengiriman</p> */}
                    <Input 
                    value={tanggal_transaksi}
                    disable={false}
                    type='date'
                    label={'Tanggal transaksi'}
                    onChange={(v)=>setTanggal_transaksi(v?.target?.value)}
                    style={{width:'100%',marginTop:20}}
                    />
                     <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Supplier</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={id_pemasok}
                            label="Select Toko Asal"
                            onChange={(v)=>{setId_pemasok(v?.target?.value)}}
                          >
                            {props?.pemasok?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.kode_pemasok}-{d?.nama_pemasok}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                          <h3>Detail pembelian</h3>
                        <div style={{ display: 'flex',flexDirection:'row'}}>
                            <div style={{width:'100%',marginRight:10}}>
                              {/* <p style={{textColor:'gray',fontSize:'13px'}}>Artikel</p> */}
                              <Input 
                                value={artikel}
                                onChange={(v)=>setArtikel(v?.target?.value)}
                                label='Artikel'
                                onKeyPress={(e)=>getArticle(e)}
                               style={{width:'100%',marginTop:20}}
                               />
                               <Input 
                                value={sku_code}
                                onChange={(v)=>setSku_code(v?.target?.value)}
                                label='SKU CODE'
                                onKeyPress={(e)=>getSKU(e)}
                               style={{width:'100%',marginTop:20}}
                               />
                                {/* <p style={{textColor:'gray',fontSize:'13px'}}>Artikel</p> */}
                                <Input 
                                value={nama_barang}
                                onChange={(v)=>setNama_barang(v?.target?.value)}
                                label='Nama barang'
                               style={{width:'100%',marginTop:20}}
                               />
                                {/* <p style={{textColor:'gray',fontSize:'13px'}}>Tipe</p> */}
                        <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Tipe</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tipe}
                            label="Select Toko Asal"
                            onChange={(v)=>{setTipe(v?.target?.value)}}
                          >
                            {props?.tipe?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.type_name}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                        {/* <Input 
                    value={date_from}
                    disable={false}
                    type='date'
                    label={'Date From'}
                    onChange={(v)=>setDate_from(v?.target?.value)}
                    style={{width:'100%',marginTop:20}}
                    />  */}
                     <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Ukuran</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ukuran}
                            label="Select ukuran"
                            onChange={(v)=>{setUkuran(v?.target?.value)}}
                          >
                            {props?.ukuran?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.ukuran}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                        <Input 
                                value={kuantitas}
                                onChange={(v)=>setKuantitas(v?.target?.value)}
                                label='Kuantitas'
                               style={{width:'100%',marginTop:20}}
                               />
                            </div>
                            <div style={{width:'100%',marginRight:10}}>
                              {/* <p style={{textColor:'gray',fontSize:'13px'}}>Kode sku_code</p> */}
                              {/* <Input 
                                value={sku_code}
                                onChange={(v)=>setSku_code(v?.target?.value)}
                                label='Kode SKU'
                               style={{width:'100%',marginTop:20}}
                               /> */}
                                {/* <p style={{textColor:'gray',fontSize:'13px'}}>Artikel</p> */}
                                <Input 
                                value={hpp}
                                onChange={(v)=>setHpp(v?.target?.value)}
                                label='HPP'
                               style={{width:'100%',marginTop:20}}
                               />
                                <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Select Kategori</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={kategori}
                            label="Select Toko Asal"
                            onChange={(v)=>{setKategori(v?.target?.value)}}
                          >
                            {props?.kategori?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.kategori_name}</MenuItem>
                                
                              )
                            })}
                          </Select>
                        </FormControl>
                            {/* <Input 
                        value={date_to}
                        disable={false}
                        type='date'
                        label={'Date To'}
                        onChange={(v)=>setDate_to(v?.target?.value)}
                        style={{width:'100%',marginTop:20}}
                        />  */}
                        <Input 
                                value={harga_jual}
                                onChange={(v)=>setHarga_jual(v?.target?.value)}
                               label='Harga jual'
                               style={{width:'100%',marginTop:20}}
                               />
                                <div style={{marginTop:30}}>
                        <Button onClick={()=>addDetailProduk( )} variant="contained">Add Detail</Button>
                                          </div>
                            </div>
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
                                {/* <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                     
                                }}>SKU CODE</th> */}
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
                                }}>HPP</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Harga jual</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Ukuran</th>
                                {/* <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Date from</th>
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Date To</th> */}
                                <th style={{
                                     textAlign: 'left',
                                     padding: '8px',
                                     border: '1px solid #ddd'
                                }}>Aksi</th>
                               
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
                                    
                                     {/* <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      {d?.sku_code}
                                    </td> */}
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
                                      {/* <input onChange={(v)=>changeTabel('kuantitas',i,v?.target?.value)} value={d?.kuantitas}/> */}
                                      {d?.kuantitas}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      
                                      {/* <input onChange={(v)=>changeTabel('keterangan',i,v?.target?.value)} value={d?.keterangan}/> */}
                                      {d?.type_name}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      
                                      {/* <input onChange={(v)=>changeTabel('keterangan',i,v?.target?.value)} value={d?.keterangan}/> */}
                                      {d?.nama_kategori}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      
                                      {/* <input onChange={(v)=>changeTabel('keterangan',i,v?.target?.value)} value={d?.keterangan}/> */}
                                      {d?.hpp}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      
                                      {/* <input onChange={(v)=>changeTabel('keterangan',i,v?.target?.value)} value={d?.keterangan}/> */}
                                      {d?.harga_jual}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      
                                      {/* <input onChange={(v)=>changeTabel('keterangan',i,v?.target?.value)} value={d?.keterangan}/> */}
                                      {d?.ukuran}
                                    </td>
                                    {/* <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      
                                    
                                      {d?.date_from}
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      
                                      
                                      {d?.date_to}
                                    </td> */}
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '8px',
                                        border: '1px solid #ddd'
                                    }}>
                                      
                                      <DeleteIcon onClick={(v)=>deleteData(i)}/>
                                    </td>
                                </tr>
                                )})}
                            </tbody>
                        </tabel>
                        </div>
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit(  
                          {detail_pembelian:listDetail,id_supplier:id_pemasok,
                            nama_supplier:convertPemasok(id_pemasok),tanggal_transaksi}
                          )} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddPembelian