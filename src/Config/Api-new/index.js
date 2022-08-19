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
//stock per store

export const getStockPerStoreStockAkhir = async (id) => {

  const res = await NET("GET", `stockPerStore/allStockPerStore?id_store=${id}`, {})
  
  return res
  
}
export const getStockPerStoreKeluar= async (id,str,end) => {

  const res = await NET("GET", `stockPerStore/storeKeluar?id_store=${id}&date_from=${str}&date_to=${end}`, {})
  
  return res
  
}
export const getStockPerStoreMasuk= async (id,str,end) => {

  const res = await NET("GET", `stockPerStore/storeMasuk?id_store=${id}&date_from=${str}&date_to=${end}`, {})
  
  return res
  
}
export const getStockPerStore = async () => {

  const res = await NET("GET", `stockPerStore/allStock`, {})
  
  return res
  
}

//akutansi
export const getDaftarAkun = async () => {

  const res = await NET("GET", `akutansi/coa/all`, {})
  
  return res
  
}

export const addDaftarAkun = async (data) => {

  const res = await NET("POST", `akutansi/coa/add`, data)
  
  return res
  
}
export const updateDaftarAkun = async (data) => {

  const res = await NET("POST", `akutansi/coa/update`, data)
  
  return res
  
}

export const deleteDaftarAkun = async (id) => {

  const res = await NET("GET", `akutansi/coa/delete?id=${id}`, {})
  
  return res
  
}

