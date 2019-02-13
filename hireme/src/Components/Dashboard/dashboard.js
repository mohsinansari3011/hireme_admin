import React, { Component } from 'react';
import PieChart from 'react-simple-pie-chart';
import style from './dashboard.css'



class Dashboard extends Component {
    render() {

        const slices = 
            [{
                title:'Monthly',
                color: 'red',
                value: 10,
            },
            {
                title: 'Weekly',
                color: 'green',
                value: 20,
            },
            {
                title: 'Daily',
                color: 'blue',
                value: 20,
            },]


        return (
            
            <div>
                
            <div className={style.monthly}>
                    <h4>Monthly (red) 10</h4> 
                    <h4>Weekly (green) 20</h4>
                    <h4>Daily (blue) 20</h4>
                    <PieChart slices={slices} />
            </div>
                
              
            </div>
        );
    }
}

export default Dashboard;