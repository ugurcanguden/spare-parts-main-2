import { useProxyManager } from '@cryptobigbang-core';
export const CountryService = () => {
    const { httpGetAxios } = useProxyManager();
    const baseUrl: string = "/api/catalog/countries";
    const getCountry = (commonName: string) => {
        return httpGetAxios(`${baseUrl}/by-name/${commonName}`);
    }
    return {
        baseUrl,
        getCountry
    }
} 