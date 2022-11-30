import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";
import { Line } from "react-chartjs-2";
import Gap from "../../Component/gap";
import Button from "../../Component/button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import {
  getBiaya,
  getBiayaPembelian,
  getJmlCostumer,
  getJmlProduct,
  getJmlSupplier,
  getKeuntungan,
  getPembelianDashboard,
  getPendapatan,
  getPenjualan,
  getStockStore,
  getPenukaran,
} from "../../Config/Api-new";
import { useDispatch, useSelector } from "react-redux";

const data = {
  labels: [
    "15-Jan",
    "15-Feb",
    "15-Mar",
    "15-Apr",
    "15-May",
    "15-Jun",
    "15-Jul",
    "15-Aug",
    "15-Sep",
    "15-Oct",
    "15-Nov",
    "15-Dec",
  ],
  datasets: [
    {
      label: "Penjualan",
      fill: false,
      lineTension: 0,
      backgroundColor: "#2142C4",
      borderColor: "#2142C4",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#2142C4",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#2142C4",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [100, 80, 130, 125, 150, 200, 190, 210, 170, 190, 220, 200],
    },
    {
      label: "Pembelian",
      fill: false,
      lineTension: 0,
      backgroundColor: "#E1730B",
      borderColor: "#E1730B",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#E1730B",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#E1730B",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210],
    },
  ],
};

