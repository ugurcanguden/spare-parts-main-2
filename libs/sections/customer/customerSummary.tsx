import { PageUtilities } from '@cryptobigbang-core';
import { CustomerService } from '@cryptobigbang-services';
import { Tabs } from 'antd';
import React from 'react'
import CustomerAccounts from './customerSummary/customerAccounts';

export default function CustomerSummary(props:any) { 
    const {customerid} = props;
 
    return (<CustomerAccounts identityUserId={customerid}/>)
}
