
import {
   Modal,Box
  } from "@mui/material";
  import PropTypes from 'prop-types';
  import Paper from '@mui/material/Paper';
  import { visuallyHidden } from '@mui/utils';
  import React,{useState,useEffect} from 'react';
import  Input  from "../../Component/input";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import moment from "moment";
import Button from '../../Component/button'
import {getStockPerStoreStockAkhir,getStockPerStoreKeluar,getStockPerStoreMasuk} from '../../Config/Api-new'
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
    id: "artikel",
    label: "Artikel",
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
    id: "tip",
    label: "Type",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "nama_barang",
    label: "Nama barang",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "jumlah",
    label: "Jumlah",
    disablePadding: true,
    numeric: false,
  }
];
const headCells1 = [
 
  {
    id: "No",
    label: "No",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "tgl",
    label: "Tanggal masuk",
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
    id: "kategori",
    label: "Kategori",
    disablePadding: true,
    numeric: false,
  }, 
  {
    id: "tip",
    label: "Type",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "nama_barang",
    label: "Nama barang",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "jumlah",
    label: "Jumlah",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "ket",
    label: "Keterangan",
    disablePadding: true,
    numeric: false,
  }
];
const headCells2 = [
 
  {
    id: "No",
    label: "No",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "tgl",
    label: "Tanggal keluar",
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
    id: "kategori",
    label: "Kategori",
    disablePadding: true,
    numeric: false,
  }, 
  {
    id: "tip",
    label: "Type",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "nama_barang",
    label: "Nama barang",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "jumlah",
    label: "Jumlah",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "ket",
    label: "Keterangan",
    disablePadding: true,
    numeric: false,
  }
];

function EnhancedTableHead(props) {
  const { checkAllList,tipe,onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,data } =
    props;
  const [check,setCheck] = React.useState(false)
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const [head,setHead] = useState([])
  useEffect(()=>{
    let a = []
    if(tipe===0){
      a =headCells
    }else if(tipe===1){
      a =headCells1
    }else if(tipe===2){
      a =headCells2
    }
    setHead(a)
  },[tipe])
  const checkAll =()=>{
    checkAllList(!check)
    setCheck(!check)
  }
  return (
    <TableHead>
      <TableRow>
       
        {head?.map((headCell) => (
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
  tipe: PropTypes.any,
  checkAllList: PropTypes.func,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const ModalStorePerStock =(props)=>{
  const [dense, setDense] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0); 
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [toBeSelected, settoBeSelected] = React.useState({});
  const dataStore = props?.data
  const [rows, setRows] = React.useState(dataStore)
  const [tipe,setTipe] = React.useState(0)
  const [str,setStr] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [end,setEnd] = useState(moment(new Date()).format('YYYY-MM-DD'))
  
    useEffect(()=>{
      setTipe(0)
      getDataDetail()
    },[props?.open])
    useEffect(()=>{
      getDataDetail()
    },[tipe,str,end])
    const getDataDetail= async()=>{
        let res ={data:[]}
        if(dataStore?.id_store){
          if(tipe===0){
            res= await getStockPerStoreStockAkhir(dataStore?.id_store)
          }else if(tipe===1){
            res= await getStockPerStoreMasuk(dataStore?.id_store,str,end)
          }else if(tipe===2){
            res= await getStockPerStoreKeluar(dataStore?.id_store,str,end)
          }
          
        }
        setData(res?.data)
    }
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
    useEffect(()=>{
   
      setRows(dataStore)
    },[dataStore])
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
    return (
        <>
        
        <Modal
            open={props?.open}
            onClose={props?.onClickOpen}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
            <Box sx={{      position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: "hidden",
        overflowY: "scroll",
        width: '90%',
        height:'90%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4, }}>
                <h2 id="parent-modal-title">Detail</h2>
      {tipe!==0?
      <div style={{ marginTop:50}}>
        <h3 >Periode</h3>
        <div 
        align='left'
        style={{
          // position:"absolute",
          // right:0,
          marginBottom:'10px',
          display:"flex"
      }}
        >
                <div style={{marginRight:10}}>
                  <Input 
                      value={str}
                      disable={false}
                      type='date'
                      label={'Date from'}
                      onChange={(v)=>setStr(v?.target?.value)}
                      style={{width:'100%',marginTop:10}}
                      />
                      </div>
                      <div>
                      <Input 
                      value={end}
                      disable={false}
                      type='date'
                      label={'Date To'}
                      onChange={(v)=>setEnd(v?.target?.value)}
                      style={{width:'100%',marginTop:10}}
                      />
                      </div>
        </div>
      </div>
      :null}
                <div 
      align='left'
       style={{
        // position:"absolute",
        // right:0,
        marginBottom:'10px',
        display:"flex"
    }}
      >
      {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Cari</InputLabel>
          <OutlinedInput
            value={search}
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
        </FormControl> */}
        <Button
                style={{
                    background: tipe===0?"#faa59d":"#f51905",
                    color: 'white',
                    textTransform: 'capitalize',
                    marginRight:"15px",
                    width:"100%",
                    padding:"1em",
                    borderRadius:"14px"
                }}
                onClick={()=>setTipe(0)}
                label="Stock Akhir"
                // startIcon={<DeleteIcon/>}
           />
           <Button
                style={{
                    background: tipe===1?"#bad7ff":"#1a09d9",
                    color: 'white',
                    textTransform: 'capitalize',
                    marginRight:"15px",
                    width:"100%",
                    padding:"1em",
                    borderRadius:"14px"
                }}
                onClick={()=>setTipe(1)}
                label="Barang masuk"
                // startIcon={<DeleteIcon/>}
           />
           <Button
                style={{
                    background: tipe===2?"#92f0a8":"#058523",
                    color: 'white',
                    textTransform: 'capitalize',
                    marginRight:"15px",
                    width:"100%",
                    padding:"1em",
                    borderRadius:"14px"
                }}
                onClick={()=>setTipe(2)}
                label="Barang keluar"
                // startIcon={<DeleteIcon/>}
           />
      </div>
                <Paper sx={{ width: '100%', mb: 2 }}>
      
      
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
             <EnhancedTableHead
              // checkAllList={(v)=>checkSemua(v)}
              tipe={tipe}
              numSelected={selected.length}
              data={data}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
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
                      
                      <TableCell align="left">{index+1}</TableCell>
                      {tipe!==0?<TableCell align="left">{row.tanggal_masuk?row.tanggal_masuk:row.tanggal_keluar}</TableCell>:null}
                      <TableCell align="left">{row.artikel}</TableCell>
                      <TableCell align="left">{row.nama_kategori}</TableCell>
                      <TableCell align="left">{row.type_name}</TableCell>
                      <TableCell align="left">{row.nama_barang}</TableCell>
                      <TableCell align="left">{row.kuantitas}</TableCell>
                      {tipe!==0?<TableCell align="left">{row.keterangan}</TableCell>:null}
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
            </Modal>
           
        </>
    )

}
export default ModalStorePerStock