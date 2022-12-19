import { Modal, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Input from "../../Component/input";
import { alertError } from "../../Component/alert/sweetalert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getProdukBySKU, officeGetProdukByArtikel } from "../../Config/Api-new";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
const ModalAddPenjualanOffice = (props) => {
  // const [detail_pengiriman,setDetail_pengiriman] = useState([])
  const [tanggal_transaksi, setTanggal_transaksi] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [id_office, setId_office] = useState("");
  const [sku, setSku] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [bank, setBank] = useState("");
  const [kuantitas, setKuantitas] = useState("");
  const [id_pelanggan, setId_pelanggan] = useState("");
  const [article, setArticle] = useState("");
  const [detail, setDetail] = useState("");
  const [listDetail, setListDetail] = useState([]);
  const [harga_satuan_barang, setHarga_satuan_barang] = useState("");
  const [ongkos_kirim, setOngkos_kirim] = useState("");
  const [pajak, setPajak] = useState("");
  const [check, setCheck] = useState("");
  const [karyawan, setKaryawan] = useState("");
  const [diskon, setDiskon] = useState(0);
  const [diskon_remark, setDiskon_remark] = useState("");
  const [ekspedisi, setEkspedisi] = useState("");
  useEffect(() => {
    setHarga_satuan_barang("");
    setOngkos_kirim("");
    setPajak("");
    setTanggal_transaksi(moment(new Date()).format("YYYY-MM-DD"));
    setId_office("");
    setSku("");
    setEkspedisi("");
    setDiskon(0);
    setDiskon_remark("");
    setUkuran("");
    setListDetail([]);
    setDetail("");
    setArticle("");
    setId_pelanggan("");
    setKuantitas("");
    setBank("");
    setKaryawan("");
  }, [props?.open]);
  const getSKU = async (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      let res = await getProdukBySKU(sku);
      setDetail(res?.data);
      setArticle(res?.data?.artikel_product);
      setHarga_satuan_barang(res?.data?.harga_jual);
      setUkuran(res?.data?.ukuran);
      setKuantitas(res?.data?.kuantitas);
    }
  };
  const getArticle = async (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      let res = await officeGetProdukByArtikel(article);
      if (res.status) {
        setDetail(res?.data);
        setSku(res?.data?.sku_code);
        setHarga_satuan_barang(res?.data?.harga_jual);
        setUkuran(res?.data?.ukuran);
        setKuantitas(res?.data?.kuantitas);
      } else {
        alert("Stock tidak ada!");
        clear();
      }
    }
  };
  const clear = () => {
    setSku("");
    setDetail({});
    setUkuran("");
    setHarga_satuan_barang("");
    setKuantitas("");
  };
  const convertPelanggan = (v) => {
    let idx = props?.pelanggan?.findIndex((a) => a.id == v);

    return {
      hp: props?.pelanggan ? props?.pelanggan[idx]?.no_hp : "",
      nama: props?.pelanggan ? props?.pelanggan[idx]?.nama_pelanggan : "",
    };
  };

  const convertKaryawan = (v) => {
    let idx = props?.karyawan?.findIndex((a) => a.id == v);

    return props?.karyawan[idx];
  };
  const convertBank = (v) => {
    let idx = props?.bank?.findIndex((a) => a.id == v);

    return props?.bank[idx];
  };
  const convertOffice = (v) => {
    let idx = props?.office?.findIndex((a) => a.id == v);

    return props?.office ? props?.office[idx]?.office_name : "";
  };
  const convertImage = (v) => {
    return "data:image/png;base64," + v;
  };
  const addDetailProduk = () => {
    let arr = [...listDetail];

    arr.push({
      //  id:detail?.id,
      sku_code: sku,
      artikel: article,
      type_name: detail?.type_name,
      tipe: detail?.type,
      nama_kategori: detail?.nama_kategori,
      kategori: detail?.kategori,
      nama_barang: detail?.nama_barang,
      kuantitas,
      harga_satuan_barang,
    });
    setArticle("");
    setSku("");
    setDetail({});
    setUkuran("");
    setHarga_satuan_barang("");
    setKuantitas("");
    setListDetail(arr);
  };
  const deleteData = (idx) => {
    let datas = [...listDetail];
    // let idx = listDetail?.findIndex(a=>a.id==id)
    datas.splice(idx, 1);
    setListDetail(datas);
  };
  useEffect(() => {
    checkDiskon();
  }, [diskon]);
  const checkDiskon = async () => {
    if (diskon < 0) {
      await alert("Diskon tidak boleh kurang dari 0");
      setDiskon(0);
    }
  };
  return (
    <>
      <Modal
        open={props?.open}
        onClose={props?.onClickOpen}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            overflow: "hidden",
            overflowY: "scroll",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2 style={{ width: "100%" }} id="parent-modal-title">
              Add Penjualan office
            </h2>
            <CloseIcon onClick={() => props?.onClickOpen()} />
          </div>
          <div>
            {/* <p>Tanggal Pengiriman</p> */}
            <Input
              value={tanggal_transaksi}
              disable={false}
              type="date"
              label={"Tanggal Penjualan"}
              onChange={(v) => setTanggal_transaksi(v?.target?.value)}
              style={{ width: "100%" }}
            />
            <FormControl
              sx={{ marginTop: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">Office</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id_office}
                label="Toko Asal"
                onChange={(v) => {
                  setId_office(v?.target?.value);
                }}
              >
                {props?.office?.map((d, i) => {
                  return (
                    <MenuItem value={d?.id}>
                      {d?.office_name}-{d?.alamat}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl
              sx={{ marginTop: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">pelanggan</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id_pelanggan}
                label="Toko Tujuan"
                onChange={(v) => {
                  setId_pelanggan(v?.target?.value);
                }}
              >
                {props?.pelanggan?.map((d, i) => {
                  return (
                    <MenuItem value={d?.id}>
                      {d?.no_hp}-{d?.nama_pelanggan}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl
              sx={{ marginTop: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">karyawan</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={karyawan}
                label="Toko Tujuan"
                onChange={(v) => {
                  setKaryawan(v?.target?.value);
                }}
              >
                {props?.karyawan?.map((d, i) => {
                  return <MenuItem value={d?.id}>{d?.nama_karyawan}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <Input
              value={ekspedisi}
              disable={false}
              label={"Ekspedisi"}
              onChange={(v) => setEkspedisi(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={ongkos_kirim}
              // type='date'
              label={"Ongkos kirim"}
              onChange={(v) => setOngkos_kirim(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={pajak}
              label={"pajak"}
              // type='date'
              // label={'Tipe'}
              onChange={(v) => setPajak(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={diskon}
              disable={false}
              type="number"
              label={"Diskon"}
              onChange={(v) => setDiskon(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={diskon_remark}
              disable={false}
              label={"Diskon Remark"}
              onChange={(v) => setDiskon_remark(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                //   disabled={props?.read}
                style={{ marginTop: 12 }}
                onChange={() => {}}
                type="checkbox"
                checked={check}
                onClick={() => setCheck(!check)}
              />
              <p style={{ textColor: "gray", fontSize: "13px", marginLeft: 5 }}>
                checklist bila metode pembayaran non tunai ?
              </p>
            </div>
            {check ? (
              <FormControl
                sx={{ marginTop: 2, width: "100%" }}
                variant="outlined"
              >
                <InputLabel id="demo-simple-select-label">
                  Select Bank
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bank}
                  label="Select Toko Tujuan"
                  onChange={(v) => {
                    setBank(v?.target?.value);
                  }}
                >
                  {props?.bank?.map((d, i) => {
                    return (
                      <MenuItem value={d?.id}>
                        {d?.acc_number}-{d?.bank_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            ) : null}
            <p>Produk</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ width: "100%", marginRight: 10 }}>
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kode SKU</p>
                <Input
                  value={sku}
                  disable={false}
                  // type='date'
                  onKeyPress={(e) => getSKU(e)}
                  // label={'Kode SKU'}
                  onChange={(v) => setSku(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Artikel</p>
                <Input
                  value={article}
                  disable={false}
                  // type='date'
                  onKeyPress={(e) => getArticle(e)}
                  // label={'Artikel'}
                  onChange={(v) => setArticle(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Tipe</p>
                <Input
                  value={detail?.type_name ? detail?.type_name : ""}
                  readOnly={true}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kategori</p>
                <Input
                  value={detail?.nama_kategori ? detail?.nama_kategori : ""}
                  readOnly={true}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>
                  Nama produk
                </p>
                <Input
                  value={detail?.nama_barang ? detail?.nama_barang : ""}
                  readOnly={true}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ width: "100%", marginRight: 10 }}>
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kuantitas</p>
                <Input
                  value={kuantitas}
                  onChange={(v) => setKuantitas(v?.target?.value)}
                  style={{ width: "100%" }}
                />

                <p style={{ textColor: "gray", fontSize: "13px" }}>
                  Harga satuan barang
                </p>
                <Input
                  value={harga_satuan_barang}
                  // type='date'
                  // label={'Tipe'}
                  onChange={(v) => setHarga_satuan_barang(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                {/* <p style={{textColor:'gray',fontSize:'13px'}}>Pajak</p> */}

                {/* <p style={{textColor:'gray',fontSize:'13px'}}>Ongkos kirim</p> */}

                <div style={{ marginTop: 10 }}>
                  <p style={{ textColor: "gray", fontSize: "13px" }}>
                    Foto Barang
                  </p>

                  {detail?.image ? (
                    <img
                      src={convertImage(detail?.image)}
                      style={{ width: 200, height: 200 }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div
              style={{ marginTop: 10, justifyContent: "end", display: "flex" }}
            >
              <Button onClick={() => addDetailProduk()} variant="contained">
                Save Produk detail
              </Button>
            </div>
            <div style={{ overflowX: "auto", marginTop: 20 }}>
              <tabel
                style={{
                  // borderCollapse: 'collapse',
                  // borderSpacing: 0,
                  width: "100%",
                  // overflow:'hidden',
                  // border: '1px solid #ddd'
                }}
              >
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    No
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Artikel
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Tipe
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Kategori
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Nama barang
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Kuantitas
                  </th>
                  {/* <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                               }}>Ukuran</th>
                               <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                               }}>Metode pembayaran</th> */}
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Harga satuan
                  </th>
                  {/* <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                               }}>Pajak</th>
                                <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                               }}>Ongkos kirim</th>
                                <th style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    border: '1px solid #ddd'
                               }}>Total</th> */}
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Delete
                  </th>
                </tr>
                <tbody>
                  {listDetail?.map((d, i) => {
                    return (
                      <tr key={i}>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {i + 1}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {d?.artikel}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {d?.type_name}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {d?.nama_kategori}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {d?.nama_barang}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {d?.kuantitas}
                        </td>
                        {/* <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     {d?.ukuran}
                                   </td>
                                    
                                   <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     {d?.metode_pembayaran}
                                   </td> */}
                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {d?.harga_satuan_barang}
                        </td>
                        {/* <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     {d?.pajak_biaya}
                                   </td>
                                   <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     {d?.ongkos_kirim}
                                   </td>
                                   <td style={{
                                       textAlign: 'left',
                                       padding: '8px',
                                       border: '1px solid #ddd'
                                   }}>
                                     {d?.total}
                                   </td> */}
                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          <DeleteIcon onClick={() => deleteData(i)} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </tabel>
            </div>
            <div style={{ marginTop: 10 }}>
              <Button
                onClick={() =>
                  props?.submit({
                    detail_penjualan: listDetail,
                    tanggal_transaksi:
                      moment(tanggal_transaksi).format("YYYY-MM-DD"),
                    id_office,
                    id_karyawan: convertKaryawan(karyawan)?.id,
                    nama_karyawan: convertKaryawan(karyawan)?.nama_karyawan,
                    lokasi_office: convertOffice(id_office),
                    nama_pelanggan: convertPelanggan(id_pelanggan)?.nama,
                    no_hp_pelanggan: convertPelanggan(id_pelanggan)?.hp,
                    pajak_biaya: pajak,
                    ongkos_kirim,
                    ekspedisi,
                    diskon,
                    diskon_remark,
                    metode_pembayaran: check ? "NON TUNAI" : "TUNAI",
                    bank_name: check ? convertBank(bank)?.bank_name : "",
                    no_rek: check ? convertBank(bank)?.acc_number : "",
                  })
                }
                variant="contained"
              >
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ModalAddPenjualanOffice;
