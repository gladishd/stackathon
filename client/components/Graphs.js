/* eslint-disable complexity */
import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../store'
import { postNewGraphData, fetchNewGraphData } from '../store/store.js'
import store from '../store'
import MessagesList from './MessagesList'
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
      selectedOption: '',
      dataArrayForRender: [],
      labelsArrayForRender: [],
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
              'rgba(200, 92, 92, 0.2)',
              'rgba(30, 162, 35, 0.2)',
              'rgba(13, 202, 255, 0.2)',
              'rgba(201, 3, 207, 0.2)',
              'rgba(31, 203, 202, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(101, 3, 107)',
              'rgb(255, 99, 132)',
              'rgb(30, 162, 35)',
              'rgb(21, 203, 207)',
              'rgb(231, 103, 202)',
              'rgb(13, 202, 255)'
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
    this.processFile = this.processFile.bind(this)
    this.getAndConsoleLogGraphData = this.getAndConsoleLogGraphData.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchGraphs();
  }

  handleChange(e) {
    let selectedOption = e.target.value
    this.setState({
      selectedOption: selectedOption
    })
  }


  getAndConsoleLogGraphData(e) {
    e.preventDefault() // don't refresh the page
    this.props.getNewGraph();
    setTimeout(
      this.setState({
        dataArrayForRender: this.props.graphs.addMessages.graphs[3].data,
        labelsArrayForRender: this.props.graphs.addMessages.graphs[3].labels
      }), 30000
    )
  }
  handleClick(e) {
    e.preventDefault()
    this.props.history.push(`/graphs/${e.target.id}`)
  }

  async processFile() { // need to use arrow function to access this.state

    let labelsArray = [];
    let dataArray = [];

    var theFile = document.getElementById("myFile");

    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(theFile.value.toLowerCase())) { // if it's a .csv
      if (typeof (FileReader) != "undefined") { // if the browser supports FileReader
        // var table = document.getElementById("myTable");
        // var headerLine = "";
        //create html5 file reader object
        var myReader = new FileReader();
        // call filereader. onload function
        myReader.onload = async function (e) {
          var content = await myReader.result;

          //split csv file using "\n" for new line ( each row)
          // var lines = content[0].split("\r");
          var lines = content.split('\n')

          let optionsArray = content.split('\n')[0].split(',');

          for (let count = 1; count < 10; count++) {
            let singleRowContent = content.split('\n')[count].split(',')
            labelsArray.push(singleRowContent[optionsArray.indexOf('age')])
            dataArray.push(Number(singleRowContent[optionsArray.indexOf('hui3_score')]))
          }







          //loop all rows
          for (var count = 0; count < 10; count++) {
            //create a tr element
            var row = document.createElement("tr");
            //split each row content
            var rowContent = lines[count].split(",");
            //loop throw all columns of a row
            for (var i = 0; i < rowContent.length; i++) {
              //create td element
              var cellElement = document.createElement("td");
              if (count == 0) {
                cellElement = document.createElement("th");
              } else {
                cellElement = document.createElement("td");
              }
              //add a row element as a node for table
              var cellContent = document.createTextNode(rowContent[i]);

              cellElement.appendChild(cellContent);
              //append row child
              row.appendChild(cellElement);
            }
            //append table contents
            myTable.appendChild(row);
          }
        }

        //call file reader onload
        await myReader.readAsText(theFile.files[0]); // only after the function is actually called, is the dataArray populated.
        this.setState({ dataArray: dataArray, labelsArray: labelsArray })
      }
      else {
        alert("This browser does not support HTML5.");
      }

    }
    else {
      alert("Please upload a valid CSV file.");
    }

    return false;
  }



  // eslint-disable-next-line max-statements
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
    // dataBubble.datasets[0].data = dataScatterBubble



    // const { labelsArray, dataArray } = this.state;
    let labelsArray = [];
    let dataArray = []
    let theLabel = 'some title'
    labelsArray = this.state.labelsArray
    dataArray = this.state.dataArray
    if (dataArray && labelsArray) {
      this.props.post(dataArray, labelsArray)
    }// want to post it here

    let lineDataObject = {
      // labels: ["55", "59", "70", "55", "51", "55", "52", "69", "72"],
      labels: this.state.labelsArrayForRender,
      datasets: [
        {
          label: 'units',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,102,192,1)',
          pointBackgroundColor: 'rgba(0, 205, 100, 0.6)',
          hoverBorderColor: 'rgba(205, 255, 0, 1)',
          pointRadius: 15,
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          pointHoverBorderWidth: 15,
          data: this.state.dataArrayForRender
          // data: [0.88174, 0.78227, 0.50017, 0.7745099999999998, 0.62959, 0.8139299999999999, 0.79392, 0.63674, 0.5269400000000001]
        }
      ]
    }

    let pieDoughnutDataObject = {
      labels: this.state.labelsArrayForRender,
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
            '#35014F',
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F',
            '#501800',
            '#4B5000',
            '#175000'
          ],
          data: this.state.dataArrayForRender
        }
      ]
    }

    let barDataObject = {
      datasets: [
        {
          data: this.state.dataArrayForRender,
          label: 'millimeters',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(200, 92, 92, 0.2)',
            'rgba(30, 162, 35, 0.2)',
            'rgba(13, 202, 255, 0.2)',
            'rgba(201, 3, 207, 0.2)',
            'rgba(31, 203, 202, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(101, 3, 107)',
            'rgb(255, 99, 132)',
            'rgb(30, 162, 35)',
            'rgb(21, 203, 207)',
            'rgb(231, 103, 202)',
            'rgb(13, 202, 255)'
          ],
          borderWidth: 1
        }
      ],
      labels: this.state.labelsArrayForRender // typing
    }

    let radarDataObject = {
      labels: this.state.labelsArrayForRender,
      datasets: [
        {
          data: this.state.dataArrayForRender,
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
          data: this.state.dataArrayForRender,
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
    }

    let polarDataObject = {
      datasets: [
        {
          label: 'millimeters',
          data: this.state.dataArrayForRender,
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
      labels: this.state.labelsArrayForRender
    }

    // For these last two graphs, we're going to need to
    // transform this.state.dataArrayForRender, because we need an x value and a radius.
    // the y-value will come from the original array, which is this.state.dataArrayForRender.
    let original = this.state.dataArrayForRender;
    let dataTransformed = []

    if (original) {
      dataTransformed = original.map((n, index) => {
        return { x: this.state.labelsArrayForRender[index], y: n, r: 10 };
      })
    }


    let bubbleDataObject = {
      datasets: [
        {
          backgroundColor: 'Green',
          borderColor: 'Green',
          borderWidth: 1,
          data: dataTransformed,
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
    }

    let scatterDataObject = {
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
          data: dataTransformed
        }
      ]
    }

    return (
      <div>
        Select a file: <input type="file" id="myFile" />
        <button type='button' onClick={this.processFile}>Read File</button>
        <button type='button' onClick={this.getAndConsoleLogGraphData}>Re-Render</button>
        <table id="myTable"></table>
        <select name="cars" className="chartType" onChange={this.handleChange}>
          <option value="" selected>
            Select a chart type
          </option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
          <option value="bar">Bar</option>
          <option value="radar">Radar</option>
          <option value="polar">Polar</option>
          <option value="bubble">Bubble</option>
          <option value="scatter">Scatter</option>
        </select>

        <div className='graphAndChat'>
          <div>
            {(() => {
              switch (this.state.selectedOption) {
                case 'line':
                  return <Line
                    data={lineDataObject}
                    options={{
                      title: {
                        display: true,
                        text: theLabel,
                        fontSize: 20
                      },
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
                case 'pie':
                  return <Pie
                    data={pieDoughnutDataObject}
                    options={{
                      title: {
                        display: true,
                        text: theLabel,
                        fontSize: 20
                      },
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
                case 'doughnut':
                  return <Doughnut
                    data={pieDoughnutDataObject}
                    options={{
                      title: {
                        display: true,
                        text: theLabel,
                        fontSize: 20
                      },
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
                case 'bar':
                  return <Bar
                    data={barDataObject}
                    options={{
                      title: {
                        display: true,
                        text: theLabel,
                        fontSize: 20
                      },
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
                case 'radar':
                  return <Radar
                    data={radarDataObject}
                    options={{
                      title: {
                        display: true,
                        text: theLabel,
                        fontSize: 20
                      },
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
                case 'polar':
                  return <Polar
                    data={polarDataObject}
                    options={{
                      title: {
                        display: true,
                        text: theLabel,
                        fontSize: 20
                      },
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
                case 'bubble':
                  return <Bubble
                    data={bubbleDataObject}
                    options={{
                      title: {
                        display: true,
                        text: theLabel,
                        fontSize: 20
                      },
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
                case 'scatter':
                  return <Scatter
                    data={scatterDataObject}
                    options={{
                      title: {
                        display: true,
                        text: theLabel,
                        fontSize: 20
                      },
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
                default:
                  return <div>none</div>
              }
            })()}
          </div>
          <div>
            <MessagesList />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { graphs: state }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGraphs: () => {
      dispatch(fetchData())
    },
    post: (data, labels) => {
      dispatch(postNewGraphData(data, labels))
    },
    getNewGraph: () => {
      dispatch(fetchNewGraphData())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphs)
