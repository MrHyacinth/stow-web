import React from 'react';
import { PageHeader, Tabs, Descriptions, Avatar, Card, Col, List, Skeleton, Row, Statistic, Spin, Tag } from 'antd';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Carousel, { Modal, ModalGateway } from 'react-images';
import pFeatures from 'assets/data/pFeatures.js';
const pColours = {
  'Quartz': 'rgb(235,174,71)',
  'Sapphire': '#7467ef',
  'Emerald': '#7cc244',
}

const { TabPane } = Tabs;

const renderContent = (data) => (
  <Descriptions size="small" column={1}>
    <Descriptions.Item label="Address">
      {`${data.address}, ${data.city}, ${data.state}`}
    </Descriptions.Item>

  </Descriptions>
);

const extraContent = ( data ) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
    <Statistic title="Total Price" prefix="₦" value={data.price.toLocaleString('en')} />
  </div>
);

const Content = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

export default ({ data }) => {
  var images = data ? (data.photos ? [data.primaryPhoto,...data.photos] : [data.primaryPhoto]) : null;
  var imagesFloorPlan = data && data.floorPlan || null;

  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ lightboxOpen, setLightboxOpen ] = React.useState(false);
  const [ selectedIndex, setSelectedIndex ] = React.useState(0);

  const toggleLightbox = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    setLightboxOpen(!lightboxOpen);
  };

  var features = data ? pFeatures[0][data.series].features : [];

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
          extra={[
            <Button 
              variant="contained"
              color="primary"
              key="photos"
              onClick={() => toggleLightbox('photos')}
              disabled={!images}
            >Photos

            </Button>,
            <Button 
              variant="outlined"
              color="primary"
              key="floorPlan"
              onClick={() => toggleLightbox('floorPlan')}
              disabled={!imagesFloorPlan}
              style={{
                marginLeft: '12px',
              }}
            >Floor Plan

            </Button>,
          ]}
          footer={
           null
          }
        >
          <Content 
            // extra={extraContent(data)}>
            extra={null}
          >
            {renderContent(data)}
          </Content>
        </PageHeader>
      {/* 
        <Row gutter={24}>
          <Col span={24}>
            <Card
              className="projectList"
              style={{
                marginBottom: 24,
              }}
              // extra={(
                // <Link to={`/checkout/${data.id}`}>
                //   <Button 
                //     variant="contained"
                //     color="secondary"
                //     key="checkout"
                //   >Make A Payment</Button>
                // </Link>
                // )}
              bordered={false}
              title={<Tag color={pColours[data.series]}>{`${data.series} Series`}</Tag>}
              loading={isLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              <Row gutter={8}>
                {features.map( (item,ind) => (
                  <Col lg={8} md={12} sm={24} xs={24} key={ind}>
                    <Card.Grid className="projectGrid">
                      <Card
                        bodyStyle={{
                          padding: 0,
                        }}
                        bordered={false}
                      >
                        <Card.Meta
                          title={
                            <div className="cardTitle">
                              <Avatar size="small" src={item.icon} />
                              <span 
                                style={{
                                  padding: '0 0.4em',
                                  fontSize: '0.8em',
                                  color: pColours[data.series]
                                }}
                              >
                                {item.text}
                              </span>
                            </div>
                          }
                        />
                      </Card>
                    </Card.Grid>
                    </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      */}
      </div>
    </div>
     <ModalGateway>
        {lightboxOpen && !isLoading && (
          <Modal onClose={toggleLightbox}>
            <Carousel
              frameProps={{ autoSize: 'height' }}
              views={selectedIndex == 'floorPlan' ? imagesFloorPlan : images }
            />
          </Modal>
        )}
      </ModalGateway>
  </div>
);
}
const styles2 = {
  slide: {
    // width: '100%',
    height: '100%',
    minHeight: 121,
    overflow: 'hidden',
    // color: '#fff',
  },
};
 