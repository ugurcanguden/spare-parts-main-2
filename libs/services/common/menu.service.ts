import { useProxyManager } from '@cryptobigbang-core';
import { isNullOrUndefined } from 'guden-core';

export const MenuService = () => {
    const { httpPutAxios, httpGetAxios } = useProxyManager();
    const baseUrl: string = "/api/catalog/backofficemenu";

    const getMenu = (isActive?: boolean) => {
        let requestURL = !isNullOrUndefined(isActive) ? `${baseUrl}?isActive=${isActive}`:baseUrl;
        return httpGetAxios(`${requestURL}`);
    }
    const addEditMenu = (values: any) => {
        return httpPutAxios(`${baseUrl}`, values);
    }
    return {
        baseUrl,
        addEditMenu,
        getMenu 
    }

} 