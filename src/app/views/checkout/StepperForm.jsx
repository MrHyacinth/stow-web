import React from "react";

import history from "history.js";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import PayInterswitchDialog from './components/PayInterswitchDialog';
import PayBranchDialog from './components/PayBranchDialog';

import PaymentPlanDetail from './components/PaymentPlanDetail';
import TermsAlertDialog from 'app/components/TermsAlertDialog';

import { paymentPlans } from 'assets/data/paymentPlans';
import { priceFormat } from 'app/functions/functions';

import firebase from 'firebase';

import FormPDFViewer from '../../components/FormPDFViewer';

import { PageHeader, Tabs, Statistic, Descriptions, Input, InputNumber, Row, Col, Spin, Timeline } from 'antd';

import AgreementDoc from './components/AgreementDoc';

const { TabPane } = Tabs;

const db = firebase.firestore();


function getSteps() {
  return [
    "Payment Plans",
    "Terms of Purchase",
    "Complete Order",
  ];
}

function getStepContent(
    stepIndex,
    data,
    pplan,
    pplanSet,
    pprice,
    ppriceSet,
    payUpfront,
    pay3Months,
    pay6Months,
    payMyWay,
    payToday,
    payReady,
    payUpfrontSet,
    pay3MonthsSet,
    pay6MonthsSet,
    payMyWaySet,
    payTodaySet,
    payReadySet,
    tid,
    tidSet,
  ) {
    var user = firebase.auth().currentUser;
    const agreementUrl = 'https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/docs%2FSTOWEContract.pdf?alt=media&token=83d93488-2194-40a6-aec1-317f90fc1333';

    if (!user) {
      return <Spin />
    }
    const { uid, displayName, email } = user;
    var unm = displayName ? displayName : email;
    const { id, name } = data;
    
    var rurl = new URL("/api/interswitch/confirm", document.baseURI).href;

    async function newTransaction(props) {
      let transRef = await
        db.collection('transactions')
        .add(props)
        .then(ref => {
            const transId = ref.id;
            console.log('New transaction ID: ', transId);
            tidSet(transId);
        })
        .catch(error => {
          console.log(error);
          alert(error.message);
        })
      return transRef;
    }

    
  switch (stepIndex) {
    case 0:
      return (
        <Row>
          <Col 
            lg={16} 
            md={24}
          >
            <Tabs 
              type={'card'}
              size={'large'}
              tabBarExtraContent={null}
              onChange={(key)=> {
                var thisPlan = paymentPlans[key];
                // console.log(thisPlan);
                pplanSet(thisPlan);
                switch(thisPlan.title) {
                  case 'Fast Track':
                    ppriceSet(data.price*1.05);
                    break;
                  case 'Flexi 24':
                    ppriceSet(data.price*1.10);
                    break;
                  case 'Flexi 36':
                    ppriceSet(data.price*1.125);
                    break;
                  case 'Flexi 48':
                    ppriceSet(data.price*1.15);
                    break;
                  default:
                    ppriceSet(data.price);
                    break
                  }
                }}
              >
              {paymentPlans.map((plan,ind) => {
                return (
                  <TabPane tab={plan.title} key={ind}
                   forceRender={true}
                  >
                    <PaymentPlanDetail 
                      plan={plan} 
                      data={data}
                      pplan={pplan}
                      pplanSet={pplanSet}
                      pprice={pprice}
                      ppriceSet={ppriceSet}
                    />
                  </TabPane>
                )
              })}
            </Tabs>
          </Col>
          <Col 
            lg={8} 
            md={24}
            style={{
              marginTop: 24,
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
          <Timeline>
            <h1>Payment Thresholds</h1>
              <br />
              <Timeline.Item color="blue">Equity of {`${pplan.breakdown[0]}%`} required for Offer Letter</Timeline.Item>
              <Timeline.Item color="blue">{`${pplan.breakdown[0]}%`}: ₦{priceFormat(parseInt(pprice)*((pplan.breakdown[0])/100))}</Timeline.Item>

              <Timeline.Item color="red">
                <p>Equity of {`${pplan.breakdown[0]+pplan.breakdown[1]}%`} required for conditional allocation of your unit</p>
              </Timeline.Item>
              <Timeline.Item color="red">{`${pplan.breakdown[0]+pplan.breakdown[1]}%`}: ₦{priceFormat(parseInt(data.price)*((pplan.breakdown[0]+pplan.breakdown[1])/100))}</Timeline.Item>

              <Timeline.Item color="green">
                <p>Equity of {`${pplan.breakdown[0]+pplan.breakdown[1]+pplan.breakdown[2]}%`} required to receive your keys</p>
              </Timeline.Item>
              <Timeline.Item color="green">{`${pplan.breakdown[0]+pplan.breakdown[1]+pplan.breakdown[2]}%`}: ₦{priceFormat(parseInt(data.price)*((pplan.breakdown[0]+pplan.breakdown[1]+pplan.breakdown[2])/100))}</Timeline.Item>
            </Timeline>
          </Col>
        </Row>
      );
      case 1:
        return (
          <div>
            <AgreementDoc />
          </div>
        );
      case 2:
        return (
            <div
              className="checkoutPaymentBtnsContainer"
            >
            <Row 
              style={{
                width: '100%',
              }}
            >
            <Col md={24} lg={8} xl={8} 
              style={{
                width: '100%',
              }}
            >
              <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                width: '100%',
                  }}
                >
              <a 
              className={`feature7-block-group k962t0jasll-editor_css checkoutPaymentBtn ${payUpfront && 'checkoutPaymentBtnSelected'} `}
              onClick={() => {
                payUpfrontSet(true);
                pay3MonthsSet(false);
                pay6MonthsSet(false);
                payMyWaySet(false);
                var payTodayTemp = (pplan.breakdown[0]/100)*pprice;
                payTodaySet(payTodayTemp);
              }}
              >
                <div name="image" className="feature7-block-image">
                <img src="https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg" alt="img" />
                </div>
                <h1 name="title" className="feature7-block-title">
                  <span><span>
                  Pay Upfront
                  </span></span>
                </h1>
              </a>


               <a 
              className={`feature7-block-group k962t0jasll-editor_css checkoutPaymentBtn ${pay3Months && 'checkoutPaymentBtnSelected'} `}
                onClick={() => {
                  payUpfrontSet(false);
                  pay3MonthsSet(true);
                  pay6MonthsSet(false);
                  payMyWaySet(false);
                  var payTodayTemp3 = ((pplan.breakdown[0]/100)*pprice)/3;
                  payTodaySet(payTodayTemp3);
                }}
              >
                <div name="image" className="feature7-block-image">
                <img src="https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg" alt="img" />
                </div>
                <h1 name="title" className="feature7-block-title">
                  <span><span>
                  Pay over 3 months
                  </span></span>
                </h1>
              </a>
            </div>
            </Col>
            <Col md={24} lg={8} xl={8} 
              style={{
                width: '100%',
              }}
            >


                      <div 
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                width: '100%',
                                }}
                              >
                         <a 
                        className={`feature7-block-group k962t0jasll-editor_css checkoutPaymentBtn ${pay6Months && 'checkoutPaymentBtnSelected'} `}
                          onClick={() => {
                            payUpfrontSet(false);
                            pay3MonthsSet(false);
                            pay6MonthsSet(true);
                            payMyWaySet(false);
                            var payTodayTemp6 = ((pplan.breakdown[0]/100)*pprice)/6;
                            payTodaySet(payTodayTemp6);
                          }}
                        >
                          <div name="image" className="feature7-block-image">
                          <img src="https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg" alt="img" />
                          </div>
                          <h1 name="title" className="feature7-block-title">
                            <span><span>
                            Pay over 6 months
                            
                            </span></span>
                          </h1>
                        </a>
                         <a 
                        className={`feature7-block-group k962t0jasll-editor_css checkoutPaymentBtn ${payMyWay && 'checkoutPaymentBtnSelected'} `}
                          onClick={() => {
                            payUpfrontSet(false);
                            pay3MonthsSet(false);
                            pay6MonthsSet(false);
                            payMyWaySet(true);
                            var payTodayTempM = (pplan.breakdown[0]/100)*pprice;
                            payTodaySet(payTodayTempM);
                          }}
                        >
                          <div name="image" className="feature7-block-image">
                          <img src="https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg" alt="img" />
                          </div>
                          <h1 name="title" className="feature7-block-title">
                            <span><span>
                            Pay My Way
                            </span></span>
                          </h1>
                        </a>
                      </div>
                      </Col>

                        <Col md={24} lg={8} xl={8} 
                          style={{
                            width: '100%',
                          }}
                        >
                            <div 
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                              }}
                            >
                              <Input  
                                className="checkoutPaymentInput"
                                type="number"
                                addonBefore="Pay Today"
                                value={parseInt(payToday)}
                                onChange={ e => {
                                  const { value } = e.target;
                                  payTodaySet(value);
                                }}
                                disabled={!payMyWay}
                              />
                              {!payReady ? ( 
                                   <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit" 
                                    style={{
                                      margin: '0.5em 0',
                                      width: '100%',
                                    }}
                                    className="checkoutPaymentMethodBtn"
                                    onClick={async ()=> {
                                      if (payToday <= 0 && !payMyWay) {
                                        alert('Please select a Payment Option');
                                        return false;
                                      }
                                      if (payToday <= 0 && payMyWay) {
                                        alert('Please input an amount to Pay Today');
                                        return false;
                                      }
                                      payReadySet(true);

                                      const transData = {
                                          uid,
                                          unm,
                                          pid: id,
                                          pnm: name,
                                          pplan,
                                          payToday: payMyWay || payToday,
                                          payUpfront,
                                          pay3Months,
                                          pay6Months,
                                          payMyWay,
                                          paid: 0,
                                        };
                                      return await newTransaction(transData);
                                    }}
                                  >
                                    Select Payment Method
                                  </Button>
                                ): (

                                <div 
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                  }}
                                  className="checkoutPaymentMethodBtn"
                                >
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit" 
                                    style={{
                                      margin: '0',
                                      width: '100%',
                                    }}
                                    onClick={()=> {
                                     const paymentOption=
                                        payUpfront && 'Upfront'
                                        || pay3Months && '3 months'
                                        || pay6Months && '6 months'
                                        || payMyWay && 'My Way'
                                      ;
                                      history.push({
                                        pathname: "/payment/summary",
                                        state: { 
                                          rurl: rurl,
                                          amt: parseInt(payToday),
                                          cur: '566',
                                          pid: id,
                                          pnm: name,
                                          uid: uid,
                                          unm: unm,
                                          paymentPlan: pplan.title,
                                          paymentPlanPrice: pprice,
                                          paymentOption: paymentOption,
                                          tid: tid,
                                        }
                                      });
                                    }}
                                  >
                                    PAY ONLINE
                                  </Button>
                                  
                                  <PayBranchDialog 
                                    uid={uid}
                                    unm={unm}
                                    pid={id}
                                    pnm={name}
                                    tid={tid}
                                    payToday={payToday}
                                  />
                                </div>
                                )}
                             

                              </div>
                      
                    </Col>
            </Row>
            </div>
        );
    
    default:
      return `Aenean arcu ligula, porttitor id neque imperdiet, congue convallis erat. Integer libero sapien, convallis a vulputate vel, pretium vulputate metus. Donec leo justo, viverra ut tempor commodo, laoreet eu velit. Donec vel sem quis velit pharetra elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in commodo mauris. Ut iaculis ipsum velit.`;
  }
}

