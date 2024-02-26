import { useProxyManager } from '@cryptobigbang-core'; 
export const NetworkTypeService = () => {
    const { httpPostAxios, httpPutAxios, httpDeleteAxios, httpGetAxios } = useProxyManager();
    const baseUrl: string = "/api/asset/network-type";
    const getNetworkTypes = () => {
        return httpGetAxios(`${baseUrl}`);
    }
    const getNetworkType = (id: number) => {
        return httpGetAxios(`${baseUrl}/${id}`);
    }
    const addNetworkType = (values: any): Promise<any> => {
        return httpPostAxios(`${baseUrl}`, values);
    }
    const editNetworkType = (values: any) => {
        return httpPutAxios(`${baseUrl}`, values);
    }
    const deleteNetworkType = (id: string) => {
        return httpDeleteAxios(`${baseUrl}?id=${id}`);
    }
    return {
        baseUrl,
        getNetworkTypes,
        getNetworkType,
        addNetworkType,
        editNetworkType,
        deleteNetworkType
    }

} 