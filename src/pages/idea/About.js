import React, { Component } from 'react';
import Navigation from './../../component/Navigation';

class About extends Component {
    render() {
        return(
            <div>
                <Navigation />
            
            <div className="container">
                
                <h1>About Page</h1>
                <p>Name: Raja Poudel</p>
                <p>Studying: University Of Computer Studies (Mandalay)</p>
                <p>Lives In: Mogok</p>
                <p>From: Mogok</p>
            </div>
            </div>
        );
    }
}

export default About;