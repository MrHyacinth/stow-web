import React from 'react';
import { withRouter } from "react-router-dom";

import { FirestoreDocument } from 'react-firestore';

import { Col, Form, List, Row, Select, Spin, Typography, Card } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const formItemLayout = {
	wrapperCol: {
	  xs: {
	    span: 24,
	  },
	  sm: {
	    span: 22,
	  },
	},
};

const SearchFilter = props => {
	const { filterRes, setFilterRes, filterResFinal, setFilterResFinal } = props;

  return (
    <React.Fragment>
     	<FirestoreDocument
        path="/data/options"
        render={({ isLoading, data, error }) => {
        return isLoading ? (
          <p>...</p>
        ) : (

          <Form
            layout="horizontal"
            style={{
            	width: '90%'
            }}
            onValuesChange={ props => {
                let localFilterRes = {
                  ...filterRes,
                  ...props
                }
                setFilterRes(localFilterRes);
                  var filterArray = [];

              if (localFilterRes['location']) filterArray.push(['location', '==', localFilterRes['location'] ]);
              if (localFilterRes['priceRange']) filterArray.push(['series', '==', localFilterRes['priceRange'] ]);
              if (localFilterRes['beds']) filterArray.push(['beds', '==', localFilterRes['beds'] ]);
              var filterProperties = filterArray.length > 0 ? filterArray : null;
              setFilterResFinal(filterProperties);
                
            }}
          >
              <Row
              	justify='space-around'
              >
                <Col lg={8} md={8} sm={24} xs={24}>
                   <FormItem className="filterItem" {...formItemLayout} name="location">
                      <Select
                        placeholder="Location"
                        style={{
                          width: '100%',
                        }}
                      >
                      <Option value={null}>All</Option>
                        {data && data.locations.map( (dat,ind) => (
                          <Option 
                            key={ind} 
                            value={dat}
                          >
                            {dat}
                          </Option>
                        ))}
                      </Select>
                  </FormItem>
                </Col>

                <Col lg={8} md={8} sm={24} xs={24}>
                  <FormItem className="filterItem" {...formItemLayout} name="priceRange">
                    <Select
                      placeholder="Price"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Option value={null}>All</Option>
                      <Option value="Quartz">5m - 15m</Option>
                      <Option value="Sapphire">15m - 50m</Option>
                      <Option value="Emerald">60m +</Option>
                    </Select>
                  </FormItem>
                </Col>

                <Col lg={8} md={8} sm={24} xs={24}>
                  <FormItem className="filterItem" {...formItemLayout} name="beds">
                    <Select
                      placeholder="Beds"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Option value={null}>All</Option>
                     {data && data.beds.map( (dat,ind) => (
                        <Option 
                          key={ind} 
                          value={dat}
                        >
                          {dat}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          )
        }}
      />
    </React.Fragment>
  );
}

  export default SearchFilter;