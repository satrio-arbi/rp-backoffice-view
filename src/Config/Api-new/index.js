import {NET} from './axios'

//kategori
export const addKategori = async (kategori_name) => {
    const formData = new FormData();  
      formData.append('kategori_name',kategori_name)
    const res = await NET("POST", `master/kategori/add`, formData)
    
    return res
    
  }
  export const uploadKategori = async (file) => {
    const formData = new FormData();  
      formData.append('file',file)
    const res = await NET("POST", `master/kategori/import`, formData, '', '',true)
    
    return res
    
  }
  export const updateKategori = async (kategori_name,id) => {
    const formData = new FormData();  
      formData.append('id',id)
      formData.append('kategori_name',kategori_name)
    const res = await NET("POST", `master/kategori/update`, formData)
    
    return res
    
  }
  export const deleteKategori = async (id) => {
    // const formData = new FormData();  
    //   formData.append('id',id)
    //   formData.append('kategori_name',kategori_name)
    const res = await NET("GET", `master/kategori/delete?id=${id}`, {})
    
    return res
    
  }
  export const getKategori = async () => {
  
    const res = await NET("GET", `master/kategori/all`, {})
    
    return res
    
  }
  export const getKategoriSearch = async (search) => {
  
    const res = await NET("GET", `master/kategori/search?keyword=${search}`, {})
    
    return res
    
  }

//Tipe

export const addTipe = async (type_name) => {
  const formData = new FormData();  
    formData.append('type_name',type_name)
  const res = await NET("POST", `master/tipe/add`, formData)
  
  return res
  
}
export const uploadType = async (file) => {
  const formData = new FormData();  
    formData.append('file',file)
  const res = await NET("POST", `master/tipe/import`, formData, '', '',true)
  
  return res
  
}
export const updateTipe = async (type_name,id) => {
  const formData = new FormData();  
    formData.append('id',id)
    formData.append('type_name',type_name)
  const res = await NET("POST", `master/tipe/update`, formData)
  
  return res
  
}
export const deleteTipe = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `master/tipe/delete?id=${id}`, {})
  
  return res
  
}
export const getTipe = async () => {

  const res = await NET("GET", `master/tipe/all`, {})
  
  return res
  
}
export const getTipeSearch = async (search) => {

  const res = await NET("GET", `master/tipe/search?keyword=${search}`, {})
  
  return res
  
}

//karyawan

export const getKaryawan = async () => {

  const res = await NET("GET", `karyawan/all`, {})
  
  return res
  
}
export const getKaryawanSearch = async (search) => {

  const res = await NET("GET", `karyawan/search?keyword=${search}`, {})
  
  return res
  
}
export const getKaryawanStore = async (search) => {

  const res = await NET("GET", `karyawan/allByStore?id_store=${search}`, {})
  
  return res
  
}
export const getKaryawanSearchStore = async (search,id) => {

  const res = await NET("GET", `karyawan/searchForStore?keyword=${search}&id_store=${id}`, {})
  
  return res
  
}
export const addKaryawan = async (
  no_hp,
  lokasi_office,
  tanggal_join,
  jabatan,
  nama_karyawan,
  lokasi_store,
  id_store,
  tanggal_lahir,
  email,
  id_office,
  alamat,
  image ) => {
  const formData = new FormData();  
    formData.append('no_hp',no_hp)
    formData.append('lokasi_office',lokasi_office)
    formData.append('tanggal_join',tanggal_join)
    formData.append('jabatan',jabatan)
    formData.append('nama_karyawan',nama_karyawan)
    formData.append('lokasi_store',lokasi_store)
    formData.append('id_store',id_store)
    formData.append('tanggal_lahir',tanggal_lahir)
    formData.append('email',email)
    formData.append('id_office',id_office)
    formData.append('alamat',alamat)
    formData.append('image',image)
  const res = await NET("POST", `karyawan/add`, formData)
  
  return res
  
}
export const updateKaryawan = async (
  no_hp,
  lokasi_office,
  tanggal_join,
  jabatan,
  nama_karyawan,
  lokasi_store,
  id_store,
  tanggal_lahir,
  email,
  id_office,
  alamat,
  image,total_transaksi,id ) => {
  const formData = new FormData();  
    formData.append('no_hp',no_hp)
    formData.append('lokasi_office',lokasi_office)
    formData.append('tanggal_join',tanggal_join)
    formData.append('jabatan',jabatan)
    formData.append('nama_karyawan',nama_karyawan)
    formData.append('lokasi_store',lokasi_store)
    formData.append('id_store',id_store)
    formData.append('tanggal_lahir',tanggal_lahir)
    formData.append('email',email)
    formData.append('id_office',id_office)
    formData.append('alamat',alamat)
    formData.append('image',image)
    formData.append('total_transaksi',total_transaksi)
    formData.append('id',id)
  const res = await NET("POST", `karyawan/update`, formData)
  
  return res
  
}
export const deleteKaryawan = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `karyawan/delete?id=${id}`, {})
  
  return res
  
}
export const pindahStoreKaryawan = async (d) => {
  // const formData = new FormData();  
  //   formData.append('karyawan',d)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("POST", `karyawan/pindahStore`, d)
  
  return res
  
}
export const uploadKaryawan= async (file) => {
  const formData = new FormData();  
    formData.append('file',file)
  const res = await NET("POST", `karyawan/import`, formData, '', '',true)
  
  return res
  
}
//store
export const getStore = async () => {

  const res = await NET("GET", `master/store/all`, {})
  
  return res
  
}
//office
export const getOffice = async () => {

  const res = await NET("GET", `master/office/all`, {})
  
  return res
  
}

