import { LanguageManager, useProxyManager } from '@cryptobigbang-core';
import { Button, Col, Descriptions, Form, Input, Layout, message, Row, Space, Table } from 'antd';
import { SelectOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

export interface CountrySearchProps {
    onSelectedRow: (record: any) => void;
}


export default function CountrySearch({ onSelectedRow }: CountrySearchProps) {
    const { translate } = LanguageManager();
    const { httpGetAxios } = useProxyManager();
    const [orginalCountries, setOrginalCountries] = useState<any[]>([]);
    const [countries, setCountries] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    const columns: any[] = [
        {
            title: translate("countryPage.columns.alpha3Code"),
            dataIndex: "alpha3Code",
            key: "alpha3Code",
        },
        {
            title: translate("countryPage.columns.commonName"),
            dataIndex: "commonName",
            key: "commonName"
        },
        {
            title: translate("countryPage.columns.officialName"),
            dataIndex: "officialName",
            key: "officialName",
        },
        {
            title: translate("countryPage.columns.nativeName"),
            dataIndex: "nativeName",
            key: "nativeName"
        },
        {
            title: translate("countryPage.columns.region"),
            dataIndex: "region",
            key: "region",
        },
        {
            title: translate("countryPage.columns.subRegion"),
            dataIndex: "subRegion",
            key: "subRegion",
        },
        {
            dataIndex: 'commonName',
            key: 'commonName',
            title: "",
            align: "end",
            fixed: 'right',
            width: 50,
            render: (commonName: string, record: any) =>
                <Space>
                    <Button icon={<SelectOutlined />} onClick={() => { onSelectedRow(record) }}>
                        {translate("common.select")}
                    </Button>
                </Space>
        }
    ];
    const fetchData = async () => {
        try {
            const response = await httpGetAxios(`${'/api/catalog/countries'}`);
            setCountries(response);
            setOrginalCountries(response);
        } catch (error) {
            message.error(JSON.stringify(error));
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

    const handleSearch = (e: any) => {

        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filteredCountries = orginalCountries.filter(
            (country) =>
                country.commonName.toLowerCase().includes(value) ||
                country.officialName.toLowerCase().includes(value) ||
                country.nativeName.toLowerCase().includes(value) ||
                country.officialName.toLowerCase().includes(value) ||
                country.alpha3Code.toLowerCase().includes(value) ||
                country.callingCodes.join(',').includes(value)
        );
        setCountries(filteredCountries);
    };

    return (
        <Row gutter={16} style={{ border: '1px solid #dcdcdc', padding: '16px', borderRadius: '14px' }}>
            <Form.Item style={{ width: "100%" }}>
                <Input
                    suffix={<SearchOutlined />}
                    onChange={(e) => handleSearch(e)}
                />
            </Form.Item>
            <Table size='small' loading={loading} dataSource={countries} columns={columns} pagination={false} scroll={{ x: true, y: 250 }}></Table>
        </Row>
    )
}
