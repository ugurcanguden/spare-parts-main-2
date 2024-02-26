import { useProxyManager } from '@cryptobigbang-core';

export const NotificationCommonService = () => { 
    const {httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/notification/";
     
    const getLanguageCodes = () => {
        return  httpGetAxios(`${baseUrl}language-codes`);        
    }

    return {
        getLanguageCodes
    }
 
} 