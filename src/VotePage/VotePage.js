import React, { Component } from 'react';
import HorizontalSliderVatPanel from '../HorizontalSliderVatPanel/HorizontalSliderVatPanel';
import Config from '../config';
import './VotePage.css';
import $ from 'jquery';

import { Redirect } from 'react-router';

class VotePage extends Component {

    state = {
        
        /*
        vats: [
          {id:0, title: "Läsk", val: 25, img:"soda2.jpg", isLocked: false},
          {id:1, title: "Kaffe", val: 25, img:"coffee.png", isLocked: false},
          {id:2, title: "Mjölk", val: 25, img:"milk.jpg", isLocked: false},
          {id:3, title: "Choklad", val: 25, img:"hot_chokolate.jpg", isLocked: false},
          {id:4, title: "Rejuvelac", val: 25, img:"rejuvelac.jpg", isLocked: false},
          {id:5, title: "Svart te", val: 25, img:"black_tea.png", isLocked: false},
          {id:6, title: "Grönt te", val: 25, img:"green_tea.jpg", isLocked: false},
          {id:7, title: "Roibos", val: 25, img:"roibos.jpg", isLocked: false},          
          {id:8, title: "Buljong", val: 25, img:"broth.jpg", isLocked: false},
          {id:9, title: "Mineralvatten", val: 25, img:"mineral_water2.png", isLocked: false}
          
        ],
        */

        mouseIsDown: false,
        vatIndex: 0,
        mouseDownX: 0,
        oldVals: null,
        votePageState: "loading_vats_data",
        returnToPortal: false
    }

    mouseDownHandler = (e,index) => {
      let mouseIsDown = true;
      let vatIndex = index;
      let mouseDownX = e.pageX;

      // Set old vals
      let oldVals = new Array(this.state.vats.length);
      for (let i=0; i<oldVals.length; i++) {
        oldVals[i] = this.state.vats[i].val;
      }
      
      console.log("mouseDownHandler: mouseIsDown:"+mouseIsDown+", vatIndex:"+vatIndex+", mouseDownX:"+mouseDownX);
      this.setState({
        mouseIsDown: mouseIsDown,
        vatIndex: vatIndex,
        mouseDownX: mouseDownX,
        oldVals: oldVals
      });
    }

    componentDidMount = () => {
      document.body.addEventListener('mousemove', this.mouseMoveHandler);
      document.body.addEventListener('mouseup', this.mouseUpHandler);
      // document.body.addEventListener('keypress', this.keyPressHandler);
      $('body').keydown(this.keyPressHandler);
      this.loadVats();
    }

    componentWillUnmount = () => {
      document.body.removeEventListener('mousemove', this.mouseMoveHandler);
      document.body.removeEventListener('mouseup', this.mouseUpHandler);
      // document.body.removeEventListener('keypress', this.keyPressHandler);
    }
    
    mouseMoveHandler = (e) => {

      // Solve bug that person moves mouse before vats have loaded:
      if (!this.state.vats) return; 

      // Do not move slider that is locked
      if (this.state.vats[this.state.vatIndex].isLocked) {
        return;
      }

      // console.log("mouseMoveHandler");
      if (this.state.mouseIsDown) {
        const mouseMoveX = e.pageX;
        // console.log("mouseMoveHandler, x:"+mouseMoveX);
        const dX = mouseMoveX - this.state.mouseDownX;
        // console.log("mouseMoveHandler, dx:"+dx);
        let dVal = ( dX / (Config.SLIDER_WIDTH - Config.SLIDER_BUTTON_WIDTH)) * 100;

        // console.log("mouseMoveHandeler, newVal:"+newVal);

        // Handle too little to spare
        let toSpare = this.calcOthersToSpare(this.state, dVal);
        // console.log("mouseMoveHandler, dVal:"+dVal+", toSpare:"+toSpare);

        // Reduce dVal if too little too spare
        if (dVal <= 0 && toSpare < Math.abs(dVal)) {
          dVal = -1*toSpare;
        }
        if (dVal > 0 && toSpare < Math.abs(dVal)) {
          console.log("Overload");
          dVal = toSpare;
        }

        const oldVal = this.state.oldVals[this.state.vatIndex];
        // Muse use "let" because we might be altering
        // the value if button passes endpoints
        let newVal = oldVal + dVal;

            // Handle endpoints:
        if (newVal < 0) {
          newVal = 0;
          dVal = newVal - oldVal;
        }
        if (newVal > 100) {
          newVal = 100;
          dVal = newVal - oldVal;
        }

        // Update state of current vat
        let oldStateCopy = {...this.state};
        let vat = oldStateCopy.vats[this.state.vatIndex];
        vat.val = newVal;

        // Handle other sliders
        this.handleOtherSliders(oldStateCopy, dVal);

        // Set state
        this.setState(oldStateCopy);
    
      }
    }

