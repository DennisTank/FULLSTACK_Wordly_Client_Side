import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FaQuoteLeft,
  FaQuoteRight,
  FaRegCaretSquareDown,
} from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

import LikeBar from "./LikeBar";

export class QuoteCard extends Component {
  onClickDelete = () => {
    this.props.OnDelete(this.props.quoteid);
  };
  renderQuote() {
    return <p style={{ whiteSpace: "pre-line" }}>{this.props.quote}</p>;
  }
  renderQuoteBy() {
    if (!this.props.showUser) return;

    return (
      <div className="quote-by">
        <hr />
        <Link
          to={`user/${this.props.userid}`}
          style={{ textDecoration: "none" }}
        >
          <div className="user-card">
            <div className="username">@{this.props?.username}</div>
          </div>
        </Link>
      </div>
    );
  }
  findTimeDiff() {
    const pt = new Date(this.props.time);
    const td = new Date();
    const mins = Math.floor((td - pt) / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    if (years >= 1) return `${years} years ago`;
    if (months >= 1) return `${months} months ago`;
    if (weeks <= 3 && weeks != 0) return `${weeks} weeks ago`;

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 24) {
      return `${hours} hours ago`;
    } else {
      return `${mins} minutes ago`;
    }
  }
  renderQuoteTime() {
    return <div className="time-stamp">{this.findTimeDiff()}</div>;
  }
  renderDelete() {
    if (this.props.canDelete) {
      return (
        <div className="remove-quote">
          <RiDeleteBin5Line
            style={{ cursor: "pointer" }}
            onClick={this.onClickDelete}
          />
        </div>
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.renderDelete()}
        <div className="l-quote">
          <FaQuoteLeft />
        </div>
        {this.renderQuote()}
        <div className="r-quote">
          <FaQuoteRight />
        </div>
        {this.renderQuoteBy()}
        {this.renderQuoteTime()}
        <LikeBar quoteid={this.props.quoteid} />
      </React.Fragment>
    );
  }
}

export default QuoteCard;
