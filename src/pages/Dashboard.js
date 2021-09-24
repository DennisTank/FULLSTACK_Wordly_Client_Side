import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchQuotes } from "../actions";

import QuoteCard from "../components/QuoteCard";
import Histroy from "../History";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchQuotes();
  }
  render() {
    return (
      <div className="page">
        <div className="quote-list">
          {this.props?.quotelist.map((i) => {
            return (
              <div key={i.quoteid} className="quote">
                <QuoteCard
                  quoteid={i.quoteid}
                  quote={i.quote}
                  userid={i.userid}
                  username={i.username}
                  time={i.time}
                  showUser={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const stateToProps = (state) => {
  if (!state.user.isLoggedin) {
    Histroy.push("/");
  }
  return {
    quotelist: state.quoteList,
  };
};
export default connect(stateToProps, { fetchQuotes })(Dashboard);
