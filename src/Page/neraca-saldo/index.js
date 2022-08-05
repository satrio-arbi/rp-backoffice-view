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
import ModalUpdateEntryJournal from '../../Component/modal/Modal-UpdateEntryJournal-Component'
import ModalUpdateDaftarAkuntan from '../../Component/modal/Modal-UpdateDaftarAkuntan-Component'
import ModalUploadDaftarAkun from '../../Component/modal/Modal-UploadDaftarAkun-Component'
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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  Button as Buttons
 } from "@mui/material";
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
import moment from 'moment';
import {updateJournalUmumContext} from '../../Config/helper/zustand'
// getDaftarAkun,addDaftarAkun,updateDaftarAkun,
// deleteDaftarAkun,importDaftarAkun
import { useHistory } from 'react-router-dom';
import {neracaSaldo,jurnalUupdate,getDaftarAkunSearch,getDaftarAkun,getProject,addDaftarAkun,updateDaftarAkun,deleteDaftarAkun} from '../../Config/Api-new'
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
      id: "tgl_penerimaan",
      label: "Tanggal Penerimaan",
      disablePadding: false
    },
    {
      id: "nm_akun",
      label: "Nama akun dan Transaksi",
      disablePadding: false
    },
    {
      id: "db",
      label: "Debit",
      disablePadding: false
    },
    {
      id: "kr",
      label: "Kredit",
      disablePadding: false
    },
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
      {/* <TableCell
            key={'check'}
            // align="center"
            // padding={'normal'}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
           <input type="checkbox" checked={check} onClick={()=>checkAll()} />
          </TableCell> */}
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
  const [tanggal_akhir, setTanggal_akhir] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
  const [tanggal_awal, setTanggal_awal] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
  const {setUpdateJournalUmumStore} = updateJournalUmumContext()
  const [data,setData] = React.useState([]);
  const [dataJournal,setDataJournal] = React.useState([]);
  const [modal, setModal] = React.useState();
  const [modalUplaod, setModalUplaod] = React.useState();
  const [dbt, setDbt] = React.useState(0);
  const [krd, setKrd] = React.useState(0);
  const history = useHistory();
  const [dataDaftarAkun,setDataDaftarAkun] = React.useState([]);
  const [dataProject,setDataProject] = React.useState([]);
  const [dataDetail,setDataDetail] = React.useState({});
  const [year,setYear] = React.useState(new Date());
  useEffect(()=>{
    // dataDaftarAkun,dataProject
    getAllJurnaUmum()
  },[])
  const submitUpdateJournalUmum =async(data)=>{
    setModal(false)
    console.log({data})
    // const formData = new FormData();  
    // formData.append('noAkun',data?.noAkun)
    // formData.append('nama_akun ',data?.namaAkun)
    // formData.append('kelompok',data?.kelompok)
    // formData.append('saldo_awal ',data?.saldo_awal)
    // formData.append('saldo_normal ',data?.saldo_normal)
    // formData.append('tipe ',data?.tipe)
    
    let res = await jurnalUupdate(data)
    if(res?.status){
      alertSuccess('Success',res?.data)
      getAllJurnaUmum()
    }
    // console.log({res:res})
  }
  const deleteData = async ()=>{
    let array = [...data]
    console.log({array:array?.length})
    for(let i = 0;i<array?.length;i++){
      if(array[i]?.check===true){
        
      await deleteDaftarAkun(parseInt(array[i]?.id))
    }
    
    
    }
    getAllJurnaUmum()
    alertSuccess('Success','Success delete data')
  }
  const submitUpdateDaftarAkun =async(data)=>{
    setOpenDetail(false)
    settoBeSelected({})
    const formData = new FormData(); 
    formData.append('noAkun',data?.noAkun)
    formData.append('nama_akun ',data?.namaAkun)
    formData.append('kelompok',data?.kelompok)
    formData.append('saldo_awal ',data?.saldo_awal)
    formData.append('saldo_normal ',data?.saldo_normal)
    formData.append('tipe ',data?.tipe)
    formData.append('id ',toBeSelected?.id)
    
    let res = await updateDaftarAkun(formData)
    if(res?.status){
      alertSuccess('Success',res?.data)
      getAllJurnaUmum()
    }
    console.log({res:res})
  }
  const getAllJurnaUmum =async()=>{
    
    let res = await neracaSaldo({year:moment(year).format('YYYY')})
    // let res2 = await getDaftarAkun()
    // let res3 = await getProject()
    // setDataDaftarAkun(res2?.data)
    // setDataProject(res3?.data)
    setData(res?.data)
    let jr =[]
    let db = 0
    let kd = 0
    res?.data?.map((d)=>{
        // if(!jr.includes(d?.nomorJournal)){
        //   jr.push(d.nomorJournal)
        // }
        db=db+d?.debit_amount
        kd=kd+d?.credit_amount
    })
    setDbt(db)
    setKrd(kd)
    // console.log({jr})
    // setDataJournal(jr)
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
      if(d?.is_delets!==1){
        array[i]['check'] = v
      }
    })
  
    
    setData(array)

  }
  const searching =async()=>{
    
    let res = await getDaftarAkunSearch(searched)
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
// useEffect(()=>{
//   // console.log({dataDetail})
 
// },[dataDetail])
  const updateEntryJurnal = (d)=>{
    // console.log({d})
    setDataDetail(d)
    setModal(true);
    
    // let arr = []
    // data?.map((v)=>{
    //       if(v?.nomorJournal===d){
    //         arr?.push(v)
    //       }
    // })
    // // console.log({arr})
    // setUpdateJournalUmumStore(arr)
    // history.push('/entri-jurnal')
  }
  return (
    <div style={{
      marginTop:"5%"
    }}>
      <div style={{display:'flex'}}>
      <h1>Neraca Saldo</h1>
            <div
             style={{
                 position:"absolute",
                 right:0,
                 display:"flex"
             }}
            >
            
              <div style={{marginRight:10}}>
                <p style={{textAlign: 'left' ,fontSize:14}}>Select Year</p>
                  <DatePicker 
                      selected={year}
                      onChange={(date) => setYear(date)}
                      showYearPicker
                      dateFormat="yyyy"
                      customInput={
                        <input
                        type="text"
                        style={{height:30}}
                        // placeholder={'label'} 
                        />
                    }
                      // style={{height:200}}
                    />
                </div>
                <Buttons onClick={()=>getAllJurnaUmum()} style={{marginTop:20,backgroundColor:'blue',color:'white',marginRight:20}}>Cari</Buttons>
                
           </div>
      </div>
           <Gap height={15}/>
           <div  >
            <h3>Neraca Saldo</h3>
            <h3>Rudy Project</h3>
            {/* <h4>{moment(tanggal_awal).format('DD MMMM YYYY')} - {moment(tanggal_akhir).format('DD MMMM YYYY')}</h4> */}
            <h4>Dibuat pada {moment(new Date()).format('DD MMMM YYYY')}</h4>
           </div>
<Box sx={{ width: '100%', marginTop:"20px" }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <div align='left'>
     
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
            <TableBody
           
            >
               
                {data?.map((row,index)=>{
               
                  return(
                  <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox" 
                      tabIndex={-1}
                      key={row.id} 
                    >
                        
                      
                      <TableCell   align="left">{moment(row.tanggal_transaksi).format('YYYY-MM-DD')}</TableCell>
                      <TableCell   align="left">{row.noAkun} - {row.nama_akun}</TableCell>
                      <TableCell   align="left">{row.debit_amount}</TableCell>
                      <TableCell   align="left">{row.credit_amount}</TableCell>
      
                    </TableRow>)
                   
                })
              }
              <div  
                style={{position: 'relative',marginBottom:40}}
              >
                <div style={{
                    position: 'fixed',
                    right: 24,
                    bottom: 15,
                    // top:1,
                    width: '77.5%',
                    backgroundColor: '#f0f3f7',
                    color: 'black',
                    // textAlign: 'center'
                    height:50
                }}>
                <div style={{display:'flex',textAlign: 'center'}}>
                  <div style={{height:50,width: '100%' }}></div>
                  <div style={{height:50,width: '250%'}}></div>
                  <div style={{height:50,width: '100%',paddingTop:10 }}>Rp. {dbt}</div>
                  <div style={{height:50,width: '100%',paddingTop:10 }}>Rp. {krd}</div>
                </div>
                </div> 
              </div>
                  {/* <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox" 
                      tabIndex={-1}
                      style={{backgroundColor:'gray',
                      position:'fixed',
                      textAlign: 'center',
                      bottom:'0',
                      // width: '100%',
                      }}
                    >
                        
                      
                      <TableCell ></TableCell>
                      <TableCell > </TableCell>
                      <TableCell > 0</TableCell>
                      <TableCell >0</TableCell>
      
                    </TableRow> */}
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
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Box>
    
    <ModalUpdateEntryJournal
    open={modal}
    dataProject={dataProject}
    dataDaftarAkun={dataDaftarAkun}
    data={dataDetail}
    submit ={(data)=>submitUpdateJournalUmum(data)}
    onClickOpen = {()=>setModal(!modal)}
    />
     <ModalUploadDaftarAkun
    open={modalUplaod}
    mutate={()=>getAllJurnaUmum()}
    
    onClickOpen = {()=>setModalUplaod(!modalUplaod)}
    />
    </div>
      );
}
