import { useProxyManager } from '@cryptobigbang-core';

export const AssetService = () => {
    const { httpPostAxios, httpPutAxios, httpDeleteAxios, httpGetAxios } = useProxyManager();
    const baseUrl: string = "/api/asset";
    const getAssets = () => {
        return httpGetAxios(`${baseUrl}`);
    }
    const getAsset = (id: number) => {
        return httpGetAxios(`${baseUrl}/${id}`);
    }
    const addAsset = (values: any): Promise<any> => {
        return httpPostAxios(`${baseUrl}`, values);
    }
    const editAsset = (values: any) => {
        return httpPutAxios(`${baseUrl}`, values);
    }
    const deleteAsset = (id: string) => {
        return httpDeleteAxios(`${baseUrl}?id=${id}`);
    }
    return {
        baseUrl,
        getAssets,
        getAsset,
        addAsset,
        editAsset,
        deleteAsset
    }

} 