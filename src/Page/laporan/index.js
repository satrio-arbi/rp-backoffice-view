import * as React from 'react';

import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import ModalReport from '../../Component/modal/Modal-Report-Component'
import {
  getOffice,
  getStore,
  getProduk,
  getPelanggan,
geReportBestArticleByOffice,geReportBestArticleByStore,
geReportLaporanPembelian,geReportBarangMasuk,geReportBarangKeluar,
geReportPengirimanStoretoStore,geReportPengirimanOfficetoStore,
geReportPenerimaanFromStore,geReportPenerimaanFromSupplier,
geReportPengirimanGudangToStore,geReportPengirimanStoreToStore,
geReportPurchaseStoreByArticle,geReportPurchaseStoreBySummary,
geReportSalesByOffice,geReportStockOpname
} from '../../Config/Api-new'
export default function MasterKatgori() {
  const [modal,setModal] = React.useState({st:false,i:'',v:''})
  const [office,setOffice] = React.useState([])
  const [store,setStore] = React.useState([])
  const [product,setProduct] = React.useState([])
  const [pelanggan,setPelanggan] = React.useState([])
  const reprot =[
'Report Best Article By Office','Report Best Article By Store',
'Report Laporan Pembelian','Report Barang Masuk',
'Report Barang Keluar','Report Pengiriman Store To Store',
'Report Pengiriman Office To Store','Report Penerimaan From Store',
'Report Penerimaan From Supplier','Report Pengiriman Gudang To Store',
'Report Pengiriman Store To Store','Report Purchase Store By Article',
'Report Purchase Store By Summary','Report Sales By Office',
'Report Stock Opname'
  ]
  
  React.useEffect(()=>{
    getData()
  },[])
  const getData = async () => {
    let resOffice = await getOffice()
    let resStore = await getStore()
    let resProd = await getProduk()
    let resPel = await getPelanggan()
    setOffice(resOffice?.data)
    setProduct(resProd?.data)
    setStore(resStore?.data)
    setPelanggan(resPel?.data)
  }
  const showModal = (st,i,v)=>{
    setModal({st,i,v})
  }
  const submit =async (v)=>{
    console.log({v})
    if(modal.i===0){
      await geReportBestArticleByOffice(v?.start,v?.end,v?.idOffice)
    }else if(modal.i===1){
      await geReportBestArticleByStore(v?.start,v?.end,v?.idStore)
    }if(modal.i===2){
      await geReportLaporanPembelian(v?.start,v?.end)
    }if(modal.i===3){
      await geReportBarangMasuk(v?.start,v?.end)
    }if(modal.i===4){
      await geReportBarangKeluar(v?.start,v?.end)
    }if(modal.i===5){
      await geReportPengirimanStoretoStore(v?.start,v?.end)
    }if(modal.i===6){
      await geReportPengirimanOfficetoStore(v?.start,v?.end)
    }if(modal.i===7){
      await geReportPenerimaanFromStore(v?.start,v?.end)
    }if(modal.i===8){
      await geReportPenerimaanFromSupplier(v?.start,v?.end)
    }if(modal.i===9){
      await geReportPengirimanGudangToStore(v?.start,v?.end)
    }if(modal.i===10){
      await geReportPengirimanStoreToStore(v?.start,v?.end)
    }if(modal.i===11){
      await geReportPurchaseStoreByArticle(v?.start,v?.end,v?.article)
    }if(modal.i===12){
      await geReportPurchaseStoreBySummary(v?.start,v?.end,v?.hp)
    }if(modal.i===13){
      await geReportSalesByOffice(v?.start,v?.end,v?.idOffice)
    }if(modal.i===14){
      await geReportStockOpname(v?.start,v?.end)
    }
  }
  return (
    <div style={{
      marginTop:"5%"
    }}>
      <div style={{display:'flex'}}>
      <h1>Semua Laporan</h1>
            <div
             style={{
                 position:"absolute",
                 right:0,
                 display:"flex"
             }}
            >
         
           </div>
      </div>
           {/* <Gap height={15}/> */}
<Box sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%' }}>
        <ul>
          {reprot?.map((v,i)=>{
            return(
              
                
                  <li onClick={()=>showModal(true,i,v)} style={{	cursor: 'pointer'}} key={i}>
                    <p style={{textAlign: 'left',padding: '5px',paddingLeft:'20px'}}>{v}</p>
                  </li>
              
            )
          })}
        </ul>
      </Paper>
    </Box>
    <ModalReport 
    open={modal?.st} 
    d={modal}
    office={office}
    store={store}
    prod={product}
    pelanggan={pelanggan}
    onClickOpen = {()=>setModal({st:!modal?.st,i:'',v:''})}
    submit={(v)=>submit(v)}
    />
    </div>
      );
}
