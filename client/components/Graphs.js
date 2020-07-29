import React from 'react'
import {connect} from 'react-redux'
import {fetchData} from '../store'
import store from '../store'
import {
  Line,
  Pie,
  Doughnut,
  Bar,
  Radar,
  Polar,
  Bubble,
  Scatter
} from 'react-chartjs-2'

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
        labels: [] // typing
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
      },
      dataPolar: {
        datasets: [
          {
            label: 'My First Dataset',
            data: [],
            backgroundColor: [
              'rgb(200, 200, 200)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 23, 207)',
              'rgb(54, 162, 235)',
              'rgb(150, 2, 255)'
            ]
          }
        ],
        labels: []
      },
      dataBubble: {
        datasets: [
          {
            backgroundColor: 'Green',
            borderColor: 'Green',
            borderWidth: 1,
            data: [],
            hoverBackgroundColor: 'Green',
            hoverBorderColor: 'Green',
            hoverBorderWidth: 3,
            hoverRadius: 3,
            hitRadius: 5,
            label: 'Average Rainfall per month',
            pointStyle: 'star',
            rotation: 0,
            radius: 3
          }
        ]
      },
      dataScatter: {
        datasets: [
          {
            label: 'Average Rainfall per month',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: 'rgba(0, 255, 100, 0.6)',
            hoverBorderColor: 'rgba(255, 155, 100, 1)',
            pointRadius: 15,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            pointHoverBorderWidth: 15,
            data: []
          }
        ]
      }
    }
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
    console.log(values)
    console.log(months)
    let {
      data1,
      data2,
      data,
      dataRadar,
      dataPolar,
      dataScatter,
      dataBubble
    } = this.state
    data1.datasets[0].data = values
    data2.datasets[0].data = values
    data.datasets[0].data = values
    dataRadar.datasets[0].data = values
    dataPolar.datasets[0].data = values
    data1.labels = months
    data2.labels = months
    data.labels = months
    dataRadar.labels = months
    dataPolar.labels = months
    let allMonthList = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    let numericMonths = months.map(month => allMonthList.indexOf(month))
    let dataScatterBubble = []
    for (let i = 0; i < values.length; i++) {
      dataScatterBubble[i] = {
        x: Number(`${values[i]}`),
        y: Number(`${numericMonths[i]}`),
        r: 10
      }
    }
    dataScatter.datasets[0].data = dataScatterBubble
    dataBubble.datasets[0].data = dataScatterBubble
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
          <Polar data={this.state.dataPolar} />

          <Bubble data={this.state.dataBubble} />

          <Scatter data={this.state.dataScatter} />
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
