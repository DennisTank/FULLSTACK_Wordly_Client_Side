import React, { Component } from "react";
import { connect } from "react-redux";

export class Follows extends Component {
  render() {
    return (
      <div className="page">
        <div className="row-center" style={{ width: "80%" }}>
          <div className="follow-option">FOLLOWERS</div>
          <div className="follow-option">FOLLOWINGS</div>
        </div>
      </div>
    );
  }
}
const stateToProps = (state) => {
  return {
    followers: state.follows.followers,
    followings: state.follows.followings,
  };
};
export default connect(stateToProps)(Follows);
