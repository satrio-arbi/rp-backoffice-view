import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import SummarizeIcon from "@mui/icons-material/Summarize";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ModalAddPenjualanOffice from "../../Component/modal/Modal-AddPenjualanOffice-Component";
import ModalUpdatePenjualanOffice from "../../Component/modal/Modal-UpdatePenjualanOffice-Component";
import ModalDownloadReport from "../../Component/modal/Modal-DownloadReport-Component";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Button from "../../Component/button/index";
import Input from "../../Component/input/index";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import FormPembelian from "../../Page/FormPembelian/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Gap from "../../Component/gap/index";
import clsx from "clsx";
import { getPembelian } from "../../Config/Redux/action";
import { alertSuccess, alertError } from "../../Component/alert/sweetalert";

import {
  getBank,
  getStore,
  geReportLaporanPembelian,
  getUkuran,
  getPelanggan,
  getKategori,
  getTipe,
  getPenjualanStore,
  getPenjualanStorePerStore,
  getPenjualanOfficeSearch,
  getPenjualanOfficeAdd,
  getPenjualanOfficeUpdate,
  getPenjualanOfficeDelete,
} from "../../Config/Api-new";
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
  return order === "desc"
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
  console.log({ stabilizedThis });
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
    id: "id_transaksi",
    label: "Id Transaksi",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "lokasi_store",
    label: "Lokasi store",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "nama_pelanggan",
    label: "Nama pelanggan",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "no_hp_pelanggan",
    label: "No.hp pelanggan",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "nama_karyawan",
    label: "Nama Karyawan",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "disc",
    label: "Diskon",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "metode_bayar",
    label: "Metode Bayar",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "bank",
    label: "Bank",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "no_rek",
    label: "No. Rekening",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "ekspedisi",
    label: "Ekspedisi",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "ongkir",
    label: "Ongkos kirim",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "total",
    label: "Total",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "kembalian",
    label: "Kembalian",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "sum",
    label: "Jumlah kuantitas",
    disablePadding: true,
    numeric: false,
  },
  // {
  //   id: "aksi",
  //   label: "Aksi",
  // }
];