    // If reachd here, dVal has already been reduced,
    // so no need to recalculate toSpare
    handleOtherSliders(oldStateCopy, dVal) {
      if (dVal > 0) {
        // Create array of indices, without current index:
        // Example: 0,1,2,4,5,6,7,8
        let arr = new Array(this.state.vats.length-1);
        for (let i=0, j=0; i<this.state.vats.length; i++) {
          if (i == this.state.vatIndex) {
            continue;
          };
          arr[j++] = i;
        }

        // Filter away locked sliders
        let temp_arr = [];
        for (let i=0; i<arr.length; i++) {
          let index = arr[i];
          let isLocked = this.state.vats[index].isLocked;
          if (!isLocked) {
            temp_arr.push(index);
          }
        }
        arr = temp_arr;

        // Sort array of indices, with the closest vats        
        // to 0 in the beginning of the array

        arr.sort((a,b) => {
          // return this.state.vats[a].val-this.state.vats[b].val;
          return this.state.oldVals[a]-this.state.oldVals[b];
        });
        
        // Calculate tempVals;
        let tempVals = new Array(this.state.vats.length);
        for (let i=0;i<this.state.vats.length;i++) {
          tempVals[i] = this.state.oldVals[i];
        }
        // console.log("Sorted array:"+arr);
        let dValLeft = Math.abs(dVal);
        let lastLoop = false;
        for (let i=0; i<arr.length; i++) {        

          let index = arr[i];
          let distTo0 = tempVals[index];
          let distAll = distTo0 * (arr.length-i);
          
          // Calculate dist:
          let dist = tempVals[index];
          if (distAll > dValLeft) {
            dist = dValLeft / (arr.length-i);
            lastLoop = true;
          } else {
          }
          // Update sliders
          for (let j=i; j<arr.length; j++) {
            let index2 = arr[j];
            tempVals[index2] -= dist;
          }
          if (lastLoop) {
            break;
          }
          dValLeft -= distAll;
        }
        // Update vals
        for (let i=0; i<this.state.vats.length; i++) {
          if (i != this.state.vatIndex) {
            oldStateCopy.vats[i].val = tempVals[i];
          }
        }
      }

      if (dVal < 0) {
      // Create array of indices, without current index:
      // Example: 0,1,2,4,5,6,7,8
      let arr = new Array(this.state.vats.length-1);
      for (let i=0, j=0; i<this.state.vats.length; i++) {
        if (i == this.state.vatIndex) {
          continue;
        };
        arr[j++] = i;
      }

      // Filter away locked sliders
      let temp_arr = [];
      for (let i=0; i<arr.length; i++) {
        let index = arr[i];
        let isLocked = this.state.vats[index].isLocked;
        if (!isLocked) {
          temp_arr.push(index);
        }
      }
      arr = temp_arr;

      // Sort array of indices, with the closest vats        
      // to 0 in the beginning of the array
      arr.sort((a,b) => {
        // return this.state.vats[a].val-this.state.vats[b].val;
        return this.state.oldVals[b]-this.state.oldVals[a];
      });
      // Calculate tempVals;
      let tempVals = new Array(this.state.vats.length);
      for (let i=0;i<this.state.vats.length;i++) {
        tempVals[i] = this.state.oldVals[i];
      }
      // console.log("Sorted array:"+arr);
      let dValLeft = Math.abs(dVal);
      let lastLoop = false;
      for (let i=0; i<arr.length; i++) {

        let index = arr[i];
        let distTo100 = 100 - tempVals[index];
        let distAll = distTo100 * (arr.length-i);
        
        // Calculate dist:
        let dist = 100 - tempVals[index];
        if (distAll > dValLeft) {
          dist = dValLeft / (arr.length-i);
          lastLoop = true;
        } else {
        }
        // Update sliders
        for (let j=i; j<arr.length; j++) {
          let index2 = arr[j];
          tempVals[index2] += dist;
        }
        if (lastLoop) {
          break;
        }
        dValLeft -= distAll;
      }
      // Update vals
      for (let i=0; i<this.state.vats.length; i++) {
        if (i != this.state.vatIndex) {
          oldStateCopy.vats[i].val = tempVals[i];
        }
      }
    }

    }

    calcOthersToSpare(oldStateCopy, dVal) {
      let toSpare = 0;
      if (dVal >= 0) {
        for (let i=0; i<oldStateCopy.vats.length; i++) {
          if (i == this.state.vatIndex) {
            continue;
          }
          if (this.state.vats[i].isLocked) {
            continue;
          }
          toSpare += oldStateCopy.oldVals[i];
        }
        return toSpare;
      }
      if (dVal < 0) {
        for (let i=0; i<oldStateCopy.vats.length; i++) {
          if (i == this.state.vatIndex) {
            continue;
          }
          if (this.state.vats[i].isLocked) {
            continue;
          }
          toSpare += (100 - oldStateCopy.oldVals[i]);
        }
        return toSpare;
      }
    }

