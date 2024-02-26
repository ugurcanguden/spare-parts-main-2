import { useProxyManager } from '@cryptobigbang-core';

export const VaultService = () => { 
    const {httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/vault";
    
    const getCustomerCryptoAddresses =(id:string):Promise<any>=>{
        return httpGetAxios(`${baseUrl}/customer-crypto-addresses?customerId=${id}`);
    }

    return {
        baseUrl,
        getCustomerCryptoAddresses
    }
 
} 