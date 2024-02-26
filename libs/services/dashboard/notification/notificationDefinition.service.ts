import { useProxyManager } from '@cryptobigbang-core';

export const NotificationDefinitionService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/notification/definitions";
    
    const addNotificationDefinition =(values:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}`, values);
    }
    const editNotificationDefinition =(id : string,values:any)=>{
        return httpPutAxios(`${baseUrl}/${id}`, values);
    }
    const deleteNotificationDefinition=(id : string)=>{
        return httpDeleteAxios(`${baseUrl}/${id}`);
    }    

    return {
        baseUrl,
        addNotificationDefinition,
        editNotificationDefinition,
        deleteNotificationDefinition, 
    }
 
} 