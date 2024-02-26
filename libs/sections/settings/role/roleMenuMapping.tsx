import { PageUtilities } from '@cryptobigbang-core';
import { MenuService, RoleService } from '@cryptobigbang-services';
import { Button, Form, message, Tree } from 'antd';
import { useEffect, useState } from 'react';

export interface RoleMenuMappingProps {
    roleId: number,
    apiCallCount: number
}
const RoleMenuMapping = (props: RoleMenuMappingProps) => {
    const { apiCallCount, roleId } = props;
    const { translate, form, loading, setLoading } = PageUtilities();
    const { editRoleMapping, getRoleMapping } = RoleService();
    const { TreeNode } = Tree;
    const { getMenu } = MenuService();
    const [treeNodes, setTreeNodes] = useState<any[]>([]);
    const [menus, setMenus] = useState<any[]>([]); 
    const [roleMenuMapping, setRoleMenuMapping] = useState<any[]>([]); 
    const [pageState, setPageState] = useState<{ selectedKeys: string[], isCompletedFetch: boolean }>({
        selectedKeys: [],
        isCompletedFetch: false
    });
    useEffect(() => { fetchMenu(); }, [apiCallCount])
    useEffect(() => { if (menus.length > 0) getRoleMenuMapping(); }, [menus.length]) 
    //#region  request
    const fetchMenu = () => {
        getMenu().then(r => {
            r.forEach((menu: any, index: number) => {
                menu.key = index.toString()
            });
            const treeNodes = generateTreeNodes(r, 0); // Kök düğümü (parentId: 0) ile başlayın
            setTreeNodes(treeNodes);
            setMenus(r);

        }).finally()
    }
    const getRoleMenuMapping = () => {
        getRoleMapping(roleId).then(res => {
            let items: string[] = [];
            res.forEach((element: any) => {
                const menuId = element.menuId;
                if (!isParentId(menuId))
                    items.push(menuId.toString())
            });
            setPageState({
                selectedKeys: items,
                isCompletedFetch: true
            });
            setRoleMenuMapping(res)
        })
    };
    //#endregion
    //#region  Submit form
    const onFinish = (values: string[]) => {
        setLoading(true)
        if (pageState.selectedKeys.length == 0) return;
        let requestItems: any[] = [];
        pageState.selectedKeys.forEach(element => {
            addList(requestItems,
                {
                    Id: getRoleMenuMappingId(element),
                    MenuId: parseInt(element),
                    RoleId: roleId
                }
            );
            addParent(requestItems, parseInt(element));
        });
        editRoleMapping({ roleMenuMapping: requestItems })
            .then(response => {
                if (!response.IsBusinessError) {
                    message.success(translate("common.updateSuccessful"));
                }
            }).finally(() => setLoading(false))

    }; 
    //#endregion

    //#region utilities.
    const generateTreeNodes = (data: any, parentId: number) => {
        return data
            .filter((item: any) => item.parentId === parentId)
            .map((item: any) => {
                return (
                    <TreeNode title={translate("menu."+item.uniqueKey)} key={item.id}>
                        {generateTreeNodes(data, item.id)}
                    </TreeNode>
                );
            });
    };
    const getRoleMenuMappingId = (menuId: string): number => {
        return roleMenuMapping.filter(r => r.menuId.toString() == menuId)?.length > 0 ? roleMenuMapping.filter(r => r.menuId.toString() == menuId)[0].id : undefined;
    }
    const addList = (seletedRoleMenuMapping: any[], newValue: any) => {
        if (seletedRoleMenuMapping.filter(r => r.MenuId == newValue.MenuId).length > 0)
            return seletedRoleMenuMapping;
        seletedRoleMenuMapping.push(newValue);
    }
    const addParent = (seletedRoleMenuMapping: any[], menuId: number) => {
        const parentMenu = menus.find(r => r.id == menuId);
        if (parentMenu.parentId > 0)
            addList(seletedRoleMenuMapping, {
                Id: getRoleMenuMappingId(parentMenu.parentId),
                MenuId: parseInt(parentMenu.parentId),
                RoleId: roleId
            })
    }
    const isParentId = (menuId: number): boolean => menus.some(r => r.parentId === menuId); 
    //#endregion




    return (
        <Form form={form} onFinish={onFinish}> 
            <Form.Item name="selectedKeys">
                {pageState.isCompletedFetch && <Tree
                    defaultCheckedKeys={pageState.selectedKeys}
                    checkable
                    onCheck={(_, { checkedNodes }) => {
                        let stateValue = {
                            selectedKeys: checkedNodes.map((node: any) => node.key.toString()),
                            isCompletedFetch: true
                        };
                        setPageState({ ...stateValue });
                    }}>
                    {treeNodes}
                </Tree>}
            </Form.Item>
            <Form.Item style={{ textAlign: 'end' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.update")}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default RoleMenuMapping
