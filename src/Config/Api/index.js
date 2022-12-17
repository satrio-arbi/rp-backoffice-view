import axios from "axios";
// import { BASE_URL } from '../env/index';
export const api = {
  login,
  getPenjualanStore,
  getPenjualanOffice,
  getPembelian,
  getPenyimpananKeluar,
  getPenyimpananMasuk,
  getStockOpname,
  getKaryawan,
  getPelanggan,
  getMasterAksesoris,
  getMasterKategori,
  getMasterProduk,
  getMasterProject,
  getMasterTipe,
  getMasterukuran,
  getStockOpname,
  getDetailPesanan,
  getAkuntansiKeuangan,
  getPemasok,
  postPemasok,
  searchPemasok,
  deletePemasok,
  importPemasok,
  updatePemasok,
  deletePemasok,
  getPelanggan,
  postPelanggan,
  searchPelanggan,
  deletePelanggan,
  importPelanggan,
  updatePelanggan,
  deletePelanggan,
  getAkuntansiLabaRugi,
  getDashboardBiaya,
  getDashboardBiayaPembelian,
  getDashboardJumlahCustomer,
  getDashboardJumlahProduct,
  getDashboardJumlahSupplier,
  getDashboardKeuntungan,
  getDashboardPembelian,
  getDashboardPendapatan,
  getDashboardPenjualan,
  getDashboardStockOffice,
  getDashboardStockStore,
  getJurnal,
  getJurnalUmum,
  getKaryawan,
  deleteDetailPesanan,
  deleteKaryawan,
  deletePenyimpananKeluar,
  deleteMasterKategori,
  deleteMasterAksesoris,
  deleteMasterProduk,
  deleteMasterProject,
  deleteMasterTipe,
  deleteMasteroffice,
  deleteMasterstore,
  deletePenjualanOffice,
  deletePenjualanStore,
  deletePenyimpananKeluar,
  deletePenyimpananMasuk,
  deleteStockOpname,
  addPenjualanStore,
  searchPenjualanStore,
  updatePenjualanStore,
  addPenjualanOffice,
  searchPenjualanOffice,
  updatePenjualanOffice,
  addPenyimpananKeluar,
  searchPenyimpananKeluar,
  updatePenyimpananKeluar,
  addStockOpname,
  searchPenyimpananMasuk,
  updatePenyimpananMasuk,
  searchStockOpname,
  updateStockOpname,
  searchMasterKategori,
  updateMasterKategori,
  addMasterAksesoris,
  searchMasterAksesoris,
  addMasterProduk,
  dropdownMasterProduk,
  importMasterProduk,
  searchMasterProduk,
  updateMasterProduk,
  addMasterTipe,
  searchMasterTipe,
  updateMasterTipe,
  addMasterProject,
  searchMasterProject,
  updateMasterProject,
  searchDetailPesanan,
  updateDetailPesanan,
  addJurnal,
  addKaryawan,
  karyawanImport,
  karyawanSearch,
  updateKaryawan,
  addMasterukuran,
  addMasteroffice,
  searchMasteroffice,
  updateMasteroffice,
  addMasterstore,
  searchMasterstore,
  updateMasterstore,
  deletePembelian,
};

const storedCreds = JSON.parse(localStorage.getItem("rd-prjt"));
const token = storedCreds?.token;
const BASE_URL = "http://localhost:8282/";