function EnhancedTableHead(props) {
  const {
    checkChange,
    checkAllList,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    data,
  } = props;
  const [check, setCheck] = React.useState(false);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  React.useEffect(() => {
    setCheck(false);
  }, [checkChange]);
  const checkAll = () => {
    checkAllList(!check);
    setCheck(!check);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell
          key={"check"}
          // align="center"
          // padding={'normal'}
          // sortDirection={orderBy === headCell.id ? order : false}
        >
          <input type="checkbox" checked={check} onClick={() => checkAll()} />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              style={{ fontWeight: "bold", padding: "1em" }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function Pembelian() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [toBeSelected, settoBeSelected] = React.useState({});
  const dispatch = useDispatch();
  const dataStore = useSelector((state) => state.reducer.getPembelian.data);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [rows, setRows] = React.useState(dataStore);
  const [searched, setSearched] = React.useState();
  const [cari, setCari] = React.useState();
  const [check, setCheck] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [modal, setModal] = React.useState();
  const [modalUplaod, setModalUplaod] = React.useState();
  const [pelanggan, setPelanggan] = React.useState([]);
  const [kategori, setKategori] = React.useState([]);
  const [tipe, setTipe] = React.useState([]);
  const [ukuran, setUkuran] = React.useState([]);
  const [store, setStore] = React.useState([]);
  const [bank, setBank] = React.useState([]);
  const [storeFilter, setStoreFilter] = React.useState([]);
  const [id_store, setId_store] = React.useState(0);
  const [modalReport, setModalReport] = React.useState();
  useEffect(() => {
    getAllPembelian();
  }, []);
  const submitPenjualan = async (v) => {
    setModal(false);
    // const formData = new FormData();
    // formData.append('acc_number',acc_number)
    // formData.append('owner_name ',owner_name)
    // formData.append('bank_name',bank_name)
    // formData.append('image ',image)
    let res = await getPenjualanOfficeAdd(v);
    if (res?.status) {
      alertSuccess("Success", "");
      getAllPembelian();
    } else {
      alertError("Error", "Fail add data");
    }
  };
  const deleteData = async () => {
    let array = [...data];
    let idx = array?.findIndex((a) => a.check == true);
    if (idx > -1) {
      for (let i = 0; i < array?.length; i++) {
        if (array[i]?.check === true) {
          await getPenjualanOfficeDelete(parseInt(array[i]?.id));
        }
      }
      getAllPembelian();
      setCheck(!check);
      alertSuccess("Success", "Success delete data");
    } else {
      alertError("Error", "Fail, no data chose for delete");
    }
  };
  const submitUpdatePenjualan = async (v) => {
    setOpenDetail(false);
    settoBeSelected({});
    // const formData = new FormData();
    // formData.append('acc_number',acc_number)
    // formData.append('owner_name ',owner_name)
    // formData.append('bank_name',bank_name)
    // formData.append('image ',image)
    let arr = {
      detail_penjualan: v?.detail_penjualan,
      id_office: v?.id_office,
      lokasi_office: v?.lokasi_office,
      nama_pelanggan: v?.nama_pelanggan,
      no_hp_pelanggan: v?.no_hp_pelanggan,
      tanggal_transaksi: v?.tanggal_transaksi,
      rowstatus: "1",
      id: toBeSelected?.id,
    };
    // formData.append('id',toBeSelected?.id)
    let res = await getPenjualanOfficeUpdate(arr);
    if (res?.status) {
      alertSuccess("Success", "");
      getAllPembelian();
    } else {
      alertError("Error", "Fail update data");
    }
  };
  const getAllPembelian = async () => {
    let res = await getPenjualanStore();
    let res1 = await getPelanggan();
    let res2 = await getKategori();
    let res3 = await getTipe();
    let res4 = await getUkuran();
    let res5 = await getStore();
    let res6 = await getBank();
    let a = [{ id: 0, store_name: "All" }];
    setPelanggan(res1?.data);
    setKategori(res2?.data);
    setTipe(res3?.data);
    setData(res?.data);
    setUkuran(res4?.data);
    setStore(
      res5?.data.filter((el) => {
        return el.id != 8;
      })
    );
    res5?.data?.map((d) => {
      a.push(d);
    });
    setStoreFilter(a);
    setBank(res6?.data);
  };
  const checkSingle = (d, i) => {
    let array = [...data];
    let idx = array?.findIndex((a) => a.id == d?.id);
    if (!d?.check) {
      array[idx]["check"] = true;
    } else {
      array[idx]["check"] = false;
    }

    setData(array);
  };
  const checkSemua = (v) => {
    let array = [...data];
    array?.map((d, i) => {
      array[i]["check"] = v;
    });

    setData(array);
  };
  useEffect(() => {
    if (id_store !== 0) {
      searchingByIdStore();
    } else {
      getAllPembelian();
    }
  }, [id_store]);
  const searchingByIdStore = async () => {
    let res = await getPenjualanStorePerStore(id_store);
    setData(res?.data);
  };
  const searching = async (e, type) => {
    if ((type === "enter" && e.keyCode === 13) || type === "klik") {
      let res = await getPenjualanStorePerStore(id_store);
      setData(res?.data);
    }
  };
  useEffect(() => {
    setRows(dataStore);
  }, [dataStore]);
  const handleOpenDetail = (dataStore) => {
    settoBeSelected(dataStore);
    setOpenDetail(true);
  };
  console.log(rows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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
        selected.slice(selectedIndex + 1)
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
    return "data:image/png;base64," + v;
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
  const donwloadReport = async (start, end) => {
    setModal(false);
    let res = await geReportLaporanPembelian(start, end);
    if (res?.status) {
      // ,res?.data
      alertSuccess("Success", "");
      // getAllKategori()
    } else {
      alertError("Error", "Fail download data");
    }
  };
  return (
    <div
      style={{
        marginTop: "5%",
      }}
    >
      <div style={{ display: "flex" }}>
        <h1>Penjualan Store</h1>
        <div
          style={{
            position: "absolute",
            right: 0,
            display: "flex",
          }}
        >
          {/* <Button
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
           /> */}
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
           />*/}
          {/* <Button
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
           /> */}
        </div>
      </div>
      <Gap height={15} />
      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <div align="left">
            {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
        </FormControl> */}
            <FormControl
              sx={{ marginTop: 2, width: "25ch" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">Store</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id_store}
                label="Toko Tujuan"
                onChange={(v) => {
                  setId_store(v?.target?.value);
                }}
              >
                {storeFilter?.map((d, i) => {
                  return <MenuItem value={d?.id}>{d?.store_name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>

          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                checkAllList={(v) => checkSemua(v)}
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
                            checked={row?.check ? row?.check : false}
                            onChange={() => {}}
                            onClick={(e) => checkSingle(row, index)}
                          />
                        </TableCell>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{row.id_transaksi}</TableCell>
                        <TableCell align="left">{row.lokasi_store}</TableCell>
                        <TableCell align="left">{row.nama_pelanggan}</TableCell>
                        <TableCell align="left">
                          {row.no_hp_pelanggan}
                        </TableCell>

                        <TableCell align="left">{row.nama_karyawan}</TableCell>
                        <TableCell align="left">{row.diskon}</TableCell>
                        <TableCell align="left">{row.metode_bayar}</TableCell>
                        <TableCell align="left">{row.bank_name}</TableCell>
                        <TableCell align="left">{row.no_rek}</TableCell>
                        <TableCell align="left">{row.ekspedisi}</TableCell>
                        <TableCell align="left">{row.ongkir}</TableCell>
                        <TableCell align="left">{row.total}</TableCell>
                        <TableCell align="left">{row.kembalian}</TableCell>
                        <TableCell align="left">{row.sum_qty}</TableCell>
                        {/* <TableCell align="right">
                      <div style={{
                        
                      }}>
                      <IconButton onClick={()=>{
                        handleOpenDetail(row)
                      }}>
                          <RemoveRedEyeOutlinedIcon />
                        </IconButton>
                      </div>
                        </TableCell> */}
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
      <ModalUpdatePenjualanOffice
        open={openDetail}
        data={toBeSelected}
        bank={bank}
        pelanggan={pelanggan}
        store={store}
        tipe={tipe}
        kategori={kategori}
        ukuran={ukuran}
        submit={(v) => submitUpdatePenjualan(v)}
        onClickOpen={() => setOpenDetail(!openDetail)}
      />
      <ModalAddPenjualanOffice
        open={modal}
        bank={bank}
        pelanggan={pelanggan}
        store={store}
        tipe={tipe}
        kategori={kategori}
        ukuran={ukuran}
        submit={(v) => submitPenjualan(v)}
        onClickOpen={() => setModal(!modal)}
      />
      <ModalDownloadReport
        open={modalReport}
        submit={(start, end) => donwloadReport(start, end)}
        title={"Penerimaan Store"}
        onClickOpen={() => setModalReport(!modalReport)}
      />

      {/* <ModalUploadTipe
    open={modalUplaod}
    mutate={()=>getAllPembelian()}
    submit ={(name)=>submitPenjualan(name)}
    onClickOpen = {()=>setModalUplaod(!modalUplaod)}
    /> */}
    </div>
  );
}
