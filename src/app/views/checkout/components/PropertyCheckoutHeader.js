import React from 'react';
import '../../properties/components/propertySearchCard.css';
import { PageHeader, Tabs, Descriptions, Avatar, Card, Col, List, Skeleton, Row, Statistic, Spin, Tag } from 'antd';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const { TabPane } = Tabs;
const pColours = {
  'Quartz': 'rgb(235,174,71)',
  'Sapphire': '#7467ef',
  'Emerald': '#7cc244',
}


function currencyFormat(num) {
  return '₦ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const renderContent = ( data, pplan, pprice, payToday, payReady ) => (
  <React.Fragment>
    <Statistic title="Address" value={`${data.address}, ${data.city}, ${data.state}`} />
    <Statistic title="Location" value={data.location} />

  </React.Fragment>
);

const extraContent = ( data, pplan, pprice, payToday, payReady ) => (
  <React.Fragment>
    {pplan && (
      <Statistic title="Payment Plan" value={pplan.title} />
    )}
    {pprice && (
      <Statistic title="Total Price" value={currencyFormat(parseInt(pprice))} />
    )}
  </React.Fragment>
);


const CheckoutContent = ({ children, extra }) => (
    <Row
      justify='space-between'
    >
      <Col lg={18} md={18} sm={16} xs={16}>
        <div className="main">{children}</div>

      </Col>
      <Col lg={6} md={6} sm={8} xs={8}>
        <div className="extra">{extra}</div>
      </Col>
    </Row>
);

export default ({ data, pplan, pprice, payToday, payReady }) => {
  const [ isLoading, setIsLoading ] = React.useState(false);

  return (
    <div className="container">
      <div id="components-page-header-demo-responsive">
        <div>
          <PageHeader
            style={{
              border: '1px solid rgb(235, 237, 240)',
            }}
            onBack={() => window.history.back()}
            title={`${data.name}`}
            subTitle={`${data.beds} bedroom ${data.type}`}
          >
            <CheckoutContent 
              extra={extraContent(data, pplan, pprice, payToday, payReady)}
            >
              {renderContent(data, pplan, pprice, payToday, payReady)}
            </CheckoutContent>
          </PageHeader>
        </div>
      </div>
    </div>
  );
}

