import React, { Component } from 'react';
import NumberScroller from '../NumberScroller/NumberScroller'
import LockSetter from '../LockSetter/LockSetter'
import "./NumberScrollerVatPanel.css";

class NumberScrollerVatPanel extends Component {

    render() {
        return (
            <div>
                <div className="NumberScrollerVatPanelTitle">{this.props.vat.title}:</div>
                <NumberScroller 
                    val={this.props.vat.val}
                    index={this.props.index} 
                    incHandler={this.props.incHandler}
                    decHandler={this.props.decHandler}
                />
                <LockSetter 
                    index={this.props.index} 
                    isLocked={this.props.vat.isLocked}
                    lockHandler={this.props.lockHandler}
                />
            </div>
        );
    }
}

export default NumberScrollerVatPanel;
