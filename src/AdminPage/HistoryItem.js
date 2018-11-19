import React, { Component } from 'react';
import Diagram from "./Diagram";

class HistoryItem extends Component {

    render() {
        return (
            <div>                
                <div class='HistoryItemHeader'>
                    Röst <b>{this.props.itemIndex+1}</b> av {this.props.itemTot} <br /> 
                    {this.props.itemData.date}                    
                </div>
                <Diagram diagramData={this.props.itemData.vote_vats} />
            </div>
        );
    }

}

export default HistoryItem;