//manajemen user
export const addUser = async (
  firstName,
  lastName,
  password,
  phoneNumber,
  lokasi_office,
  lokasi_store,
  akses_modul,
  userName,
  id_store,
  id_office,
  email
) => {
  const formData = new FormData();  
    formData.append('firstName',firstName)
    formData.append('lastName',lastName)
    formData.append('password',password)
    formData.append('phoneNumber',phoneNumber)
    formData.append('lokasi_office',lokasi_office)
    formData.append('lokasi_store',lokasi_store)
    formData.append('akses_modul',akses_modul)
    formData.append('userName',userName)
    formData.append('id_store',id_store)
    formData.append('id_office',id_office)
    formData.append('email',email)
  const res = await NET("POST", `api/auth/signup`, formData)
  
  return res
  
}

export const updateUser = async (
  firstName,
  lastName,
  password,
  phoneNumber,
  lokasi_office,
  lokasi_store,
  akses_modul,
  userName,
  id_store,
  id_office,
  email
  ,id) => {
  const formData = new FormData();  
    formData.append('id',id)
    formData.append('firstName',firstName)
    formData.append('lastName',lastName)
    formData.append('password',password)
    formData.append('phoneNumber',phoneNumber)
    formData.append('lokasi_office',lokasi_office)
    formData.append('lokasi_store',lokasi_store)
    formData.append('akses_modul',akses_modul)
    formData.append('userName',userName)
    formData.append('id_store',id_store)
    formData.append('id_office',id_office)
    formData.append('email',email)
  const res = await NET("POST", `api/auth/updateUser`, formData)
  
  return res
  
}
export const deletUser = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `master/kategori/delete?id=${id}`, {})
  
  return res
  
}
export const getUser = async (search) => {

  const res = await NET("GET", `api/auth/search?keyword=${search}`, {})
  
  return res
  
}

//menu
export const getMenu = async () => {

  const res = await NET("GET", `master/menu/all`, {})
  
  return res
  
}

//Produk

