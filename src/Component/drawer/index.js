import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Routes from '../../Config/Routes';
import logo from '../../assets/logo.png'
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import { Avatar, Menu, MenuItem, Paper } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {getDataUserLogin} from '../../Config/helper/localStorage'
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  background: "rgb(81, 94, 193)",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const Name = JSON.parse(localStorage.getItem("rd-prjt"));
  const usr = getDataUserLogin()
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
console.log({aks:usr?.akses_modul})
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{
            position: "absolute",
            right: 0,
            display: "flex",
            cursor: "pointer"
          }}
            onClick={handleClick}
          >
            <Avatar style={{textTransform:"capitalize"}}>{Name.namaPengguna.charAt(0)}</Avatar>
            <Typography style={{ fontSize: "25px", marginLeft: "25px", textTransform:"capitalize" }}>{Name.namaPengguna}</Typography>
            <KeyboardArrowDownIcon style={{ fontSize: "35px", marginLeft: "25px" }} />
          </div>
          <Paper>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{ width: 320, maxWidth: '100%' }}
            >
              <MenuItem onClick={handleClose}><AccountCircleIcon style={{ marginRight: "15px" }} />Profile</MenuItem>
              <MenuItem onClick={() => {
                handleClose();
                history.push('/')
                localStorage.removeItem('rd-prjt')
                window.location.reload();
              }}><LogoutIcon style={{ marginRight: "15px" }} />Logout</MenuItem>
            </Menu>
          </Paper>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: "rgb(81, 94, 193)",
            color: "#FFF"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img src={logo} alt="pic" style={{ width: "80%" }} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List style={{cursor:"pointer"}}>
          <ListItem>
            <div>
              <ListItem Button onClick={() => {
                history.push('/dashboard')
              }}>
                <Icon icon="bx:bxs-dashboard" style={{ fontSize: "25px", marginRight: "5px" }} />
                <Typography>Dashboard</Typography>
              </ListItem>
              <ListItem Button onClick={() => {
                history.push('/stock-per-store')
              }}>
                <Icon icon="bx:bxs-dashboard" style={{ fontSize: "25px", marginRight: "5px" }} />
                <Typography>Stock per store</Typography>
              </ListItem>
              {!usr?.akses_modul?.includes('MM-1')?
                <Accordion>
                <div style={{ position: "relative", width: "100%" }}>
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Icon icon="tabler:discount-2" style={{ fontSize: "25px", marginRight: "5px" }} />
                    <Typography>Penjualan</Typography>
                    <ExpandMoreIcon style={{
                      position: "absolute",
                      right: 0
                    }} />
                  </AccordionSummary>
                </div>
                <AccordionDetails>
              
                  <List style={{cursor:"pointer"}}>
                  {!usr?.akses_modul?.includes('MM-2')?
                    <ListItem onClick={() => {
                      history.push('/penjualan-store')
                    }}>
                      <ListItemText primary="Penjualan Store" />
                    </ListItem>
                    :null}
                     {!usr?.akses_modul?.includes('MM-3')?
                    <ListItem onClick={() => {
                      history.push('/penjualan-office')
                    }}>
                      <ListItemText primary="Penjualan Office" />
                    </ListItem>
                    :null}
                  </List>
                </AccordionDetails>
              </Accordion>:null
              
            }
            {!usr?.akses_modul?.includes('MM-4')?
              <ListItem onClick={() => {
                history.push('/pembelian')
              }}>
                <Icon icon="icons8:buy" style={{ fontSize: "25px", marginRight: "5px" }} />
                <Typography>Pembelian</Typography>
              </ListItem>
              :null}
              {!usr?.akses_modul?.includes('MM-5')?
              <Accordion>
                <AccordionSummary

                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Icon icon="eos-icons:product-classes" style={{ fontSize: "25px", marginRight: "5px" }} />
                  <Typography>Penyimpanan</Typography>
                  <ExpandMoreIcon style={{
                    position: "absolute",
                    right: 0
                  }} />
                </AccordionSummary>
                <AccordionDetails>
                  <List style={{cursor:"pointer"}}>
                  {!usr?.akses_modul?.includes('MM-6')?
                    <ListItem onClick={() => {
                      history.push('/penyimpanan/barang-masuk')
                    }}>
                      <ListItemText primary="Barang Masuk" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-7')?
                    <ListItem onClick={() => {
                      history.push('/penyimpanan/barang-keluar')
                    }}>
                      <ListItemText primary="Barang Keluar" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-8')?
                    <ListItem onClick={() => {
                      history.push('/penyimpanan/stock-opname')
                    }}>
                      <ListItemText primary="Stock Opname" />
                    </ListItem>:null}
                  </List>
                </AccordionDetails>
              </Accordion>:null}
              {!usr?.akses_modul?.includes('MM-9')?
              <Accordion>
                <AccordionSummary

                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Icon icon="mdi:truck-delivery-outline" style={{ fontSize: "25px", marginRight: "5px" }} />
                  <Typography>Pengiriman</Typography>
                  <ExpandMoreIcon style={{
                    position: "absolute",
                    right: 0
                  }} />
                </AccordionSummary>
                <AccordionDetails>
                  <List style={{cursor:"pointer"}}>
                  {!usr?.akses_modul?.includes('MM-10')?
                    <ListItem onClick={() => {
                      history.push('/pengiriman/office-to-store')
                    }}>
                      <ListItemText primary="Dari Office ke Store" />
                    </ListItem>
                    :null}
                    {!usr?.akses_modul?.includes('MM-11')?
                    <ListItem onClick={() => {
                      history.push('/pengiriman/store')
                    }}>
                      <ListItemText primary="Dari Store ke Store" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-12')?
                    <ListItem onClick={() => {
                      history.push('/pengiriman/retur-gudang')
                    }}>
                      <ListItemText primary="Retur Gudang" />
                    </ListItem>:null}
                  </List>
                </AccordionDetails>
              </Accordion>:null}
              {!usr?.akses_modul?.includes('MM-13')?
              <Accordion>
                <AccordionSummary

                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Icon icon="ri:folder-received-line" style={{ fontSize: "25px", marginRight: "5px" }} />
                  <Typography>Penerimaan</Typography>
                  <ExpandMoreIcon style={{
                    position: "absolute",
                    right: 0
                  }} />
                </AccordionSummary>
                <AccordionDetails>
                  <List style={{cursor:"pointer"}}>
                  {!usr?.akses_modul?.includes('MM-14')?
                    <ListItem onClick={() => {
                      history.push('/penerimaan/ByOffice')
                    }}>
                      <ListItemText primary="Office from store" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-15')?
                    <ListItem onClick={() => {
                      history.push('/penerimaan/ByStoreOffice')
                    }}>
                      <ListItemText primary="Store from office" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-16')?
                    <ListItem onClick={() => {
                      history.push('/penerimaan/ByStore')
                    }}>
                      <ListItemText primary="Store from Store" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-17')?
                    <ListItem onClick={() => {
                      history.push('/penerimaan/BySuplier')
                    }}>
                      <ListItemText primary="By Supplier" />
                    </ListItem>:null}
                  </List>
                </AccordionDetails>
              </Accordion>:null}
              
              {!usr?.akses_modul?.includes('MM-27')?
              <Accordion>
                <AccordionSummary

                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Icon icon="akar-icons:shipping-box-v1" style={{ fontSize: "25px", marginRight: "5px" }} />
                  <Typography>Produk</Typography>
                  <ExpandMoreIcon style={{
                    position: "absolute",
                    right: 0
                  }} />
                </AccordionSummary>
                <AccordionDetails>
                  <List style={{cursor:"pointer"}}>
                  {!usr?.akses_modul?.includes('MM-28')?
                    <ListItem  onClick={() => {
                      history.push('/produk')
                    }}>
                      <ListItemText primary="Basic" />
                    </ListItem>:null}
                    {/* <ListItem>
                      <ListItemText primary="Custom" />
                    </ListItem> */}
                  </List>
                </AccordionDetails>
              </Accordion>:null}
              {!usr?.akses_modul?.includes('MM-29')?
              <ListItem onClick={() => {
                history.push('/pelanggan')
              }}>
                <Icon icon="clarity:group-solid" style={{ fontSize: "25px", marginRight: "5px" }} />
                <Typography>Pelanggan</Typography>
              </ListItem>
              :null}
              {!usr?.akses_modul?.includes('MM-30')?
              <ListItem onClick={() => {
                history.push('/karyawan')
              }}>
                <Icon icon="clarity:group-solid" style={{ fontSize: "25px", marginRight: "5px" }} />
                <Typography>Karyawan</Typography>
              </ListItem>:null}
              {!usr?.akses_modul?.includes('MM-31')?
              <ListItem onClick={() => {
                history.push('/pemasok')
              }}>
                <Icon icon="fa-solid:people-arrows" style={{ fontSize: "25px", marginRight: "5px" }} />
                <Typography>Pemasok</Typography>
              </ListItem>:null}
              {!usr?.akses_modul?.includes('MM-32')?
              <Accordion>
                <AccordionSummary 
                  aria-controls="panel2a-content"
                  id="panel2a-header">
                  <ListItem>
                    <Icon icon="carbon:report-data" style={{ fontSize: "25px", marginRight: "5px" }} />
                    <Typography>Laporan</Typography>
                    <ExpandMoreIcon style={{
                    position: "absolute",
                    right: 0
                  }} />
                  </ListItem>
                </AccordionSummary>
                <AccordionDetails>
                  <List style={{cursor:"pointer"}}>
                    <ListItem onClick={() => {
                      history.push('/laporan/all')
                    }}>
                      <ListItemText primary="Semua laporan" />
                    </ListItem>
                  </List>
               
                </AccordionDetails>
              </Accordion>:null}
              {!usr?.akses_modul?.includes('MM-18')?
              <Accordion>
                <AccordionSummary

                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Icon icon="mdi:cash-check" style={{ fontSize: "25px", marginRight: "5px" }} />
                  <Typography>Akuntansi</Typography>
                  <ExpandMoreIcon style={{
                    position: "absolute",
                    right: 0
                  }} />
                </AccordionSummary>
                <AccordionDetails>
                  <List style={{cursor:"pointer"}}>
                  {!usr?.akses_modul?.includes('MM-19')?
                     <List style={{cursor:"pointer"}}>
                     <ListItem onClick={() => {
                       history.push('/daftar-akutansi')
                     }}>
                       <ListItemText primary="Daftar Akun" />
                     </ListItem>
                   </List>:null}
                    {!usr?.akses_modul?.includes('MM-20')?
                    <List style={{cursor:"pointer"}}>
                    <ListItem onClick={() => {
                      history.push('/entri-jurnal')
                    }}>
                      <ListItemText primary="Entri Jurnal" />
                    </ListItem>
                  </List>:null}
                    {!usr?.akses_modul?.includes('MM-21')?
                    <ListItem>
                      <Accordion>
                        <AccordionSummary

                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography>Statment</Typography>
                          <ExpandMoreIcon style={{
                            position: "absolute",
                            right: 0
                          }} />
                        </AccordionSummary>
                        <AccordionDetails>
                          <List style={{cursor:"pointer"}}>
                          {!usr?.akses_modul?.includes('MM-22')?
                            <ListItem onClick={() => {
                              history.push('/journal-umum')
                            }}>
                              <ListItemText primary="Jurnal Umum" />
                            </ListItem>:null}
                            {!usr?.akses_modul?.includes('MM-23')?
                            <ListItem onClick={() => {
                              history.push('/buku-besar')
                            }}>
                              <ListItemText primary="Buku Besar" />
                            </ListItem>:null}
                            {!usr?.akses_modul?.includes('MM-24')?
                            <ListItem onClick={() => {
                              history.push('/neraca-saldo')
                            }}>
                              <ListItemText primary="Neraca Saldo" />
                            </ListItem>:null}
                            {!usr?.akses_modul?.includes('MM-25')?
                            <ListItem onClick={() => {
                              history.push('/laba-rugi')
                            }}>
                              <ListItemText primary="Laporan Laba Rugi" />
                            </ListItem>:null}
                            {!usr?.akses_modul?.includes('MM-26')?
                            <ListItem onClick={() => {
                              history.push('/neraca-keuangan')
                            }}>
                              <ListItemText primary="Neraca Keuangan" />
                            </ListItem>:null}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    </ListItem>:null}
                  </List>
                </AccordionDetails>
              </Accordion>:null}
             
              <Accordion>
                <AccordionSummary

                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Icon icon="ant-design:idcard-filled" style={{ fontSize: "25px", marginRight: "5px" }} />
                  <Typography>Master</Typography>
                  <ExpandMoreIcon style={{
                    position: "absolute",
                    right: 0
                  }} />
                </AccordionSummary>
                <AccordionDetails>
                  <List style={{cursor:"pointer"}}>
                  {!usr?.akses_modul?.includes('MM-48')?
                    <ListItem onClick={() => {
                      history.push('/master/kategori')
                    }}>
                      <ListItemText primary="Master Kategori" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-49')?
                    <ListItem onClick={() => {
                      history.push('/master/tipe')
                    }}>
                      <ListItemText primary="Master Tipe" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-50')?
                    <ListItem onClick={() => {
                      history.push('/master/store')
                    }}>
                      <ListItemText primary="Master Store" />
                    </ListItem>:null}
                    {/* <ListItem onClick={() => {
                      history.push('/master/Ukuran')
                    }}>
                      <ListItemText primary="Master Ukuran" />
                    </ListItem> */}
                    {!usr?.akses_modul?.includes('MM-51')?
                    <ListItem onClick={() => {
                      history.push('/master/office')
                    }}>
                      <ListItemText primary="Master Office" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-52')?
                    <ListItem
                     onClick={() => {
                      history.push('/master/project')
                    }}
                    >
                      <ListItemText primary="Master Project" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-53')?
                    <ListItem
                     onClick={() => {
                      history.push('/master/bank')
                    }}
                    >
                      <ListItemText primary="Master Bank" />
                    </ListItem>:null}
                    {/* <ListItem>
                      <ListItemText primary="Master Accessories" />
                    </ListItem> */}
                  </List>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary

                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Icon icon="carbon:user-settings" style={{ fontSize: "25px", marginRight: "5px" }} />
                  <Typography>Management User</Typography>
                  <ExpandMoreIcon style={{
                    position: "absolute",
                    right: 0
                  }} />
                </AccordionSummary>
                <AccordionDetails>
                  <List style={{cursor:"pointer"}}>
                  {!usr?.akses_modul?.includes('MM-54')?
                    <ListItem onClick={() => {
                      history.push('/manajemen-user')
                    }}>
                      <ListItemText primary="Management User" />
                    </ListItem>:null}
                    {!usr?.akses_modul?.includes('MM-55')?
                    <ListItem>
                      {/* <ListItemText primary="User Grup Pengguna" /> */}
                    </ListItem>
                    :null}
                  </List>
                </AccordionDetails>
              </Accordion>
            </div>
          </ListItem>
        </List>

      </Drawer>
      <Main open={open}>
        <Routes />
      </Main>

    </Box>
  );
}
