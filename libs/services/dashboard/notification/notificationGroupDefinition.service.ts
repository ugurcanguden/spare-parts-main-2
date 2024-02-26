import { useProxyManager } from '@cryptobigbang-core';

export const NotificationGroupDefinitionService = () => { 
    const { httpPostAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/notification/group-definitions";
    
    const addeditNotificationDefinition =(values:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}`, values);
    } 
    const deleteNotificationDefinition=(groupCode : string)=>{
        return httpDeleteAxios(`${baseUrl}/${groupCode}`);
    }    
    const getNotificationDefinition=(groupCode : string)=>{
        return httpGetAxios(`${baseUrl}/${groupCode}`);
    } 
    return {
        baseUrl,
        addeditNotificationDefinition,
        deleteNotificationDefinition, 
        getNotificationDefinition
    }
 
} 