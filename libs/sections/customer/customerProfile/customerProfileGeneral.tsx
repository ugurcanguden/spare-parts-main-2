import { CheckCircleOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { PageUtilities } from '@cryptobigbang-core';
import { CustomerService } from '@cryptobigbang-services';
import { Card, Col, Descriptions, Popover, Row } from 'antd';
import { ConvertDateToString, DateFormat, isNullOrUndefined } from 'guden-core';
import { useEffect, useState } from 'react';
import CustomerPhones from './customerPhones';

export default function CustomerProfileGeneral(props:any) {
    const { translate, router } = PageUtilities();
    const { customerid } = router.query; 
    const [customerDescriptions, setCustomerDescriptions] = useState<any>()
    const [customerContactDescriptions, setCustomerContactDescriptions] = useState<any>()
    const [customerIdentityDescriptions, setCustomerIdentityDescriptions] = useState<any>();
    const [showCustomerPhone, setShowCustomerPhone] = useState<Boolean>(false);
    const { customer } = props;
    const { getCustomer, getCustomerTelephones } = CustomerService();


    useEffect(() => {
        if (!isNullOrUndefined(customer)) {
            getCustomerDetail(customer);
        }

    }, [customer])

    const getPhoneStatusIcon = (status: number) => {
        if (status == 1)
            return <Popover title={translate("common.customerTelephoneStatus.unVerified")}><QuestionCircleOutlined /></Popover>
        if (status == 2)
            return <Popover title={translate("common.customerTelephoneStatus.deleted")}><DeleteOutlined /></Popover>
        if (status == 2)
            return <Popover title={translate("common.customerTelephoneStatus.verified")}><CheckCircleOutlined /></Popover>
    };
    const getCustomerDetail = async (response: any) => {
        
            let items: any['items'] = [];
            let identityItems: any['items'] = [];
            let customerContactsItems: any['items'] = [];
            items.push({
                key: 'firstName',
                label: translate("customerPage.customerList.firstName"),
                children: <span>{response.firstName}</span>,
            });
            items.push({
                key: 'lastName',
                label: translate("customerPage.customerList.lastName"),
                children: <span>{response.lastName}</span>,
            });
            // items.push({
            //     key: 'middleName',
            //     label: translate("customerPage.customerList.middleName"),
            //     children: <span>{response.middleName}</span>,
            // });
            items.push({
                key: 'birthDate',
                label: translate("customerPage.customerList.birthDate"),
                children: <>{ConvertDateToString(new Date(response.birthDate), DateFormat.DDMMYYYYS)}</>
            });
            identityItems.push({
                key: 'nationalIdentityNumber',
                label: translate("customerPage.customerList.nationalIdentityNumber"),
                children: <span>{response.nationalIdentityNumber}</span>,
            });
            //#region telefon ve mail bilgisi alınır 
            getCustomerTelephones(customer.id).then((r: any[]) => {
                let defaultNumber = r.filter(r => r.isDefaultNumber);
                customerContactsItems.push({
                    key: 'nationalIdentityNumber',
                    label: translate("customerPage.customerDetailPage.profile.email"),
                    children: <span>{response.email}</span>,
                });

                customerContactsItems.push({
                    key: 'nationalIdentityNumber',
                    label: translate("customerPage.customerDetailPage.profile.gsm"),
                    children: defaultNumber.length > 0 ? <>
                       
                        <span >{getPhoneStatusIcon(defaultNumber[0].status) }  {`${defaultNumber[0].countryCode} - ${defaultNumber[0].number} `}</span>
                    </> :
                        <span>-</span>,
                });

                setCustomerContactDescriptions(customerContactsItems);
                setCustomerDescriptions(items);
                setCustomerIdentityDescriptions(identityItems);
                setShowCustomerPhone(true);
          
            //#endregion


        })
    }
    const size = {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 12,
        xl: 12,
        xxl: 8
    };
    return (
        <Row gutter={12}>
            <Col {...size}>
                <Card title={translate("customerPage.customerDetailPage.profile.general")}>
                    <Descriptions column={2} items={customerDescriptions} layout={'vertical'}/>
                </Card>
            </Col>
            <Col  {...size}>
                <Card title={translate("customerPage.customerDetailPage.profile.contact")}>
                    <Descriptions column={2} items={customerContactDescriptions} layout={'vertical'}/>
                </Card>
            </Col>
            <Col  {...size}>
                <Card title={translate("customerPage.customerDetailPage.profile.identity")}>
                    <Descriptions column={2} items={customerIdentityDescriptions} layout={'vertical'}/>
                </Card>
            </Col>
            {showCustomerPhone &&
                <Col  {...size}>
                    <Card title={translate("customerPage.customerDetailPage.profile.phones")}>
                        <CustomerPhones identityUserId={customerid}/>
                    </Card>
                </Col>}
        </Row>
    )
}
