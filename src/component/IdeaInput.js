import React, { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class IdeaInput extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const target = e.target.name,
      value = e.target.value;
    this.props.handleChange(target, value);
  }
  render() {
    return (
      <div>
        <div className="f-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={this.props.title}
          />
        </div>
        <div className="f-group">
          <label htmlFor="detail">Detail</label>
          <textarea
            className="f-field"
            name="detail"
            onChange={this.handleChange}
            value={this.props.detail}
          ></textarea>
        </div>
      </div>
    );
  }
}

export default withRouter(IdeaInput);
