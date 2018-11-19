import React, { Component } from 'react';
import lock_img from './lock.png';
import "./LockSetter.css";

class LockSetter extends Component {

  render() {

    let lockButtonClasses = "LockSetterButton ";
    lockButtonClasses += this.props.isLocked ?
    "LockSetterIsLockedTrue" :
    "LockSetterIsLockedFalse";
    
    return (
        <div className="LockSetter">
            <button 
              className={lockButtonClasses}
              onClick={() => {return this.props.lockClickHandler(this.props.index)}}>
              {this.props.isLocked ? "Låst" : "Lås"}
            </button>
        </div>
    );
  }
}

export default LockSetter;