export const getProduk= async () => {

  const res = await NET("GET", `master/product/all`, {})
  
  return res
  
}
export const addProduk = async (
  ukuran,
  type_name,
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
  nama_kategori,
  image
) => {
  const formData = new FormData();  
    formData.append('ukuran',ukuran)
    formData.append('type_name',type_name)
    formData.append('hpp',hpp)
    formData.append('kategori',kategori)
    formData.append('type',type)
    formData.append('kuantitas',kuantitas)
    formData.append('artikel_product',artikel_produk)
    formData.append('artikel_frame',artikel_frame)
    formData.append('nama_product',nama_produk)
    formData.append('artikel_lens',artikel_lens)
    formData.append('harga_jual',harga_jual)
    formData.append('sku_code',sku_code)
    formData.append('remarks',remarks)
    formData.append('nama_kategori',nama_kategori)
    formData.append('image',image)
  const res = await NET("POST", `master/product/add`, formData)
  
  return res
  
}
export const addProdukCustom = async (
  artikel_frame_ns,
  artikel_lens_ns,
  // sku_code_s,
  // sku_code_f,
  artikel_s,
  artikel_f,
  ukuran,
  type_name,
  hpp,
  kategori,
  type,
  kuantitas,
  artikel_produk,
  artikel_frame,
  // artikel_frame_ns,
  nama_produk,
  artikel_lens,
  // artikel_lens_ns,
  harga_jual,
  sku_code,
  // sku_code_s,
  // sku_code_f,
  remarks,
  nama_kategori,
  image
) => {
  const formData = new FormData();  
    formData.append('artikel_f',artikel_f)
    formData.append('artikel_s',artikel_s)
    formData.append('artikel_lens_ns',artikel_lens_ns)
    formData.append('artikel_frame_ns',artikel_frame_ns)
    formData.append('ukuran',ukuran)
    formData.append('type_name',type_name)
    formData.append('hpp',hpp)
    formData.append('kategori',kategori)
    formData.append('type',type)
    formData.append('kuantitas',kuantitas)
    formData.append('artikel_product',artikel_produk)
    formData.append('artikel_frame',artikel_frame)
    formData.append('nama_product',nama_produk)
    formData.append('artikel_lens',artikel_lens)
    formData.append('harga_jual',harga_jual)
    formData.append('sku_code',sku_code)
    formData.append('remarks',remarks)
    formData.append('nama_kategori',nama_kategori)
    formData.append('image',image)
  const res = await NET("POST", `master/product/addCustom`, formData)
  
  return res
  
}
export const updateProduk = async (
  ukuran,
  type_name,
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
  nama_kategori,
  image
  ,id) => {
  const formData = new FormData();  
    formData.append('id',id)
    formData.append('ukuran',ukuran)
    formData.append('type_name',type_name)
    formData.append('hpp',hpp)
    formData.append('kategori',kategori)
    formData.append('type',type)
    formData.append('kuantitas',kuantitas)
    formData.append('artikel_produk',artikel_produk)
    formData.append('artikel_frame',artikel_frame)
    formData.append('nama_produk',nama_produk)
    formData.append('artikel_lens',artikel_lens)
    formData.append('harga_jual',harga_jual)
    formData.append('sku_code',sku_code)
    formData.append('remarks',remarks)
    formData.append('nama_kategori',nama_kategori)
    formData.append('image',image)
  const res = await NET("POST", `api/auth/updateUser`, formData)
  
  return res
  
}

export const deleteProduk = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `master/product/delete?id=${id}`, {})
  
  return res
  
}
export const getProdukById = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `master/product/getById?id=${id}`, {})
  
  return res
  
}
export const getProdukBySKU = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `master/product/getBySkuCode?sku_code=${id}`, {})
  
  return res
  
}
export const getProdukByArtikel = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `master/product/getByArticle?article=${id}`, {})
  
  return res
  
}
export const getProdukByType = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `master/product/getByType?type=${id}`, {})
  
  return res
  
}
export const getProdukSearch = async (search) => {

  const res = await NET("GET", `master/product/search?keyword=${search}`, {})
  
  return res
  
}
export const uploadProduct = async (file) => {
  const formData = new FormData();  
    formData.append('file',file)
  const res = await NET("POST", `master/product/import`, formData, '', '',true)
  
  return res
  
}

//Pengiriman store ke store

