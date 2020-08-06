import React from 'react';
import { enquireScreen } from 'enquire-js';

import Pricing2 from './Pricing2';

import { Pricing20DataSource } from './data.source';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;

export default class PricingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: true,
    };
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    if (location.port) {
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 300);
    }
  }

  render() {
    const children = (
      <Pricing2
        id="Pricing2_0"
        key="Pricing2_0"
        dataSource={Pricing20DataSource}
        isMobile={this.state.isMobile}
      
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
