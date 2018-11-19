import React, { Component } from 'react';

class Diagram extends Component {

    constructor(props) {
        super(props);
        this.bar_height = 15;
        this.bar_max_length = 50;
        this.title_length = 50;
        this.padding_left = 5;
        this.padding_top = 5;    
        this.svg_width = 150;
        this.svg_height = this.props.diagramData.length * this.bar_height + 2*this.padding_top;
    }


    renderRow = (i) => {

        // item contains title and val. do not
        // confuse this with history item which
        // contains multiple diagram items.
        let item = this.props.diagramData[i];

        let svgElemsArr = [];
        let y = i*this.bar_height + this.padding_top;

        // Title
        let title_x = this.padding_left;
        let title_y = y+this.bar_height - 5;
        let title_style = {fontSize:'10px'};
        svgElemsArr.push(<text x={title_x} y={title_y} style={title_style}>{item.title}</text>);

        // Bar
        let bar_x = this.title_length;
        let bar_width = Math.floor(item.val);

        // Problem, for low start perc, hard to distinguish bar
        // differences. Therefor multiply with scale factor
        bar_width *= 2;

        let bar_style = {
            fill:item.color,
            strokeWidth:1,
            stroke:'black'
        };
        svgElemsArr.push(<rect x={bar_x} y={y} width={bar_width} height={this.bar_height} style={bar_style} />);

        // Perc
        let perc_x = bar_x + bar_width + 5;
        let perc_y = title_y;
        let perc_style = {fontSize:'10px'};
        svgElemsArr.push(<text x={perc_x} y={perc_y} style={perc_style}>{Math.round(item.val)}%</text>);

        return svgElemsArr;
    }

    renderRows = () => {
        const numRows = this.props.diagramData.length;
        let rows = new Array(numRows);
        for (let i=0; i<numRows; i++) {
            rows[i] = this.renderRow(i);
        }
        return rows;
    }

    render() {
        return (
            <div>
                <svg width={this.svg_width} height={this.svg_height} style={{border: '1px solid black'}}>                    
                    {this.renderRows()}
                </svg>
            </div>
        );
    }

}

export default Diagram;
