import React, { Component } from 'react';
import Diagram from "./Diagram";

import './Stats.css';

class Stats extends Component {

    render() {
        return (
            <div>
                <div className="StatsItemHeader">
                    Medelvärdet av {this.props.statsData.num_votes} röster
                </div>
                <Diagram diagramData={this.props.statsData.vote_vats} />
            </div>
        )
    }
}

export default Stats;