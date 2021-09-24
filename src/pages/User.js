import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaBirthdayCake } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import { fetchUser, fetchQuotesOF, deleteQuote } from "../actions/";

import QuoteCard from "../components/QuoteCard";
import DeleteQuoteModle from "../components/DeleteQuoteModle";
import FollowStatus from "../components/FollowStatus";

import "./User.css";
import "./Quote.css";

import Histroy from "../History";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteAlertOn = this.deleteAlertOn.bind(this);
    this.deleteAlertOff = this.deleteAlertOff.bind(this);
  }

  componentDidMount() {
    if (!this.props.isme) {
      this.props.fetchUser(this.props.userid);
    }
    this.props.fetchQuotesOF(this.props.userid);
    this.setState({
      profile_url: `http://localhost:5000/images/profile_${
        this.props.userid
      }.png?${Date.now()}`,
    });
  }
  onDPError = (e) => {
    e.target.error = null;
    e.target.src = "http://localhost:5000/images/profile_fb.png";
  };
  OnDeleteAQuote = (quoteid) => {
    this.deleteAlertOff();
    this.props.deleteQuote(quoteid);
  };
  deleteAlertOn = (quoteid) => {
    this.setState({ deleteQuote: quoteid });
  };
  deleteAlertOff = () => {
    this.setState({ deleteQuote: null });
  };

  renderUser() {
    if (this.props.username) {
      return (
        <div className="user">
          <div className="profile-pic">
            <img src={this.state.profile_url} onError={this.onDPError} />
          </div>
          <div className="username">{this.props.username}</div>
        </div>
      );
    } else {
      return (
        <div
          className="user"
          style={{
            height: "40px",
            backgroundColor: "rgba(16,16,16,0.5)",
          }}
        >
          <div className="username"></div>
        </div>
      );
    }
  }
  renderEmail() {
    if (this.props.isme) {
      return <div className="email">{this.props?.email}</div>;
    }
  }
  renderFollowsBtn() {
    return (
      <Link
        className="follow-btn"
        to={"/follows"}
        style={{ textDecoration: "none" }}
      >
        <div>All Follows</div>
      </Link>
    );
  }
  renderEditProfile() {
    if (this.props.isme) {
      return (
        <Link
          className="edit-profile"
          to={"/edit-profile"}
          style={{ textDecoration: "none" }}
        >
          <div>
            Edit Profile&nbsp;
            <FiEdit />
          </div>
        </Link>
      );
    }
  }
  //MODLES
  renderDeleteAlert(deleteQuote) {
    if (deleteQuote) {
      return (
        <DeleteQuoteModle
          quoteid={deleteQuote}
          onClickYes={this.OnDeleteAQuote}
          onClickClose={this.deleteAlertOff}
        />
      );
    }
  }
  //
  render() {
    return (
      <div className="page">
        {this.renderDeleteAlert(this.state.deleteQuote)}
        {this.renderEditProfile()}
        {this.renderUser()}
        {this.renderEmail()}
        <div className="dob">
          <FaBirthdayCake />
          {this.props?.dob}
        </div>
        <FollowStatus show={!this.props.isme} userid={this.props.userid} />
        {this.renderFollowsBtn()}
        <div className="bio">
          <p style={{ whiteSpace: "pre-line" }}>{this.props?.bio}</p>
        </div>
        <div className="quote-list">
          {this.props?.quotelist.map((i) => {
            return (
              <div key={i.quoteid} className="quote">
                <QuoteCard
                  quoteid={i.quoteid}
                  quote={i.quote}
                  username={i.username}
                  time={i.time}
                  showUser={false}
                  canDelete={this.props.isme}
                  OnDelete={this.deleteAlertOn}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const stateToProps = (state, myProps) => {
  if (!state.user.isLoggedin) {
    Histroy.push("/");
  }

  let data = {};
  if (Number(state.user.userid) === Number(myProps.match.params.id)) {
    data = { ...state.user, auth: null, isme: true };
  } else {
    data = {
      ...state.atUser.userdata,
      userid: myProps.match.params.id,
      doIFollow: state.atUser.doIFollow,
    };
  }
  return {
    ...data,
    quotelist: state.quoteList,
  };
};
export default connect(stateToProps, {
  fetchUser,
  fetchQuotesOF,
  deleteQuote,
})(User);
