import { ProTableProps, ProTable } from "@cryptobigbang-components";
import { PageUtilities } from "@cryptobigbang-core";
import { ApplicationDefinitionService, RoleService } from "@cryptobigbang-services";
import { Layout, Checkbox, TabsProps, Tabs, Button, Form, message } from "antd";
import { useEffect, useState } from "react";

export const RoleApiDefinitionMapping = (props: RoleApiDefinitionMappingProps) => {
    const { form, loading, setLoading } = PageUtilities();
    const [selectedKeys, setSelectedKey] = useState<any[]>([]);
    const [mapping, setMapping] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [tabs, setTabs] = useState<TabsProps['items']>([]);
    const { translate, apiCallCount } = PageUtilities();
    const { baseUrl, get } = ApplicationDefinitionService();
    const { getRoleApiDefinitionMapping, editRoleApiDefinitionMapping } = RoleService();

    useEffect(() => {
        if (props.roleId > 0) {
            getRoleApiDefinitionMapping(props.roleId).then(r => {
                let items: string[] = [];
                r.forEach((row: any) => {
                    items.push(row.apiDefinitionId);
                });
                setSelectedKey(items);
                setMapping(r); 
                getApplicationDefinitions(items);
            }).finally()
            
        } 
    }, []);
    useEffect(() => {
        if (selectedKeys) {
            const items: TabsProps['items'] = []
            applications.forEach((r: any, index: number) => {
                items.push(
                    {
                        key: index.toString(),
                        label: r.name + " " + r.description,
                        children: getTable(r.name, selectedKeys, (keys) => setSelectedKey(keys)),
                    })
            });
            setTabs(items);
        }
    }, [selectedKeys])

    function getApplicationDefinitions(selectedKeys:string[]) {
        const items: TabsProps['items'] = [];
        get().then(row => {
            setApplications(row);
            row.forEach((r: any, index: number) => {
                items.push(
                    {
                        key: index.toString(),
                        label: r.name + " " + r.description,
                        children: getTable(r.name, selectedKeys, (keys) => { 
                            setSelectedKey(keys);
                        }),
                    });
            });
            setTabs(items);
        }).finally();
    }
    const updateMapping = () => {
        let request:any[] = [];
        selectedKeys.forEach(r=>{
            let id = mapping?.filter(r=>r.ApiDefinitionId == r)
            request.push({
                RoleId: props.roleId,
                Id : id?.length>0?id[0].id:undefined,
                ApiDefinitionId :r
            });
        }) ; 
        editRoleApiDefinitionMapping(props.roleId, request).then(response => {
            if (!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful"));
            }
        }).finally(() => setLoading(false))
    }


    const getTable = (applicationName: string, keys: string[], setKeys: (keys: string[]) => void) => {
        const columns = [
            {
                dataIndex: 'id',
                key: 'id',
                title: "",
                align: "end",
                fixed: 'right',
                width: 50,
                render: (text: any, record: any, index: number) =>
                    <Checkbox
                        checked={keys.includes(record?.id)}
                        onChange={(e) => {
                            let id = record.id;
                            const apiDefinitionIds = e.target.checked
                                ? [...keys, id]
                                : keys.filter((s) => s !== id); 
                            setKeys(apiDefinitionIds.length > 0 ? apiDefinitionIds : []);
                        }}
                    />


            },
            {
                title: translate("apiDefinitionPage.httpRequestMethod"),
                dataIndex: "httpRequestMethod",
                key: "httpRequestMethod",
            },
            {
                title: translate("apiDefinitionPage.apiPathFormat"),
                dataIndex: "apiPathFormat",
                key: "apiPathFormat",
            },
            {
                title: translate("apiDefinitionPage.apiPath"),
                dataIndex: "apiPath",
                key: "apiPath",
            },
            {
                title: translate("apiDefinitionPage.apiPathRegex"),
                dataIndex: "apiPathRegex",
                key: "apiPathRegex",
            },
            {
                title: translate("apiDefinitionPage.scopeKey"),
                dataIndex: "scopeKey",
                key: "scopeKey",
            },
        ];
        const propTableProps: ProTableProps = {
            id: applicationName,
            apiCallCount: apiCallCount,
            apiUrl: `${baseUrl}/${applicationName}/api-definitions`,
            columns: columns,
            paginationDisabled: true
        }
        return (<ProTable {...propTableProps} />)
    }
    return (
        <Layout className='antlayout'>
            <Tabs defaultActiveKey="0" items={tabs} />
            {selectedKeys.length > 0 && <Form.Item style={{ textAlign: 'end' }} >
                <Button type="primary" htmlType="button" loading={loading} onClick={()=>updateMapping()}>
                    {translate("common.update")}
                </Button>
            </Form.Item>}
        </Layout>
    )
}

export interface RoleApiDefinitionMappingProps {
    roleId: number;
}


