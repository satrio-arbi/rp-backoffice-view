import { Modal, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Input from "../../Component/input";
const ModalAddMasterProduk = (props) => {
  const [ukuran, setUkuran] = useState("");
  const [type_name, setType_name] = useState("");
  const [hpp, setHpp] = useState("");
  const [kategori, setKategori] = useState("");
  const [type, setType] = useState("");
  const [kuantitas, setKuantitas] = useState("");
  const [artikel_produk, setArtikel_produk] = useState("");
  const [artikel_frame, setArtikel_frame] = useState("");
  const [nama_produk, setNama_produk] = useState("");
  const [artikel_lens, setArtikel_lens] = useState("");
  const [harga_jual, setHarga_jual] = useState("");
  const [sku_code, setSku_code] = useState("");
  const [remarks, setRemarks] = useState("");
  const [nama_kategori, setNama_kategori] = useState("");
  const [image, setImage] = useState("");
  const [imageAddress, setImageAddress] = useState(null);
  useEffect(() => {
    setUkuran("");
    setHpp("");
    setKategori("");
    setType("");
    setKuantitas("");
    setArtikel_produk("");
    setArtikel_frame("");
    setNama_produk("");
    setArtikel_lens("");
    setHarga_jual("");
    setSku_code("");
    setRemarks("");
    setImage("");
    setImageAddress("");
  }, [props?.open]);
  const convertType = (v) => {
    let idx = props?.type?.findIndex((a) => a.id == v);

    return props?.type ? props?.type[idx]?.type_name : "";
  };
  const convertKategori = (v) => {
    let idx = props?.kategori?.findIndex((a) => a.id == v);

    return props?.kategori ? props?.kategori[idx]?.kategori_name : "";
  };
  const atChangeFile = async (e) => {
    const fileStrem = e.target?.files[0];
    setImage(fileStrem);
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setImageAddress(this.result);
    });
    reader.readAsDataURL(fileStrem);
    let a = fileStrem instanceof Blob;
    console.log({ fileStrem, a });

    // setName(fileStrem?.name)
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
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            overflowY: "scroll",
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
              Add Master Produk
            </h2>
            <CloseIcon onClick={() => props?.onClickOpen()} />
          </div>
          <div>
            <Input
              value={artikel_produk}
              disable={false}
              label={"Produk Artikel"}
              onChange={(v) => setArtikel_produk(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={nama_produk}
              disable={false}
              label={"Nama Produk"}
              onChange={(v) => setNama_produk(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />

            <Input
              value={artikel_frame}
              disable={false}
              label={"Artikel frame"}
              onChange={(v) => setArtikel_frame(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />

            <Input
              value={artikel_lens}
              disable={false}
              label={"Artikel lens"}
              onChange={(v) => setArtikel_lens(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={sku_code}
              disable={false}
              label={"SKU code"}
              onChange={(v) => setSku_code(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={harga_jual}
              disable={false}
              label={"Harga jual"}
              onChange={(v) => setHarga_jual(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={hpp}
              disable={false}
              label={"HPP"}
              onChange={(v) => setHpp(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={kuantitas}
              disable={false}
              label={"Kuantitas"}
              onChange={(v) => setKuantitas(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={remarks}
              disable={false}
              label={"Remarks"}
              onChange={(v) => setRemarks(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <FormControl
              sx={{ marginTop: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label"> Ukuran</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ukuran}
                label="Toko Tujuan"
                onChange={(v) => {
                  setUkuran(v?.target?.value);
                }}
              >
                {props?.ukuran?.map((d, i) => {
                  return <MenuItem value={d?.ukuran}>{d?.ukuran}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl
              sx={{ marginTop: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Store"
                onChange={(v) => {
                  setType(v?.target?.value);
                }}
              >
                {props?.type?.map((d, i) => {
                  return <MenuItem value={d?.id}>{d?.type_name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl
              sx={{ marginTop: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={kategori}
                label="Store"
                onChange={(v) => {
                  setKategori(v?.target?.value);
                }}
              >
                {props?.kategori?.map((d, i) => {
                  return <MenuItem value={d?.id}>{d?.kategori_name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            {imageAddress ? (
              <img
                style={{ marginTop: 10 }}
                src={imageAddress}
                height="400px"
                width="100%"
              />
            ) : null}
            <Button
              variant="contained"
              component="label"
              style={{ marginTop: 10 }}
              onChange={(e) => atChangeFile(e)}
            >
              Upload Image
              <input type="file" hidden />
            </Button>
            <div style={{ marginTop: 10 }}>
              <Button
                onClick={() =>
                  props?.submit(
                    ukuran,
                    convertType(type),
                    hpp,
                    kategori,
                    type,
                    kuantitas,
                    artikel_produk,
                    artikel_frame,
                    nama_produk,
                    artikel_lens,
                    harga_jual,
                    sku_code,
                    remarks,
                    convertKategori(kategori),
                    image
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
export default ModalAddMasterProduk;
