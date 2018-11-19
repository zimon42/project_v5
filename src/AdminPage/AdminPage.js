import React, { Component } from 'react';
import './AdminPage.css';

import Config from '../config';
import $ from 'jquery';

import HistoryList from './HistoryList';
import Stats from './Stats';

import { Redirect } from 'react-router';

class AdminPage extends Component {

    state = {
        adminPageState: "showing_nothing"
    }

    clickHistoryHandler = () => {
        // alert("clickHistoryHandler");
        this.loadHistory();
    }

    loadHistory() {
        $.post(
            Config.BACKEND_ENTRY_FILE,
        { 
            action:"get_history"
        },
        (data, status) => {
            console.log("Get history: " + data + "\nStatus: " + status);
            this.setState({
                adminPageState: "showing_history",
                historyData: JSON.parse(data)
            });
        });
    }

    clickStatsHandler = () => {
        // alert("clickStatsHandler");
        this.loadStats();
    }

    loadStats() {
        $.post(
            Config.BACKEND_ENTRY_FILE,
        { 
            action:"get_stats"
        },
        (data, status) => {
            console.log("Get stats: " + data + "\nStatus: " + status);
            this.setState({
                adminPageState: "showing_stats",
                statsData: JSON.parse(data)
            });            
        });
    }

    returnToPortal = () => {
        this.setState({returnToPortal: true});
      }  

    render() {

        if (this.state.returnToPortal) {
            return <Redirect to='/' />
        }
    
        let content = "";

        if (this.state.adminPageState == "showing_history") {
            content = <HistoryList historyData={this.state.historyData} />
        }

        if (this.state.adminPageState == "showing_stats") {
            content = <Stats statsData={this.state.statsData}/>
        }

        return (
            <div className="AdminPagePanel">
                <h2 className="header">Admin-panelen</h2>
                <button onClick={this.clickHistoryHandler}>Visa historik</button>
                <button onClick={this.clickStatsHandler}>Visa statistik</button>
                <button onClick={this.returnToPortal}>Tillbaka</button>
                <hr />
                <div className="contentPanel">{content}</div>
            </div>
        );
    }
}

export default AdminPage;