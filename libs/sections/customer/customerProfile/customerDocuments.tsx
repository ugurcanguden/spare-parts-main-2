import { BranchesOutlined, CalendarOutlined, CheckCircleOutlined, DownloadOutlined, EyeFilled } from '@ant-design/icons';
import { PageUtilities } from '@cryptobigbang-core';
import { DocumentService } from '@cryptobigbang-services';
import { Button, Card, Col, Descriptions, Modal, Row, Spin } from 'antd';
import { ConvertDateToString, DateFormat, generateGUID } from 'guden-core';
import { useEffect, useState } from 'react';

export default function CustomerDocuments(props: any) {
    const [documents, setDocuments] = useState<any[]>([]);
    const { identityUserId } = props;
    const { translate, apiCallCount, router, colorBgContainer } = PageUtilities();
    const { baseUrl, getCustomerDocuments, dowloadCustomerDocument } = DocumentService();
    const [loading, setLoading] = useState(false);
    const [eyeloading, setEyeLoading] = useState(false);

    useEffect(() => {
        if (identityUserId) {
            getCustomerDocuments(identityUserId).then(r => setDocuments(r))
        }
    }, [identityUserId])
    const downloadDocument = (documentId: string) => {
        setLoading(true);
        dowloadCustomerDocument(documentId).then(async r => {
            try {
                const blob = r.data;
                // Blob'u indirme bağlantısına dönüştürme
                const url = window.URL.createObjectURL(blob);
                // Eğer resmi indirmek istiyorsanız:
                const a = document.createElement('a');
                a.href = url;

                a.download = "file - " + generateGUID();; // İndirilen dosyanın adı
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

            }
            catch (e) {

            }
            finally {
                setLoading(false);
            }
        });
    };
    const showDocument = (documentId: string) => {
        setEyeLoading(true);
        dowloadCustomerDocument(documentId).then(async r => {
            try {
                const blob = r.data;
                // Blob'u indirme bağlantısına dönüştürme
                const url = window.URL.createObjectURL(blob);
                // Eğer resmi indirmek istiyorsanız:
                const a = document.createElement('a');
                a.href = url;

                // Dosyayı modal içinde göstermek için
                Modal.info({
                    style: { background: colorBgContainer },
                    icon: <></>,
                    content: <img alt="dosya" style={{ width: '100%' }} src={url} />,
                    onOk: () => {
                        setLoading(false);
                    },
                    okButtonProps: {
                        icon: <CheckCircleOutlined />
                    },
                    okText: ' '
                });
            }
            catch (e) {

            }
            finally {
                setEyeLoading(false);
            }
        });
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
        <Row gutter={15}>

            {documents.map((document, index) => (
                <Col {...size}>
                    <Card title={document?.code} extra={<>
                        <Button icon={loading ? <Spin /> : <DownloadOutlined />} onClick={() => downloadDocument(document?.documentId)}></Button>
                        <Button icon={eyeloading ? <Spin /> : <EyeFilled />} onClick={() => showDocument(document?.documentId)}></Button>
                    </>} >
                        <Descriptions bordered column={2}>
                            <Descriptions.Item span={2}>{document?.description}</Descriptions.Item>
                            <Descriptions.Item span={2}>{document?.documentContentType}</Descriptions.Item>
                            <Descriptions.Item > <CalendarOutlined></CalendarOutlined>  {document?.createdAt ? ConvertDateToString(new Date(document?.createdAt), DateFormat.DDMMYYYYS) : ""}</Descriptions.Item>
                            <Descriptions.Item ><BranchesOutlined> </BranchesOutlined>  {document?.version}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            ))}

        </Row>
    )
}
