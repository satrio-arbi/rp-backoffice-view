
import {
   Modal,Box,Button
  } from "@mui/material";
  
  import React,{useState,useEffect} from 'react';
import  Input  from "../../Component/input";
const ModalAddBank =(props)=>{
    const [acc_number,setAcc_number] = useState('')
    const [owner_name,setOwner_name] = useState('')
    const [bank_name,setBank_name] = useState('')
    const [image,setImage] = useState('')
    const [imageAddress,setImageAddress] = useState(null)
    
    useEffect(()=>{
        setAcc_number('')
        setOwner_name('')
        setBank_name('')
        setImage('')
        setImageAddress(null)
    },[props?.open])
    const atChangeFile = async(e) => {
          
        const fileStrem = e.target?.files[0];   
        setImage(fileStrem);
        const reader = new FileReader();        
        reader.addEventListener('load', function(){      
          setImageAddress(this.result);
        });
        reader.readAsDataURL(fileStrem);
        let a = fileStrem instanceof Blob
        console.log({fileStrem,a})
        
        // setName(fileStrem?.name)
       
        
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
        overflow: "hidden",
        overflowY: "scroll",
        width: '90%',
        height:'90%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4, }}>
                <h2 id="parent-modal-title">Add Bank</h2>
                <div>
                    {/* <p>Nama Kategori</p> */}
                    <Input 
                    value={acc_number}
                    disable={false}
                    label={'Nomor Account'}
                    onChange={(v)=>setAcc_number(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                      <Input 
                    value={owner_name}
                    disable={false}
                    label={'Nama Owner'}
                    onChange={(v)=>setOwner_name(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />
                      <Input 
                    value={bank_name}
                    disable={false}
                    label={'Nama Bank'}
                    onChange={(v)=>setBank_name(v?.target?.value)}
                    style={{width:'100%',marginTop:10}}
                    />

                      {imageAddress?
                    <img style={{marginTop:10}} 
                    src={imageAddress} 
                    height="400px" width="100%"/>
                    :null}
                       <Button
                    variant="contained"
                    component="label"
                    style={{marginTop:10}}
                    onChange={(e)=>atChangeFile(e)} 
                    >
                    Upload Image
                    <input
                 
                        type="file"
                        hidden
                    />
                    </Button>
                    
                    
                    <div style={{marginTop:10}}>
                        <Button onClick={()=>props?.submit(acc_number,owner_name,bank_name,image)} variant="contained">Save</Button>
                    </div>
                </div>
               
            </Box>
            </Modal>
           
        </>
    )

}
export default ModalAddBank