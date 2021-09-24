import React, { Component } from "react";
import History from "../History";
export class ReDirecter extends Component {
  componentDidMount() {
    History.push(`/user/${this.props.match.params.id}`);
  }
  render() {
    return <div></div>;
  }
}

export default ReDirecter;
