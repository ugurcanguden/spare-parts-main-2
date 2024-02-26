import { useProxyManager } from '@cryptobigbang-core';

export const EmailNotificationTemplateService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/notification/email-template";
    
    const addEmailNotificationTemplate =(notificationDefinitionId:string,values:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}/by-notification-def-id/${notificationDefinitionId}`, values);
    }
    const editEmailNotificationTemplate =(id : string,values:any)=>{
        return httpPutAxios(`${baseUrl}/${id}`, values);
    }
    const deleteEmailNotificationTemplate=(id : string)=>{
        return httpDeleteAxios(`${baseUrl}/${id}`);
    }    

    return {
        baseUrl,
        addEmailNotificationTemplate,
        editEmailNotificationTemplate,
        deleteEmailNotificationTemplate, 
    }
 
} 