import { useProxyManager } from '@cryptobigbang-core';

export const ApplicationDefinitionService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/catalog/application-definitions";
    const get =()=>{
        return httpGetAxios(`${baseUrl}`);
    }

    const add =(value:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}`,value);
    }  
    const addApiDefinition =(applicationName:string,value:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}/${applicationName}/api-definitions`,value);
    }      
    return {
        baseUrl,
        get,
        add,
        addApiDefinition 
    }
 
} 