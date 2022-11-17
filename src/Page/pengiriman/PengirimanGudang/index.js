import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DownloadIcon from '@mui/icons-material/Download';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ModalAddPengirimanOfficeStore from '../../../Component/modal/Modal-AddOfficekeStore-Component'
import ModalupdatePengirimanOfficekeStore from '../../../Component/modal/Modal-EditOfficekeStore-Component'
import ModalUploadKategori from '../../../Component/modal/Modal-UploadKategori-Component'
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Button from '../../../Component/button/index'
import Input from '../../../Component/input/index'
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search'
import FormPembelian from '../../../Page/FormPembelian/index'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Gap from '../../../Component/gap/index';
import clsx from 'clsx';
import { getPembelian } from '../../../Config/Redux/action';
import {alertSuccess,alertError} from '../../../Component/alert/sweetalert'
import ModalDownloadReport from '../../../Component/modal/Modal-DownloadReport-Component'
import {getDownloadTransferRequest,geReportPengirimanOfficetoStore,addPengirimanOfficekeStore,getUkuran,getStore,getOffice,getPengirimanOfficekeStore,getPengirimanOfficekeStoreSearch,updatePengirimanOfficekeStore,deletePengirimanOfficekeStore} from '../../../Config/Api-new'
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  console.log({stabilizedThis})
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
 
  {
    id: "id",
    label: "Id",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "pengiriman_code",
    label: "Kode Pengiriman",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "tanggal_pengiriman",
    label: "Tanggal Pengiriman",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "office",
    label: "Office",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "lokasi_office",
    label: "Lokasi office",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "store_tujuan",
    label: "Store Tujuan",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "lokasi_store",
    label: "Lokasi Store",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "aksi",
    label: "Aksi",
  }
];

