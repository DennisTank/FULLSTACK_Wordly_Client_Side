import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderInput } from "./FormRenders";
import { v_Username, v_Password } from "./FormValidations";
import "./Form.css";

class LoginForm extends React.Component {
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
        <Field name="username" component={renderInput} label="Enter Username" />
        <Field
          name="password"
          component={renderInput}
          label="Enter Password"
          myType={this.state.textType}
        />
        <div className="pass-show row-center">
          <input
            ref={this.checkPass}
            type="checkbox"
            onChange={this.onShowPassChange}
          />
          <p>Show Password</p>
        </div>
        <button disabled={!this.props.valid} className="field-buttom">
          LogIn
        </button>
      </form>
    );
  }
}
const validate = (formValue) => {
  const error = {};
  error.username = v_Username(formValue.username);
  error.password = v_Password(formValue.password);
  return error;
};
export default reduxForm({
  form: "loginForm",
  validate,
})(LoginForm);
