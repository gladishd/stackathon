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
              '#6800B4',
              '#a75298',
              '#a77c52',
              '#16e3cc',
              '#b69edb',
              '#a5a01d',
              '#fc737a',
              '#b9b6b6'
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
              'rgba(201, 203, 207, 0.2)',
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4'
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
            label: 'U.K. (Statista)',
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
            label: 'Contiguous U.S. (NOAA)',
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
              'rgb(150, 2, 255)',
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4',
              '#85e0ea'
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
    let valuesSource1 = []
    let valuesSource2 = []

    let monthsSource1 = []
    let monthsSource2 = []
    let reduxState = store.getState()
    let sourceOneOnly = {}
    let sourceTwoOnly = {}

    if (reduxState.rainfall[0]) {
      sourceOneOnly = reduxState.rainfall.filter(
        element => element.source === 'U.K. (Statista)'
      )
      sourceTwoOnly = reduxState.rainfall.filter(
        element => element.source === 'Contiguous U.S. (NOAA)'
      )
    }
    // console.log(reduxState.rainfall[0] && reduxState.rainfall[0].source);
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
    for (let i = 0; i < sourceOneOnly.length; i++) {
      valuesSource1.push(sourceOneOnly[i].value)
      monthsSource1.push(sourceOneOnly[i].month)
    }
    for (let i = 0; i < sourceTwoOnly.length; i++) {
      valuesSource2.push(sourceTwoOnly[i].value)
      monthsSource2.push(sourceTwoOnly[i].month)
    }
    lineData.datasets[0].data = pieDoughnutData.datasets[0].data = barData.datasets[0].data = dataRadar.datasets[1].data = dataPolar.datasets[0].data = valuesSource2
    dataRadar.datasets[0].data = valuesSource1
    lineData.labels = pieDoughnutData.labels = barData.labels = dataRadar.labels = dataPolar.labels = monthsSource1
    let numericMonths = monthsSource1
      .map(element => element.split(' ')[0])
      .map(month => allMonthList.indexOf(month))
    let dataScatterBubble = []
    for (let i = 0; i < valuesSource1.length; i++) {
      dataScatterBubble[i] = {
        x: Number(`${numericMonths[i]}`),
        y: Number(`${valuesSource1[i]}`),
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
