

export const getDataUserLogin = () => {
    if(typeof window === 'undefined') return null;
    
    return JSON.parse(localStorage?.getItem("rd-prjt"))
  }