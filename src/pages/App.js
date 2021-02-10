import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Home from './idea/Home';
import ProtectedRoute from './../component/ProtectedRoute';
import CreateIdea from './idea/CreateIdea';
import EditIdea from './idea/EditIdea';
import About from './idea/About';
import Login from './auth/Login';
import Signup from './auth/SignUp';
import Error from './Error';
import ClearToken from './../util/ClearToken';


class App extends Component {
    render() {
        return(
            <Router>                
                <div className="container">
                    <Switch>
                        <ProtectedRoute path='/' exact component={Home} />
                        <ProtectedRoute path='/createidea' component={CreateIdea} /> 
                        <Route path='/editidea/:id' component={EditIdea} />
                        <ProtectedRoute path='/about' component={About} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/logout" component={() => {
                            ClearToken();
                            return <Redirect to='/login' />
                        }} />
                        <Route component={Error} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;