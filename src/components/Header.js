import React from "react";
import { connect } from "react-redux";
import "./Header.css";
import { logOut } from "../actions";

import logo from "../assets/logo.png";

class Header extends React.Component {
  onLogOut = () => {
    this.props.logOut();
  };
  renderLogOut() {
    if (this.props.isLoggedin) {
      return (
        <div className="logout" onClick={this.onLogOut}>
          <div>LogOut</div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="header-right">{this.renderLogOut()}</div>
      </div>
    );
  }
}
const stateToProps = (state) => {
  return {
    isLoggedin: state.user.isLoggedin,
  };
};
export default connect(stateToProps, { logOut })(Header);