    mouseUpHandler = (e) => {
      console.log("mouseUpHandler");
      this.setState({
        mouseIsDown: false
      });
    }

    lockClickHandler = (index) => {
      // Toggle isLocked
      let oldStateCopy = {...this.state};
      let isLocked = this.state.vats[index].isLocked;
      oldStateCopy.vats[index].isLocked = !isLocked;
      this.setState(oldStateCopy);
    }

    loadVats = () => {

      this.setState({votePageState: "loading_vats_data"});

      $.post(Config.BACKEND_ENTRY_FILE,
        { 
          action:"get_vats"
        },
        (data, status) => {
            console.log("Get vats: " + data + "\nStatus: " + status);
            let vatsArr = JSON.parse(data);

            let stateCopy = {...this.state};            
            stateCopy["vats"] = vatsArr;
            
            // Add isLocked:false to all vats
            for (let i=0; i<vatsArr.length; i++) {
              stateCopy["vats"][i].isLocked = false;
            }

            // parseInt
            for (let i=0; i<vatsArr.length; i++) {
              stateCopy["vats"][i].val = parseInt(stateCopy["vats"][i].val);
            }

            stateCopy.votePageState = "showing_vote_panel";

            this.setState( stateCopy );
        });  
    }

    voteDoneHandler = () => {
      // alert("voteDoneHandler");

      // Extract id's and vals
      let vals = this.state.vats.map( (elem,index) => {
        return {id: elem.id, val: elem.val};
      });

      console.log("voteDoneHandler vals:"+JSON.stringify(vals));
      // return;

      $.post(Config.BACKEND_ENTRY_FILE,
      { 
        action:"done_vote",
        vals:vals
      },
      (data, status) => {
          // let obj = JSON.parse(data);
          // alert("Data: " + data + "\nStatus: " + status);
          this.showThankyouScreen();
          // alert(obj.message);
      });
    }

    showThankyouScreen = () => {
      this.setState({votePageState: "showing_thankyou_screen"});
      setTimeout( () => {this.loadVats();}, 3000);
    }

    /*
    keyPressHandler = (evt) => {
      evt = evt || window.event;
      alert("key press, evt keyCode="+evt.keyCode);
      if (evt.keyCode == 27) {
          alert('Esc key pressed.');
      }  
    }
    */

    keyPressHandler = (evt) => {
      // alert("key press, evt which="+evt.key);
      if (evt.key == "Escape") {
          // alert('Esc key pressed.');
          this.returnToPortal();
      }  
    }

    returnToPortal = () => {
      this.setState({returnToPortal: true});
    }

    renderVats() {

      /*
      if (this.state.vats == undefined) {
        return "Laddar data";
      }
      */

      return (
        <div>          
          {
            this.state.vats.map( (val, index) => {return (
              <HorizontalSliderVatPanel 
                vat={this.state.vats[index]}
                index={index}
                mouseDownHandler={this.mouseDownHandler} 
                lockClickHandler={this.lockClickHandler}
                key={index}
              />  
            )})
          }
        </div>
      );

    }

    render() {

      if (this.state.returnToPortal) {
        return <Redirect to='/' />
      }

      if (this.state.votePageState == "loading_vats_data") {
        return <div>Laddar data...</div>
      }
      
      if (this.state.votePageState == "showing_vote_panel") {
        return (
          <div>
              <div className="VotePageTitle">IKEA's momsröstningsapplikation</div>
              {this.renderVats()}
              <div className="VotePageInstructions">
                Instruktioner: Panelen visar moms för åtta olika varor. Dra i reglagen för att ändra momsen på deesa varor. De andra reglagen ändrar sig hela tiden automatiskt så att summan hela tiden är konstant. Klicka på lås-knappen till höger om varje vara, om du inte vill att den ska ändras automatiskt. Klicka på knappen här under är du är klar
              </div>
              <center>
                <button id="VotePageVoteButton" onClick={this.voteDoneHandler}>Röstat klart</button>
                <button id="VotePageBackButton" onClick={this.returnToPortal}>Tillbaka</button>
              </center>
          </div>
        );
      }

      if (this.state.votePageState == "showing_thankyou_screen") {
        return (
          <div className="VotePageThankyouDiv">
            Din röst har registrerats<br />
            Tack för din medverkan!
          </div>
        )
      }

      return (
        <div>Unknown state</div>
      );

    }
    
}

export default VotePage;
