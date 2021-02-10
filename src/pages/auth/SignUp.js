import React, { Component } from "react";
import { Link } from "react-router-dom";
import InputValidator from '../../util/InputValidator';
import authAxios from '../../config/authAxios';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      msg:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleChange(e) {
    const name = e.target.name,
      value = e.target.value;
    this.setState({ [name]: value });
  }
  handleReset() {
    this.setState({ username: "" });
    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ confirmPassword: "" });
  }
  async handleRegister() {
    if (
      InputValidator(this.state.username) &&
      InputValidator(this.state.password) &&
      InputValidator(this.state.confirmPassword) &&
      this.state.password === this.state.confirmPassword
    ) {
        const result = authAxios.post('/signup', {email: this.state.email, username: this.state.username, password: this.state.password}, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = result.data;
        if(result.status === 201) {
          this.setState({msg: `You have successfully registered. as ${data.username}`});
        }
        if(result.status === 400) {
          this.setState({msg: data.text});
        }
    }
    
  }
  render() {
    return (
      <div className="f-container">
        <h1>Sign Up</h1>
        <form>
        <div className="error">
              <p>{this.state.msg}</p>
            </div>
          <div className="f-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username..."
              onChange={this.handleChange}
            />
          </div>
          <div className="f-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              onChange={this.handleChange}
            />
          </div>
          <div className="f-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              onChange={this.handleChange}
            />
          </div>
          <div className="f-group">
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter your password again..."
              onChange={this.handleChange}
            />
          </div>
          <div className="b-group">
            <input type="button" value="Reset" onClick={this.handleReset} />
            <input
              type="button"
              value="Register"
              onClick={this.handleRegister}
            />
          </div>
          <p>
            Already have an accout.<Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}
