import React from 'react';


import { withRouter, Link } from "react-router-dom";

import { FirestoreDocument } from 'react-firestore';

import { Col, Form, List, Row, Select, Spin, Typography, Card } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const PropertySearchCard = props => {
  const { isLoading, data } = props;

  return (
  <List
    rowKey="ind"
    loading={isLoading}
    grid={{
      gutter: 24,
      xs: 1,
      sm: 2,
      md: 2,
      lg: 3,
      xl: 3,
      xxl: 4,
    }}
    dataSource={data}
    renderItem={item => (
      <List.Item >
        <Link to={`/property/${item.id}`}>
          <Card className="card" hoverable 
            cover={(
              <img 
               alt={item.name} 
               src={item.primaryPhoto.src || item.primaryPhoto} 
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
                { item.beds.length == 1 ? (
                  `${item.beds} Bed ${item.type}`
                  ) : (
                    `${item.beds} ${item.type}`
                )}
              </span>
              <div className="propertyCardPrice">
                {`₦ ${parseInt(item.price).toLocaleString('en')}`}
              </div>
            </div>
          </Card>
          </Link>
        </List.Item>

        )}
      />
  )
}

export default PropertySearchCard;
