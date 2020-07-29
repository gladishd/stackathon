import React from 'react'
import {connect} from 'react-redux'
import {fetchData} from '../store'
import store from '../store'
import {Line, Pie, Doughnut, Bar, Radar} from 'react-chartjs-2'

export class Graphs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data1: {
        labels: [],
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: 'rgba(0, 255, 100, 0.6)',
            hoverBorderColor: 'rgba(255, 255, 0, 1)',
            pointRadius: 15,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            pointHoverBorderWidth: 15,
            data: []
          }
        ]
      },
      data2: {
        labels: [],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4'
            ],
            hoverBackgroundColor: [
              '#501800',
              '#4B5000',
              '#175000',
              '#003350',
              '#35014F'
            ],
            data: []
          }
        ]
      },
      data: {
        datasets: [
          {
            data: [],
            label: 'Average Rainfall per month',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }
        ],
        labels: [] //typing
      },
      dataRadar: {
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Source 1',
            fill: true,
            backgroundColor: 'rgba(250, 99, 132, 0.2)',
            borderColor: 'rgb(250, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          },
          {
            data: [],
            label: 'Source 2',
            fill: true,
            backgroundColor: 'rgba(25, 99, 132, 0.2)',
            borderColor: 'rgb(25, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }
        ]
      }
    }

    // new Chart(document.getElementById("chartjs-3"), { "type": "radar", "data": { "labels": ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"], "datasets": [{ "label": "My First Dataset", "data": [65, 59, 90, 81, 56, 55, 40], "fill": true, "backgroundColor": "rgba(255, 99, 132, 0.2)", "borderColor": "rgb(255, 99, 132)", "pointBackgroundColor": "rgb(255, 99, 132)", "pointBorderColor": "#fff", "pointHoverBackgroundColor": "#fff", "pointHoverBorderColor": "rgb(255, 99, 132)" }, { "label": "My Second Dataset", "data": [28, 48, 40, 19, 96, 27, 100], "fill": true, "backgroundColor": "rgba(54, 162, 235, 0.2)", "borderColor": "rgb(54, 162, 235)", "pointBackgroundColor": "rgb(54, 162, 235)", "pointBorderColor": "#fff", "pointHoverBackgroundColor": "#fff", "pointHoverBorderColor": "rgb(54, 162, 235)" }] }, "options": { "elements": { "line": { "tension": 0, "borderWidth": 3 } } } });

    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchGraphs()
  }
  handleClick(e) {
    e.preventDefault()
    this.props.history.push(`/graphs/${e.target.id}`)
  }
  render() {
    let reduxState = store.getState()
    let values = []
    let months = []
    for (let i = 0; i < reduxState.rainfall.length; i++) {
      values.push(reduxState.rainfall[i].value)
      months.push(reduxState.rainfall[i].month)
    }
    let {data1, data2, data, dataRadar} = this.state
    data1.datasets[0].data = values
    data2.datasets[0].data = values
    data.datasets[0].data = values
    dataRadar.datasets[0].data = values
    data1.labels = months
    data2.labels = months
    data.labels = months
    dataRadar.labels = months
    return (
      <div>
        hello world
        <div>
          <Line
            data={this.state.data1}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </div>
        <div>
          <Pie
            data={this.state.data2}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />

          <Doughnut
            data={this.state.data2}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />

          <Bar data={this.state.data} />

          <Radar data={this.state.dataRadar} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {graphs: state}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGraphs: () => {
      dispatch(fetchData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphs)
