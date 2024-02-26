import { ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core'; 
import { Layout } from 'antd'; 
import { ConvertDateToString, ConvertDateToTimeString, DateFormat } from 'guden-core';
import Filter from './filter'; 
export default function UserMailotifications() {
    const { translate, onFiltered, query, setQuery,apiCallCount, setApiCallCount } = PageUtilities();
    const columns = [
        {
            title: translate("notificationReportPage.columns.email"),
            dataIndex: "email",
            key: "email",
        },
        {
            title: translate("notificationReportPage.columns.cc"),
            dataIndex: "cc",
            key: "cc",
        },
        {
            title: translate("notificationReportPage.columns.bcc"),
            dataIndex: "bcc",
            key: "bcc",
        },
        {
            title: translate("notificationReportPage.columns.subject"),
            dataIndex: "subject",
            key: "subject",
        },
        {
            title: translate("notificationReportPage.columns.content"),
            dataIndex: "content",
            key: "content",
        },
        {
            title: translate("notificationReportPage.columns.dispatchedDate"),
            dataIndex: "dispatchedDate",
            render: (dispatchedDate: Date) => <>{ConvertDateToString(new Date(dispatchedDate),DateFormat.DDMMYYYYP)}</>
        },
        {
            title: translate("notificationReportPage.columns.dispatchedTime"),
            dataIndex: "dispatchedTime",
            key: "dispatchedTime",
            render: (dispatchedTime: Date) => <>{ConvertDateToTimeString(new Date(dispatchedTime))}</>
        }
    ];
    const propTableProps: ProTableProps = {
        apiCallCount: apiCallCount,
        apiUrl: '/api/notification/user-email-notifications',
        columns: columns,
        queryParams: query,
        headerItems: {
            Items: [
                <Filter onFiltered={(e) => {
                    let queryString = onFiltered(e);
                    setQuery(queryString);
                    setApiCallCount(apiCallCount + 1);
                }} key="filter"></Filter>
            ]
        }
    }
    return (
        <Layout className='antlayout'>
            <ProTable {...propTableProps} />
        </Layout>
    )
}
