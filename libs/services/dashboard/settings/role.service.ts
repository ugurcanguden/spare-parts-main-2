import { useProxyManager } from '@cryptobigbang-core';

export const RoleService = () => { 
    const { httpPostAxios,httpPutAxios,httpDeleteAxios,httpGetAxios } = useProxyManager();
    const baseUrl : string = "/api/identity/role";
    
    const addRole =(value:any):Promise<any>=>{
        return httpPostAxios(`${baseUrl}`,value);
    }  
    const editRole =(value:any):Promise<any>=>{
        return httpPutAxios(`${baseUrl}`,value);
    }  
    const getRoles =():Promise<any>=>{
        return httpGetAxios(`${baseUrl}`);
    } 
    const getRoleMapping =(roleId:number):Promise<any>=>{
        return httpGetAxios(`${baseUrl}/${roleId}/menu-role-mapping`);
    } 
    const editRoleMapping =(value:any):Promise<any>=>{
        return httpPutAxios(`${baseUrl}/menu-role-mapping`,value);
    } 
    const getRoleApiDefinitionMapping =(roleId:number):Promise<any>=>{
        return httpGetAxios(`${baseUrl}/${roleId}/apidefinition-role-mapping`);
    } 
    const editRoleApiDefinitionMapping =(roleId:number,value:any):Promise<any>=>{
        return httpPutAxios(`${baseUrl}/${roleId}/apidefinition-role-mapping`,value);
    }   
    return {
        baseUrl,
        getRoles,
        addRole, 
        getRoleMapping,
        editRoleMapping,
        editRole,
        getRoleApiDefinitionMapping,
        editRoleApiDefinitionMapping
    }
 
} 