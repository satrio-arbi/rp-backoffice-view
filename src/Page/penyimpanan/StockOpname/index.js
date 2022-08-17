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
import ModalAddStockOpname from '../../../Component/modal/Modal-AddStockOpname-Component'
import ModalEditStockOpname from '../../../Component/modal/Modal-EditStockOpname-Component'
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
import {alertSuccess} from '../../../Component/alert/sweetalert'
import {addStockOpname,getOffice,getStockOpnameMasuk,getStockOpnameSearch,updateStockOpnameMasuk,deleteStockOpnameMasuk} from '../../../Config/Api-new'
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
      id: "nama_barang",
      label: "Nama Barang",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "sku_code",
      label: "SKU CODE",
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
      id: "tanggal_so",
      label: "Tanggal SO",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "type_name",
      label: "Type",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "nama_kategori",
      label: "Kategori",
      disablePadding: true,
      numeric: false,
    },
    
    {
      id: "kuantitas_masuk",
      label: "Kuantitas Masuk",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "kuantitas_keluar",
      label: "Kuantitas Keluar",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "stock",
      label: "Stock",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "stock_opname",
      label: "Stock Opname",
      disablePadding: true,
      numeric: false,
    },
  
    {
      id: "ket",
      label: "Keterangan",
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

export default function BarangMasuk() {
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
  const [office,setOffice] = React.useState([]);
  const [modal, setModal] = React.useState();
  const [modalUplaod, setModalUplaod] = React.useState();
  useEffect(()=>{
    getAllKategori()
  },[])
  const submitStockOpname =async(
    
    artikel,
  kategori,
  nama_barang,
  nama_kategori,
  sku_code,
  stock_opname,
  type,
  type_name
  )=>{
    setModal(false)
    let res = await addStockOpname(
      artikel,
  kategori,
  nama_barang,
  nama_kategori,
  sku_code,
  stock_opname,
  type,
  type_name
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
        
      await deleteStockOpnameMasuk(array[i]?.id)
    }
    
    
    }
    getAllKategori()
    alertSuccess('Success','Success delete data')
  }
  const submitUpdateStockOpname =async(artikel,
    kategori,
    nama_barang,
    nama_kategori,
    sku_code,
    stock_opname,
    type,
    type_name)=>{
    setOpenDetail(false)
    settoBeSelected({})
    let res = await updateStockOpnameMasuk(artikel,
      kategori,
      nama_barang,
      nama_kategori,
      sku_code,
      stock_opname,
      type,
      type_name,toBeSelected?.id)
    if(res?.status){
      alertSuccess('Success','')
      getAllKategori()
    }
    console.log({res:res})
  }
  const getAllKategori =async()=>{
    
    let res = await getStockOpnameMasuk()
    let res1 = await getOffice()
    setData(res?.data)
    setOffice(res1?.data)
    
  }
  const convertOffice = (v) =>{
    let idx = office?.findIndex(a=>a.id==v)
    return office?office[idx]?.office_name:''
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
  const searching =async()=>{
    
    let res = await getStockOpnameSearch(searched)
    setData(res?.data)
    
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
      <h1>Stock Opname</h1>
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
                      <TableCell align="left">{row.nama_barang}</TableCell>
                      <TableCell align="left">{row.sku_code}</TableCell>
                      <TableCell align="left">{row.artikel}</TableCell>
                      <TableCell align="left">{row?.tanggal_so}</TableCell>
                      <TableCell align="left">{row.type_name}</TableCell>
                      <TableCell align="left">{row.nama_kategori}</TableCell>
                      <TableCell align="left">{row.kuantitas_masuk}</TableCell>
                      <TableCell align="left">{row.kuantitas_keluar}</TableCell>
                      <TableCell align="left">{row.stock}</TableCell>
                      <TableCell align="left">{row.stock_opname}</TableCell>
                      <TableCell align="left">{row.keterangan}</TableCell>
                     
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
    <ModalEditStockOpname
    open={openDetail}
    data={toBeSelected}
    submit ={(artikel,
      kategori,
      nama_barang,
      nama_kategori,
      sku_code,
      stock_opname,
      type,
      type_name)=>submitUpdateStockOpname(artikel,
      kategori,
      nama_barang,
      nama_kategori,
      sku_code,
      stock_opname,
      type,
      type_name)}
    onClickOpen = {()=>setOpenDetail(!openDetail)}
    />
    <ModalAddStockOpname 
    open={modal}
    submit ={(
      artikel,
  kategori,
  nama_barang,
  nama_kategori,
  sku_code,
  stock_opname,
  type,
  type_name
    )=>submitStockOpname(
      artikel,
  kategori,
  nama_barang,
  nama_kategori,
  sku_code,
  stock_opname,
  type,
  type_name
    )}
    onClickOpen = {()=>setModal(!modal)}
    />
     <ModalUploadKategori 
    open={modalUplaod}
    mutate={()=>getAllKategori()}
    submit ={(name)=>submitStockOpname(name)}
    onClickOpen = {()=>setModalUplaod(!modalUplaod)}
    />
    </div>
      );
}
