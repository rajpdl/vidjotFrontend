import React, { Component } from "react";

import Navigation from "../../component/Navigation";
import ideaAxios from "../../config/ideaAxios";
import Idea from "../../component/Idea";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
    };
  }
  async componentDidMount() {
    const result = await ideaAxios.get("/", {
      headers: {
        "x-auth": localStorage.getItem("authToken"),
      },
    });
    const data = result.data;
    if (result.status === 200) {
      this.setState({ ideas: data });
    }
    if (result.status === 401) {
      this.setState({ msg: "You have not authorization to access it." });
    }
  }

  render() {
    return (
      <div>
        <Navigation />
      <div className="container">
        
        <button
          onClick={() => {
            this.props.history.push("/createidea");
          }}
        >
          Create New
        </button>
        {this.state.ideas.map((idea, i) => {
          return (
            <div key={idea._id}>
              <Idea
                key={i}
                title={idea.title}
                detail={idea.detail}
                _id={idea._id}
                createdAt={idea.createdAt}
                editedAt={idea.editedAt}
                changeCpn={this.changeCpn}
                handleId={this.handleId}
              />
            </div>
          );
        })}
      </div>
      </div>
    );
  }
}

export default withRouter(Home);