export const addPengirimanStorekeStore = async (
  detailPengirimanList,
  tanggal_pengiriman,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan
) => {
  
  const res = await NET("POST", `pengirimanStore/add`, 
  {
    detailPengirimanList,
    tanggal_pengiriman,
    id_store_asal,
    lokasi_store_asal,
    id_store_tujuan,
    lokasi_store_tujuan
  }
  )
  
  return res
  
}
export const updatePengirimanStorekeStore = async (
  detailPengirimanList,
  tanggal_pengiriman,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan,
  pengiriman_code,
  id) => {
  
   
  const res = await NET("POST", `pengirimanStore/update`, {
    detailPengirimanList,
  tanggal_pengiriman,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan,
  pengiriman_code,
  rowstatus:1,
  id
  })
  
  return res
  
}
export const deletePengirimanStorekeStore = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `pengirimanStore/delete?id=${id}`, {})
  
  return res
  
}
export const getPengirimanStorekeStore = async () => {

  const res = await NET("GET", `pengirimanStore/all`, {})
  
  return res
  
}
export const getPengirimanStorekeStoreSearch = async (search) => {

  const res = await NET("GET", `pengirimanStore/search?keyword=${search}`, {})
  
  return res
  
}


//Pengiriman Office ke store

export const addPengirimanOfficekeStore = async (
  detailPengirimanList,
  tanggal_pengiriman,
  id_office,
  lokasi_office,
  id_store,
  lokasi_store
) => {
  
  const res = await NET("POST", `pengirimanOffice/add`, {
    detailPengirimanList,
    tanggal_pengiriman,
    id_office,
    lokasi_office,
    id_store,
    lokasi_store
  })
  
  return res
  
}
export const updatePengirimanOfficekeStore = async (
  detailPengirimanList,
  tanggal_pengiriman,
  id_office,
  lokasi_office,
  id_store,
  lokasi_store,
  pengiriman_code,
  id) => {
  console.log({
    detailPengirimanList,
    tanggal_pengiriman,
    id_office,
    lokasi_office,
    id_store,
    lokasi_store,
    pengiriman_code,
    rowstatus:1,
    id
  })
   
  const res = await NET("POST", `pengirimanOffice/update`, {
    detailPengirimanList,
    tanggal_pengiriman,
    id_office,
    lokasi_office,
    id_store,
    lokasi_store,
    pengiriman_code,
    rowstatus:1,
    id
  })
  
  return res
  
}
export const deletePengirimanOfficekeStore = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `pengirimanOffice/delete?id=${id}`, {})
  
  return res
  
}
export const getPengirimanOfficekeStore = async () => {

  const res = await NET("GET", `pengirimanOffice/all`, {})
  
  return res
  
}
export const getPengirimanOfficekeStoreSearch = async (search) => {

  const res = await NET("GET", `pengirimanOffice/search?keyword=${search}`, {})
  
  return res
  
}
export const getPengirimanOfficekeStoreTransferRequest = async (search) => {

  const res = await NET("GET", `pengirimanOffice/transferRequest?pengiriman_code=${search}`, {})
  
  return res
  
}

//ukuran

export const getUkuran = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `master/ukuran/all`, {})
  
  return res
  
}
//Penerimaan office

export const addPenenrimaanOffice = async (
  detailPenerimaanList,
  tanggal_penerimaan,
  id_office,
  lokasi_office,
  id_store,
  lokasi_store,
  pengiriman_code
) => {

  const res = await NET("POST", `penerimaanFromOffice/add`, {
    detailPenerimaanList,
    tanggal_penerimaan,
    id_office,
  lokasi_office,
  id_store,
  lokasi_store,
  pengiriman_code
  })
  
  return res
  
}
export const updatePenerimaanOffice = async (
  detailPenerimaanList,
  tanggal_penerimaan,
  id_office,
  lokasi_office,
  id_store,
  lokasi_store,
  pengiriman_code,
  penerimaan_code
  ,id) => {
  
   console.log({ detailPenerimaanList,
    tanggal_penerimaan,
    id_office,
    lokasi_office,
    id_store,
    lokasi_store,
    pengiriman_code,
    penerimaan_code ,
    rowstatus:1,
    id})
  const res = await NET("POST", `penerimaanFromOffice/update`, {
  
    detailPenerimaanList,
    tanggal_penerimaan,
    id_office,
    lokasi_office,
    id_store,
    lokasi_store,
    pengiriman_code,
    penerimaan_code ,
    rowstatus:1,
    id
  })
  
  return res
  
}
export const deletePenenrimaanOffice = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `penerimaanFromOffice/delete?id=${id}`, {})
  
  return res
  
}
export const getPenenrimaanOffice = async () => {

  const res = await NET("GET", `penerimaanFromOffice/all`, {})
  
  return res
  
}
export const getPenenrimaanOfficeSearch = async (search) => {

  const res = await NET("GET", `penerimaanFromOffice/search?keyword=${search}`, {})
  
  return res
  
}
export const uploadPenenrimaanOffice = async (file) => {
  const formData = new FormData();  
    formData.append('file',file)
  const res = await NET("POST", `penerimaanFromOffice/import`, formData, '', '',true)
  
  return res
  
}

