import { useProxyManager } from '@cryptobigbang-core';

export const AssetNetworkService = () => {
    const { httpPostAxios, httpPutAxios, httpDeleteAxios, httpGetAxios } = useProxyManager();
    const baseUrl: string = "/api/asset/asset-network";
    const getAssetNetworks = () => {
        return httpGetAxios(`${baseUrl}`);
    }
    const getAssetNetwork = (id: number) => {
        return httpGetAxios(`${baseUrl}/${id}`);
    }
    const addAssetNetwork = (values: any): Promise<any> => {
        return httpPostAxios(`${baseUrl}`, values);
    }
    const editAssetNetwork = (values: any) => {
        return httpPutAxios(`${baseUrl}`, values);
    }
    const deleteAssetNetwork = (id: string) => {
        return httpDeleteAxios(`${baseUrl}?id=${id}`);
    }
    return {
        baseUrl,
        getAssetNetworks,
        getAssetNetwork,
        addAssetNetwork,
        editAssetNetwork,
        deleteAssetNetwork
    }

} 