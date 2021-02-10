import React, { Component } from "react";

import Navigation from '../../component/Navigation';
import IdeaInput from "../../component/IdeaInput";
import ideaAxios from "../../config/ideaAxios";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class CreateIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      detail: "",
      msg: ''
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(target, value) {
    this.setState({ [target]: value });
  }
  handleReset() {
      this.setState({title: ''});
      this.setState({detail: ''});
  }
  async handleSave(e) {
    e.preventDefault();
    try{
      const result = await ideaAxios.post(
        "/",
        {
          title: this.state.title,
          detail: this.state.detail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth": localStorage.getItem("authToken"),
          },
        }
      );
      
      if (result.status === 201) {
          this.props.history.push('/');
      }
    }catch(error) {
      this.setState({msg: error.message});
    }
  }
  render() {
    return (
      <div><Navigation />
      <div className="container">
        
        <h1>Create New</h1>
        <form onSubmit={this.handleSave}>
          <div className="error">
            <p>{this.state.msg}</p>
          </div>
          <IdeaInput
            handleChange={this.handleChange}
            title={this.state.title}
            detail={this.state.detail}
          />
          <div className="b-group">
              <input type="button" value="Back" onClick={() => {
                  this.props.history.push('/');
              }} />
            <input type="button" value="Clear" onClick={this.handleReset} />
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
      </div>
    );
  }
}
export default withRouter(CreateIdea);