//Penerimaan  office store

export const addPenenrimaanStoreOffice = async (
  detailPenerimaanList,
  tanggal_penerimaan,
  id_office,
  lokasi_office,
  id_store,
  lokasi_store,
  retur_code
) => {
console.log({
  detailPenerimaanList,
  tanggal_penerimaan,
  id_office,
  lokasi_office,
  id_store,
  lokasi_store,
  retur_code
})
  const res = await NET("POST", `penerimaanStore/add`, {
    detailPenerimaanList,
    tanggal_penerimaan,
    id_office,
  lokasi_office,
  id_store,
  lokasi_store,
  retur_code
  })
  
  return res
  
}
export const updatePenerimaanStoreOffice = async (
  detailPenerimaanList,
  tanggal_penerimaan,
  id_office,
  lokasi_office,
  id_store,
  lokasi_store,
  retur_code,
  penerimaan_code
  ,id) => {
  
   
  const res = await NET("POST", `penerimaanStore/update`, {
  
    detailPenerimaanList,
    tanggal_penerimaan,
    id_office,
    lokasi_office,
    id_store,
    lokasi_store,
    retur_code,
    penerimaan_code ,
    rowstatus:1,
    id
  })
  
  return res
  
}
export const deletePenenrimaanStoreOffice = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `penerimaanStore/delete?penerimaan_code=${id}`, {})
  
  return res
  
}
export const getPenenrimaanStoreOffice = async () => {

  const res = await NET("GET", `penerimaanStore/all`, {})
  
  return res
  
}
export const getPenenrimaanStoreOfficeSearch = async (search) => {

  const res = await NET("GET", `penerimaanStore/search?keyword=${search}`, {})
  
  return res
  
}
export const uploadPenenrimaanStoreOffice = async (file) => {
  const formData = new FormData();  
    formData.append('file',file)
  const res = await NET("POST", `penerimaanStore/import`, formData, '', '',true)
  
  return res
  
}

//Penerimaan store

export const addPenenrimaanStore = async (
  detailPenerimaanList,
  tanggal_penerimaan,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan,
  pengiriman_code
) => {
  
  const res = await NET("POST", `penerimaanStoreFromStore/add`, {
    detailPenerimaanList,
    tanggal_penerimaan,
    id_store_asal,
    lokasi_store_asal,
    id_store_tujuan,
    lokasi_store_tujuan,
    pengiriman_code
  })
  
  return res
  
}
export const updatePenenrimaanStore = async (
  detailPenerimaanList,
  tanggal_penerimaan,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan,
  pengiriman_code,
  penerimaan_code,
  id) => {
  console.log({ detailPenerimaanList,
    tanggal_penerimaan,
    id_store_asal,
    lokasi_store_asal,
    id_store_tujuan,
    lokasi_store_tujuan,
    pengiriman_code,
    penerimaan_code,
    rowstatus:1,
    id})
   
  const res = await NET("POST", `penerimaanStoreFromStore/update`, {
    detailPenerimaanList,
    tanggal_penerimaan,
    id_store_asal,
    lokasi_store_asal,
    id_store_tujuan,
    lokasi_store_tujuan,
    pengiriman_code,
    penerimaan_code,
    rowstatus:1,
    id
  })
  
  return res
  
}
export const deletePenenrimaanStore = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `penerimaanStoreFromStore/delete?id=${id}`, {})
  
  return res
  
}
export const getPenenrimaanStore = async () => {

  const res = await NET("GET", `penerimaanStoreFromStore/all`, {})
  
  return res
  
}
export const getPenenrimaanStoreSearch = async (search) => {

  const res = await NET("GET", `penerimaanStoreFromStore/search?keyword=${search}`, {})
  
  return res
  
}
export const uploadPenenrimaanStore = async (file) => {
  const formData = new FormData();  
    formData.append('file',file)
  const res = await NET("POST", `penerimaanStoreFromStore/import`, formData, '', '',true)
  
  return res
  
}


