import React, { Component } from "react";
import { connect } from "react-redux";

import { postQuote } from "../actions";

import PostForm from "../components/PostForm";
import Histroy from "../History";

export class PostQuote extends Component {
  onSubmit = (formValue) => {
    this.props.postQuote({ ...formValue, userid: this.props.userid });
  };
  render() {
    return (
      <div className="page">
        <h1>Post Quote</h1>
        <PostForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}
const stateToProps = (state) => {
  if (!state.user.isLoggedin) {
    Histroy.push("/");
  }
  return {
    userid: state.user.userid,
  };
};
export default connect(stateToProps, { postQuote })(PostQuote);
