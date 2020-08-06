import React, { Component } from "react";
const logo = 'https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2FlogoOutline.png?alt=media&token=7b54fd4e-ef58-4717-9c4b-2fb16a7f8bbf';

class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        <div className="flex flex-middle brand">
          <img src={logo} alt="stow-logo" />
          <div className="brand__text">STOW</div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Brand;
