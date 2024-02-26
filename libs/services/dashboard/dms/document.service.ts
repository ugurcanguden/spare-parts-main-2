import { useProxyManager } from '@cryptobigbang-core';

export const DocumentService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios ,httpGetMediaAxios} = useProxyManager();
    const baseUrl : string = "/api/dms/documents/"; 
    const getCustomerDocuments = (customerId :string)=>{
        return httpGetAxios(`${baseUrl}by-customerId/${customerId}`)
    }
    const dowloadCustomerDocument = (documentId :string)=>{
        return httpGetMediaAxios(`${baseUrl}${documentId}/download`,true,'blob')
    }
    return {
        baseUrl,
        getCustomerDocuments,
        dowloadCustomerDocument
    }
 
} 