function EnhancedTableHead(props) {
  const { checkChange,checkAllList,onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,data } =
    props;
  const [check,setCheck] = React.useState(false)
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  React.useEffect(()=>{
    setCheck(false)
  },[checkChange])
  const checkAll =()=>{
    checkAllList(!check)
    setCheck(!check)
  }
  return (
    <TableHead>
      <TableRow>
      <TableCell
            key={'check'}
            // align="center"
            // padding={'normal'}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
           <input type="checkbox" checked={check} onClick={()=>checkAll()} />
          </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              style={{fontWeight:'bold', padding:'1em'}}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  data: PropTypes.any,
  checkAllList: PropTypes.func,
  checkChange: PropTypes.any,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function PengirimanOfficeStore() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [toBeSelected, settoBeSelected] = React.useState({});
  const dispatch = useDispatch();
  const dataStore = useSelector((state)=> state.reducer.getPembelian.data)
  const [openDetail,setOpenDetail] = React.useState(false)
  const [rows, setRows] = React.useState(dataStore)
  const [searched, setSearched] = React.useState();
  const [cari, setCari] = React.useState();
  const [check, setCheck] = React.useState(false);
  const [data,setData] = React.useState([]);
  const [modal, setModal] = React.useState();
  const [modalUplaod, setModalUplaod] = React.useState();
  const [dataToko,setDataToko] = React.useState([]);
  const [dataOffice,setDataOffice] = React.useState([]);
  const [ukuran,setUkuran] = React.useState([]);
  const [detail, setDetail] = React.useState([]);
  const [modalReport, setModalReport] = React.useState();
  const downloadTransferRequest = async (v)=>{
    let res = await getDownloadTransferRequest({pengiriman_code:v?.pengiriman_code})
  }
  useEffect(()=>{
    getAllKategori()
  },[])
  const submitKategori =async( detail_pengiriman,
    tanggal_pengiriman,
    id_office,
    lokasi_office,
    id_store,
    lokasi_store,pengiriman_code)=>{
    setModal(false)
    let res = await addPengirimanOfficekeStore( detail_pengiriman,
      tanggal_pengiriman,
      id_office,
      lokasi_office,
      id_store,
      lokasi_store,pengiriman_code)
    if(res?.status){
      alertSuccess('Success','')
      downloadTransferRequest(res?.data)
      getAllKategori()
    }else{
      alertError('Error','Fail add data')
    }
  }
  const deleteData = async ()=>{
    let array = [...data]
    console.log({array:array?.length})
    for(let i = 0;i<array?.length;i++){
      if(array[i]?.check===true){
        
      await deletePengirimanOfficekeStore(array[i]?.id)
    }
    
    
    }
    getAllKategori()
    setCheck(!check)
    alertSuccess('Success','Success delete data')
  }
  const submitupdatePengirimanOfficekeStore =async(detail_pengiriman,
    tanggal_pengiriman,
    id_office,
    lokasi_office,
    id_store,
    lokasi_store)=>{
    setOpenDetail(false)
    settoBeSelected({})
    setDetail([])
    let res = await updatePengirimanOfficekeStore(
      detail_pengiriman,
      tanggal_pengiriman,
      id_office,
      lokasi_office,
      id_store,
      lokasi_store,toBeSelected?.pengiriman_code
      ,toBeSelected?.id)
    if(res?.status){
      alertSuccess('Success','')
      getAllKategori()
    }else{
      alertError('Error','Fail update data')
    }
  }
  const donwloadReport =async(start,end)=>{
    setModal(false)
    let res = await geReportPengirimanOfficetoStore(start,end)
    if(res?.status){
      // ,res?.data
      alertSuccess('Success','')
      // getAllKategori()
    }else{
      alertError('Error','Fail download data')
    }
  }
  const getAllKategori =async()=>{
    let res1 = await getStore()
    let res2 = await getUkuran()
    let res3 = await getOffice()
    let res = await getPengirimanOfficekeStore()
    setDataToko(res1?.data)

    setDataOffice(res3?.data)
    setData(res?.data)
    setUkuran(res2?.data)
    
  }
  const checkSingle=(d,i)=>{
    let array = [...data]
    let idx = array?.findIndex(a=>a.id==d?.id)
    if(!d?.check){
      array[idx]['check'] = true
    }else{
      array[idx]['check'] = false
    }
    
    setData(array)

  }
  const checkSemua=(v)=>{
    let array = [...data]
    array?.map((d,i)=>{
      array[i]['check'] = v
    })
  
    
    setData(array)

  }
  const searching =async(e,type)=>{
    
    if((type==='enter'&&e.keyCode === 13)||type==='klik'){
    let res = await getPengirimanOfficekeStoreSearch(searched)
    setData(res?.data)
    }
  }
  useEffect(()=>{
    setRows(dataStore)
  },[dataStore])
  const handleOpenDetail=(dataStore)=>{
    settoBeSelected(dataStore)
    let arr = []
    dataStore?.detailPengirimanList?.map((d)=>{
      arr.push({
        id:d?.id,
        sku_code:d?.sku_code,
        artikel:d?.artikel,
        type_name:d?.type_name,
        tipe:d?.type,
        kategori_name:d?.nama_kategori,
        kategori:d?.kategori,
        nama_barang:d?.nama_barang,
        kuantitas:d?.kuantitas,
        ukuran:d?.ukuran,
        hpp:d?.hpp,
        harga_jual:d?.harga_jual
      })
    })
    setDetail(arr)
    setOpenDetail(true)
  }
  console.log(rows)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const handleChangeSearch = (event) => {
      setSearched(event.target.value);
    };
    const convertToko = (v) =>{
      let idx = dataToko?.findIndex(a=>a.id==v)
      
      return dataToko?dataToko[idx]?.store_name:''
    }
    const convertOffice = (v) =>{
      let idx = dataOffice?.findIndex(a=>a.id==v)
      
      return dataOffice?dataOffice[idx]?.office_name:''
    }
  return (
    <div style={{
      marginTop:"5%"
    }}>
      <div style={{display:'flex'}}>
      <h1>Pengiriman Office to Store</h1>
            <div
             style={{
                 position:"absolute",
                 right:0,
                 display:"flex"
             }}
            >
               <Button
                style={{
                    background: "#0384fc",
                    color: 'white',
                    textTransform: 'capitalize',
                    marginRight:"15px",
                    width:"100%",
                    padding:"1em",
                    borderRadius:"14px"
                }}
                onClick={()=>setModalReport(true)}
                label="Report"
                startIcon={<SummarizeIcon/>}
           />
            <Button
                style={{
                    background: "#E14C4C",
                    color: 'white',
                    textTransform: 'capitalize',
                    marginRight:"15px",
                    width:"100%",
                    padding:"1em",
                    borderRadius:"14px"
                }}
                onClick={()=>deleteData()}
                label="Hapus"
                startIcon={<DeleteIcon/>}
           />
           {/* <Button
                style={{
                    background: "#828EED",
                    color: 'white',
                    textTransform: 'capitalize',
                    marginRight:"15px",
                    width:"100%",
                    padding:"1em",
                    borderRadius:"14px"
                }}
                label="Upload"
                onClick={()=>setModalUplaod(true)}
                startIcon={<CloudUploadIcon/>}
           /> */}
            <Button
                style={{
                    background: "#03fc35",
                    color: 'white',
                    textTransform: 'capitalize',
                    marginRight:"15px",
                    width:"100%",
                    padding:"1em",
                    borderRadius:"14px"
                }}
                label="Add"
                onClick={()=>setModal(true)}
                startIcon={<AddIcon/>}
           />
           </div>
      </div>
           <Gap height={15}/>
<Box sx={{ width: '100%', marginTop:"20px" }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <div align='left'>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Cari</InputLabel>
          <OutlinedInput
            value={searched}
            onChange={handleChangeSearch}
            onKeyUp={(e)=>{
              searching(e,'enter')
            }}
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                >
                 <SearchIcon onClick={()=>searching('','klik')}/>
                </IconButton>
              </InputAdornment>
            }
            label="Cari"
          />
        </FormControl>
      </div>
      
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
             checkAllList={(v)=>checkSemua(v)}
              checkChange={check}
              numSelected={selected.length}
              data={data}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                       <TableCell align="left">
                      <input 
                       type="checkbox" 
                       value={row?.check} 
                       checked={row?.check?row?.check:false} 
                       onChange={()=>{}} 
                       onClick={(e)=>checkSingle(row,index)}/>
                       </TableCell>
                       <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.pengiriman_code}</TableCell>
                      <TableCell align="left">{row.tanggal_pengiriman}</TableCell>
                      
                      <TableCell align="left">{row.lokasi_office}</TableCell>
                      
                      <TableCell align="left">{row.lokasi_store}</TableCell>
                       
                      <TableCell align="right">
                      <div style={{
                        
                      }}>
                      <IconButton onClick={()=>{
                        handleOpenDetail(row)
                      }}>
                          <RemoveRedEyeOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={()=>{
                        downloadTransferRequest(row)
                      }}>
                          <DownloadIcon />
                        </IconButton>
                      </div>
                        </TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    <ModalupdatePengirimanOfficekeStore
    open={openDetail}
    data={toBeSelected}
    store={dataToko}
    office={dataOffice}
    ukuran={ukuran}
    detail={detail}
    submit ={(detail_pengiriman,
      tanggal_pengiriman,
      id_office,
      lokasi_office,
      id_store,
      lokasi_store)=>submitupdatePengirimanOfficekeStore(detail_pengiriman,
        tanggal_pengiriman,
        id_office,
        lokasi_office,
        id_store,
        lokasi_store)}
    onClickOpen = {()=>setOpenDetail(!openDetail)}
    />
    <ModalDownloadReport 
    open={modalReport}
    submit ={(start,end)=>donwloadReport(start,end)}
    title={'Pengiriman Office to Store'}
    onClickOpen = {()=>setModalReport(!modalReport)}
    />
    <ModalAddPengirimanOfficeStore 
    open={modal}
    store={dataToko}
    office={dataOffice}
    ukuran={ukuran}
    submit ={( detail_pengiriman,
      tanggal_pengiriman,
      id_office,
      lokasi_office,
      id_store,
      lokasi_store)=>submitKategori( detail_pengiriman,
      tanggal_pengiriman,
      id_office,
      lokasi_office,
      id_store,
      lokasi_store)}
    onClickOpen = {()=>setModal(!modal)}
    />
     <ModalUploadKategori 
    open={modalUplaod}
    mutate={()=>getAllKategori()}
    submit ={(name)=>submitKategori(name)}
    onClickOpen = {()=>setModalUplaod(!modalUplaod)}
    />
    </div>
      );
}
