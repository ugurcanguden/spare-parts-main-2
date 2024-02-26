import { useProxyManager } from '@cryptobigbang-core';

export const CalendarService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/catalog/calendarholidays";
    const weekdayBaseUrl : string = "/api/catalog/calendarholidays/weekdays";
    const addCalendar =(alpha3Code:string,values:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}/by-countrycode/${alpha3Code}`, values);
    }
    const editCalendar =(id : string,values:any)=>{
        return httpPutAxios(`${baseUrl}/${id}`, values);
    }
    const deleteCalendar=(id : string)=>{
        return httpDeleteAxios(`${baseUrl}/${id}`);
    } 
    const getWeekdaysByAlpha3Code = (alpha3Code: String) => {
        return  httpGetAxios(`${weekdayBaseUrl}/${alpha3Code}`);
    } 
    const editWeekdays =(alpha3Code : string,values:any)=>{
        return httpPutAxios(`${weekdayBaseUrl}/by-countrycode/${alpha3Code}`, values);
    }
    return {
        baseUrl,
        addCalendar,
        editCalendar,
        deleteCalendar,
        getWeekdaysByAlpha3Code,
        editWeekdays
    }
 
} 