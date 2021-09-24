import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import { renderPostarea } from "../components/FormRenders";
import { v_Quote } from "../components/FormValidations";

export class PostQuote extends Component {
  onSubmit = (formValue) => {
    this.props.onSubmit(formValue);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="l-quote" style={{ width: "65%" }}>
          <FaQuoteLeft />
        </div>
        <Field
          name="quote"
          component={renderPostarea}
          label="Enter the Golden Words"
        ></Field>
        <div className="r-quote" style={{ width: "65%" }}>
          <FaQuoteRight />
        </div>
        <button disabled={!this.props.valid} className="field-buttom">
          Post
        </button>
      </form>
    );
  }
}

const validate = (formValue) => {
  const error = {};
  error.quote = v_Quote(formValue.quote);
  return error;
};
export default reduxForm({
  form: "postQuoteForm",
  validate,
})(PostQuote);
