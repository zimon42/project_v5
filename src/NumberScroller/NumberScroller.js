import React, { Component } from 'react';
import './NumberScroller.css';

class NumberScroller extends Component {
  render() {
    return (
        <div className="NumberScroller">
            <button onClick={() => {return this.props.decHandler(this.props.index);}} >&lt;</button>
            <input type="text" value={this.props.val} className="NumberScrollerText"/>
            <button onClick={() => {return this.props.incHandler(this.props.index);}} >&gt;</button>
        </div>
    );
  }
}

export default NumberScroller;
