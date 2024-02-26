import { useProxyManager } from '@cryptobigbang-core';

export const ParameterService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/catalog/parameters";

    const addParameter =(values:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}`, values);  
    }
    const editParameter =(groupCode : string,parameterCode : string,values:any)=>{
        return httpPutAxios(`${baseUrl}/${groupCode}/${parameterCode}`, values);
    }
    const deleteParameter =(groupCode : string,parameterCode:string)=>{
        return httpDeleteAxios(`${baseUrl}/${groupCode}/${parameterCode}`);
    }
    const getParameter = (groupCodeValue: string, parameterCodeValue: string) => {
        return  httpGetAxios(`${baseUrl}/${groupCodeValue}/${parameterCodeValue}`);
    }
    const getParameters = (groupCodeValue: string) => {
        return  httpGetAxios(`${baseUrl}/common/${groupCodeValue}`);
    }

    return {
        baseUrl,
        addParameter,
        editParameter,
        deleteParameter,
        getParameter,
        getParameters
    }
 
} 