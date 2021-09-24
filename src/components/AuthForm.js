import React from "react";
import { Field, reduxForm } from "redux-form";

import { renderInput } from "./FormRenders";
import { v_Email } from "./FormValidations";
import "./Form.css";

class AuthForm extends React.Component {
  onSubmit = (formValue) => {
    this.props.onSubmit(formValue.otp);
  };
  onSendOTP = (formValue) => {
    this.props.onSendOTP(formValue.email);
  };

  renderForm() {
    if (!this.props.email) {
      return (
        <form onSubmit={this.props.handleSubmit(this.onSendOTP)}>
          <Field name="email" component={renderInput} label="Enter Email" />
          <button disabled={!this.props.valid} className="field-buttom">
            Send OTP
          </button>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="otp" component={renderInput} label="Enter OTP" />
          <button disabled={!this.props.valid} className="field-buttom">
            Submit
          </button>
        </form>
      );
    }
  }
  render() {
    return <React.Fragment>{this.renderForm()}</React.Fragment>;
  }
}
const validate = (formValue) => {
  const error = {};
  error.email = v_Email(formValue.email);
  return error;
};
export default reduxForm({
  form: "authForm",
  validate,
})(AuthForm);
