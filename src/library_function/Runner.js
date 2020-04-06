import React, { Component, useContext } from "react";
import ReactDOM from "react-dom";
import { stringify } from "js-slang/dist/interop";
// const HtmlToReactParser = require('html-to-react').Parser;

class Runner extends Component {
  constructor() {
    super();
    this.canvas = null;
  }
  componentDidMount() {
    if (this.canvas !== null) {
      ReactDOM.findDOMNode(this).appendChild(this.canvas);
    }
  }

  render() {
    if (
      this.props.value !== undefined &&
      this.props.value.$canvas !== undefined
    ) {
      this.canvas = this.props.value.$canvas;
      return <div></div>;
    } else {
      return <p>{stringify(this.props.value)}</p>;
    }
  }

  // props.callBack();
}

export default Runner;
