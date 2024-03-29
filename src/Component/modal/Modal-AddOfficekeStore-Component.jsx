import { Modal, Box, Button } from "@mui/material";

import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import Input from "../../Component/input";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getProdukBySKU, officeGetProdukByArtikel } from "../../Config/Api-new";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
const ModalAddOfficeStore = (props) => {
  // const [detail_pengiriman,setDetail_pengiriman] = useState([])
  const [tanggal_pengiriman, setTanggal_pengiriman] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [keterangan, setKeterangan] = useState("");
  const [id_office, setId_office] = useState("");
  const [sku, setSku] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [kuantitas, setKuantitas] = useState("");
  const [id_store, setId_store] = useState("");
  const [article, setArticle] = useState("");
  const [detail, setDetail] = useState("");
  const [listDetail, setListDetail] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateDetail, setUpdateDetail] = useState({});
  useEffect(() => {
    setTanggal_pengiriman(moment(new Date()).format("YYYY-MM-DD"));
    setKeterangan("");
    setId_office("");
    setSku("");
    setUkuran("");
    setArticle("");
    setListDetail([]);
    setKuantitas("");
    setDetail({});
  }, [props?.open]);
  const getSKU = async (e) => {
    if (e.charCode === 13) {
      e.preventDefault();

      let res = await getProdukBySKU(sku);
      setDetail(res?.data);
      setArticle(res?.data?.artikel_product);
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
    setKuantitas("");
  };
  const convertToko = (v) => {
    let idx = props?.store?.findIndex((a) => a.id == v);

    return props?.store ? props?.store[idx]?.store_name : "";
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
      id: detail?.id,
      sku_code: sku,
      artikel: article,
      type_name: detail?.type_name,
      tipe: detail?.type,
      kategori_name: detail?.nama_kategori,
      kategori: detail?.kategori,
      nama_barang: detail?.nama_product,
      kuantitas,
      ukuran,
      hpp: detail?.hpp,
      harga_jual: detail?.harga_jual,
    });
    setSku("");
    setDetail({});
    setArticle("");
    setUkuran("");
    setKuantitas("");
    setListDetail(arr);
  };
  const deleteData = (idx) => {
    let datas = [...listDetail];
    // let idx = listDetail?.findIndex(a=>a.id==id)
    datas.splice(idx, 1);
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
              Add Pengiriman Office to Store
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
              <InputLabel id="demo-simple-select-label">Toko</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id_store}
                label="Toko Tujuan"
                onChange={(v) => {
                  setId_store(v?.target?.value);
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
            <Input
              value={keterangan}
              disable={false}
              type="text"
              label={"Keterangan"}
              onChange={(v) => setKeterangan(v?.target?.value)}
              style={{ marginTop: 15, width: "100%", marginBottom: 20 }}
            />
            <p>Produk</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ width: "100%", marginRight: 10 }}>
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kode SKU</p>
                <Input
                  value={isUpdate ? updateDetail?.sku_code : sku}
                  readOnly={isUpdate ? true : false}
                  // type='date'
                  onKeyPress={(e) => getSKU(e)}
                  // label={'Kode SKU'}
                  onChange={(v) => setSku(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Artikel</p>
                <Input
                  value={isUpdate ? updateDetail?.artikel : article}
                  disable={false}
                  readOnly={isUpdate ? true : false}
                  // type='date'
                  onKeyPress={(e) => getArticle(e)}
                  // label={'Artikel'}
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
                      ? updateDetail?.kategori_name
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
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ width: "100%", marginRight: 10 }}>
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kuantitas</p>
                <Input
                  value={isUpdate ? updateDetail?.kuantitas : kuantitas}
                  // disabe={true}
                  // type='date'
                  // label={'Kuantitas'}
                  onChange={(v) =>
                    isUpdate
                      ? updateDataDetail(v?.target?.value, "kuantitas")
                      : setKuantitas(v?.target?.value)
                  }
                  style={{ width: "100%" }}
                />
                {/* <p style={{textColor:'gray',fontSize:'13px'}}>Ukuran</p> */}
                <FormControl
                  sx={{ marginTop: 2, width: "100%" }}
                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-label">Ukuran</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isUpdate ? updateDetail?.ukuran : ukuran}
                    label="Toko Tujuan"
                    onChange={(v) => {
                      isUpdate
                        ? updateDataDetail(v?.target?.value, "ukuran")
                        : setUkuran(v?.target?.value);
                    }}
                  >
                    {props?.ukuran?.map((d, i) => {
                      return <MenuItem value={d?.ukuran}>{d?.ukuran}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <p style={{ textColor: "gray", fontSize: "13px" }}>Hpp</p>
                <Input
                  value={
                    isUpdate
                      ? updateDetail?.hpp
                      : detail?.hpp
                      ? detail?.hpp
                      : ""
                  }
                  readOnly={true}
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
              <tabel style={{ width: "100%" }}>
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
                    Ukuran
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Hpp
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
                    Delete
                  </th>
                </tr>
                <tbody>
                  {listDetail?.map((d, i) => {
                    return (
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
                          {d?.kategori_name}
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
                          {d?.ukuran}
                        </td>
                        <td
                          onClick={() => setDataDetail(d)}
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {d?.hpp}
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
                  props?.submit(
                    listDetail,
                    moment(tanggal_pengiriman).format("YYYY-MM-DD"),
                    id_office,
                    convertOffice(id_office),
                    id_store,
                    convertToko(id_store),
                    keterangan
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
export default ModalAddOfficeStore;
