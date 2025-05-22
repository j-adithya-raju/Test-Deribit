import PageTitle from '@/components/PageTitle';
import { Col, Row } from 'react-bootstrap';
import AllInvoiceReport from './components/AllInvoiceReport';
export const metadata = {
  title: 'Call Options'
};
const Reports = () => {
  return <>
      <PageTitle title="Call Options" />
      <Row>
        <Col xl={12}>
          <AllInvoiceReport />
        </Col>
      </Row>
    </>;
};
export default Reports;