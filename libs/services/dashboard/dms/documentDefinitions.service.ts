import { useProxyManager } from '@cryptobigbang-core';

export const DocumentDefinitionsService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/dms/documents-definitions";
    
    const addDocument =(groupCode:string,values:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}/${groupCode}`, values);
    }
    const editDocument =(groupCode : string,values:any)=>{
        return httpPutAxios(`${baseUrl}/${groupCode}`, values);
    }
    const deleteDocument=(id : string)=>{
        return httpDeleteAxios(`${baseUrl}/${id}`);
    }
    const getContentTypes=()=>{
        return httpGetAxios(`/api/dms/documents/content-types`);
    }

    return {
        baseUrl,
        addDocument,
        editDocument,
        deleteDocument,
        getContentTypes
    }
 
} 