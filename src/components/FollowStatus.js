import React, { Component } from "react";
import { connect } from "react-redux";

import { checkFollow, doFollow, doUnFollow } from "../actions";
export class FollowStatus extends Component {
  componentDidMount() {
    if (this.props.show) {
      this.props.checkFollow(this.props.userid);
    }
  }
  onFollow = async () => {
    await this.props.doFollow(this.props.userid);
    this.props.checkFollow(this.props.userid);
  };
  onUnFollow = async () => {
    await this.props.doUnFollow(this.props.userid);
    this.props.checkFollow(this.props.userid);
  };
  renderStatus() {
    if (this.props.show) {
      if (this.props.doIFollow) {
        return (
          <div className="follow" onClick={this.onUnFollow}>
            unfollow
          </div>
        );
      } else {
        return (
          <div className="follow" onClick={this.onFollow}>
            follow
          </div>
        );
      }
    }
  }
  render() {
    return <React.Fragment>{this.renderStatus()}</React.Fragment>;
  }
}
const stateToPros = (state, myProps) => {
  return {
    userid: myProps.userid,
    show: myProps.show,
    doIFollow: state.atUser.doIFollow,
  };
};
export default connect(stateToPros, { checkFollow, doFollow, doUnFollow })(
  FollowStatus
);
