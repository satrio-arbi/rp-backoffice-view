import axios from 'axios'


// import { useHistory } from 'react-router-dom';

export const logoutEvent = () => {
  
  
  if(typeof window === 'undefined') return;
  localStorage.clear()
  // window.location.href = "/";
}

export const NET = async (tipe, url, data, token, pin, isMultipart, isStream) => {
  const storedCreds = JSON.parse(localStorage.getItem("rd-prjt"));
  const BASE_URL = 'http://localhost:8282/'
  tipe = (tipe||"GET")
  url = (url||"")
  data = (data||{})
  token = (token||"")
  pin = (pin||"")
  isMultipart = (isMultipart||false)
  isStream = (isStream||false)

  let objectResponse = {
    status : true,
    data : {}
  }

  try {
   
    const res = await axios({
      method : tipe,      
      url : (BASE_URL+url),      
      data,
      responseType : (isStream)?"stream":"json",
      headers : {
        'Content-Type' : (isMultipart)?"multipart/form-data; boundary=awek":"application/json",
        // 'Authorization-pin' : pin,
        'Authorization':'Bearer '+ storedCreds?.token   
      }      
    }) 
    objectResponse.status = true
    objectResponse.data = res?.data     
 
  } 
  
  catch (error) {   
 
    if(/401/ig.test(error)){
      logoutEvent();    
    }
    objectResponse.status = false
    objectResponse.data = error?.response?.data    
  }

  return objectResponse

}