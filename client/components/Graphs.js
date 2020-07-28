import React from 'react'
import {connect} from 'react-redux'
// import { fetchData } from '../redux/graphs'
import {Line, Pie, Doughnut} from 'react-chartjs-2'

export class Graphs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data1: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
          }
        ]
      },
      data2: {
        labels: ['January', 'February', 'March', 'April', 'May'],
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
            data: [65, 59, 80, 81, 56]
          }
        ]
      }
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    console.log('did we get here')
    // this.props.getGraphs();
  }
  handleClick(e) {
    e.preventDefault()
    this.props.history.push(`/graphs/${e.target.id}`)
  }
  render() {
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // return { graphs: state.graphs };
}

const mapDispatchToProps = dispatch => {
  // return {
  //   fetchGraphs: () => { dispatch(fetchData()) },
  // };
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphs)
