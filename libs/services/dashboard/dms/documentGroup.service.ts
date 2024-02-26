import { useProxyManager } from '@cryptobigbang-core';

export const DocumentGroupService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/dms/document-definitions/groups";
    
    const addDocumentGroup =(values:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}`, values);
    }
    const editDocumentGroup =(groupCode : string,values:any)=>{
        return httpPutAxios(`${baseUrl}/${groupCode}`, values);
    }
    const deleteDocumentGroup=(groupCode : string)=>{
        return httpDeleteAxios(`${baseUrl}/${groupCode}`);
    }
    const getDocumentGroup = (groupCode: String) => {
        return  httpGetAxios(`${baseUrl}/${groupCode}`);
    }

    return {
        baseUrl,
        addDocumentGroup,
        editDocumentGroup,
        deleteDocumentGroup,
        getDocumentGroup
    }
 
} 