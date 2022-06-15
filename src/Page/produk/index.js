import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
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
import ModalAddMasterProduk from '../../Component/modal/Modal-AddMasterProduk-Component'
import ModalAddMasterProdukCostum from '../../Component/modal/Modal-AddMasterProdukCostum-Component'
import ModalUpdateMasterProduk from '../../Component/modal/Modal-UpdateMasterProduk-Component'
import ModalUploadMasterProduk from '../../Component/modal/Modal-UploadMasterProduk-Component'
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
import Button from '../../Component/button/index'
import Input from '../../Component/input/index'
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search'
import FormPembelian from '../../Page/FormPembelian/index'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Gap from '../../Component/gap/index';
import clsx from 'clsx';
import { getPembelian } from '../../Config/Redux/action';
import {alertSuccess} from '../../Component/alert/sweetalert'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {getUkuran,addProdukCustom,addProduk,getKategori,getTipe,getProduk,getProdukSearch,getProdukByType,getProdukBySKU,updateProduk,deleteProduk} from '../../Config/Api-new'
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
  const stabilizedThis = array.map((el, index) => [el, index]);
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
      label: "Product Id",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "name",
      label: "Name",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "artikel",
      label: "Artikel",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "tipe",
      label: "Tipe",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "kategori",
      label: "Kategori",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "artikel_frame",
      label: "Artikel Frame",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "artikel_lens",
      label: "Artikel Lensa",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "ukuran",
      label: "Ukuran",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "qty",
      label: "Kuantitas",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "hpp",
      label: "HPP",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "harga_jual",
      label: "Harga jual",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "remark",
      label: "Remarks",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "image",
      label: "Image",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "aksi",
      label: "Aksi",
    }
];

