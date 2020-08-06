import React from "react";
import { enquireScreen } from 'enquire-js';

import PricingTable from '../components/PricingTable';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;

const ResidentialSegment = props => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect( () => {
    enquireScreen((b) => {
      setIsMobile(b);
      // console.log(isMobile);
    });
  },[])

  return (
    <PricingTable
      id="Pricing2_0"
      key="Pricing2_0"
      isMobile={isMobile}
    />
  );

};

export default ResidentialSegment;
