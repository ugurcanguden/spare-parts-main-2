import { useProxyManager } from '@cryptobigbang-core';

export const SmsNotificationTemplateService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/notification/sms-template";
    
    const addSmsNotificationTemplate =(notificationDefinitionId:string,values:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}/by-notification-def-id/${notificationDefinitionId}`, values);
    }
    const editSmsNotificationTemplate =(id : string,values:any)=>{
        return httpPutAxios(`${baseUrl}/${id}`, values);
    }
    const deleteSmsNotificationTemplate=(id : string)=>{
        return httpDeleteAxios(`${baseUrl}/${id}`);
    }    

    return {
        baseUrl,
        addSmsNotificationTemplate,
        editSmsNotificationTemplate,
        deleteSmsNotificationTemplate, 
    }
 
} 