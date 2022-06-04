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