function EnhancedTableHead(props) {
  const { checkAllList,onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,data } =
    props;
  const [check,setCheck] = React.useState(false)
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function MasterKatgori() {
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
  const [data,setData] = React.useState([]);
  const [modal, setModal] = React.useState();
  const [modalCostum, setModalCostum] = React.useState();
  const [modalUplaod, setModalUplaod] = React.useState();
  const [searchSKU, setSearchSKU] = React.useState();
  const [type, setType] = React.useState();
  const [kategori, setKategori] = React.useState();
  const [typeValue, setTypeValue] = React.useState();
  const [ukuran,setUkuran] = React.useState([]);
  useEffect(()=>{
    getAllKategori()
  },[])
   
   const submitMasterProdukCustom =async(
    artikel_frame_ns,
    artikel_lens_ns,
    sku_code_s,
    sku_code_f,
     ukuran,
     type_name,
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
     nama_kategori,
     image
  )=>{
    setModalCostum(false)
    let res = await addProdukCustom(
      artikel_frame_ns,
    artikel_lens_ns,
    sku_code_s,
    sku_code_f,
     ukuran,
     type_name,
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
     nama_kategori,
     image
    )
    if(res?.status){
      alertSuccess('Success',res?.data)
      getAllKategori()
    }
    
  }
  const submitMasterProduk =async(
    ukuran,
      type_name,
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
      nama_kategori,
      image
  )=>{
    setModal(false)
    let res = await addProduk(
      ukuran,
      type_name,
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
      nama_kategori,
      image
    )
    if(res?.status){
      alertSuccess('Success','')
      getAllKategori()
    }
    console.log({res:res})
  }
  const deleteData = async ()=>{
    let array = [...data]
    console.log({array:array?.length})
    for(let i = 0;i<array?.length;i++){
      if(array[i]?.check===true){
        
      await deleteProduk(array[i]?.id)
    }
    
    
    }
    getAllKategori()
    alertSuccess('Success','Success delete data')
  }
  const submitUpdateProduk =async( ukuran,
    type_name,
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
    nama_kategori,
    image)=>{
    setOpenDetail(false)
    settoBeSelected({})
    let res = await updateProduk( ukuran,
      type_name,
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
      nama_kategori,
      image,toBeSelected?.id)
    if(res?.status){
      alertSuccess('Success',res?.data)
      getAllKategori()
    }
    console.log({res:res})
  }
  const getAllKategori =async()=>{
    
    let res = await getProduk()
    let res1 = await getTipe()
    let res2 = await getKategori()
    let res3 = await getUkuran()
    setType(res1?.data)
    setData(res?.data)
    setKategori(res2?.data)
    setUkuran(res3?.data)
    
  }
  const convertImage = (v) => {
    
    return 'data:image/png;base64,'+v
  };
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
    array.map((d,i)=>{
      array[i]['check'] = v
    })
  
    
    setData(array)

  }
  const searching =async()=>{
    
    let res = await getProdukSearch(searched)
    setData(res?.data)
    
  }
  const searchingBySKU =async()=>{
    
    let res = await getProdukBySKU(searchSKU)
    setData(res?.data?res?.data:[])
    
  }
  const searchingByType =async()=>{
    
    let res = await getProdukByType(typeValue)
    setData(res?.data?res?.data:[])
    
  }
  useEffect(()=>{
    setRows(dataStore)
  },[dataStore])
  const handleOpenDetail=(dataStore)=>{
    settoBeSelected(dataStore)
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
  return (
    <div style={{
      marginTop:"5%"
    }}>
      <div style={{display:'flex'}}>
      <h1>Master Product</h1>
            <div
             style={{
                 position:"absolute",
                 right:0,
                 display:"flex"
             }}
            >
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
           <Button
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
           />
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
                label="Add Costum"
                onClick={()=>setModalCostum(true)}
                startIcon={<AddIcon/>}
           />
           </div>
      </div>
           <Gap height={15}/>
<Box sx={{ width: '100%', marginTop:"20px" }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <div align='left'>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Search by Name</InputLabel>
          <OutlinedInput
            value={searched}
            onChange={handleChangeSearch}
            // onKeyUp={()=>{
            //   dispatch(getPenjualanOffice(`/search`))
            // }}
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                >
                 <SearchIcon onClick={()=>searching()}/>
                </IconButton>
              </InputAdornment>
            }
            label="Cari"
          />
        </FormControl>
        {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Search by SKU</InputLabel>
          <OutlinedInput
            value={searchSKU}
            onChange={(v)=>setSearchSKU(v?.target?.value)}
            // onKeyUp={()=>{
            //   dispatch(getPenjualanOffice(`/search`))
            // }}
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                >
                 <SearchIcon onClick={()=>searchingBySKU()}/>
                </IconButton>
              </InputAdornment>
            }
            label="Cari By SKU"
          />
        </FormControl> */}
        {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Select by Type</InputLabel>
          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeValue}
                            label="Store"
                            onChange={(v)=>{setTypeValue(v?.target?.value)}}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  edge="end"
                                >
                                 <SearchIcon onClick={()=>searchingByType()}/>
                                </IconButton>
                              </InputAdornment>
                            }
                          >
                            {type?.map((d,i)=>{
                              return(
                                
                                  <MenuItem value={d?.id} >{d?.type_name}</MenuItem>
                                
                              )
                            })}
                          </Select>
         
        </FormControl> */}
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
                      <TableCell align="left">{row.nama_product}</TableCell>
                      <TableCell align="left">{row.artikel_product}</TableCell>
                      <TableCell align="left">{row.type_name}</TableCell>
                      <TableCell align="left">{row.nama_kategori}</TableCell>
                      <TableCell align="left">{row.artikel_frame}</TableCell>
                      <TableCell align="left">{row.artikel_lens}</TableCell>
                      <TableCell align="left">{row.ukuran}</TableCell>
                      <TableCell align="left">{row.kuantitas}</TableCell>
                      <TableCell align="left">{row.hpp}</TableCell>
                      <TableCell align="left">{row.harga_jual}</TableCell>
                      <TableCell align="left">{row.remarks}</TableCell>
                      <TableCell align="left">
                        <img src={convertImage(row.image)} style={{width:50,height:50}} />
                      </TableCell>
                      <TableCell align="right">
                      <div style={{
                        
                      }}>
                      <IconButton onClick={()=>{
                        handleOpenDetail(row)
                      }}>
                          <RemoveRedEyeOutlinedIcon />
                        </IconButton>
                      </div>
                        </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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
    <ModalUpdateMasterProduk
    open={openDetail}
    data={toBeSelected}
    type={type}
    ukuran={ukuran}
    kategori={kategori}
    submit ={(
      ukuran,
      type_name,
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
      nama_kategori,
      image
    )=>submitUpdateProduk(
      ukuran,
      type_name,
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
      nama_kategori,
      image
    )}
    onClickOpen = {()=>setOpenDetail(!openDetail)}
    />
    <ModalAddMasterProdukCostum
     open={modalCostum}
     type={type}
     ukuran={ukuran}
     kategori={kategori}
     submit ={(
      artikel_frame_ns,
      artikel_lens_ns,
      sku_code_s,
      sku_code_f,
       ukuran,
       type_name,
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
       nama_kategori,
       image
     )=>submitMasterProdukCustom(
      artikel_frame_ns,
      artikel_lens_ns,
      sku_code_s,
      sku_code_f,
       ukuran,
       type_name,
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
       nama_kategori,
       image
     )}
     onClickOpen = {()=>setModalCostum(!modalCostum)}
    />
    <ModalAddMasterProduk
    open={modal}
    type={type}
    ukuran={ukuran}
    kategori={kategori}
    submit ={(
      ukuran,
      type_name,
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
      nama_kategori,
      image
    )=>submitMasterProduk(
      ukuran,
      type_name,
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
      nama_kategori,
      image
    )}
    onClickOpen = {()=>setModal(!modal)}
    />
     <ModalUploadMasterProduk
    open={modalUplaod}
    mutate={()=>getAllKategori()}
    submit ={(name)=>submitMasterProduk(name)}
    onClickOpen = {()=>setModalUplaod(!modalUplaod)}
    />
    </div>
      );
}
