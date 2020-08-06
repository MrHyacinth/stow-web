import React from "react";
import { Spin } from 'antd';
import PropertyCheckoutInfoForm from "./PropertyCheckoutInfoForm";
import PropertyCheckoutHeader from "./components/PropertyCheckoutHeader";
import StepperForm from "./StepperForm";
import { Breadcrumb, SimpleCard } from "matx";
import { FirestoreDocument } from 'react-firestore';
import { paymentPlans } from '../../../assets/data/paymentPlans';

const PropertyCheckoutForm = props => {
  const { match } = props;
  const { pid } = match.params;
  const propertyPath = "/property/"+pid;

  const [ pplan, pplanSet ] = React.useState(paymentPlans[0]);
  const [ pprice, ppriceSet ] = React.useState(null);
  
  const [ payUpfront, payUpfrontSet ] = React.useState(false);
  const [ pay3Months, pay3MonthsSet ] = React.useState(false);
  const [ pay6Months, pay6MonthsSet ] = React.useState(false);
  const [ payMyWay, payMyWaySet ] = React.useState(false);

  const [ payToday, payTodaySet ] = React.useState(0);
  const [ payReady, payReadySet ] = React.useState(0);


  return (
    <div className="m-sm-15">
      <FirestoreDocument
        path={propertyPath}
        render={({ isLoading, data }) => {
          const item = data ? data : null;
          return isLoading || !data ? (
            <Spin />
          ) : (
            <React.Fragment>
              <div className="" 
                style={{
                  background: '#fff',
                }}
              >
                <PropertyCheckoutHeader 
                  data={data}
                  pplan={pplan}
                  pprice={pprice}
                  payToday={payToday}
                  payReady={payReady}
                />
              </div>
              <div className="py-8" />
              <SimpleCard title="">
                <StepperForm 
                  data={data} 
                  pid={pid}
                  pplan={pplan}
                  pplanSet={pplanSet}
                  pprice={pprice}
                  ppriceSet={ppriceSet}
                  payUpfront={payUpfront}
                  pay3Months={pay3Months}
                  pay6Months={pay6Months}
                  payMyWay={payMyWay}
                  payToday={payToday}
                  payReady={payReady}
                  payUpfrontSet={payUpfrontSet}
                  pay3MonthsSet={pay3MonthsSet}
                  pay6MonthsSet={pay6MonthsSet}
                  payMyWaySet={payMyWaySet}
                  payTodaySet={payTodaySet}
                  payReadySet={payReadySet} 
                />
              </SimpleCard>
            </React.Fragment>
          )
        }}
      />
    </div>
  );
};

export default PropertyCheckoutForm;
