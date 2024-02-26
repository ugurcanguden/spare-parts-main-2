import { ArrowDownOutlined, ArrowUpOutlined, BarChartOutlined } from '@ant-design/icons';
import { ProTable, ProTableProps, WebViewModal, WebViewModalProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { CustomerBalanceService, ParameterService } from '@cryptobigbang-services';
import { Button, Space } from 'antd';
import { ConvertDateToString, ConvertDateToTimeString, DateFormat } from 'guden-core';
import { useEffect, useState } from 'react';
export interface CustomerAccountHistoryProps {
    identityUserId: string,
    assetSymbol: string,
    apiCallCount : number
}

export default function CustomerAccountHistory({ assetSymbol, identityUserId,apiCallCount }: CustomerAccountHistoryProps) {
    const { translate} = PageUtilities();
    const { baseUrl } = CustomerBalanceService();
    const { getParameter } = ParameterService();
    const [jaegerLink, setJaegerLink] = useState<string>("");
    const [jaegerDetail, setJaegerDetail] = useState<any>({visible:false,traceId:""});
    const columns = [
        {
            title: translate("customerPage.customerDetailPage.customerAccounts.assetSymbol"),
            dataIndex: "assetSymbol",
            key: "assetSymbol",
        },
        {
            title: translate("customerPage.customerDetailPage.customerAccounts.transactionTime"),
            dataIndex: "transactionTime",
            key: "transactionTime",
            render: (birthDate: Date) => <>{ConvertDateToString(new Date(birthDate), DateFormat.DDMMYYYYS)} {ConvertDateToTimeString(new Date(birthDate))}</>

        },
        {
            title: translate("customerPage.customerDetailPage.customerAccounts.transactionType"),
            dataIndex: "transactionType",
            key: "transactionType",
            render: (transactionType: number, record: any) => (
                <>
                    {record.transactionType === 2 ? (
                        <Space>
                            {translate("customerPage.customerDetailPage.customerAccounts.transactionTypeWithdraw")}
                        </Space>
                    ) : (
                        <Space>
                            {translate("customerPage.customerDetailPage.customerAccounts.transactionTypeDeposit")}
                        </Space>
                    )}
                </>)

        },
        {
            title: translate("customerPage.customerDetailPage.customerAccounts.amount"),
            dataIndex: "amount",
            key: "amount",
            render: (amount: number, record: any) => (
                <>
                    {record.transactionType === 2 ? (
                        <Space>
                            <ArrowUpOutlined style={{ color: 'red' }} />
                            {new Intl.NumberFormat().format(amount)}
                        </Space>
                    ) : (
                        <Space>
                            <ArrowDownOutlined style={{ color: 'green' }} />
                            {new Intl.NumberFormat().format(amount)}
                        </Space>
                    )}
                </>
            ),
        },

        {
            title: translate("customerPage.customerDetailPage.customerAccounts.transactionSource"),
            dataIndex: "transactionSource",
            key: "transactionSource",
        },
        {
            title: translate("customerPage.customerDetailPage.customerAccounts.transactionSourceId"),
            dataIndex: "transactionSourceId",
            key: "transactionSourceId",
        },
        {
            title: translate("customerPage.customerDetailPage.customerAccounts.logDetail"),
            dataIndex: "traceId",
            key: "traceId",
            render: (traceId: string) =>
                <Button icon={<BarChartOutlined />} onClick={() => {
                    setJaegerDetail({visible:true,traceId:traceId})
                }}></Button>
            
        }
    ]; 
    useEffect(() => {getParameter("Uygulama_URL", "dev_jaeger").then(r => {setJaegerLink(r.value + "/trace/");})}, [])


    const propTableProps: ProTableProps = {
        apiCallCount: apiCallCount,
        apiUrl: `${baseUrl}accounts/${identityUserId}/transactions/${assetSymbol}`,
        columns: columns,
        paginationDisabled: true
    } 
    const webViewModalProps : WebViewModalProps={
        url:`${jaegerLink}/${jaegerDetail.traceId}`,
        title:" ",
        visible:jaegerDetail.visible,
        onClose : () => {setJaegerDetail({visible:false,traceId:""})}
    }
    return (
        <>
            <ProTable {...propTableProps} />
            <WebViewModal {...webViewModalProps}/>
        </>
    )
}
