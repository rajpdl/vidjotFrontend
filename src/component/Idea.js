import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class Idea extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
   

    render() {
        return (
            <div className="card" onClick={this.handleEdit}>
                <h2>{this.props.title}</h2>
                <p><b>{this.props.detail}</b></p>
                <p>CreatedAt: {this.props.createdAt}</p>
                <p>EditedAt: {this.props.editedAt} </p>
                <button className="edit" onClick={() =>  {
                   this.props.history.push(`/editidea/${this.props._id}`);
                }}>Edit</button>  
            </div>
        );
    }
}
export default withRouter(Idea);