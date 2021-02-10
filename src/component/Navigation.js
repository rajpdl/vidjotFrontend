import React, { Component } from "react";
import { Link } from "react-router-dom";

import getToken from "./../util/getToken";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }
  componentDidMount() {
    if (getToken()) {
      this.setState({ authenticated: true });
    }
  }
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {this.state.authenticated ? (
            <div className="r-box">
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </div>
          ) : (
            <div className="r-box">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="signup">SignUp</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    );
  }
}
