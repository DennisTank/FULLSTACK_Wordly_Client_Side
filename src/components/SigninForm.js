import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { renderInput, renderDate, renderTextarea } from "./FormRenders";
import {
  v_Password,
  v_DOB,
  v_Username,
  v_Bio,
  v_CnfPass,
} from "./FormValidations";
import "./Form.css";

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.checkPass = React.createRef();
    this.onShowPassChange = this.onShowPassChange.bind(this);
    this.state = { textType: "password" };
  }
  onShowPassChange = () => {
    if (this.checkPass.current.checked) {
      this.setState({ textType: "text" });
    } else {
      this.setState({ textType: "password" });
    }
  };
  onSubmit = (formValue) => {
    this.props.onSubmit(formValue);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="username"
          component={renderInput}
          label="Enter Username"
        ></Field>
        <Field
          name="dob"
          component={renderDate}
          label="Enter Date of Birth"
        ></Field>
        <Field name="bio" component={renderTextarea} label="Enter Bio"></Field>
        <Field
          name="password"
          component={renderInput}
          label="Enter Password"
          myType={this.state.textType}
        ></Field>
        <Field
          name="cnfpass"
          component={renderInput}
          label="Confirm Password"
          myType={this.state.textType}
        ></Field>
        <div className="pass-show row-center">
          <input
            ref={this.checkPass}
            type="checkbox"
            onChange={this.onShowPassChange}
          />
          <p>Show Password</p>
        </div>
        <button disabled={!this.props.valid} className="field-buttom">
          SignIn
        </button>
      </form>
    );
  }
}
const validate = (formValue) => {
  const error = {};
  error.password = v_Password(formValue.password);
  error.username = v_Username(formValue.username);
  error.dob = v_DOB(formValue.dob);
  error.bio = v_Bio(formValue.bio);
  error.cnfpass = v_CnfPass(formValue.password, formValue.cnfpass);
  return error;
};
export default reduxForm({
  form: "signinForm",
  validate,
})(SigninForm);
