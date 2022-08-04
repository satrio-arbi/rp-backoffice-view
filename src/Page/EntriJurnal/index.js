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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ModalAddBank from '../../Component/modal/Modal-AddBank-Component'
import ModalUpdateBank from '../../Component/modal/Modal-UpdateBank-Component'
// import ModalUploadTipe from '../../Component/modal/Modal-UploadTipe-Component'
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
import {
  Button as Buttons
 } from "@mui/material";
import Input from '../../Component/input/index'
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Gap from '../../Component/gap/index';
import clsx from 'clsx';
import {alertSuccess,alertError} from '../../Component/alert/sweetalert'

import { getDaftarAkun,getProject,jurnalAdd} from '../../Config/Api-new'
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
      id: "No",
      label: "No",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "tgl",
      label: "Tanggal",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "rincian",
      label: "Rincian Transaksi",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "akun",
      label: "Akun",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "debit",
      label: "Debit",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "kredit",
      label: "Kredit",
      disablePadding: true,
      numeric: false,
    },
    {
      id: "project",
      label: "Project",
      disablePadding: true,
      numeric: false,
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

export default function EntriJurnal() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [toBeSelected, settoBeSelected] = React.useState({});
  const dispatch = useDispatch();
  const dataStore = useSelector((state)=> state.reducer.getPembelian.data)
  
  const [rows, setRows] = React.useState(dataStore)
  const [searched, setSearched] = React.useState();
  const [cari, setCari] = React.useState();
  const [data,setData] = React.useState([]);
  const [dataDaftarAkun,setDataDaftarAkun] = React.useState([]);
  const [dataProject,setDataProject] = React.useState([]);
  
  const [modal, setModal] = React.useState();
  const [rincian, setRincian] = React.useState('');
  const [akun, setAkun] = React.useState('');
  const [debit, setDebit] = React.useState(0);
  const [kredit, setKredit] = React.useState(0);
  const [project, setProject] = React.useState('');
  const [tgl, setTgl] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
  
  useEffect(()=>{
    getAllSelect()
  },[])
  const getAllSelect =async()=>{
     
    let res = await getDaftarAkun()
    let res2 = await getProject()
    setDataDaftarAkun(res?.data)
    setDataProject(res2?.data)
    
  }
  const deleteData = async ()=>{
    let array = [...data]
    console.log({data})
    for(let i = 0;i<array?.length;i++){
      // console.log({s:array[i]?.check})
      if(array[i]?.check===true){
        array.splice(i, 1);
      // await getBankDelete(parseInt(array[i]?.id))
    }
   
    
    }
    setData(array)
    alertSuccess('Success','Success delete data')
  }
  const checkSingle=(d,i)=>{
    let array = [...data]
      
    // let idx = array?.findIndex(a=>a.id==d?.id)
    if(!d?.check){
      array[i]['check'] = true
    }else{
      array[i]['check'] = false
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
  
  useEffect(()=>{
    setRows(dataStore)
  },[dataStore])
  // const handleOpenDetail=(dataStore)=>{
  //   settoBeSelected(dataStore)
  //   setOpenDetail(true)
  // }
  

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
  const convertImage = (v) => {
    
    return 'data:image/png;base64,'+v
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
  const convAkun = (e)=>{
    let idx = dataDaftarAkun?.findIndex(a=>a.id==e)

    return dataDaftarAkun[idx]
  }
  const convProject = (e)=>{
    let idx = dataProject?.findIndex(a=>a.id==e)

    return dataProject[idx]
  }
  const addData = () =>{
    let arr =[...data];
 
    arr.push({
      credit_amount:kredit===''?0:kredit,
      debit_amount:debit===''?0:debit,
      kelompok:convAkun(akun)?.kelompok,
      nama_akun:convAkun(akun)?.namaAkun,
      noAkun:convAkun(akun)?.noAkun,
      project:convProject(project)?.id,
      project_name:convProject(project)?.project_name,
      tanggal_transaksi:tgl,
      rincian_transaksi:rincian,
      rowstatus:1
    })
    setData(arr)
  }
  const save = async () => {
    // const formData = new FormData();  
    // formData.append('request',data)
    let res = await jurnalAdd(data)
    if(res?.status){
      alertSuccess('Success',res?.data)
      setData([])
      setRincian('')
      setAkun('')
      setDebit(0)
      setKredit(0)
      setProject('')
      setTgl(moment(new Date()).format('YYYY-MM-DD'))
      
    }else{
      alertError('Fail','Gagal upload data')
    }
  
  }
  return (
    <div style={{
      marginTop:"5%"
    }}>
      <div style={{display:'flex'}}>
      <h1>Entri Journal</h1>
            <div
             style={{
                 position:"absolute",
                 right:0,
                 display:"flex"
             }}
            >
            
           </div>
      </div>
<Gap height={15}/>
<Box sx={{ width: '100%', marginTop:"20px" }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <div style={{ display: 'flex',flexDirection:'row'}}>
          <div style={{width:'100%',marginRight:10}}>
                <Input 
                value={tgl}
                disable={false}
                type='date'
                label={'Tanggal'}
                onChange={(v)=>setTgl(v?.target?.value)}
                style={{width:'100%',marginTop:20}}
                />    
                <Input 
                value={rincian}
                disable={false}
                type='text'
                label={'Rincian Transaksi'}
                onChange={(v)=>setRincian(v?.target?.value)}
                style={{width:'100%',marginTop:20}}
                />  
                <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                  <InputLabel id="demo-simple-select-label">Select Akun</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={akun}
                    label="Select ukuran"
                    onChange={(v)=>{setAkun(v?.target?.value)}}
                  >
                    {dataDaftarAkun?.map((d,i)=>{
                      return(
                        
                          <MenuItem value={d?.id} >{d?.noAkun}-{d?.namaAkun}</MenuItem>
                        
                      )
                    })}
                  </Select>
                </FormControl>
            </div> 
            <div style={{width:'100%',marginRight:10}}>
              <Input 
                value={debit}
                disable={kredit>0?true:false}
                type='text'
                label={'Debit'}
                onChange={(v)=>setDebit(v?.target?.value)}
                style={{width:'100%',marginTop:20}}
                />  
                <Input 
                value={kredit}
                disable={debit>0?true:false}
                type='text'
                label={'Kredit'}
                onChange={(v)=>setKredit(v?.target?.value)}
                style={{width:'100%',marginTop:20}}
                />  
            <FormControl sx={{ marginTop:2, width: '100%' }} variant="outlined">
                  <InputLabel id="demo-simple-select-label">Select Project</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={project}
                    label="Select ukuran"
                    onChange={(v)=>{setProject(v?.target?.value)}}
                  >
                    {dataProject?.map((d,i)=>{
                      return(
                        
                          <MenuItem value={d?.id} > {d?.project_name}</MenuItem>
                        
                      )
                    })}
                  </Select>
                </FormControl>
              <div style={{marginTop:30}}>
                    <Buttons onClick={()=>addData()} variant="contained">Tambah Baris</Buttons>
              </div>
          </div>
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
                     
                      <TableCell align="left">{index+1}</TableCell>
                      <TableCell align="left">{row.tanggal_transaksi}</TableCell>
                      <TableCell align="left">{row.rincian_transaksi}</TableCell>
                      <TableCell align="left">{row.noAkun}-{row.nama_akun}</TableCell>
                      <TableCell align="left">{row.debit_amount}</TableCell>
                      <TableCell align="left">{row.credit_amount}</TableCell>
                      <TableCell align="left">{row.project_name}</TableCell>
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
      <div style={{marginTop:30,display:"flex"}}>
          <Buttons onClick={()=>save()} variant="contained">Simpan</Buttons>
          <Buttons   onClick={()=>deleteData()} style={{backgroundColor:'red',color:'white',marginLeft:10}} >Hapus <DeleteIcon/></Buttons>
    </div>
            
    </Box>
   
    </div>
      );
}
