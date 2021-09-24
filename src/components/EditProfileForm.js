import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { renderInput, renderDate, renderTextarea } from "./FormRenders";
import { v_DOB, v_Username, v_Bio } from "./FormValidations";

export class EditProfileForm extends Component {
  renderInput() {
    if (this.props.which === "username") {
      return (
        <Field
          name="username"
          component={renderInput}
          label="Enter New Username"
        ></Field>
      );
    } else if (this.props.which === "dob") {
      return (
        <Field
          name="dob"
          component={renderDate}
          label="Enter New Date Of Birth"
        ></Field>
      );
    } else if (this.props.which === "bio") {
      return (
        <Field
          name="bio"
          component={renderTextarea}
          label="Enter New Bio"
        ></Field>
      );
    }
  }
  onSubmit = (formValue) => {
    this.props.onSubmit(formValue);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {this.renderInput()}
        <button className="field-buttom" disabled={!this.props.valid}>
          Update
        </button>
      </form>
    );
  }
}
const validate = (formValue) => {
  const error = {};
  if (formValue.username) {
    error.username = v_Username(formValue.username);
  } else if (formValue.dob) {
    error.dob = v_DOB(formValue.dob);
  } else if (formValue.bio) {
    error.bio = v_Bio(formValue.bio);
  }

  return error;
};
export default reduxForm({
  form: "editProfileForm",
  validate,
})(EditProfileForm);
