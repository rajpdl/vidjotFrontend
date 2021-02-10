import React, { Component } from 'react';
import { Redirect, Route} from 'react-router-dom';

class ProtectedRoute extends Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('authToken');
        return isAuthenticated? <Route component={Component}/> : <Redirect to={{ pathname: '/login'}} />
    }
}

export default ProtectedRoute;