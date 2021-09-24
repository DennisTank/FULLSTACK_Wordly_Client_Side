import React from "react";
import { FaRegWindowClose } from "react-icons/fa";

import EditProfileForm from "./EditProfileForm";

class EditProfileModle extends React.Component {
  onSubmit = (formValue) => {
    this.props.onSubmit(formValue);
  };
  render() {
    return (
      <div className="model">
        <div className="model-card">
          <div className="close-model" onClick={this.props.onClickClose}>
            <FaRegWindowClose />
          </div>
          <EditProfileForm onSubmit={this.onSubmit} which={this.props.which} />
        </div>
      </div>
    );
  }
}

export default EditProfileModle;
