import {NET} from './axios'


export const addKategori = async (kategori_name) => {
    const formData = new FormData();  
      formData.append('kategori_name',kategori_name)
    const res = await NET("POST", `master/kategori/add`, formData)
    
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