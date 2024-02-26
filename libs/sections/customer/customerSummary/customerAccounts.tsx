import { HistoryOutlined } from '@ant-design/icons';
import { DoughnutChart, ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { CustomerBalanceService } from '@cryptobigbang-services';
import { Button, Card, Col, Divider, Modal, Row } from 'antd';
import { useState } from 'react';
import CustomerAccountHistory from './customerAccountHistory';

export default function CustomerAccounts(props: any) {

    const { identityUserId } = props;
    const { translate, apiCallCount, router } = PageUtilities();
    const { baseUrl } = CustomerBalanceService();
    const [doughnutChartDataTotalAmount, setdoughnutChartDataTotalAmount] = useState<any>();
    const [doughnutChartDataAvailableBalance, setdoughnutChartDataAvailableBalance] = useState<any>();
    const [doughnutChartDataBlockedBalance, setdoughnutChartDataBlockedBalance] = useState<any>();


    const handleOk = () => {
        setShowhistory({...showHistory, assetSymbol: "", showHistory: false });
    };

    const handleCancel = () => {
        setShowhistory({ ...showHistory,assetSymbol: "", showHistory: false });
    };
    const [showHistory, setShowhistory] = useState({ assetSymbol: "", showHistory: false,apiCallCount : 1 });

    const columns = [
        {
            title: translate("customerPage.customerDetailPage.customerAccounts.assetSymbol"),
            dataIndex: "assetSymbol",
            key: "assetSymbol",
        },
        {
            title: translate("customerPage.customerDetailPage.customerAccounts.balance"),
            dataIndex: "balance",
            key: "balance",
        },
        {
            title: translate("customerPage.customerDetailPage.customerAccounts.availableBalance"),
            dataIndex: "availableBalance",
            key: "availableBalance",
        },
        {
            title: translate("customerPage.customerDetailPage.customerAccounts.blockedBalance"),
            dataIndex: "blockedBalance",
            key: "blockedBalance",
        },
        {
            title: "",
            dataIndex: "assetSymbol",
            key: "assetSymbol",
            render: (assetSymbol: string) =>
                <Button icon={<HistoryOutlined />} onClick={() => {
                    setShowhistory({
                        assetSymbol: assetSymbol,
                        showHistory: true,
                        apiCallCount : (showHistory.apiCallCount+1)
                    });
                }}></Button>

        }
    ];
    const propTableProps: ProTableProps = {
        apiCallCount: apiCallCount,
        apiUrl: `${baseUrl}accounts/${identityUserId}`,
        columns: columns,
        paginationDisabled: true,
        getData: (data: any[]) => {
            let assets = groupAndSumBySymbol(data);
            setdoughnutChartDataTotalAmount(transformDataForChart(assets, "totalBalance"));
            setdoughnutChartDataAvailableBalance(transformDataForChart(assets, "totalAvailableBalance"));
            setdoughnutChartDataBlockedBalance(transformDataForChart(assets, "totalBlockedBalance"));
        }
    }

    const groupAndSumBySymbol = (assets: any[]): any[] => {
        const groupedAssets: { [symbol: string]: any } = {};

        for (const asset of assets) {
            const { assetSymbol, balance, availableBalance, blockedBalance } = asset;

            if (!groupedAssets[assetSymbol]) {
                groupedAssets[assetSymbol] = {
                    assetSymbol,
                    totalBalance: 0,
                    totalAvailableBalance: 0,
                    totalBlockedBalance: 0,
                };
            }

            groupedAssets[assetSymbol].totalBalance += balance;
            groupedAssets[assetSymbol].totalAvailableBalance += availableBalance;
            groupedAssets[assetSymbol].totalBlockedBalance += blockedBalance;
        }
        return Object.entries(groupedAssets).map(([_, value]) => value);
    };
    const transformDataForChart = (groupedData: any[], key: string): any => {
        const labels = groupedData.map((group) => group.assetSymbol);
        const data = groupedData.map((group) => group[key]);
        const backgroundColors = ['#f5222d', '#1890ff', '#ffc53d', '#52c41a', '#722ed1'];

        const doughnutChartDataTotalAmount = {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: backgroundColors,
                },
            ],
        };

        return doughnutChartDataTotalAmount;
    };

    const size = {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 12,
        xl: 12,
        xxl: 8
    };
    return (
        <>
            <ProTable {...propTableProps} />
            <Modal   
                footer={<></>}
                open={showHistory.showHistory}
                onCancel={handleCancel}
                width= {"50%"}
                
                
            >
                <CustomerAccountHistory
                    apiCallCount = {showHistory.apiCallCount}
                    identityUserId={identityUserId}
                    assetSymbol={showHistory.assetSymbol} />
            </Modal>
            <Divider />
            {
                doughnutChartDataTotalAmount && doughnutChartDataAvailableBalance && doughnutChartDataBlockedBalance &&
                <Row gutter={10}>
                    <Col {...size}>
                        <Card title={translate("customerPage.customerDetailPage.customerAccounts.balance")}>
                            <DoughnutChart doughnutChartData={doughnutChartDataTotalAmount} />
                        </Card>
                    </Col>
                    <Col {...size}>
                        <Card title={translate("customerPage.customerDetailPage.customerAccounts.availableBalance")}>
                            <DoughnutChart doughnutChartData={doughnutChartDataAvailableBalance} />
                        </Card>
                    </Col>
                    <Col {...size}>
                        <Card title={translate("customerPage.customerDetailPage.customerAccounts.blockedBalance")}>
                            <DoughnutChart doughnutChartData={doughnutChartDataBlockedBalance} />
                        </Card>
                    </Col>
                </Row>

            }
        </>
    )
}  