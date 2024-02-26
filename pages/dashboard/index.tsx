  import { BarChartExample, DoughnutChartExample, LineChartExample } from '@cryptobigbang-components';
  import CurrencyChart from '@cryptobigbang/libs/components/widgets/currenyWidgets/currencyWidgets';
import { Col, Row } from 'antd';

  const Index = () => {
    return (<>
    <Row>
      <Col span={24}>
         <CurrencyChart />
      </Col>
    </Row>
  </>);
  };

  export default Index;
