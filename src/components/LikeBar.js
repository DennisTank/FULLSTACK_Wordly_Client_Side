import React, { Component } from "react";
import { connect } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { allLike, doLike, doDislike } from "../actions";

export class LikeBar extends Component {
  constructor(props) {
    super(props);
    this.onLike = this.onLike.bind(this);
    this.onDisLike = this.onDisLike.bind(this);
  }
  // new reducer for like is needed
  // for dublicate do set thing
  componentDidMount() {
    this.props.allLike(this.props.quoteid);
  }
  onLike() {
    this.props.doLike(this.props.quoteid);
  }
  onDisLike() {
    this.props.doDislike(this.props.quoteid);
  }
  renderIcon() {
    if (this.props.likedbyme) {
      return (
        <div className="heart red" onClick={this.onDisLike}>
          <AiFillHeart />
        </div>
      );
    } else {
      return (
        <div className="heart" onClick={this.onLike}>
          <AiOutlineHeart />
        </div>
      );
    }
  }
  render() {
    return (
      <div className="likes">
        {this.renderIcon()}
        <div>{this.props.quotelikes}</div>
      </div>
    );
  }
}
const stateToProps = (state, myProps) => {
  let myindex;
  state.likeList.map((i, index) => {
    if (Number(i.quoteid) === Number(myProps.quoteid)) {
      myindex = index;
      return;
    }
  });
  return {
    quoteid: myProps.quoteid,
    quotelikes: state.likeList?.[myindex]?.quotelikes,
    likedbyme: state.likeList?.[myindex]?.likedbyme,
  };
};
export default connect(stateToProps, { allLike, doLike, doDislike })(LikeBar);