const logoutEvent = () => {
  if (typeof window === "undefined") return;
  localStorage.clear();
  window.location.href = "/";
};
const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
};
const defaultHeadersPost = {
  "Content-Type": "multipart/form-data",
  Authorization: "Bearer " + token,
};
async function login(data) {
  try {
    const url = `${BASE_URL}api/auth/login`;
    const headers = defaultHeaders;
    const response = await axios({
      method: "POST",
      url,
      data,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      // logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getPenjualanStore(params) {
  try {
    const url = `${BASE_URL}store/penjualan?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function addPenjualanStore(params, data) {
  try {
    const url = `${BASE_URL}store/add?${params}`;
    const headers = {
      ...defaultHeadersPost,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
      data,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deletePenjualanStore(params) {
  try {
    const url = `${BASE_URL}store/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchPenjualanStore(params) {
  try {
    const url = `${BASE_URL}store/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function updatePenjualanStore(params) {
  try {
    const url = `${BASE_URL}store/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getPenjualanOffice(params) {
  try {
    const url = `${BASE_URL}office/penjualan?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function addPenjualanOffice(params) {
  try {
    const url = `${BASE_URL}office/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deletePenjualanOffice(params) {
  try {
    const url = `${BASE_URL}office/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchPenjualanOffice(params) {
  try {
    const url = `${BASE_URL}office/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function updatePenjualanOffice(params) {
  try {
    const url = `${BASE_URL}office/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getPembelian(params) {
  try {
    const url = `${BASE_URL}pembelian/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deletePembelian(params) {
  try {
    const url = `${BASE_URL}pembelian/deletePembelian?id=${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getPenyimpananKeluar(params) {
  try {
    const url = `${BASE_URL}penyimpananKeluar/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function addPenyimpananKeluar(params) {
  try {
    const url = `${BASE_URL}penyimpananKeluar/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deletePenyimpananKeluar(params) {
  try {
    const url = `${BASE_URL}penyimpananKeluar/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchPenyimpananKeluar(params) {
  try {
    const url = `${BASE_URL}penyimpananKeluar/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function updatePenyimpananKeluar(params) {
  try {
    const url = `${BASE_URL}penyimpananKeluar/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getPenyimpananMasuk(params) {
  try {
    const url = `${BASE_URL}penyimpananMasuk/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function deletePenyimpananMasuk(params) {
  try {
    const url = `${BASE_URL}penyimpananMasuk/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchPenyimpananMasuk(params) {
  try {
    const url = `${BASE_URL}penyimpananMasuk/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function updatePenyimpananMasuk(params) {
  try {
    const url = `${BASE_URL}penyimpananMasuk/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getStockOpname(params) {
  try {
    const url = `${BASE_URL}stockOpname/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function addStockOpname(params, data) {
  try {
    const url = `${BASE_URL}stockOpname/${params}`;
    const headers = {
      ...defaultHeadersPost,
    };
    const response = await axios({
      method: "POST",
      url,
      data,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function deleteStockOpname(params) {
  try {
    const url = `${BASE_URL}stockOpname/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function searchStockOpname(params) {
  try {
    const url = `${BASE_URL}stockOpname/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function updateStockOpname(params) {
  try {
    const url = `${BASE_URL}stockOpname/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getKaryawan(params) {
  try {
    const url = `${BASE_URL}karyawan/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getPelanggan(params) {
  try {
    const url = `${BASE_URL}pelanggan/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function deleteMasterKategori(params) {
  try {
    const url = `${BASE_URL}master/kategori/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchMasterKategori(params) {
  try {
    const url = `${BASE_URL}master/kategori/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function updateMasterKategori(params) {
  try {
    const url = `${BASE_URL}master/kategori/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getMasterKategori(params) {
  try {
    const url = `${BASE_URL}master/kategori/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getMasterAksesoris(params) {
  try {
    const url = `${BASE_URL}master/aksesoris/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function addMasterAksesoris(params) {
  try {
    const url = `${BASE_URL}master/aksesoris/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deleteMasterAksesoris(params) {
  try {
    const url = `${BASE_URL}master/aksesoris/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchMasterAksesoris(params) {
  try {
    const url = `${BASE_URL}master/aksesoris/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function addMasterProduk(params) {
  try {
    const url = `${BASE_URL}master/product/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function deleteMasterProduk(params) {
  try {
    const url = `${BASE_URL}master/product/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function dropdownMasterProduk(params) {
  try {
    const url = `${BASE_URL}master/product/dropdown?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function importMasterProduk(params) {
  try {
    const url = `${BASE_URL}master/product/import?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function searchMasterProduk(params) {
  try {
    const url = `${BASE_URL}master/product/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getMasterProduk(params) {
  try {
    const url = `${BASE_URL}master/product/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function updateMasterProduk(params) {
  try {
    const url = `${BASE_URL}master/product/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getMasterTipe(params) {
  try {
    const url = `${BASE_URL}master/tipe/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function addMasterTipe(params) {
  try {
    const url = `${BASE_URL}master/tipe/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deleteMasterTipe(params) {
  try {
    const url = `${BASE_URL}master/tipe/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchMasterTipe(params) {
  try {
    const url = `${BASE_URL}master/tipe/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function updateMasterTipe(params) {
  try {
    const url = `${BASE_URL}master/tipe/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getMasterProject(params) {
  try {
    const url = `${BASE_URL}master/project/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function addMasterProject(params) {
  try {
    const url = `${BASE_URL}master/project/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deleteMasterProject(params) {
  try {
    const url = `${BASE_URL}master/project/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchMasterProject(params) {
  try {
    const url = `${BASE_URL}master/project/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function updateMasterProject(params) {
  try {
    const url = `${BASE_URL}master/project/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDetailPesanan(params) {
  try {
    const url = `${BASE_URL}detailPesanan/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getDashboardBiaya(params) {
  try {
    const url = `${BASE_URL}dashboard/biaya?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDashboardBiayaPembelian(params) {
  try {
    const url = `${BASE_URL}dashboard/biayaPembelian?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDashboardJumlahCustomer(params) {
  try {
    const url = `${BASE_URL}dashboard/jmlCustomer?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDashboardJumlahProduct(params) {
  try {
    const url = `${BASE_URL}dashboard/jmlProduct?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDashboardJumlahSupplier(params) {
  try {
    const url = `${BASE_URL}dashboard/jmlSupplier?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDashboardKeuntungan(params) {
  try {
    const url = `${BASE_URL}dashboard/keuntungan?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDashboardPembelian(params) {
  try {
    const url = `${BASE_URL}dashboard/pembelian?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDashboardPendapatan(params) {
  try {
    const url = `${BASE_URL}dashboard/pendapatan?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDashboardPenjualan(params) {
  try {
    const url = `${BASE_URL}dashboard/penjualan?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDashboardStockOffice(params) {
  try {
    const url = `${BASE_URL}dashboard/stockOffice?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getDashboardStockStore(params) {
  try {
    const url = `${BASE_URL}dashboard/stockStore?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function addDetailPesanan(params) {
  try {
    const url = `${BASE_URL}detailPesanan/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deleteDetailPesanan(params) {
  try {
    const url = `${BASE_URL}detailPesanan/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchDetailPesanan(params) {
  try {
    const url = `${BASE_URL}detailPesanan/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function updateDetailPesanan(params) {
  try {
    const url = `${BASE_URL}detailPesanan/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function addJurnal(params) {
  try {
    const url = `${BASE_URL}akuntansi/journal/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getJurnal(params) {
  try {
    const url = `${BASE_URL}akuntansi/journal/bukuBesar?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function getJurnalUmum(params) {
  try {
    const url = `${BASE_URL}akuntansi/journal/journalUmum?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function addKaryawan(params) {
  try {
    const url = `${BASE_URL}karyawan/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deleteKaryawan(params) {
  try {
    const url = `${BASE_URL}karyawan/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function karyawanImport(params) {
  try {
    const url = `${BASE_URL}karyawan/import?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function karyawanSearch(params) {
  try {
    const url = `${BASE_URL}karyawan/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function updateKaryawan(params) {
  try {
    const url = `${BASE_URL}karyawan/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getMasterukuran(params) {
  try {
    const url = `${BASE_URL}master/ukuran/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function addMasterukuran(params) {
  try {
    const url = `${BASE_URL}master/office/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function addMasteroffice(params) {
  try {
    const url = `${BASE_URL}master/office/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deleteMasteroffice(params) {
  try {
    const url = `${BASE_URL}master/office/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchMasteroffice(params) {
  try {
    const url = `${BASE_URL}master/office/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function updateMasteroffice(params) {
  try {
    const url = `${BASE_URL}master/office/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function addMasterstore(params) {
  try {
    const url = `${BASE_URL}master/store/add?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function deleteMasterstore(params) {
  try {
    const url = `${BASE_URL}master/store/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function searchMasterstore(params) {
  try {
    const url = `${BASE_URL}master/store/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
async function updateMasterstore(params) {
  try {
    const url = `${BASE_URL}master/store/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getAkuntansiLabaRugi(params) {
  try {
    const url = `${BASE_URL}akuntansi/labaRugi?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getAkuntansiKeuangan(params) {
  try {
    const url = `${BASE_URL}akuntansi/keuangan?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function getPemasok(params) {
  try {
    const url = `${BASE_URL}pemasok/all?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function postPemasok(params) {
  try {
    const url = `${BASE_URL}pemasok/add?${params}`;
    const headers = {
      ...defaultHeadersPost,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function deletePemasok(params) {
  try {
    const url = `${BASE_URL}pemasok/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function downloadPemasok(params) {
  try {
    const url = `${BASE_URL}pemasok/download?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function importPemasok(params) {
  try {
    const url = `${BASE_URL}pemasok/import?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function searchPemasok(params) {
  try {
    const url = `${BASE_URL}pemasok/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function updatePemasok(params) {
  try {
    const url = `${BASE_URL}pemasok/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function postPelanggan(params) {
  try {
    const url = `${BASE_URL}pelanggan/?${params}`;
    const headers = {
      ...defaultHeadersPost,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function deletePelanggan(params) {
  try {
    const url = `${BASE_URL}pelanggan/delete?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function downloadPelanggan(params) {
  try {
    const url = `${BASE_URL}pelanggan/download?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function importPelanggan(params) {
  try {
    const url = `${BASE_URL}pelanggan/import?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "POST",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function searchPelanggan(params) {
  try {
    const url = `${BASE_URL}pelanggan/search?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}

async function updatePelanggan(params) {
  try {
    const url = `${BASE_URL}pelanggan/update?${params}`;
    const headers = {
      ...defaultHeaders,
    };
    const response = await axios({
      method: "GET",
      url,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      //clearStoredCreds();
      logoutEvent();
    }
    return Promise.reject(error.response);
  }
}
