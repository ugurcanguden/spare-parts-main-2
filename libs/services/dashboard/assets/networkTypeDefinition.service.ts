import { useProxyManager } from '@cryptobigbang-core'; 
export const NetworkTypeDefinitionService = () => {
    const { httpPostAxios, httpPutAxios, httpDeleteAxios, httpGetAxios } = useProxyManager();
    const baseUrl: string = "/api/asset/network-type-definition";
    const getNetworkTypeDefinitions = () => {
        return httpGetAxios(`${baseUrl}`);
    }
    const getNetworkTypeDefinition = (id: number) => {
        return httpGetAxios(`${baseUrl}/${id}`);
    }
    const addNetworkTypeDefinition = (values: any): Promise<any> => {
        return httpPostAxios(`${baseUrl}`, values);
    }
    const editNetworkTypeDefinition = (values: any) => {
        return httpPutAxios(`${baseUrl}`, values);
    }
    const deleteNetworkTypeDefinition = (id: string) => {
        return httpDeleteAxios(`${baseUrl}?id=${id}`);
    }
    return {
        baseUrl,
        getNetworkTypeDefinitions,
        getNetworkTypeDefinition,
        addNetworkTypeDefinition,
        editNetworkTypeDefinition,
        deleteNetworkTypeDefinition
    }

} 