export const dropdownDaftarAkun = async (data) => {

  const res = await NET("GET", `akutansi/coa/dropdown?noAkun=${data}`, )
  
  return res
  
}
export const getDaftarAkunSearch = async (search) => {

  const res = await NET("GET", `akutansi/coa/search?keyword=${search}`, )
  
  return res
  
}
export const importDaftarAkun = async (data) => {
  const res = await NET("POST", `akutansi/coa/import`, data, '', '',true)
  
  
  return res
  
}
export const jurnalAdd = async (data) => {
  const res = await NET("POST", `akutansi/journal/add`, data)
  // const res = await NET("POST", `akutansi/journal/add`, data)
  
  
  return res
  
}
export const jurnalBukuBesar= async (data) => {
  const res = await NET("GET", `akutansi/journal/bukuBesar?tanggal_akhir=${data?.tanggal_akhir}&tanggal_awal=${data?.tanggal_awal}&project=${data?.project}`, {})
  
  
  return res
  
}
export const jurnalUmum = async (data) => {
  const res = await NET("GET", `akutansi/journal/journalUmum?tanggal_akhir=${data?.tanggal_akhir}&tanggal_awal=${data?.tanggal_awal}`, {})
  
  
  return res
  
}
export const jurnalUupdate = async (data) => {
  const res = await NET("POST", `akutansi/journal/update`, data)
  
  
  return res
  
}
export const neracaSaldo = async (data) => {
  const res = await NET("GET", `akutansi/neracaSaldo?year=${data?.year}`, data)
  
  
  return res
  
}
export const labaRugi = async (data) => {
  const res = await NET("GET", `akutansi/labaRugi?year=${data?.year}`, {})
  
  
  return res
  
}
export const neracaKeuangan = async (data) => {
  const res = await NET("GET", `akutansi/neracaKeuangan?year=${data?.year}`, {})
  
  
  return res
  
}
//store
export const getStore = async () => {

  const res = await NET("GET", `master/store/all`, {})
  
  return res
  
}
export const getStoreSearch = async (search) => {

  const res = await NET("GET", `master/store/search?keyword=${search}`, {})
  
  return res
  
}
export const getStoreAdd = async (data) => {

  const res = await NET("POST", `master/store/add`, data)
  
  return res
  
}
export const getStoreUpdate = async (data) => {

  const res = await NET("POST", `master/store/update`, data)
  
  return res
  
}
export const getStoreDelete = async (id) => {

  const res = await NET("GET", `master/store/delete?id=${id}`, {})
  
  return res
  
}
//office
export const getOffice = async () => {

  const res = await NET("GET", `master/office/all`, {})
  
  return res
  
}
export const getOfficeSearch = async (search) => {

  const res = await NET("GET", `master/office/search?keyword=${search}`, {})
  
  return res
  
}
export const getOfficeAdd = async (data) => {

  const res = await NET("POST", `master/office/add`, data)
  
  return res
  
}
export const getOfficeUpdate = async (data) => {

  const res = await NET("POST", `master/office/update`, data)
  
  return res
  
}
export const getOfficeDelete = async (id) => {

  const res = await NET("GET", `master/office/delete?id=${id}`, {})
  
  return res
  
}
//project
export const getProject = async () => {

  const res = await NET("GET", `master/project/all`, {})
  
  return res
  
}
export const getProjectSearch = async (search) => {

  const res = await NET("GET", `master/project/search?keyword=${search}`, {})
  
  return res
  
}
export const getProjectAdd = async (data) => {

  const res = await NET("POST", `master/project/add`, data)
  
  return res
  
}
export const getProjectUpdate = async (data) => {

  const res = await NET("POST", `master/project/update`, data)
  
  return res
  
}
export const getProjectDelete = async (id) => {

  const res = await NET("GET", `master/project/delete?id=${id}`, {})
  
  return res
  
}
//bank
export const getBank = async () => {

  const res = await NET("GET", `master/bank/all`, {})
  
  return res
  
}
export const getBankSearch = async (search) => {

  const res = await NET("GET", `master/bank/search?keyword=${search}`, {})
  
  return res
  
}
export const getBankAdd = async (data) => {

  const res = await NET("POST", `master/bank/add`, data)
  
  return res
  
}
export const getBankUpdate = async (data) => {

  const res = await NET("POST", `master/bank/update`, data)
  
  return res
  
}
export const getBankDelete = async (id) => {

  const res = await NET("GET", `master/bank/delete?id=${id}`, {})
  
  return res
  
}
//pelanggan
export const getPelanggan = async () => {

  const res = await NET("GET", `pelanggan/all`, {})
  
  return res
  
}
export const getPelangganSearch = async (search) => {

  const res = await NET("GET", `pelanggan/search?keyword=${search}`, {})
  
  return res
  
}
export const getPelangganAdd = async (data) => {

  const res = await NET("POST", `pelanggan/add`, data)
  
  return res
  
}
export const getPelangganUpdate = async (data) => {

  const res = await NET("POST", `pelanggan/update`, data)
  
  return res
  
}
export const getPelangganDelete = async (id) => {

  const res = await NET("GET", `pelanggan/delete?id=${id}`, {})
  
  return res
  
}
export const uploadPelanggan = async (file) => {
  const formData = new FormData();  
    formData.append('file',file)
  const res = await NET("POST", `pelanggan/import`, formData, '', '',true)
  
  return res
  
}
export const getDownloadPelanggan = async () => {

  const res = await NET("GET", `pelanggan/download`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `pelanggan_${new Date()}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
//pemasok
export const getPemasok = async () => {

  const res = await NET("GET", `pemasok/all`, {})
  
  return res
  
}
export const getPemasokSearch = async (search) => {

  const res = await NET("GET", `pemasok/search?keyword=${search}`, {})
  
  return res
  
}
export const getPemasokAdd = async (data) => {

  const res = await NET("POST", `pemasok/add`, data)
  
  return res
  
}
export const getPemasokUpdate = async (data) => {

  const res = await NET("POST", `pemasok/update`, data)
  
  return res
  
}
export const getPemasokDelete = async (id) => {

  const res = await NET("GET", `pemasok/delete?id=${id}`, {})
  
  return res
  
}
export const uploadPemasok = async (file) => {
  const formData = new FormData();  
    formData.append('file',file)
  const res = await NET("POST", `pemasok/import`, formData, '', '',true)
  
  return res
  
}
export const getDownloadPemasok = async () => {

  const res = await NET("GET", `pemasok/download`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `pemasok_${new Date()}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
//penjualan store
export const getPenjualanStore = async () => {

  const res = await NET("GET", `store/penjualan`, {})
  
  return res
  
}
export const getPenjualanStorePerStore = async (id) => {

  const res = await NET("GET", `store/penjualanPerStore?id_store=${id}`, {})
  
  return res
  
}
//penjualan office
export const getPenjualanOffice = async () => {

  const res = await NET("GET", `office/penjualan`, {})
  
  return res
  
}
export const getPenjualanOfficeSearch = async (search) => {

  const res = await NET("GET", `office/search?keyword=${search}`, {})
  
  return res
  
}
export const getPenjualanOfficeAdd = async (data) => {

  const res = await NET("POST", `office/add`, data)
  
  return res
  
}
export const getPenjualanOfficeUpdate = async (data) => {

  const res = await NET("POST", `office/update`, data)
  
  return res
  
}
export const getPenjualanOfficeDelete = async (id) => {

  const res = await NET("GET", `office/delete?id=${id}`, {})
  
  return res
  
}
export const getDownloadInvoicePEnjualanOffice = async (data) => {

  const res = await NET("GET", `report/invoice?id_office=${data?.office}&id_transaksi=${data?.trx}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `pelanggan_${new Date()}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  // console.log({link})
  
}
//dashboard
export const getBiaya = async () => {

  const res = await NET("GET", `dashboard/biaya`, {})
  
  return res
  
}
export const getPenukaran = async () => {

  const res = await NET("GET", `dashboard/penukaran`, {})
  
  return res
  
}
export const getBiayaPembelian = async () => {

  const res = await NET("GET", `dashboard/biayaPembelian`, {})
  
  return res
  
}
export const getJmlCostumer = async () => {

  const res = await NET("GET", `dashboard/jmlCustomer`, {})
  
  return res
  
}
export const getJmlProduct = async () => {

  const res = await NET("GET", `dashboard/jmlProduct`, {})
  
  return res
  
}
export const getJmlSupplier = async () => {

  const res = await NET("GET", `dashboard/jmlSupplier`, {})
  
  return res
  
}
export const getKeuntungan = async () => {

  const res = await NET("GET", `dashboard/keuntungan`, {})
  
  return res
  
}
export const getPembelianDashboard = async () => {

  const res = await NET("GET", `dashboard/pembelian`, {})
  
  return res
  
}
export const getPendapatan = async () => {

  const res = await NET("GET", `dashboard/pendapatan`, {})
  
  return res
  
}
export const getPenjualan = async () => {

  const res = await NET("GET", `dashboard/penjualan`, {})
  
  return res
  
}
export const getStockStore = async () => {

  const res = await NET("GET", `dashboard/stockStore`, {})
  
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
    formData.append('artikel_product',artikel_produk)
    formData.append('artikel_frame',artikel_frame)
    formData.append('nama_product',nama_produk)
    formData.append('artikel_lens',artikel_lens)
    formData.append('harga_jual',harga_jual)
    formData.append('sku_code',sku_code)
    formData.append('remarks',remarks)
    formData.append('nama_kategori',nama_kategori)
    formData.append('image',image)
  const res = await NET("POST", `master/product/update`, formData)
  
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
export const getPembelianAll = async () => {

  const res = await NET("GET", `pembelian/all`, {})
  
  return res
  
}
export const deletePembelianAll = async (id) => {

  const res = await NET("GET", `pembelian/deletePembelian?id=${id}`, {})
  
  return res
  
}
export const getPembelianAdd = async (data) => {

  const res = await NET("POST", `pembelian/add`, data)
  
  return res
  
}
export const getPembelianSearch = async (search) => {

  const res = await NET("GET", `pembelian/search?keyword=${search}`, {})
  
  return res
  
}
export const getPembelianUpdate = async (data) => {

  const res = await NET("POST", `pembelian/update`, data)
  
  return res
  
}
//report 
export const geReportBestArticleByOffice = async (start,end,id) => {

  const res = await NET("GET", `report/bestArticleByOffice?date_from=${start}&date_to=${end}&id_office=${id}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `best_article_by_office_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportBestArticleByStore = async (start,end,id) => {

  const res = await NET("GET", `report/bestArticleByStore?date_from=${start}&date_to=${end}&id_store=${id}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `best_article_by_store_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportLaporanPembelian = async (start,end) => {

  const res = await NET("GET", `report/laporanPembelian?date_from=${start}&date_to=${end}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `laporan_pembelian_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportBarangMasuk = async (start,end) => {

  const res = await NET("GET", `report/penyimpananMasuk?date_from=${start}&date_to=${end}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `barang_masuk_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportBarangKeluar = async (start,end) => {

  const res = await NET("GET", `report/penyimpananKeluar?date_from=${start}&date_to=${end}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `barang_keluar_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportPengirimanStoretoStore = async (start,end) => {

  const res = await NET("GET", `report/pengirimanStoreToStore?date_from=${start}&date_to=${end}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `pengiriman_store_to_store_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportPengirimanOfficetoStore = async (start,end) => {

  const res = await NET("GET", `report/pengirimanGudangToStore?date_from=${start}&date_to=${end}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `pengiriman_office_to_store_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportPenerimaanFromStore = async (start,end) => {

  const res = await NET("GET", `report/penerimaanByStore?date_from=${start}&date_to=${end}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `penerimaan_store_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportPenerimaanFromSupplier = async (start,end) => {

  const res = await NET("GET", `report/penerimaanBySupplier?date_from=${start}&date_to=${end}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `penerimaan_supplier_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}

export const geReportPengirimanGudangToStore = async (start,end) => {

  const res = await NET("GET", `report/pengirimanGudangToStore?date_from=${start}&date_to=${end}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `pengiriman_gudang_to_store_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportPengirimanStoreToStore = async (start,end) => {

  const res = await NET("GET", `report/pengirimanStoreToStore?date_from=${start}&date_to=${end}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `pengiriman_store_to_store_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportPurchaseStoreByArticle = async (start,end,artikel) => {

  const res = await NET("GET", `report/purchaseStoreByArticle?date_from=${start}&date_to=${end}&artikel=${artikel}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `purchase_store_by_artikel_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportPurchaseStoreBySummary= async (start,end,hp) => {

  const res = await NET("GET", `report/purchaseStoreBySummary?date_from=${start}&date_to=${end}&no_hp_pelanggan=${hp}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `purchase_store_by_summary_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportSalesByOffice= async (start,end,id) => {

  const res = await NET("GET", `report/salesByOffice?date_from=${start}&date_to=${end}&id_office=${id}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `sales_by_office_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}
export const geReportStockOpname= async (start,end) => {

  const res = await NET("GET", `report/stockOpname?date_from=${start}&date_to=${end}`, {}
  ,'','','','blob')
  let a = res?.data
  
  const url = window.URL.createObjectURL(new Blob([a]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `stock_opname_${start}_${end}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();
  console.log({link})
  
}