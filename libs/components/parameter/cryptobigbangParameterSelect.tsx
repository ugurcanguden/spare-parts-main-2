import { PageUtilities } from '@cryptobigbang-core';
import { ParameterService } from '@cryptobigbang-services';
import { Form, FormItemProps, Select } from 'antd';
import { useEffect, useState } from 'react';
export interface CryptobigbangParameterSelectProps {
    parameterCode : string,
    formItemProps: FormItemProps<any>
}
export default function CryptobigbangParameterSelect(props: CryptobigbangParameterSelectProps) {
    const [options, setOptions] = useState<any[]>([]);
    const { parameterCode,formItemProps} = props;
    const {getParameters} = ParameterService();
    const {} = PageUtilities();
    const fillDropDown = () => {
        let items: any[] = [];
        getParameters(parameterCode).then((r: any[]) => {
            r.forEach(element => { 
                items.push({
                    label: element.GroupCode + " - "+ element.ParameterCode,
                    value: element.Value
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
