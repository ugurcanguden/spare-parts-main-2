import { Form, FormItemProps, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { PageUtilities } from '@cryptobigbang-core';
export interface CryptobigbangSelectListProps {
    getList: () => Promise<any>,
    getLabelProperty: (item: any) => string,
    getValueProperty: (item: any) => string,
    formItemProps: FormItemProps<any>
}
export default function CryptobigbangSelectList(props: CryptobigbangSelectListProps) {
    const [options, setOptions] = useState<any[]>([]);
    const { getList, getLabelProperty, getValueProperty, formItemProps } = props;
    const fillDropDown = () => {
        let items: any[] = [];
        getList().then((r: any[]) => {
            r.forEach(element => {
                console.log(getLabelProperty(element));
                items.push({
                    label: getLabelProperty(element),
                    value: getValueProperty(element)
                })
            }); 
            setOptions(items)
        }
        )
    };
    useEffect(() => { fillDropDown() }, []);
    return (
        <Form.Item {...formItemProps}>
            <Select options={options} />
        </Form.Item>
    )
}
