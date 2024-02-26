import { useProxyManager } from '@cryptobigbang-core';

export const ParameterGroupService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/catalog/parameters/groups";
    
    const addParameterGroup =(values:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}`, values);
    }
    const editParameterGroup =(id : string,values:any)=>{
        return httpPutAxios(`${baseUrl}/${id}`, values);
    }
    const deleteParameterGroup =(groupCode : string)=>{
        return httpDeleteAxios(`${baseUrl}/${groupCode}`);
    }
    const getParameterGroup = (groupCode: String) => {
        return  httpGetAxios(`${baseUrl}/${groupCode}`);
    }

    return {
        baseUrl,
        addParameterGroup,
        editParameterGroup,
        deleteParameterGroup,
        getParameterGroup
    }
 
} 