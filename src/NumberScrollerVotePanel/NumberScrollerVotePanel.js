import React, { Component } from 'react';
import NumberScrollerVatPanel from '../NumberScrollerVatPanel/NumberScrollerVatPanel';

class NumberScrollerVotePanel extends Component {

  state = {
      vats: [
        {title: "Coffe", val: 25, isLocked: false},
        {title: "Rejuvelac", val: 25, isLocked: false},
        {title: "Coca Cola", val: 25, isLocked: false}
      ]
  }

  incHandler = (index) => {
    // alert("incHandler, index:"+index);
    this.decIncHandler("inc", index);
  }

  decHandler = (index) => {
    // alert("decHandler, index:"+index);
    this.decIncHandler("dec", index);
  }

  lockHandler = (index) => {
    // alert("lockHandler, index:"+index);  
    let oldStateCopy = {...this.state};
    let isLocked = oldStateCopy.vats[index].isLocked;
    oldStateCopy.vats[index].isLocked = !isLocked;
    this.setState(oldStateCopy);
  }

  decIncHandler = (op, index) => {
    // alert("decIncHandler, op:"+op+", index:"+index);

    let oldStateCopy = {...this.state};

    const byHowMuchCurrent = this.calcByHowMuchCurrent(op);

    // alert("byHowMuchCurrent:"+byHowMuchCurrent);

    oldStateCopy.vats[index].val += byHowMuchCurrent;

    const byHowMuchOthers = this.calcByHowMuchOthers(oldStateCopy.vats, index, op);
    
    // alert("byHowMuchOthers:"+byHowMuchOthers);

    this.updateOthers(oldStateCopy.vats, index, byHowMuchOthers);
    
    this.setState(oldStateCopy);
  }

  calcByHowMuchCurrent = (op) => {        
    if (op == "inc") {
        return 1;
    }
    else if (op == "dec") {
        return -1;
    }
    else {
        return 1;
    }
  }

  calcByHowMuchOthers = (arr, index, op) => {        
    let byHowMuch = 1/this.countOthers(arr, index);
    if (op == "inc") {
        return -1*byHowMuch;
    }
    else if (op == "dec") {
        return byHowMuch;
    }
    else {
        return byHowMuch;
    }
  }

  countOthers = (arr, index) => {
    let count = 0;
    for (let i=0; i<arr.length; i++) {
        let isLocked = this.state.vats[i].isLocked;
        if (i != index && !isLocked) {
            count++;
        }
    }
    return count;
  }

  updateOthers = (arr, index, byHowMuch) => {
    for (let i=0; i<arr.length; i++) {
        let isLocked = this.state.vats[i].isLocked;
        if (i != index && !isLocked) {
            arr[i].val += byHowMuch;
        }
    }
  }

  renderVatPanels = () => {
    return (
        <div>
          {
            this.state.vats.map( (val, index) => {return (
              <NumberScrollerVatPanel 
                vat={this.state.vats[index]} 
                index={index}
                incHandler={this.incHandler}
                decHandler={this.decHandler}
                lockHandler={this.lockHandler}
              />  
            )})
          }
        </div>
    );
  }


  render() {
    return (
      <div>
          {this.renderVatPanels()}
      </div>
    );
  }
}

export default NumberScrollerVotePanel;
