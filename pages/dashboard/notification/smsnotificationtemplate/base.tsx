import { NotificationCommonService } from '@cryptobigbang-services'; 
const EmailNotificationTemplateBase = () => {
    const {getLanguageCodes} = NotificationCommonService(); 
    const getLanguageCodeOptions =async () :Promise<any[]> =>{
        var response = await getLanguageCodes();
        let item: any[] = [];
        response.forEach((codeItem:any) => {
            item.push({ value: codeItem.code, label: codeItem.code })
        });
        return item; 
    } 
    return {
        getLanguageCodeOptions
    }
}
export default EmailNotificationTemplateBase;
