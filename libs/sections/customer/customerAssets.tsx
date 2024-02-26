import { PageUtilities } from '@cryptobigbang-core';
import { VaultService } from '@cryptobigbang-services';
import { ProTable, ProTableProps } from '@cryptobigbang/libs/components';
import { Tabs } from 'antd';
import React from 'react'

export default function CustomerAssets() {
    const { translate, router } = PageUtilities();
    const { baseUrl } = VaultService();
    const { customerid } = router.query;

    const columns = [

        {
            title: translate("customerPage.customerDetailPage.assets.assetId"),
            dataIndex: 'assetId',
            key: 'assetId'
        },
        {
            title: translate("customerPage.customerDetailPage.assets.address"),
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: translate("customerPage.customerDetailPage.assets.legacyAddress"),
            dataIndex: 'legacyAddress',
            key: 'legacyAddress'
        },
        {
            title:translate("customerPage.customerDetailPage.assets.tag"),
            dataIndex: 'tag',
            key: 'tag'
        },
        {
            title:translate("customerPage.customerDetailPage.assets.eosAccountName"),
            dataIndex: 'eosAccountName',
            key: 'eosAccountName'
        }

    ]
    const propTableProps: ProTableProps = {
        apiCallCount: 1,
        apiUrl: `${baseUrl}/customer-crypto-addresses?customerId=${customerid}`,
        columns: columns,
        paginationDisabled: true
    }
    return (
        <ProTable {...propTableProps} />
    )

}