import { Modal, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Input from "../../Component/input";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getProdukBySKU, getProdukByArtikel } from "../../Config/Api-new";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
const ModaEditReturGudang = (props) => {
  const [tanggal_pengiriman, setTanggal_pengiriman] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [id_store_asal, setId_store_asal] = useState("");
  const [sku, setSku] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [kuantitas, setKuantitas] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [id_office_tujuan, setId_office_tujuan] = useState("");
  const [article, setArticle] = useState("");
  const [detail, setDetail] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateDetail, setUpdateDetail] = useState({});
  const [listDetail, setListDetail] = useState([]);
  const data = props?.data;
  useEffect(() => {
    setTanggal_pengiriman(
      moment(data?.tanggal_pengiriman).format("YYYY-MM-DD")
    );
    setId_office_tujuan(data?.id_office_tujuan);
    setSku("");
    setUkuran("");
    let arr = props?.detail;
    props?.detail?.map((d, i) => {
      arr[i]["rowstatus"] = 1;
    });

    setListDetail(arr);
    setDetail("");
    setArticle("");
    setId_store_asal(data?.id_store_asal);
    setKuantitas("");
    setKeterangan("");
  }, [props?.open]);
  const convertOffice = (v) => {
    let idx = props?.office?.findIndex((a) => a.id == v);

    return props?.office ? props?.office[idx]?.office_name : "";
  };
  const getSKU = async (e) => {
    if (e.charCode === 13) {
      e.preventDefault();

      let res = await getProdukBySKU(sku);
      setDetail(res?.data);
      setArticle(res?.data?.artikel_product);
      setUkuran(res?.data?.ukuran);
      setKuantitas(res?.data?.kuantitas);
      setKeterangan("");
    }
  };
  const getArticle = async (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      let res = await getProdukByArtikel(article);
      setDetail(res?.data);
      setSku(res?.data?.sku_code);
      setUkuran(res?.data?.ukuran);
      setKuantitas(res?.data?.kuantitas);
      setKeterangan("");
    }
  };
  const convertToko = (v) => {
    let idx = props?.store?.findIndex((a) => a.id == v);

    return props?.store ? props?.store[idx]?.store_name : "";
  };
  const convertImage = (v) => {
    return "data:image/png;base64," + v;
  };
  const addDetailProduk = () => {
    let arr = [...listDetail];

    arr.push({
      // id:detail?.id,
      sku_code: sku,
      artikel: article,
      type_name: detail?.type_name,
      tipe: detail?.type,
      nama_kategori: detail?.nama_kategori,
      kategori: detail?.kategori,
      nama_barang: detail?.nama_product,
      kuantitas,
      ukuran,
      hpp: detail?.hpp,
      harga_jual: detail?.harga_jual,
      keterangan,
    });
    setDetail({});
    setSku("");
    setUkuran("");
    setKuantitas("");
    setKeterangan("");
    setArticle("");
    setListDetail(arr);
  };
  const deleteData = (idx) => {
    let datas = [...listDetail];
    // let idx = listDetail?.findIndex(a=>a.id==id)
    datas.splice(idx, 1);
    setListDetail(datas);
  };
  const deleteDataOld = (id) => {
    let datas = [...listDetail];

    let idx = listDetail?.findIndex((a) => a.id == id);
    // datas.splice(idx, 1);
    datas[idx]["rowstatus"] = 0;

    setListDetail(datas);
  };
  const setDataDetail = (d) => {
    let kon = true;

    setUpdateDetail(!kon ? {} : d);

    setIsUpdate(kon);
  };
  const saveUpdate = () => {
    // let kon = true

    setUpdateDetail({});

    setIsUpdate(false);
  };
  const updateDataDetail = (v, type) => {
    let datas = [...listDetail];
    let idx = listDetail.findIndex((a) => a.id == updateDetail?.id);
    datas[idx][type] = v;
    datas[idx]["rowstatus"] = 1;
    setListDetail(datas);
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
              Update Retur Gudang
            </h2>
            <CloseIcon onClick={() => props?.onClickOpen()} />
          </div>
          <div>
            {/* <p>Tanggal Pengiriman</p> */}
            <Input
              value={tanggal_pengiriman}
              disable={false}
              type="date"
              label={"Tanggal Pengiriman"}
              onChange={(v) => setTanggal_pengiriman(v?.target?.value)}
              style={{ width: "100%" }}
            />
            <FormControl
              sx={{ marginTop: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">Toko Asal</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id_store_asal}
                label="Toko Asal"
                onChange={(v) => {
                  setId_store_asal(v?.target?.value);
                }}
              >
                {props?.store?.map((d, i) => {
                  return (
                    <MenuItem value={d?.id}>
                      {d?.store_name}-{d?.alamat}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl
              sx={{ marginTop: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">
                Office Tujuan
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id_office_tujuan}
                label="Toko Tujuan"
                onChange={(v) => {
                  setId_office_tujuan(v?.target?.value);
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
            <p>Produk</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ width: "100%", marginRight: 10 }}>
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kode SKU</p>
                <Input
                  value={isUpdate ? updateDetail?.sku_code : sku}
                  readOnly={isUpdate ? true : false}
                  onKeyPress={(e) => getSKU(e)}
                  onChange={(v) => setSku(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Artikel</p>
                <Input
                  value={isUpdate ? updateDetail?.artikel : article}
                  disable={false}
                  readOnly={isUpdate ? true : false}
                  onKeyPress={(e) => getArticle(e)}
                  onChange={(v) => setArticle(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Tipe</p>
                <Input
                  value={
                    isUpdate
                      ? updateDetail?.type_name
                      : detail?.type_name
                      ? detail?.type_name
                      : ""
                  }
                  readOnly={true}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kategori</p>
                <Input
                  value={
                    isUpdate
                      ? updateDetail?.nama_kategori
                      : detail?.nama_kategori
                      ? detail?.nama_kategori
                      : ""
                  }
                  readOnly={true}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>
                  Nama produk
                </p>
                <Input
                  value={
                    isUpdate
                      ? updateDetail?.nama_barang
                      : detail?.nama_product
                      ? detail?.nama_product
                      : ""
                  }
                  readOnly={true}
                  // type='date'
                  // label={'Nama Produk'}
                  // onChange={(v)=>setTanggal_pengiriman(v?.target?.value)}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ width: "100%", marginRight: 10 }}>
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kuantitas</p>
                <Input
                  value={isUpdate ? updateDetail?.kuantitas : kuantitas}
                  onChange={(v) =>
                    isUpdate
                      ? updateDataDetail(v?.target?.value, "kuantitas")
                      : setKuantitas(v?.target?.value)
                  }
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>
                  Harga Jual
                </p>
                <Input
                  value={
                    isUpdate
                      ? updateDetail?.harga_jual
                      : detail?.harga_jual
                      ? detail?.harga_jual
                      : ""
                  }
                  readOnly={true}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>
                  Keterangan
                </p>
                <Input
                  value={isUpdate ? updateDetail?.keterangan : keterangan}
                  onChange={(v) =>
                    isUpdate
                      ? updateDataDetail(v?.target?.value, "keterangan")
                      : setKeterangan(v?.target?.value)
                  }
                  style={{ width: "100%" }}
                />
                {detail?.image ? (
                  <div style={{ marginTop: 10 }}>
                    <p style={{ textColor: "gray", fontSize: "13px" }}>
                      Foto Barang
                    </p>

                    <img
                      src={convertImage(detail?.image)}
                      style={{ width: 200, height: 200 }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div
              style={{ marginTop: 10, justifyContent: "end", display: "flex" }}
            >
              <Button
                onClick={() => (isUpdate ? saveUpdate() : addDetailProduk())}
                variant="contained"
              >
                {isUpdate ? "Update" : "Save"} Produk detail
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
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Harga jual
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Keterangan
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
                    return (
                      <>
                        {d?.id && d?.rowstatus !== 0 ? (
                          <tr key={i}>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {i + 1}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.artikel}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.type_name}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.nama_kategori}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.nama_barang}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.kuantitas}
                            </td>

                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.harga_jual}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.keterangan}
                            </td>
                            <td
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              <DeleteIcon
                                onClick={() => deleteDataOld(d?.id)}
                              />
                            </td>
                          </tr>
                        ) : d?.id ? null : (
                          <tr key={i}>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {i + 1}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.artikel}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.type_name}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.nama_kategori}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.nama_barang}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.kuantitas}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.harga_jual}
                            </td>
                            <td
                              onClick={() => setDataDetail(d)}
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              {d?.keterangan}
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
                        )}
                      </>
                    );
                  })}
                </tbody>
              </tabel>
            </div>
            <div style={{ marginTop: 10 }}>
              <Button
                onClick={() =>
                  props?.submit(
                    listDetail,
                    moment(tanggal_pengiriman).format("YYYY-MM-DD"),
                    id_store_asal,
                    convertToko(id_store_asal),
                    id_office_tujuan,
                    convertOffice(id_office_tujuan)
                  )
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
export default ModaEditReturGudang;
