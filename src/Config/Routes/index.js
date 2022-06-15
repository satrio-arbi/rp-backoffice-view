import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// import { Redirect } from 'react-router';
import { Login,Dashboard,DetailPenjualanStore } from '../../Page';
import PenjualanStore from '../../Component/table/PenjualanStore/index'
import PenjualanOffice from '../../Component/table/PenjualanOffice';
import FormPenjualanOffice from '../../Page/FormPenjualan';
import Pembelian from '../../Page/pembelian';
import MasterKatgori from '../../Page/MasterKategori';
import MasterTipe from '../../Page/MasterTipe';
import MasterUkuran from '../../Page/MasterUkuran';
import Pelanggan from '../../Page/pelanggan';
import Karyawan from '../../Page/karyawan';
import Pemasok from '../../Page/pemasok';
import PengirimanGudang from '../../Page/pengiriman/PengirimanGudang';
import PengirimanStore from '../../Page/pengiriman/PengirimanStore';
import PengirimanReturGudang from '../../Page/pengiriman/returGudang';
import ManajemenUser from '../../Page/ManajemenUser';
import PenerimaanByStore from '../../Page/penerimaan/ByStore';
import PenerimaanByOffice from '../../Page/penerimaan/ByOffice';
import PenerimaanByStoreOffice from '../../Page/penerimaan/ByStoreOffice';
import PenerimaanBySuplier from '../../Page/penerimaan/BySuplier';
import PenyimpananBarangMasuk from '../../Page/penyimpanan/BarangMasuk';
import PenyimpananBarangKeluar from '../../Page/penyimpanan/BarangKeluar';
import PenyimpananBarangOpname from '../../Page/penyimpanan/StockOpname';
import Produk from '../../Page/produk';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const accessToken = localStorage.getItem("rd-prjt");

	return (
		<Route
			{...rest}
			render={(props) =>
				accessToken ? <Component {...props} /> : <Redirect to='/' />
			}
		/>
	);
};

const RouteBefore = ({ component: Component, ...rest }) => {
	const accessToken = localStorage.getItem("rd-prjt");

	return (
		<Route
			{...rest}
			render={(props) =>
				!accessToken ? <Component {...props} /> : <Redirect to='/dashboard' />
			}
		/>
	);
};


function Routes() {
  return (
    // <Router>
      <Switch>
        <RouteBefore exact path='/' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/penjualan-store' component={PenjualanStore}/>
        <PrivateRoute exact path='/penjualan-office' component={PenjualanOffice}/>
    
        <PrivateRoute exact path='/pembelian' component={Pembelian}/>
        <PrivateRoute exact path='/master/kategori' component={MasterKatgori}/>
        <PrivateRoute exact path='/master/tipe' component={MasterTipe}/>
        <PrivateRoute exact path='/master/ukuran' component={MasterUkuran}/>
        <PrivateRoute exact path='/pelanggan' component={Pelanggan}/>
        <PrivateRoute exact path='/karyawan' component={Karyawan}/>
        <PrivateRoute exact path='/pemasok' component={Pemasok}/>
        <PrivateRoute exact path='/manajemen-user' component={ManajemenUser}/>
        <PrivateRoute exact path='/produk' component={Produk}/>
        <PrivateRoute exact path='/pengiriman/gudang' component={PengirimanGudang}/>
        <PrivateRoute exact path='/pengiriman/store' component={PengirimanStore}/>
        <PrivateRoute exact path='/pengiriman/retur-gudang' component={PengirimanReturGudang}/>
        <PrivateRoute exact path='/penerimaan/ByStore' component={PenerimaanByStore}/>
        <PrivateRoute exact path='/penerimaan/ByOffice' component={PenerimaanByOffice}/>
        <PrivateRoute exact path='/penerimaan/ByStoreOffice' component={PenerimaanByStoreOffice}/>
        <PrivateRoute exact path='/penerimaan/BySuplier' component={PenerimaanBySuplier}/>
        <PrivateRoute exact path='/penyimpanan/barang-masuk' component={PenyimpananBarangMasuk}/>
        <PrivateRoute exact path='/penyimpanan/barang-keluar' component={PenyimpananBarangKeluar}/>
        <PrivateRoute exact path='/penyimpanan/stock-opname' component={PenyimpananBarangOpname}/>
      </Switch>
  );
}

export default Routes;