export default function StepperForm(props) {
  const { 
    match, 
    history, 
    data, 
    pid, 
    pplan,
    pplanSet,
    pprice,
    ppriceSet,
    payUpfront,
    pay3Months,
    pay6Months,
    payMyWay,
    payToday,
    payReady,
    payUpfrontSet,
    pay3MonthsSet,
    pay6MonthsSet,
    payMyWaySet,
    payTodaySet,
    payReadySet,
   } = props;

  const [ tid, tidSet ] = React.useState(null);


  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    document.getElementsByClassName('scrollbar-container')[1].scrollTo(0,0);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    document.getElementsByClassName('scrollbar-container')[1].scrollTo(0,0);
  };

  const handleReset = () => {
    setActiveStep(0);
    document.getElementsByClassName('scrollbar-container')[1].scrollTo(0,0);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button
              className="mt-16"
              variant="contained"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          ) : (
            <div>
            {
              getStepContent(
                activeStep,
                data,
                pplan,
                pplanSet,
                pprice,
                ppriceSet,
                payUpfront,
                pay3Months,
                pay6Months,
                payMyWay,
                payToday,
                payReady,
                payUpfrontSet,
                pay3MonthsSet,
                pay6MonthsSet,
                payMyWaySet,
                payTodaySet,
                payReadySet,
                tid,
                tidSet,
              )}
            <div className="checkoutStepperButtons pt-16">
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              { activeStep == 1 ? (
                <TermsAlertDialog 
                  onAccept={handleNext}
                  onReject={handleBack}
                />
               ): activeStep != steps.length - 1 ? (
                  <Button
                    className="ml-16"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Save" 
                      : activeStep == 1 ? "Accept"
                      : "Select"}
                  </Button>

                ) : (
                  null
              )} 

              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
