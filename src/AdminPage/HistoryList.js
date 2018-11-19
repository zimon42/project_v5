import React, { Component } from 'react';
import HistoryItem from './HistoryItem';
import './History.css';

class HistoryList extends Component {

    numCols = 6;

    renderHistoryItem(item_i) {
        let itemTot = this.props.historyData.length;
        return <HistoryItem itemIndex={item_i} itemTot={itemTot} itemData={this.props.historyData[item_i]} />
    }

    renderCellContent = (row_i,col_i) => {
        let item_i = row_i*this.numCols + col_i;
        let numItems = this.props.historyData.length;
        if (item_i<numItems) {
            return this.renderHistoryItem(item_i);
        } 
        return "";
    }

    renderHistoryCells = (row_i) => {
        let cells = new Array(this.numCols);
        for (let col_i=0; col_i<this.numCols; col_i++) {
            cells[col_i] = <td>{this.renderCellContent(row_i,col_i)}</td>;
        }
        return cells;
    }

    renderHistoryRows = () => {
        const numRows = Math.ceil(this.props.historyData.length/this.numCols);
        let rows = new Array(numRows);
        for (let row_i=0; row_i<numRows; row_i++) {
            rows[row_i] = <tr>{this.renderHistoryCells(row_i)}</tr>;
        }
        return rows;
    }

    render() {
        return (
            <div className='HistoryList'>
                <table><tbody>{this.renderHistoryRows()}</tbody></table>
            </div>
        );
    }

}

export default HistoryList;
