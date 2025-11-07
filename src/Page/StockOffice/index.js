import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SummarizeIcon from "@mui/icons-material/Summarize";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import ModalAddBank from "../../Component/modal/Modal-AddBank-Component";
import ModalStockOffice from "../../Component/modal/Modal-DetailStockOffice-Component";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { visuallyHidden } from "@mui/utils";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Button from "../../Component/button/index";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Gap from "../../Component/gap/index";
import { alertSuccess, alertError } from "../../Component/alert/sweetalert";

import {
  getStockOffice,
  searchStockOffice,
  getOffice,
  getStockOfficeExcel,
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
    id: "id",
    label: "id",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "lokasi",
    label: "Lokasi Office",
    disablePadding: true,
    numeric: false,
  },

  {
    id: "jumlah",
    label: "Jumlah stock",
    disablePadding: true,
    numeric: false,
  },
  {
    id: "detail",
    label: "Detail",
    disablePadding: true,
    numeric: false,
  },
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

export default function StockOffice() {
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
  const [searchStock, setSearchStock] = React.useState();
  const [idStore, setIdStore] = React.useState();
  const [data, setData] = React.useState([]);
  const [store, setStore] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [modal, setModal] = React.useState();
  const [modalUplaod, setModalUplaod] = React.useState();
  useEffect(() => {
    getDataPerStore();
  }, [idStore]);

  const donwloadExcel = async () => {
    await getStockOfficeExcel();
    alertSuccess("Success", "");
  };

  useEffect(() => {
    getDataStore();
  }, []);
  const getDataStore = async () => {
    let res = await getOffice();
    setStore(
      res?.data.filter((el) => {
        return el.id != 8;
      })
    );
  };
  const getDataPerStore = async () => {
    let res = await getStockOffice();

    setData(res?.data);
  };
  const searchedStock = async (e, type) => {
    if ((type === "enter" && e.keyCode === 13) || type === "klik") {
      let res = await searchStockOffice(searchStock);
      setData(res?.data);
    }
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
    setRows(data);
  }, [data]);
  const handleOpenDetail = (dataStore) => {
    settoBeSelected(dataStore);
    setOpenDetail(true);
  };

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

  const handleChangeSearchStock = (event) => {
    setSearchStock(event.target.value);
  };

  return (
    <div
      style={{
        marginTop: "5%",
      }}
    >
      <div style={{ display: "flex" }}>
        <h1>Stock Office</h1>
        <div
          style={{
            position: "absolute",
            right: 0,
            display: "flex",
          }}
        >
          <Button
            style={{
              background: "#0384fc",
              color: "white",
              textTransform: "capitalize",
              marginRight: "15px",
              width: "100%",
              padding: "1em",
              borderRadius: "14px",
            }}
            onClick={() => donwloadExcel()}
            label="Download Excel"
            startIcon={<SummarizeIcon />}
          />
        </div>
      </div>
      <Gap height={15} />
      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <div align="left">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Cari
              </InputLabel>
              <OutlinedInput
                value={searchStock}
                onChange={handleChangeSearchStock}
                onKeyUp={(e) => {
                  searchedStock(e, "enter");
                }}
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <SearchIcon onClick={() => searchedStock("", "klik")} />
                    </IconButton>
                  </InputAdornment>
                }
                label="Cari"
              />
            </FormControl>
          </div>
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
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{row.id}</TableCell>

                        <TableCell align="left">{row.lokasi_office}</TableCell>

                        <TableCell align="left">
                          {row.total_per_office}
                        </TableCell>
                        <TableCell align="right">
                          <div style={{}}>
                            <IconButton
                              onClick={() => {
                                handleOpenDetail(row);
                              }}
                            >
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
      <ModalStockOffice
        open={openDetail}
        data={toBeSelected}
        onClickOpen={() => setOpenDetail(!openDetail)}
      />
    </div>
  );
}
