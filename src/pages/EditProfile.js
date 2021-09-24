import React, { Component } from "react";
import { connect } from "react-redux";
import { FiEdit } from "react-icons/fi";

import {
  editUsername,
  editDOB,
  editBIO,
  signInError_A,
  uploadProfilePic,
} from "../actions";

import EditProfileModle from "../components/EditProfileModel";
import ErrorModel from "../components/ErrorModel";
import Histroy from "../History";

function buildFileSelector() {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  return fileSelector;
}

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.fileSelector = buildFileSelector();
  }
  componentDidMount() {
    this.resetImage();
  }
  resetImage = () => {
    this.setState({
      profile_url: `http://localhost:5000/images/profile_${
        this.props.userid
      }.png?${Date.now()}`,
    });
  };
  onDPError = (e) => {
    e.target.error = null;
    e.target.src = "http://localhost:5000/images/profile_fb.png";
  };
  handleFileSelect = (e) => {
    e.preventDefault();
    this.fileSelector.click();
    this.fileSelector.onchange = (e) => {
      this.props.uploadProfilePic(e.target.files[0], this.resetImage);
    };
  };
  onSubmit = (formValue) => {
    this.setState({ isEdit: null });
    if (formValue.username) {
      this.props.editUsername(formValue);
    } else if (formValue.dob) {
      this.props.editDOB(formValue);
    } else if (formValue.bio) {
      this.props.editBIO(formValue);
    }
  };
  onClose = () => {
    this.setState({ isEdit: null });
  };
  onClickEdit(which) {
    this.setState({ isEdit: which });
  }
  onErrorClose = () => {
    this.props.signInError_A();
  };
  renderProfiePic() {
    return (
      <div className="row-center ">
        <div className="profile-pic " style={{ margin: "0px" }}>
          <img src={this.state.profile_url} onError={this.onDPError} />
        </div>
        <div
          className="edit"
          style={{
            margin: "0px",
            alignSelf: "flex-end",
          }}
          onClick={this.handleFileSelect}
        >
          <FiEdit />
        </div>
      </div>
    );
  }
  renderUserName() {
    return (
      <div className="row-center underline">
        <h3>Username:&nbsp; </h3>
        <h4>
          <strong>{this.props.username}</strong>
        </h4>
        <div className="edit" onClick={() => this.onClickEdit("username")}>
          <FiEdit />
        </div>
      </div>
    );
  }

  renderDob() {
    return (
      <div className="row-center underline">
        <h3>Date Of Birth:&nbsp; </h3>
        <h4>
          <strong>{this.props.dob}</strong>
        </h4>
        <div className="edit" onClick={() => this.onClickEdit("dob")}>
          <FiEdit />
        </div>
      </div>
    );
  }
  renderBio() {
    return (
      <div
        className="colume-center underline"
        style={{
          width: "50%",
          height: "fit-content",
          wordBreak: "break-all",
        }}
      >
        <div className="row-center">
          <h3>Bio:&nbsp; </h3>
          <div className="edit" onClick={() => this.onClickEdit("bio")}>
            <FiEdit />
          </div>
        </div>
        <p style={{ whiteSpace: "pre-line" }}>{this.props.bio}</p>
      </div>
    );
  }
  renderEPModel() {
    if (this.state.isEdit) {
      return (
        <EditProfileModle
          onClickClose={this.onClose}
          which={this.state.isEdit}
          onSubmit={this.onSubmit}
        />
      );
    }
  }
  renderErrorModel() {
    if (this.props?.signInError) {
      return (
        <ErrorModel
          error={this.props.signInError}
          onClick={this.onErrorClose}
        />
      );
    }
  }
  render() {
    return (
      <div className="page">
        {this.renderErrorModel()}
        {this.renderEPModel()}
        <h1>Edit Profile</h1>
        {this.renderProfiePic()}
        {this.renderUserName()}
        {this.renderDob()}
        {this.renderBio()}
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
    username: state.user.username,
    dob: state.user.dob,
    bio: state.user.bio,
    signInError: state.error?.signInError,
  };
};
export default connect(stateToProps, {
  editUsername,
  editDOB,
  editBIO,
  signInError_A,
  uploadProfilePic,
})(EditProfile);
