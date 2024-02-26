import { useProxyManager } from '@cryptobigbang-core';

export const WhitelistEmailService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = '/api/notification/email-whitelist';
    
    const addWhitelistEmail =(values:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}`, values);
    }
    const editWhitelistEmail =(values:any)=>{
        return httpPutAxios(`${baseUrl}`, values);
    }
    const deleteWhitelistEmail=(email : string)=>{
        return httpDeleteAxios(`${baseUrl}/${email}`);
    }    

    return {
        baseUrl,
        addWhitelistEmail,
        editWhitelistEmail,
        deleteWhitelistEmail, 
    }
 
} 