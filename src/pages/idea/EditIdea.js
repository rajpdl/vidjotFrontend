import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import ideaAxios from "../../config/ideaAxios";
import Navigation from '../../component/Navigation';
import IdeaInput from "../../component/IdeaInput";

class EditIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      detai: "",
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
  }
  async componentDidMount() {
    if(!localStorage.getItem('authToken')) {
      this.props.history.push('/login');
    }
    const result = await ideaAxios.get(`/${this.props.match.params.id}`, {
      headers: {
        "x-auth": localStorage.getItem("authToken"),
      },
    });
    if (result.status === 200) {
      const { title, detail } = result.data;
      this.setState({ title });
      this.setState({ detail });
    }
  }
  async handleSaveChanges(e) {
    e.preventDefault();
    const result = await ideaAxios.post(
      `/${this.props.match.params.id}`,
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
    const data = await result.data;
    if (result.status === 200) {
        this.props.history.push('/');
    }
    if (result.status === 400) {
      this.setState({ msg: data.text });
    }
  }
    handleChange(target, value) {
    this.setState({ [target]: value });
  }
  handleReset() {
    this.setState({title: ''});
    this.setState({detail: ''});
}
async handleDelete() {
  const result = await ideaAxios.delete(`/${this.props.match.params.id}`, {
      headers: {
          'x-auth': localStorage.getItem('authToken')
      }
  });
  if(result.status === 200) {
      this.props.history.push('/');
  }
}
  render() {
    return (
      <div>
        <Navigation />
      
      <div className="container">
        
        <div>
          <form onSubmit={this.handleSaveChanges}>
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
              <input type='button' value="Delete" onClick={this.handleDelete} />
              <input
                type="submit"
                value="Save Changes"
                onClick={this.handleSaveChanges}
              />
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}
export default withRouter(EditIdea);