const options = {
  responsive: true,
  title: {
    display: true,
    text: "Statistik Penjualan Dan Pembelian",
    fontSize: 20,
  },
  legend: {
    display: true,
    position: "bottom",
  },
  scales: {
    yAxes: [
      {
        ticks: {
          callback: function (value, index, values) {
            return value + "K";
          },
        },
      },
    ],
  },
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard(props) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(null);
  const [datas, setDatas] = React.useState({});
  const [isForcePickerOpen, setIsOpen] = React.useState(false);
  const createdDate = new Date(value);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let biaya = await getBiaya();
    let biayaPembelian = await getBiayaPembelian();
    let jmlCostumer = await getJmlCostumer();
    let jmlProduct = await getJmlProduct();
    let jmlSupplier = await getJmlSupplier();
    let keuntungan = await getKeuntungan();
    let pembelian = await getPembelianDashboard();
    let pendapatan = await getPendapatan();
    let penjualan = await getPenjualan();
    let stockStore = await getStockStore();
    let penukaran = await getPenukaran();
    setDatas({
      penukaran: penukaran?.data,
      biaya: biaya?.data,
      biayaPembelian: biayaPembelian?.data,
      jmlCostumer: jmlCostumer?.data,
      jmlProduct: jmlProduct?.data,
      jmlSupplier: jmlSupplier?.data,
      keuntungan: keuntungan?.data,
      pembelian: pembelian?.data,
      pendapatan: pendapatan?.data,
      penjualan: penjualan?.data,
      stockStore: stockStore?.data,
    });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Dashboard</h1>
      </div>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              <div style={{ position: "relative", padding: "1em" }}>
                <h2 style={{ marginRight: "50%" }}>Rangkuman Penjualan</h2>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                  align="center"
                >
                  <div>
                    <div style={{ display: "flex" }}>
                      <Icon
                        icon="ps:sale-tag"
                        style={{
                          fontSize: "50px",
                          marginBottom: "25px",
                          color: "rgb(81 94 193)",
                        }}
                      />{" "}
                      <div align="left">
                        <Typography fontSize={15}>Total Penjualan</Typography>
                        <Typography fontSize={20}>
                          {datas?.penjualan
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Icon
                        icon="fa-solid:hand-holding-usd"
                        style={{
                          fontSize: "50px",
                          marginBottom: "25px",
                          color: "rgb(81 94 193)",
                        }}
                      />{" "}
                      <div align="left">
                        <Typography fontSize={15}>Biaya</Typography>
                        <Typography fontSize={20}>
                          {datas?.biaya
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <Icon
                        icon="healthicons:money-bag"
                        style={{
                          fontSize: "50px",
                          marginBottom: "25px",
                          color: "rgb(81 94 193)",
                        }}
                      />{" "}
                      <div align="left">
                        <Typography fontSize={15}>Pendapatan</Typography>
                        <Typography fontSize={20}>
                          Rp
                          {datas?.pendapatan
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Icon
                        icon="ant-design:line-chart-outlined"
                        style={{
                          fontSize: "50px",
                          marginBottom: "25px",
                          color: "rgb(81 94 193)",
                        }}
                      />{" "}
                      <div align="left">
                        <Typography fontSize={15}>Keuntungan</Typography>
                        <Typography fontSize={20}>
                          Rp
                          {datas?.keuntungan
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <div style={{ position: "relative", padding: "1em" }}>
                <h2 style={{ marginRight: "50%" }}>Rangkuman Pembelian</h2>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                  align="center"
                >
                  <div>
                    <div style={{ display: "flex" }}>
                      <Icon
                        icon="ant-design:shopping-filled"
                        style={{
                          fontSize: "50px",
                          marginBottom: "25px",
                          color: "rgb(81 94 193)",
                        }}
                      />{" "}
                      <div align="left">
                        <Typography fontSize={15}>Total Pembelian</Typography>
                        <Typography fontSize={20}>
                          {datas?.pembelian
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Icon
                        icon="fa-solid:hand-holding-usd"
                        style={{
                          fontSize: "50px",
                          marginBottom: "25px",
                          color: "rgb(81 94 193)",
                        }}
                      />{" "}
                      <div align="left">
                        <Typography fontSize={15}>Biaya</Typography>
                        <Typography fontSize={20}>
                          Rp
                          {datas?.biayaPembelian
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <Icon
                        icon="fluent:box-dismiss-24-regular"
                        style={{
                          fontSize: "50px",
                          marginBottom: "25px",
                          color: "rgb(81 94 193)",
                        }}
                      />{" "}
                      <div align="left">
                        <Typography fontSize={15}>Penukaran</Typography>
                        <Typography fontSize={20}>
                          {datas?.penukaran
                            ? datas?.penukaran
                                ?.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <div style={{ position: "relative", padding: "1em" }}>
                <h2 style={{ marginRight: "70%" }}>Detail Produk</h2>
                <div style={{ width: "80%", margin: "auto" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Icon
                      icon="fluent:box-dismiss-24-regular"
                      style={{
                        fontSize: "50px",
                        marginBottom: "15px",
                        color: "rgb(81 94 193)",
                      }}
                    />{" "}
                    <div align="left">
                      <Typography fontSize={20}>
                        {datas?.jmlProduct
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Icon
                      icon="fe:list-task"
                      style={{
                        fontSize: "50px",
                        marginBottom: "15px",
                        color: "rgb(81 94 193)",
                      }}
                    />{" "}
                    <div align="left">
                      <Typography fontSize={20}>
                        Rp
                        {datas?.pendapatan
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Icon
                      icon="fluent:box-edit-24-filled"
                      style={{
                        fontSize: "50px",
                        marginBottom: "15px",
                        color: "rgb(81 94 193)",
                      }}
                    />{" "}
                    <div align="left">
                      <Typography fontSize={20}>
                        {datas?.pembelian
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Icon
                      icon="fluent:box-edit-24-filled"
                      style={{
                        fontSize: "50px",
                        marginBottom: "15px",
                        color: "rgb(81 94 193)",
                      }}
                    />{" "}
                    <div align="left">
                      <Typography fontSize={20}>
                        {datas?.stockStore
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h2 style={{ marginRight: "70%" }}>Pengguna</h2>
              <div style={{ position: "relative", padding: "4.5em" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                  align="center"
                >
                  <div style={{ display: "flex", marginRight: "15px" }}>
                    <Icon
                      icon="el:group"
                      style={{
                        fontSize: "70px",
                        marginRight: "10px",
                        marginBottom: "25px",
                        color: "rgb(81 94 193)",
                      }}
                    />
                    <div align="left">
                      <Typography fontSize={15}>Costumers</Typography>
                      <Typography fontSize={50}>
                        {datas?.jmlCostumer
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Typography>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Icon
                      icon="fa-solid:people-carry"
                      style={{
                        fontSize: "70px",
                        marginRight: "10px",
                        marginBottom: "25px",
                        color: "rgb(81 94 193)",
                      }}
                    />
                    <Typography fontSize={15}>Supplier</Typography>{" "}
                    <div align="left">
                      <Typography fontSize={50}>
                        {datas?.jmlSupplier
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Gap height={25} />
    </div>
  );
}

export default Dashboard;
