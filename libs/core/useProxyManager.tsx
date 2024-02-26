import { message } from 'antd';
import axios from 'axios';
import { isNullOrEmptyString } from 'guden-core';
import { stringify } from 'querystring';
import { useState } from 'react'; 

const useProxyManager = () => { 
   const apiUrl = process.env.NEXT_PUBLIC_GATEWAY_URI;
  const [apiCallCount, setApiCallCount] = useState(0);

  const sendHttpRequest = async (method:string, endpoint:string, data:any, showSpinner = true,responseType:string = "")=> {
    if (showSpinner) {
      setApiCallCount(count => count + 1);
    }

    try {   
      //const headers = { Authorization: user?.access_token ? `Bearer ${user?.access_token}` : undefined };

      let axiosItem:any ={
        method,
        url: `${apiUrl}${endpoint}`,
        data
        //,        headers 
      } ; 
      if(!isNullOrEmptyString(responseType)){
        axiosItem = {
          ...axiosItem,
          responseType : responseType
        }
      }
      
      const response = await axios(axiosItem);

      if (showSpinner) {
        setApiCallCount(count => count - 1);
      }
      return isNullOrEmptyString(responseType) ? response.data : response;
    } catch (error:any) { 
      if(error.response?.data?.IsBusinessError){
        message.error(error.response.data.Message); 
        return error.response.data;
      }
      throw error;
    }
    finally{
      if (showSpinner) {
        setApiCallCount(count => count - 1);
      }
    }
  };

  const httpGetAxios = async (endpoint:string, showSpinner = true) => {
    return sendHttpRequest('GET', endpoint, null, showSpinner);
  };

  const httpPutAxios = async (endpoint:string, data:any, showSpinner = true) => {
    return sendHttpRequest('PUT', endpoint, data, showSpinner);
  };
  const httpPostAxios = async (endpoint:string, data:any, showSpinner = true) => {
    return sendHttpRequest('POST', endpoint, data, showSpinner);
  };

  const httpDeleteAxios = async (endpoint:string, showSpinner = true) => {
    return sendHttpRequest('DELETE', endpoint, null, showSpinner);
  };
  const httpGetMediaAxios = async (endpoint:string, showSpinner = true,responseType :string) => {
    return sendHttpRequest('GET', endpoint, null, showSpinner,responseType);
  };
  // Diğer fonksiyonları da benzer şekilde oluşturabilirsiniz.

  return {
    httpGetAxios,
    httpPutAxios,
    httpPostAxios,
    httpDeleteAxios, 
    httpGetMediaAxios,
    apiCallCount,
  };
}; 
 
export default useProxyManager;