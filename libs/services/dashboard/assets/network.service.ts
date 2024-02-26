import { useProxyManager } from '@cryptobigbang-core'; 
export const NetworkService = () => {
    const { httpPostAxios, httpPutAxios, httpDeleteAxios, httpGetAxios } = useProxyManager();
    const baseUrl: string = "/api/asset/network";
    const getNetworks = () => {
        return httpGetAxios(`${baseUrl}`);
    }
    const getNetwork = (id: number) => {
        return httpGetAxios(`${baseUrl}/${id}`);
    }
    const addNetwork = (values: any): Promise<any> => {
        return httpPostAxios(`${baseUrl}`, values);
    }
    const editNetwork = (values: any) => {
        return httpPutAxios(`${baseUrl}`, values);
    }
    const deleteNetwork = (id: string) => {
        return httpDeleteAxios(`${baseUrl}?id=${id}`);
    }
    return {
        baseUrl,
        getNetworks,
        getNetwork,
        addNetwork,
        editNetwork,
        deleteNetwork
    }

} 