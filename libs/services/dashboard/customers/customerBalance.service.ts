import { useProxyManager } from '@cryptobigbang-core';

export const CustomerBalanceService = () => { 
    const {httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/balance/";
    
    const getCustomerAccounts =(identityUserId:string):Promise<any>=>{
        return httpGetAxios(`${baseUrl}accounts/${identityUserId}`);
    }  
    // const getCustomerAccountHistory =(identityUserId:string):Promise<any>=>{
    //     return httpGetAxios(`${baseUrl}accounts/${identityUserId}`);
    // } 
    return {
        baseUrl,
        getCustomerAccounts
    }
 
} 