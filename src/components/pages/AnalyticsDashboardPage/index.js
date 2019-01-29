import React from 'react'
import * as utils from './functions.js'

class AnalyticsDashboardPage extends React.Component {

  render() {
    const elems = () => {
      return (
        <div>
          <div id="coverup"/>
          <div id="performance">Performance</div>
          {/* Plotly chart will be drawn inside this div */ }
          <select className="dropdown" id="dd" onChange={ utils.changeMetric() }>
            <option value="Today" selected="selected">Today</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last Month">Last Month</option>
          </select>
          <select className="agents_dropdown" id="agents" onclick={ utils.agentsButton } onChange={ utils.agentsChanged }>
            <option value selected="selected">Agents</option>
          </select>
          <button id="export_data" onclick={ utils.exportButton() }>Export Data</button>
          <div className="Row">
            <div className="Column" id="total_revenue">C1</div>
            <div className="Column" id="this_day">Today's Revenue</div>
            <div className="Column" id="this_month">October's Revenue</div>
            <div className="Column" id="this_year">2018 Revenue</div>
          </div>
          <hr />
          <div id="chartContainer" style={{height: '50%', width: '50%', margin: 'auto'}} />
        </div>
      )
    }

    return (
      <div
        style={{backgroundColor: '#f8f9fa'}}
      >
        { elems(),  utils.calculate() }
      </div>
    )
  }

}

export default AnalyticsDashboardPage
