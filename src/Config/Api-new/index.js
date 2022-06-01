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