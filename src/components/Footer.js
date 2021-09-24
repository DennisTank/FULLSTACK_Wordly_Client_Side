import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GrAdd, GrBlockQuote, GrUser } from "react-icons/gr";

import "./Footer.css";

export class Footer extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <div></div>;
    }
    return (
      <div className="footer">
        <div className="footer-body">
          <Link to={`/dashboard`} style={{ textDecoration: "none" }}>
            <div className="footer-option">
              <GrBlockQuote />
            </div>
          </Link>
          <Link to={`/post-quote`} style={{ textDecoration: "none" }}>
            <div className="footer-option">
              <GrAdd />
            </div>
          </Link>
          <Link
            to={`/re/${this.props.userid}`}
            style={{ textDecoration: "none" }}
          >
            <div className="footer-option">
              <GrUser />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
const stateToprops = (state) => {
  return {
    isLoggedIn: state.user.isLoggedin,
    userid: state.user.userid,
  };
};
export default connect(stateToprops, { Link })(Footer);
