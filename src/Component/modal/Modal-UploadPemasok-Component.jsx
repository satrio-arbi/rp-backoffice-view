
import {
    Modal,Box,Button
   } from "@mui/material";
   import {alertSuccess} from '../../Component/alert/sweetalert'
   import React,{useState,useEffect,useRef} from 'react';
   import {uploadPemasok} from '../../Config/Api-new'
//  import  Input  from "../../Component/input";
 const ModalUploadPemasok =(props)=>{
     const [file,setFile] = useState(null)
     const [name,setName] = useState(null)
     const inputRefUploadImage = useRef(null)
     useEffect(()=>{
        setFile(null)
        setName(null)
     },[props?.open])
     const atChangeFile = async(e) => {
          
        const fileStrem = e.target?.files[0];   
        setFile(fileStrem);
        const reader = new FileReader();        
        reader.addEventListener('load', function(){      
          // setImageAddress(this.result);
        });
        reader.readAsDataURL(fileStrem);
        console.log({fileStrem})
        setName(fileStrem?.name)
        let res = await uploadPemasok(fileStrem)
        if(res?.status){
            props?.onClickOpen()
            props?.mutate()
            alertSuccess('Success','')
            
        }
        
      }
      const atClickUploadHandler = async () => {
       
        inputRefUploadImage?.current?.click()
      }
     return (
         <>
         
         <Modal
             open={props?.open}
             onClose={props?.onClickOpen}
             aria-labelledby="parent-modal-title"
             aria-describedby="parent-modal-description"
             >
             <Box sx={{      position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         width: '90%',
         height:'90%',
         bgcolor: 'background.paper',
         border: '2px solid #000',
         boxShadow: 24,
         p: 4, }}>
                 <h2 id="parent-modal-title">Upload Master Produk</h2>
                 <div>
                     <p>Upload Master Produk</p>
                     <p>{name}</p>
                     {/* <Button 
                     style={{marginTop:10}}
                     onClick={()=>atClickUploadHandler()}
                     variant="contained">Chose file</Button>
                     <input   onChange={(e)=>atChangeFile(e)} 
                     accept="
                     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                     application/vnd.ms-excel
                     " type="file" 
                     hidden
                     ref={inputRefUploadImage}
                     /> */}
                     <Button
                    variant="contained"
                    component="label"
                    onChange={(e)=>atChangeFile(e)} 
                    >
                    Upload File
                    <input
                    accept="
                    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                    application/vnd.ms-excel
                    " 
                        type="file"
                        hidden
                    />
                    </Button>
                     {/* <Input 
                     value={name}
                     disable={false}
                     type='file'
                     label={'Nama Kategori'}
                     onChange={(v)=>setName(v?.target?.value)}
                     style={{width:'100%'}}
                     /> */}
                     {/* <div style={{marginTop:10}}>
                         <Button onClick={()=>props?.submit(file)} variant="contained">Upload</Button>
                     </div> */}
                 </div>
                
             </Box>
             </Modal>
            
         </>
     )
 
 }
 export default ModalUploadPemasok