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
      lineData: {
        labels: [],
        datasets: [
          {
            label: 'millimeters',
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
      pieDoughnutData: {
        labels: [],
        datasets: [
          {
            label: 'millimeters',
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
      barData: {
        datasets: [
          {
            data: [],
            label: 'millimeters',
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
            label: 'millimeters',
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
            label: 'millimeters',
            pointStyle: 'star',
            rotation: 0,
            radius: 3
          }
        ]
      },
      dataScatter: {
        datasets: [
          {
            label: 'millimeters',
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
    let values = []
    let months = []
    let reduxState = store.getState()
    let {
      lineData,
      pieDoughnutData,
      barData,
      dataRadar,
      dataPolar,
      dataScatter,
      dataBubble
    } = this.state
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
    for (let i = 0; i < reduxState.rainfall.length; i++) {
      values.push(reduxState.rainfall[i].value)
      months.push(reduxState.rainfall[i].month)
    }
    lineData.datasets[0].data = pieDoughnutData.datasets[0].data = barData.datasets[0].data = dataRadar.datasets[0].data = dataPolar.datasets[0].data = values
    lineData.labels = pieDoughnutData.labels = barData.labels = dataRadar.labels = dataPolar.labels = months
    let numericMonths = months.map(month => allMonthList.indexOf(month))
    let dataScatterBubble = []
    for (let i = 0; i < values.length; i++) {
      dataScatterBubble[i] = {
        x: Number(`${values[i]}`),
        y: Number(`${numericMonths[i]}`),
        r: 10
      }
    }
    dataScatter.datasets[0].data = dataBubble.datasets[0].data = dataScatterBubble
    return (
      <div>
        <Line
          data={this.state.lineData}
          options={{
            title: {
              display: true,
              text: 'Total Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />

        <Pie
          data={this.state.pieDoughnutData}
          options={{
            title: {
              display: true,
              text: 'Total Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />

        <Doughnut
          data={this.state.pieDoughnutData}
          options={{
            title: {
              display: true,
              text: 'Total Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />

        <Bar
          data={this.state.barData}
          options={{
            title: {
              display: true,
              text: 'Total Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />

        <Radar
          data={this.state.dataRadar}
          options={{
            title: {
              display: true,
              text: 'Total Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />

        <Polar
          data={this.state.dataPolar}
          options={{
            title: {
              display: true,
              text: 'Total Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />

        <Bubble
          data={this.state.dataBubble}
          options={{
            title: {
              display: true,
              text: 'Total Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />

        <Scatter
          data={this.state.dataScatter}
          options={{
            title: {
              display: true,
              text: 'Total Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
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
