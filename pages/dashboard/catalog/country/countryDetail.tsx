import { PageUtilities } from '@cryptobigbang-core';
import { CountryService } from '@cryptobigbang-services';
import { Descriptions } from 'antd';
import { useEffect, useState } from 'react';

export interface CountryDetailProps {
    commonName: string;
}

export default function CountryDetail({ commonName }: CountryDetailProps) {
    const {translate} = PageUtilities(); 
    const [data, setData] = useState<any>();
    const {getCountry} = CountryService();

    const getDetail = async () => {
        const response = await getCountry(commonName);
        setData(response);
    }
    useEffect(() => {getDetail();}, [commonName])
    return (
        <Descriptions title={translate("countryPage.detail.title")} bordered column={1}>
            <Descriptions.Item label={translate("countryPage.detail.commonName")}>{data?.commonName}</Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.officialName")}>{data?.officialName}</Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.nativeName")}>{data?.nativeName}</Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.alpha2Code")}>{data?.alpha2Code}</Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.alpha3Code")}>{data?.alpha3Code}</Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.numericCode")}>{data?.numericCode}</Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.tld")}>{data?.tld?.join(', ')}</Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.region")}>{data?.region}</Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.subRegion")}>{data?.subRegion}</Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.borderCountries")}>{data?.borderCountries?.join(', ')}</Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.currencies")}>
            {data?.currencies?.map((currency:any) => (
                <div key={currency?.isoCode}>
                {currency?.name} ({currency?.symbol})
                </div>
            ))}
            </Descriptions.Item>
            <Descriptions.Item label={translate("countryPage.detail.callingCodes")}>{data?.callingCodes?.join(', ')}</Descriptions.Item>
      </Descriptions>
    )
}
