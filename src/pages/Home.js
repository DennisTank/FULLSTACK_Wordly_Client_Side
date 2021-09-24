import React from "react";
import { connect } from "react-redux";

import AuthForm from "../components/AuthForm";
import LoginForm from "../components/LoginForm";
import SigninForm from "../components/SigninForm";
import ErrorModel from "../components/ErrorModel";

import {
  logIn,
  signIn,
  logInError_A,
  signInError_A,
  authError_A,
  auth_R,
  auth,
} from "../actions";

import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
      isAuth: false,
    };
  }
  onFormChange = () => {
    this.setState({ isLogin: !this.state.isLogin });
    if (this.state.isLogin) {
      this.props.auth_R();
      this.setState({ isAuth: false });
    }
  };
  onLogin = (formValue) => {
    this.props.logIn(formValue);
  };
  onSignin = (formValue) => {
    this.props.signIn({ ...formValue, email: this.props.email });
  };
  onAuthin = (otp) => {
    if (Number(this.props.otp) === Number(otp)) {
      this.setState({ isAuth: true });
    } else {
      this.setState({ AuthError: "INVALID_OTP" });
    }
  };
  onSendOTP = (email) => {
    this.props.auth(email);
  };
  onErrorClose = () => {
    if (this.props.logInError) {
      this.props.logInError_A();
    } else if (this.props.signInError) {
      this.props.signInError_A();
    } else {
      this.props.authError_A();
    }
  };
  renderOption({ lable, name }) {
    return (
      <div className="colume-center">
        <div className="row-center">
          <hr style={{ width: "50px" }} />
          <p>
            <strong>OR</strong>
          </p>
          <hr style={{ width: "50px" }} />
        </div>
        <lable htmlFor="">
          <strong>{lable}</strong>
        </lable>
        <button className="field-buttom" onClick={this.onFormChange}>
          {name}
        </button>
      </div>
    );
  }
  renderForms() {
    if (this.state.isLogin) {
      return (
        <div>
          <LoginForm onSubmit={this.onLogin} />
          {this.renderOption({ lable: "Create a new Account", name: "SignIn" })}
        </div>
      );
    } else if (!this.state.isAuth) {
      return (
        <div>
          <AuthForm
            email={this.props.email}
            onSubmit={this.onAuthin}
            onSendOTP={this.onSendOTP}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div className="row-center underline">
            <h3>EMAIL:&nbsp; </h3>
            <h4>
              <strong>{this.props.email}</strong>
            </h4>
          </div>
          <SigninForm onSubmit={this.onSignin} />
          {this.renderOption({
            lable: "Already have a Account",
            name: "LogIn",
          })}
        </div>
      );
    }
  }
  renderErrorModel() {
    if (this.props?.logInError) {
      return (
        <ErrorModel error={this.props.logInError} onClick={this.onErrorClose} />
      );
    } else if (this.props?.signInError) {
      return (
        <ErrorModel
          error={this.props.signInError}
          onClick={this.onErrorClose}
        />
      );
    } else if (this.props?.authError) {
      return (
        <ErrorModel error={this.props.authError} onClick={this.onErrorClose} />
      );
    } else if (this.state.AuthError) {
      return (
        <ErrorModel
          error={this.state.AuthError}
          onClick={() => {
            this.setState({ AuthError: null });
          }}
        />
      );
    }
  }
  render() {
    return (
      <div className="page">
        {this.renderErrorModel()}
        <div className="home-form">{this.renderForms()}</div>
      </div>
    );
  }
}
const stateToProps = (state) => {
  return {
    logInError: state.error?.logInError,
    signInError: state.error?.signInError,
    authError: state.error?.authError,
    email: state.user.auth?.email,
    otp: state.user.auth?.otp,
  };
};
export default connect(stateToProps, {
  auth,
  logIn,
  signIn,
  logInError_A,
  signInError_A,
  authError_A,
  auth_R,
})(Home);