//Penerimaan suplier

export const addPenenrimaanSuplier = async (
  detailPenerimaanList,
  tanggal_penerimaan,
  id_supplier,
  nama_supplier,
  pembelian_code
) => {
  console.log({ detailPenerimaanList,
    tanggal_penerimaan,
    id_supplier,
    nama_supplier,
    pembelian_code})
  const res = await NET("POST", `penerimaanSupplier/add`, {
    detailPenerimaanList,
    tanggal_penerimaan,
    id_supplier,
    nama_supplier,
    pembelian_code
  })
  
  return res
  
}
export const updatePenenrimaanSuplier = async (
  detailPenerimaanList,
  tanggal_penerimaan,
  id_supplier,
  nama_supplier,
  pembelian_code,
  penerimaan_code,
  id) => {
  // console.log({detailPenerimaanList,
  //   tanggal_penerimaan,
  //   id_supplier,
  //   nama_supplier,
  //   pembelian_code,
  //   penerimaan_code,
  //   rowstatus:1,
  //   id})
   
  const res = await NET("POST", `penerimaanSupplier/update`, {
    detailPenerimaanList,
  tanggal_penerimaan,
  id_supplier,
  nama_supplier,
  pembelian_code,
  penerimaan_code,
  rowstatus:1,
  id
  })
  
  return res
  
}
export const deletePenenrimaanSuplier = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `penerimaanSupplier/delete?id=${id}`, {})
  
  return res
  
}
export const getPenenrimaanSuplier = async () => {

  const res = await NET("GET", `penerimaanSupplier/all`, {})
  
  return res
  
}
export const getPenenrimaanSuplierSearch = async (search) => {

  const res = await NET("GET", `penerimaanSupplier/search?keyword=${search}`, {})
  
  return res
  
}
export const uploadPenenrimaanSuplier = async (file) => {
  const formData = new FormData();  
    formData.append('file',file)
  const res = await NET("POST", `penerimaanSupplier/import`, formData, '', '',true)
  
  return res
  
}

//Penyimpanan keluar

export const addPenyimpananKeluar = async (
  detail_pengiriman,
  tanggal_pengiriman,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan
) => {
  
  const res = await NET("POST", `penyimpananKeluar/add`, {
    detail_pengiriman,
    tanggal_pengiriman,
    id_store_asal,
    lokasi_store_asal,
    id_store_tujuan,
    lokasi_store_tujuan
  })
  
  return res
  
}
export const updatePenyimpananKeluar = async (
  detail_pengiriman,
  tanggal_pengiriman,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan,id) => {
  
   
  const res = await NET("POST", `penyimpananKeluar/update`, {
    detail_pengiriman,
  tanggal_pengiriman,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan,id
  })
  
  return res
  
}
export const deletePenyimpananKeluar = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `penyimpananKeluar/delete?id=${id}`, {})
  
  return res
  
}
export const getPenyimpananKeluar = async () => {

  const res = await NET("GET", `penyimpananKeluar/all`, {})
  
  return res
  
}
export const getPenyimpananKeluarSearch = async (search) => {

  const res = await NET("GET", `penyimpananKeluar/search?keyword=${search}`, {})
  
  return res
  
}

//Penyimpanan Masuk

