import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col, Button } from 'antd';
import { getChildrenToRender } from './utils';
import firebase from 'firebase';

function currencyFormat(num) {
  return '₦ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const Pricing1 = (props) => {
  const { pplan, pplanSet, pprice, ppriceSet } = props;
  const { plan, data, } = props;

  React.useEffect( () => {
    if (!pprice) {
      ppriceSet(data.price);
    }
   },[]);
  const getChildrenToRender = (item) => {
    const {
      wrapper,
      topWrapper,
      name,
      buttonWrapper,
      line,
      content,
      money,
    } = item.children;
      
    return (
      <Col key={item.name} {...item}>
        <div type="bottom" {...wrapper}>
          <div {...topWrapper}>
            <h1 {...money} key="name">
              {plan.title}
            </h1>
             <div {...name} key="total">
              {'Total'}
            </div>
            <h1 {...money} key="totalPrice">
              {currencyFormat(parseInt(pprice))}
            </h1>

             <div {...name} key="deposit">
              {'Initial Deposit'}
            </div>
            <h1 {...money} key="depositPrice">
              {currencyFormat((plan.breakdown[0]/100)*pprice)}
            </h1>

          </div>
          <div {...content} key="content">
            {plan.details.map( (detail,ind) => (
              <p key={ind}>
                {detail}
              </p>
              ))}
          </div>
          
        </div>
      </Col>
    );
  };

    const { dataSource } = props;
    const { block } = dataSource;
    const childrenToRender = block.children.map(getChildrenToRender);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
           <Row>
              {childrenToRender}
            </Row>
        </div>
      </div>
    );
}

export default Pricing1;
