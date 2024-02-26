import { useProxyManager } from '@cryptobigbang-core';

export const CustomerService = () => { 
    const {httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/customer";
    
    const getCustomer =(id:string):Promise<any>=>{
        return httpGetAxios(`${baseUrl}?userId=${id}`);
    }
    const getCustomerTelephones =(identityUserId:string):Promise<any>=>{
        return httpGetAxios( `${baseUrl}/telephones/${identityUserId}`);
    }  

    return {
        baseUrl,
        getCustomer,
        getCustomerTelephones
    }
 
} 