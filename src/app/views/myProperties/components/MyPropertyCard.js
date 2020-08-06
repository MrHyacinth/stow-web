import React from 'react';


import { withRouter, Link } from "react-router-dom";

import { FirestoreDocument } from 'react-firestore';

import { Col, Form, List, Row, Select, Spin, Typography, Card } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const MyPropertyCard = props => {
  const { isLoading, data } = props;

  return (
  <List
    rowKey="ind"
    loading={isLoading}
    grid={{
      gutter: 16,
      xs: 1,
      sm: 1,
      md: 2,
      lg: 2,
      xl: 2,
      xxl: 2,
    }}
    dataSource={data}
    renderItem={item => (
      <List.Item >
      <FirestoreDocument
            path={`/property/${item.pid}`}
            render={({ isLoading, data }) => {
              const item = data ? data : null;
              const images = data && data.photos && [data.primaryPhoto, ...data.photos] || data && [data.primaryPhoto];

              return isLoading || !data ? (
                <Spin />
              ) : (
                   
                <Link to={`/user/property/${item.id}`}>
                  <Card className="card" hoverable 
                    cover={(
                      <img 
                       alt={item.name} 
                       src={item.primaryPhoto && item.primaryPhoto.src || item.primaryPhoto} 
                      />
                    )}
                  >
                    <Card.Meta
                      title={item.name}
                      avatar={(
                        <img 
                          src={item.logo ? item.logo.src : null} 
                          style={{
                            maxWidth: '5em',
                            maxHeight: '4em',
                          }}

                        />
                      )}
                      description={
                        <Paragraph
                          className="item"
                          ellipsis={{
                            rows: 1,
                          }}
                        >
                          {`${item.city}, ${item.state}`}
                        </Paragraph>
                      }
                    />
                    <div className="propertyCardContent">
                      <span>
                          {`${item.beds} Bed ${item.type}`}
                      </span>
                      <div className="propertyCardPrice">
                        {`₦ ${parseInt(item.price).toLocaleString('en')}`}
                      </div>
                    </div>
                  </Card>
                </Link>
              )
           }}
          />
        </List.Item>

        )}
      />
  )
}

export default MyPropertyCard;
