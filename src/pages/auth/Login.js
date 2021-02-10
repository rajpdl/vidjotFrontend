import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import authAxios from '../../config/authAxios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
    const name = e.target.name,
      value = e.target.value;
    this.setState({ [name]: value });
  }
  handleReset() {
    this.setState({ email: "" });
    this.setState({ password: "" });
  }
  async handleLogin() {
    try{
      const result = await authAxios.post('/login', {email: this.state.email, password: this.state.password}, {
        headers: {
          'Content-Type': 'application/json'
        }
      } )
      const data = result.data;
      if(result.status === 200) {
        const authToken = data['x-auth'];
        const refreshToken = data['x-refresh'];
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('refreshToken', refreshToken);
        this.props.history.push('/');        
      }
    }catch(error) {
      this.setState({message: error.message});
    }
  }
    

  render() {
    return (
      <div className="f-container">
        <h1>Login</h1>
        <div className="error">
          <p>{this.state.message}</p>
        </div>
        <form>
          <div className="f-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter your email..."
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="f-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter your password..."
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="b-group">
            <input type="button" value="Reset" onClick={this.handleReset} />
            <input type="button" value="Login" onClick={this.handleLogin} />
          </div>
          <p>
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </form>
      </div>
    );
  }
}
export default Login;
