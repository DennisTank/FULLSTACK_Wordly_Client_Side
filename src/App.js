import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import History from "./History";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import ReDirecter from "./pages/ReDirecter";
import PostQuote from "./pages/PostQuote";
import EditProfile from "./pages/EditProfile";
import Follows from "./pages/Follows";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router history={History}>
        <Header />
        <div className="header-gap"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/user/:id" component={User} />
          <Route path="/re/:id" component={ReDirecter} />
          <Route path="/post-quote" component={PostQuote} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/follows" component={Follows} />
        </Switch>
        <div className="footer-gap"></div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
