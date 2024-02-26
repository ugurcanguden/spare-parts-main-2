import { useProxyManager } from '@cryptobigbang-core';

export const ScopeKeyService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/catalog/backofficescopekey";
    
    const addScopeKey =(value:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}`,value);
    }  
    const editScopeKey =(id:string,value:any):Promise<any>=>{
        return httpPutAxios(`${baseUrl}/${id}`,value);
    }   
    const deleteScopeKey =(id:string):Promise<any>=>{
        return httpDeleteAxios(`${baseUrl}/${id}`);
    }   
    return {
        baseUrl,
        addScopeKey,
        editScopeKey, 
        deleteScopeKey 
    }
 
} 