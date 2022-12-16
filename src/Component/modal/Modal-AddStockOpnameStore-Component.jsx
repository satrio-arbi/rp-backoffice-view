import { Modal, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Input from "../input";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getProdukBySKU, getProdukByArtikel } from "../../Config/Api-new";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
const ModalAddStockOpname = (props) => {
  // const [detail_pengiriman,setDetail_pengiriman] = useState([])
  const [tanggal_pengiriman, setTanggal_pengiriman] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [id_store_asal, setId_store_asal] = useState("");
  const [sku, setSku] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [kuantitas, setKuantitas] = useState("");
  const [id_store, setId_store] = useState("");
  const [article, setArticle] = useState("");
  const [detail, setDetail] = useState("");
  const [stock_opname, setStock_opname] = useState("");
  const [listDetail, setListDetail] = useState([]);

  useEffect(() => {
    setTanggal_pengiriman(moment(new Date()).format("YYYY-MM-DD"));
    setSku("");
    setUkuran("");
    setListDetail([]);
    setDetail("");
    setArticle("");
    setKuantitas("");
  }, [props?.open]);
  const getSKU = async (e) => {
    if (e.charCode === 13) {
      e.preventDefault();

      let res = await getProdukBySKU(sku);
      setDetail(res?.data);
      setArticle(res?.data?.artikel_product);
    }
  };
  const getArticle = async (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      let res = await getProdukByArtikel(article);
      setDetail(res?.data);
      setSku(res?.data?.sku_code);
    }
  };
  const convertToko = (v) => {
    let idx = props?.store?.findIndex((a) => a.id == v);

    return props?.store ? props?.store[idx]?.store_name : "";
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
              Add Stock Opname Store
            </h2>
            <CloseIcon onClick={() => props?.onClickOpen()} />
          </div>
          <div>
            {/* <p>Tanggal Pengiriman</p> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <FormControl
                sx={{ marginTop: 2, width: "100%" }}
                variant="outlined"
              >
                <InputLabel id="demo-simple-select-label">Toko</InputLabel>
                <Select
                  style={{ width: "100%" }}
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
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ width: "100%", marginRight: 10 }}>
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kode SKU</p>
                <Input
                  value={sku}
                  disable={false}
                  onKeyPress={(e) => getSKU(e)}
                  onChange={(v) => setSku(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Artikel</p>
                <Input
                  value={article}
                  disable={false}
                  onKeyPress={(e) => getArticle(e)}
                  onChange={(v) => setArticle(v?.target?.value)}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>Tipe</p>
                <Input
                  value={detail?.type_name}
                  readOnly={true}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ width: "100%", marginRight: 10 }}>
                <p style={{ textColor: "gray", fontSize: "13px" }}>Kategori</p>
                <Input
                  value={detail?.nama_kategori}
                  readOnly={true}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>
                  Nama produk
                </p>
                <Input
                  value={detail?.nama_product}
                  readOnly={true}
                  style={{ width: "100%" }}
                />
                <p style={{ textColor: "gray", fontSize: "13px" }}>
                  Stock Opname
                </p>
                <Input
                  value={stock_opname}
                  onChange={(v) => setStock_opname(v?.target?.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <Button
                onClick={() =>
                  props?.submit(
                    id_store,
                    convertToko(id_store),
                    detail?.artikel_product,
                    detail?.kategori,
                    detail?.nama_product,
                    detail?.nama_kategori,
                    detail?.sku_code,
                    stock_opname,
                    detail?.type,
                    detail?.type_name
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
export default ModalAddStockOpname;
