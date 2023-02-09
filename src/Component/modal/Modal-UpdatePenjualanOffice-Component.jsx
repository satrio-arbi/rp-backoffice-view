import { Modal, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Input from "../../Component/input";
import { alertError } from "../../Component/alert/sweetalert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  getProdukBySKU,
  officeGetProdukByArtikel,
  getProformaInvoiceItemUpdate,
} from "../../Config/Api-new";
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
  const [pi_no, setPi_no] = useState("");
  const [dp, setDp] = useState(0);
  const [detail, setDetail] = useState("");
  const [listDetail, setListDetail] = useState([]);
  const [harga_satuan_barang, setHarga_satuan_barang] = useState("");
  const [diskonSatuan, setDiskonSatuan] = useState("");
  const [ongkos_kirim, setOngkos_kirim] = useState("");
  const [pajak, setPajak] = useState("");
  const [check, setCheck] = useState("");
  const [karyawan, setKaryawan] = useState("");
  const [diskon, setDiskon] = useState(0);
  const [diskon_remark, setDiskon_remark] = useState("");
  const [ekspedisi, setEkspedisi] = useState("");
  const data = props?.data;
  useEffect(() => {
    setHarga_satuan_barang("");
    setDiskonSatuan("");
    setOngkos_kirim(data?.ongkos_kirim);
    setPajak(data?.pajak_biaya);
    setTanggal_transaksi(data?.tanggal_transaksi);
    setId_office(data?.id_office);
    setCheck(data?.metode_pembayaran === "NON TUNAI" ? true : false);
    setSku("");
    setUkuran("");
    setListDetail(data?.detail_penjualan);
    setDetail("");
    setDiskon(data?.diskon);
    setDiskon_remark(data?.diskon_remark);
    setEkspedisi(data?.ekspedisi);
    setArticle("");
    setId_pelanggan(convertPelangganFromHp(data?.no_hp_pelanggan));
    setKuantitas("");
    setBank(
      data?.metode_pembayaran === "NON TUNAI"
        ? convertBankByAccAndName(data?.bank_name, data?.no_rek)
        : ""
    );
    setKaryawan(data?.id_karyawan);
    setPi_no(data?.pi_no);
    setDp(data?.dp);
  }, [props?.open]);
  const getSKU = async (e) => {
    if (e.charCode === 13) {
      e.preventDefault();

      let res = await getProdukBySKU(sku);
      setDetail(res?.data);
      setArticle(res?.data?.artikel_product);
      setHarga_satuan_barang(res?.data?.harga_jual);
      setDiskonSatuan(0);
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
        setDiskonSatuan(0);
        setUkuran(res?.data?.ukuran);
        setKuantitas(res?.data?.kuantitas);
      } else {
        alert("Stock tidak ada!");
        clear();
      }
    }
  };

  const getPi = async (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      let res = await getProformaInvoiceItemUpdate(pi_no);
      if (res.status) {
        if (res.data) {
          let arr = [...listDetail];

          for (var j in res?.data?.detail_proforma_invoice) {
            arr.forEach(function (e) {
              if (res?.data?.detail_proforma_invoice[j].artikel == e.artikel) {
                e.kuantitas = res?.data?.detail_proforma_invoice[j].kuantitas;
              }
            });
          }

          if (listDetail.length != res?.data?.detail_proforma_invoice.length) {
            // A comparer used to determine if two entries are equal.
            const isSameArtikel = (a, b) => a.artikel === b.artikel;

            // Get items that only occur in the left array,
            // using the compareFunction to determine equality.
            const onlyInLeft = (left, right, compareFunction) =>
              left.filter(
                (leftValue) =>
                  !right.some((rightValue) =>
                    compareFunction(leftValue, rightValue)
                  )
              );
            const onlyInA = onlyInLeft(
              listDetail,
              res?.data?.detail_proforma_invoice,
              isSameArtikel
            );
            const onlyInB = onlyInLeft(
              res?.data?.detail_proforma_invoice,
              listDetail,
              isSameArtikel
            );
            const results = [...onlyInA, ...onlyInB];

            if (results) {
              for (let i = 0; i < results.length; i++) {
                arr.push({
                  rowstatus: 2,
                  sku_code: results[i].sku_code,
                  artikel: results[i].artikel,
                  type_name: results[i].type_name,
                  tipe: results[i].tipe,
                  nama_kategori: results[i].nama_kategori,
                  kategori: results[i].kategori,
                  nama_barang: results[i].nama_barang,
                  kuantitas: results[i].kuantitas,
                  harga_satuan_barang: results[i].harga_satuan_barang,
                  diskon: results[i].diskon,
                });
              }
            }
          }

          setListDetail(arr);
          setOngkos_kirim(res?.data?.ongkos_kirim);
          setPajak(res?.data?.pajak_biaya);
          setId_office(res?.data?.id_office);
          setDp(res?.data?.dp);
          setEkspedisi(res?.data?.ekspedisi);
          setDiskon(res?.data?.diskon);
          setDiskon_remark(res?.data?.diskon_remark);
          setId_pelanggan(convertPelangganFromHp(res?.data?.no_hp_pelanggan));
          setKaryawan(convertKaryawanFromId(res?.data?.id_karyawan));
        } else {
          alert("PI tidak ada!");
        }
      } else {
        alert("PI tidak ada!");
        clear();
      }
    }
  };
  const clear = () => {
    setSku("");
    setDetail({});
    setUkuran("");
    setHarga_satuan_barang("");
    setDiskonSatuan("");
    setKuantitas("");
  };
  const convertPelangganFromHp = (v) => {
    let idx = props?.pelanggan?.findIndex((a) => a.no_hp == v);

    return props?.pelanggan ? props?.pelanggan[idx]?.id : "";
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

  const convertKaryawanFromId = (v) => {
    let idx = props?.karyawan?.findIndex((a) => a.id == v);

    return props?.karyawan ? props?.karyawan[idx]?.id : "";
  };

  const convertBank = (v) => {
    let idx = props?.bank?.findIndex((a) => a.id == v);

    return props?.bank[idx];
  };
  const convertBankByAccAndName = (nm, acc) => {
    let idx = props?.bank?.findIndex(
      (a) => a.bank_name == nm && a.acc_number == acc
    );

    return props?.bank[idx]?.id;
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
      rowstatus: 2,
      sku_code: sku,
      artikel: article,
      type_name: detail?.type_name,
      tipe: detail?.type,
      nama_kategori: detail?.nama_kategori,
      kategori: detail?.kategori,
      nama_barang: detail?.nama_barang,
      kuantitas,
      harga_satuan_barang,
      diskon: diskonSatuan,
    });
    setArticle("");
    setSku("");
    setDetail({});
    setUkuran("");
    setHarga_satuan_barang("");
    setDiskonSatuan("");
    setKuantitas("");
    setListDetail(arr);
  };
  const deleteData = (idx) => {
    let datas = [...listDetail];
    // let idx = listDetail?.findIndex(a=>a.id==id)
    if (datas[idx]["rowstatus"] === 2) {
      datas.splice(idx, 1);
    } else {
      datas[idx]["rowstatus"] = 0;
    }
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
              Update Penjualan office
            </h2>
            <CloseIcon onClick={() => props?.onClickOpen()} />
          </div>
          <div>
            <Input
              value={tanggal_transaksi}
              type="date"
              label={"Tanggal Penjualan"}
              onChange={(v) => setTanggal_transaksi(v?.target?.value)}
              style={{ width: "100%" }}
            />
            <Input
              value={pi_no}
              disable={false}
              label={"PI No"}
              onKeyPress={(e) => getPi(e)}
              onChange={(v) => setPi_no(v?.target?.value)}
              style={{ width: "100%", marginTop: 15 }}
            />
            <Input
              value={pi_no == "" ? 0 : dp}
              disable={true}
              type="number"
              label={"Down Payment"}
              onChange={(v) => setDp(v?.target?.value)}
              style={{ width: "100%", marginTop: 15 }}
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
                    <MenuItem
                      disabled={pi_no == "" ? false : true}
                      value={d?.id}
                    >
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
                    <MenuItem
                      disabled={pi_no == "" ? false : true}
                      value={d?.id}
                    >
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
                  return (
                    <MenuItem
                      disabled={pi_no == "" ? false : true}
                      value={d?.id}
                    >
                      {d?.nama_karyawan}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Input
              value={ekspedisi}
              disable={pi_no == "" ? false : true}
              label={"Ekspedisi"}
              onChange={(v) => setEkspedisi(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={ongkos_kirim}
              disable={pi_no == "" ? false : true}
              label={"Ongkos kirim"}
              onChange={(v) => setOngkos_kirim(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={pajak}
              label={"pajak"}
              disable={pi_no == "" ? false : true}
              onChange={(v) => setPajak(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={diskon}
              disable={pi_no == "" ? false : true}
              type="number"
              label={"Diskon"}
              onChange={(v) => setDiskon(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={diskon_remark}
              disable={pi_no == "" ? false : true}
              label={"Diskon Remark"}
              onChange={(v) => setDiskon_remark(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
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
                  disable={pi_no == "" ? false : true}
                  // type='date'
                  onKeyPress={(e) => getSKU(e)}
                  // label={'Kode SKU'}
                  onChange={(v) => setSku(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Artikel</p>
                <Input
                  value={article}
                  disable={pi_no == "" ? false : true}
                  // type='date'
                  onKeyPress={(e) => getArticle(e)}
                  // label={'Artikel'}
                  onChange={(v) => setArticle(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Tipe</p>
                <Input
                  value={detail?.type_name}
                  disable={pi_no == "" ? false : true}
                  readOnly={true}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kategori</p>
                <Input
                  value={detail?.nama_kategori}
                  disable={pi_no == "" ? false : true}
                  readOnly={true}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>
                  Nama produk
                </p>
                <Input
                  value={detail?.nama_barang}
                  disable={pi_no == "" ? false : true}
                  readOnly={true}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ width: "100%", marginRight: 10 }}>
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kuantitas</p>
                <Input
                  value={kuantitas}
                  disable={pi_no == "" ? false : true}
                  onChange={(v) => setKuantitas(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>
                  Harga satuan barang
                </p>
                <Input
                  value={harga_satuan_barang}
                  disable={pi_no == "" ? false : true}
                  onChange={(v) => setHarga_satuan_barang(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>
                  Diskon satuan barang
                </p>
                <Input
                  value={diskonSatuan}
                  disable={pi_no == "" ? false : true}
                  type="number"
                  onChange={(v) => setDiskonSatuan(v?.target?.value)}
                  style={{ width: "100%" }}
                />
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
              <Button
                onClick={() => addDetailProduk()}
                variant="contained"
                disabled={pi_no == "" ? false : true}
              >
                Save Produk detail
              </Button>
            </div>
            <div style={{ overflowX: "auto", marginTop: 20 }}>
              <tabel
                style={{
                  width: "100%",
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
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Harga satuan
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Diskon satuan
                  </th>
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
                    return d?.rowstatus > 0 ? (
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

                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {d?.harga_satuan_barang}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {d?.diskon}
                        </td>
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
                    ) : null;
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
                    pi_no,
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
                    dp,
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
