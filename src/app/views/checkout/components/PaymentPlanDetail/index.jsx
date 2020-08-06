import React from 'react';
import { enquireScreen } from 'enquire-js';

import Pricing1 from './Pricing1';

import { Pricing10DataSource } from './data.source';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: true,
    };
  }

  componentDidMount() {
    // enquireScreen((b) => {
    //   this.setState({ isMobile: !!b });
    // });

    enquireScreen((b) => {
      this.setState({ isMobile: false });
    });
    // if (location.port) {
    //   setTimeout(() => {
    //     this.setState({
    //       show: true,
    //     });
    //   }, 300);
    // }
  }

  render() {
    const { plan, data, pplan, pplanSet, pprice, ppriceSet } = this.props;
    const children = (
      <Pricing1
        id="Pricing1_0"
        key="Pricing1_0"
        dataSource={Pricing10DataSource}
        isMobile={this.state.isMobile}
        plan={plan}
        data={data}
        pplan={pplan}
        pplanSet={pplanSet}
        pprice={pprice}
        ppriceSet={ppriceSet}
      />
    );
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {this.state.show && children}
      </div>
    );
  }
}
