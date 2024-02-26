import { useProxyManager } from '@cryptobigbang-core'; 
export const FiatDetailService = () => {
    const { httpPostAxios, httpPutAxios, httpDeleteAxios, httpGetAxios } = useProxyManager();
    const baseUrl: string = "/api/asset/fiat-detail";
    const getFiatDetails = () => {
        return httpGetAxios(`${baseUrl}`);
    }
    const getFiatDetail = (id: number) => {
        return httpGetAxios(`${baseUrl}/${id}`);
    }
    const addFiatDetail = (values: any): Promise<any> => {
        return httpPostAxios(`${baseUrl}`, values);
    }
    const editFiatDetail = (values: any) => {
        return httpPutAxios(`${baseUrl}`, values);
    }
    const deleteFiatDetail = (id: string) => {
        return httpDeleteAxios(`${baseUrl}?id=${id}`);
    }
    return {
        baseUrl,
        getFiatDetails,
        getFiatDetail,
        addFiatDetail,
        editFiatDetail,
        deleteFiatDetail
    }

} 