export const addPenyimpananMasuk = async (
  detail_pengiriman,
  tanggal_pengiriman,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan
) => {
  
  const res = await NET("POST", `penyimpananMasuk/add`, {
    detail_pengiriman,
    tanggal_pengiriman,
    id_store_asal,
    lokasi_store_asal,
    id_store_tujuan,
    lokasi_store_tujuan
  })
  
  return res
  
}
export const updatePenyimpananMasuk = async (
  detail_pengiriman,
  tanggal_pengiriman,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan,id) => {
  
   
  const res = await NET("POST", `penyimpananMasuk/update`, {
    detail_pengiriman,
  tanggal_pengiriman,
  id_store_asal,
  lokasi_store_asal,
  id_store_tujuan,
  lokasi_store_tujuan,id
  })
  
  return res
  
}
export const deletePenyimpananMasuk = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `penyimpananMasuk/delete?id=${id}`, {})
  
  return res
  
}
export const getPenyimpananMasuk = async () => {

  const res = await NET("GET", `penyimpananMasuk/all`, {})
  
  return res
  
}
export const getPenyimpananMasukSearch = async (search) => {

  const res = await NET("GET", `penyimpananMasuk/search?keyword=${search}`, {})
  
  return res
  
}

//Stock Opname

export const addStockOpname = async (
  artikel,
  kategori,
  nama_barang,
  nama_kategori,
  sku_code,
  stock_opname,
  type,
  type_name
) => {
  const formData = new FormData();  
    formData.append('artikel',artikel)
    formData.append('kategori',kategori)
    formData.append('nama_barang',nama_barang)
    formData.append('nama_kategori',nama_kategori)
    formData.append('sku_code',sku_code)
    formData.append('stock_opname',stock_opname)
    formData.append('type',type)
    formData.append('type_name',type_name)
  const res = await NET("POST", `stockOpname/add`, formData)
  
  return res
  
}
export const updateStockOpnameMasuk = async (
  artikel,
  kategori,
  nama_barang,
  nama_kategori,
  sku_code,
  stock_opname,
  type,
  type_name,
  id
  ) => {
    const formData = new FormData();  
    formData.append('artikel',artikel)
    formData.append('kategori',kategori)
    formData.append('nama_barang',nama_barang)
    formData.append('nama_kategori',nama_kategori)
    formData.append('sku_code',sku_code)
    formData.append('stock_opname',stock_opname)
    formData.append('type',type)
    formData.append('type_name',type_name)
    formData.append('id',id)
   
  const res = await NET("POST", `stockOpname/update`, formData)
  
  return res
  
}
export const deleteStockOpnameMasuk = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `stockOpname/delete?id=${id}`, {})
  
  return res
  
}
export const getStockOpnameMasuk = async () => {

  const res = await NET("GET", `stockOpname/all`, {})
  
  return res
  
}
export const getStockOpnameSearch = async (search) => {

  const res = await NET("GET", `stockOpname/search?keyword=${search}`, {})
  
  return res
  
}

//Retur Gudang

export const addReturGudang = async (
  detail_pengiriman,
  tanggal_retur,
  id_store_asal,
  lokasi_store_asal,
  id_office_tujuan,
  lokasi_office_tujuan
) => {
 
  const res = await NET("POST", `returGudang/add`, 
  {detail_pengiriman,
    tanggal_retur,
    id_store_asal,
    lokasi_store_asal,
    id_office_tujuan,
    lokasi_office_tujuan})
  
  return res
  
}
export const updateReturGudang = async (
  detail_pengiriman,
  tanggal_retur,
  id_store_asal,
  lokasi_store_asal,
  id_office_tujuan,
  lokasi_office_tujuan,
  pengiriman_code,
  id
  ) => {
 
   
  const res = await NET("POST", `returGudang/update`, 
    {
      detail_pengiriman,
      tanggal_retur,
      id_store_asal,
      lokasi_store_asal,
      id_office_tujuan,
      lokasi_office_tujuan,
      pengiriman_code,
      rowstatus:1,
      id
    }
  )
  
  return res
  
}
export const deleteReturGudang = async (id) => {
  // const formData = new FormData();  
  //   formData.append('id',id)
  //   formData.append('kategori_name',kategori_name)
  const res = await NET("GET", `returGudang/delete?id=${id}`, {})
  
  return res
  
}
export const getReturGudang = async () => {

  const res = await NET("GET", `returGudang/all`, {})
  
  return res
  
}
export const getReturGudangSearch = async (search) => {

  const res = await NET("GET", `returGudang/search?keyword=${search}`, {})
  
  return res
  
}

//pembelian

export const getPembelian = async (search) => {

  const res = await NET("GET", `pembelian/getPembelian?pembelian_code=${search}`, {})
  
  return res
  
}