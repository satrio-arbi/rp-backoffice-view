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
import {
  Button as Buttons
 } from "@mui/material";
import {FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search'
import FormPembelian from '../../Page/FormPembelian/index'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect,useRef } from 'react';
import Gap from '../../Component/gap/index';
import clsx from 'clsx';
import { getPembelian } from '../../Config/Redux/action';
import {alertSuccess,alertError} from '../../Component/alert/sweetalert'
import moment from 'moment';
import {updateJournalUmumContext} from '../../Config/helper/zustand'
// getDaftarAkun,addDaftarAkun,updateDaftarAkun,
// deleteDaftarAkun,importDaftarAkun
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import {ConvertToRp} from '../../Config/helper/constant'
import ReactToPrint from 'react-to-print';
import "react-datepicker/dist/react-datepicker.css";
import {neracaKeuangan,jurnalUupdate,getDaftarAkunSearch,getDaftarAkun,getProject,addDaftarAkun,updateDaftarAkun,deleteDaftarAkun} from '../../Config/Api-new'
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
      id: "Aktiva",
      label: "Aktiva",
      disablePadding: false
    },
    {
      id: "Pasiva",
      label: "Pasiva",
      disablePadding: false
    },
   
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
  checkChange: PropTypes.any,
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
  const [check, setCheck] = React.useState(false);
  const [tanggal_akhir, setTanggal_akhir] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
  const [tanggal_awal, setTanggal_awal] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
  const {setUpdateJournalUmumStore} = updateJournalUmumContext()
  const [data,setData] = React.useState([]);
  const [dataJournal,setDataJournal] = React.useState([]);
  const [modal, setModal] = React.useState();
  const [modalUplaod, setModalUplaod] = React.useState();
  const history = useHistory();
  const [dataDaftarAkun,setDataDaftarAkun] = React.useState([]);
  const [tot,setTot] = React.useState([]);
  const [dataDetail,setDataDetail] = React.useState({});
  const [year,setYear] = React.useState(new Date());
  const componentRef = React.useRef(null);
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
      alertSuccess('Success','')
      getAllJurnaUmum()
    }else{
      alertError('Error','Fail update data')
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
    setCheck(!check)
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
      alertSuccess('Success','')
      getAllJurnaUmum()
    }else{
      alertError('Error','Fail update data')
    }
  }
  const getAllJurnaUmum =async()=>{
    
    let res = await neracaKeuangan({year:moment(year).format('YYYY')})
    let res2 = await getDaftarAkun()
    // let res3 = await getProject()
    // setDataDaftarAkun(res2?.data)
    // setDataProject(res3?.data)
    let aktiva = ['Aktiva Lancar','Aktiva Tetap']
    let pasiva = ['Kewajiban','Ekuitas']
    let ds = {aktivaLancar:[],aktivaTetap:[],kewajiban:[],ekuitas:[]}
    
    let idx
    let akun =res2?.data
    let totAktivaLancar = 0
    let totAktivaTetap = 0
    let totKewajiban = 0
    let totEkuitas = 0
    res?.data?.map((d)=>{
       idx = akun.findIndex(v=>v?.noAkun===d?.noAkun)
      if(aktiva?.includes(akun[idx]?.tipe)){
        if(akun[idx]?.tipe===aktiva[0]){
            ds?.aktivaLancar.push(d)
            totAktivaLancar = totAktivaLancar + d?.saldo
        }else{
          ds?.aktivaTetap.push(d)
          totAktivaTetap = totAktivaTetap + d?.saldo
        }
      }else if(pasiva?.includes(akun[idx]?.tipe)){
        if(akun[idx]?.tipe===pasiva[0]){
          ds?.kewajiban.push(d)
          totKewajiban = totKewajiban + d?.saldo
      }else{
        ds?.ekuitas.push(d)
        totEkuitas = totEkuitas + d?.saldo
      }
      }
       
    })
    let tots = {aktivaLancar:totAktivaLancar,
      aktivaTetap:totAktivaTetap,kewajiban:totKewajiban,
      ekuitas:totEkuitas}
    
    setData(ds)
    setTot(tots)
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
  const reactToPrintContent = React.useCallback(() => {
    
    return componentRef.current;
  }, [componentRef.current]);
  const reactToPrintTrigger = React.useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return  (
    <div>
      <Buttons style={{marginTop:20,backgroundColor:'green',color:'white',marginRight:20}}>Download</Buttons>
      </div>)
  }, []);
  return (
    <div style={{
      marginTop:"5%"
    }}>
      <div style={{display:'flex'}}>
      <h1>Neraca Keuangan</h1>
            <div
             style={{
                 position:"absolute",
                 right:0,
                 display:"flex"
             }}
            >
             <ReactToPrint
            content={reactToPrintContent}
            documentTitle={`Neraca Keuangan ${moment(new Date()).format('DD MMMM YYYY')}`}
          
            trigger={reactToPrintTrigger}
          />
           <div style={{marginRight:10}}>
           <p style={{textAlign: 'left' ,fontSize:14}}>Year</p>
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
           <div ref={componentRef} >
           <div  >
            <h3 style={{textAlign:'center'}}>Neraca Keuangan</h3>
            <h3 style={{textAlign:'center'}}>Rudy Project</h3>
            {/* <h4>{moment(tanggal_awal).format('DD MMMM YYYY')} - {moment(tanggal_akhir).format('DD MMMM YYYY')}</h4> */}
            <h4 style={{textAlign:'center'}}>Dibuat pada {moment(new Date()).format('DD MMMM YYYY')}</h4>
           </div>
<Box sx={{ width: '100%', marginTop:"20px" }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <div align='left'>
     
      </div>
      
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <div style={{display: 'flex'}}>
          <div style={{width: '100%',textAlign:'left',padding:10 }}>
            <h4 >Aktiva</h4>
            <tr style={{fontWeight:'bold'}}>
                          <td> Aktiva Lancar </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>  </td>
                          <td> </td>
                        </tr>
                        {data?.aktivaLancar?.map((d,i)=>{return(
                        <tr key={i}>
                          <td style={{width:200,maxWidth:200}}> {d?.namaAkun} </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {ConvertToRp(d?.saldo)} </td>
                        </tr>
                        )})}
                         <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Aktiva Lancar </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {ConvertToRp(tot?.aktivaLancar)} </td>
                        </tr>
                        <div style={{marginTop:10}}/>
                        <tr style={{fontWeight:'bold'}}>
                          <td> Aktiva Tetap </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>  </td>
                          <td> </td>
                        </tr>
                        {data?.aktivaTetap?.map((d,i)=>{return(
                        <tr key={i}>
                          <td style={{width:200,maxWidth:200}}> {d?.namaAkun} </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {ConvertToRp(d?.saldo)} </td>
                        </tr>
                        )})}
                         <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Aktiva Tetap </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {ConvertToRp(tot?.aktivaTetap)} </td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Aktiva </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td>{ConvertToRp(tot?.aktivaLancar+tot?.aktivaTetap)} </td>
                        </tr>
          </div>
          <hr style={{borderRightWidth:2,borderColor:'black',borderStyle: 'solid'}}/>
          <div style={{width: '100%',textAlign:'left',padding:10}}>
            <h4 >Pasiva</h4>
            <tr style={{fontWeight:'bold'}}>
                          <td> Kewajiban </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>  </td>
                          <td> </td>
                        </tr>
                        {data?.kewajiban?.map((d,i)=>{return(
                        <tr key={i}>
                          <td style={{width:200,maxWidth:200}}> {d?.namaAkun} </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {ConvertToRp(d?.saldo)} </td>
                        </tr>
                        )})}
                         <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Kewajiban </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {ConvertToRp(tot?.kewajiban)} </td>
                        </tr>
                        <div style={{marginTop:10}}/>
                        <tr style={{fontWeight:'bold'}}>
                          <td> Ekuitas </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>  </td>
                          <td> </td>
                        </tr>
                        {data?.ekuitas?.map((d,i)=>{return(
                        <tr key={i}>
                          <td style={{width:200,maxWidth:200}}> {d?.namaAkun} </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {ConvertToRp(d?.saldo)} </td>
                        </tr>
                        )})}
                         <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Ekuitas </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {ConvertToRp(tot?.ekuitas)} </td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Pasiva </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {ConvertToRp(tot?.kewajiban+tot?.ekuitas)} </td>
                        </tr>
          </div>  
        </div>
        {/* <TableContainer>
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
              
                <TableRow
                      hover
                      
                      role="checkbox" 
                      tabIndex={-1}
                       
                    //  style={{backgroundColor:'#dfe2e8'}}
                    >
                        
                      
                      
                      <TableCell style={{textAlign:'left' }}  align="left">  
                         <tr style={{fontWeight:'bold'}}>
                          <td> Aktiva Lancar </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>  </td>
                          <td> </td>
                        </tr>
                        {data?.aktivaLancar?.map((d,i)=>{return(
                        <tr key={i}>
                          <td style={{width:200,maxWidth:200}}> {d?.namaAkun} </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {d?.saldo} </td>
                        </tr>
                        )})}
                         <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Aktiva Lancar </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {tot?.aktivaLancar} </td>
                        </tr>
                        <div style={{marginTop:10}}/>
                        <tr style={{fontWeight:'bold'}}>
                          <td> Aktiva Tetap </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>  </td>
                          <td> </td>
                        </tr>
                        {data?.aktivaTetap?.map((d,i)=>{return(
                        <tr key={i}>
                          <td style={{width:200,maxWidth:200}}> {d?.namaAkun} </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {d?.saldo} </td>
                        </tr>
                        )})}
                         <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Aktiva Tetap </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {tot?.aktivaTetap} </td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Aktiva </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {tot?.aktivaLancar+tot?.aktivaTetap} </td>
                        </tr>
                      </TableCell>
                      <TableCell style={{textAlign:'left' }}  align="left">  
                      <tr style={{fontWeight:'bold'}}>
                          <td> Kewajiban </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>  </td>
                          <td> </td>
                        </tr>
                        {data?.kewajiban?.map((d,i)=>{return(
                        <tr key={i}>
                          <td style={{width:200,maxWidth:200}}> {d?.namaAkun} </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {d?.saldo} </td>
                        </tr>
                        )})}
                         <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Kewajiban </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {tot?.kewajiban} </td>
                        </tr>
                        <div style={{marginTop:10}}/>
                        <tr style={{fontWeight:'bold'}}>
                          <td> Ekuitas </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>  </td>
                          <td> </td>
                        </tr>
                        {data?.ekuitas?.map((d,i)=>{return(
                        <tr key={i}>
                          <td style={{width:200,maxWidth:200}}> {d?.namaAkun} </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {d?.saldo} </td>
                        </tr>
                        )})}
                         <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Ekuitas </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {tot?.ekuitas} </td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                          <td> Jumlah Pasiva </td>
                          <td style={{paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}> : </td>
                          <td> {tot?.kewajiban+tot?.ekuitas} </td>
                        </tr>
                      </TableCell>
                    </TableRow>
            
               
              
            </TableBody>
          </Table>
        </TableContainer> */}
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
    </div>
     
     <ModalUploadDaftarAkun
    open={modalUplaod}
    mutate={()=>getAllJurnaUmum()}
    
    onClickOpen = {()=>setModalUplaod(!modalUplaod)}
    />
    </div>
      );
}
