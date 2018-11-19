import React, { Component } from 'react';
import "./HorizontalSlider.css";
import Config from "../config.js";
// import HorizontalSlider from '../HorizontalSlider';

class HorizontalSlider extends Component {

    render() {

        // These values must be updated here if you change in the .css file
        // const slider_width = 1000;
        // const button_width = 100;

        let left = (this.props.val / 100) * (Config.SLIDER_WIDTH - Config.SLIDER_BUTTON_WIDTH);

        let style = {
            left:left+'px'
        };

        return (
            <div className="HorizontalSlider">
                <div className="HorizontalSliderBar">                    
                </div>
                <div style={style} className="HorizontalSliderButton pointer_cursor" 
                    onMouseDown={(e) => {return this.props.mouseDownHandler(e,this.props.index)}}>
                    <div className="HorizontalSliderButtonWindow">
                        <span className="no-select pointer_cursor">{Math.round(this.props.val)}%</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default HorizontalSlider;