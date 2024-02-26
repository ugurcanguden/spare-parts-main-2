import { useProxyManager } from '@cryptobigbang-core';

export const UserService = () => { 
    const {httpDeleteAxios,httpPostAxios,httpPutAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/identity/user";

    const addUser=(user : any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}`,user);
    }
    const updateUser=(user : any):Promise<any>=>{
        return httpPutAxios(`${baseUrl}`,user);
    }
    const createPassword=(userId : string):Promise<any>=>{
        return httpGetAxios(`${baseUrl}/${userId}/create-password`);
    }
    const deleteUser=(id : string):Promise<any>=>{
        return httpDeleteAxios(`${baseUrl}/${id}`);
    } 
    const getUserDetail=():Promise<any>=>{
        return httpGetAxios(`${baseUrl}/detail`);
    }
    return {
        baseUrl,
        createPassword,
        addUser,
        updateUser,
        deleteUser,
        getUserDetail
    }
 
} 