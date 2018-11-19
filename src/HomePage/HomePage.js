import React, { Component } from 'react';
import './HomePage.css';
import { Link} from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div className="HomePageCenter">                
                <h1>Miedweb's momsröstnings-applikation version 4</h1>                
                <Link to="/admin/">Admin-panelen</Link><br />
                <Link to="/vote/">Rösta-panelen</Link>
            </div>
        );
    }
}

export default HomePage;