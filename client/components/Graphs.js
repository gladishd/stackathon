/* eslint-disable complexity */
import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../store'
import { postNewGraphData, fetchNewGraphData, resetGraphDataThunk } from '../store/store.js'
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
      count: 0, //to prevent an infinite loop of
      columnsArray: [],
      selectedOption: '',
      dataArrayForRender: [],
      labelsArrayForRender: [],
      lineData: {
        labels: [],
        datasets: [
          {
            label: '',
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
            label: '',
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
            label: '',
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
            label: '',
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
            label: '',
            pointStyle: 'star',
            rotation: 0,
            radius: 3
          }
        ]
      },
      dataScatter: {
        datasets: [
          {
            label: '',
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
    this.resetGraph = this.resetGraph.bind(this)
    this.getColumnNames = this.getColumnNames.bind(this)
    this.selectColumnData = this.selectColumnData.bind(this)
    this.selectColumnLabels = this.selectColumnLabels.bind(this)
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

  selectColumnData(e) {
    e.preventDefault();
    this.setState({
      selectedColumnData: e.target.value
    })

  }

  selectColumnLabels(e) {
    e.preventDefault();
    this.setState({
      selectedColumnLabels: e.target.value
    })
  }

  resetGraph(e) {
    e.preventDefault();
    this.props.reset();
  }


  getAndConsoleLogGraphData(e, count = 0) {
    e.preventDefault() // don't refresh the page
    this.props.getNewGraph();
    this.props.getNewGraph();

    if (this.props.graphs.addMessages.graphs[1]) {

      this.setState({
        dataArrayForRender: this.props.graphs.addMessages.graphs[1].data,
        labelsArrayForRender: this.props.graphs.addMessages.graphs[1].labels
      })

    }
    if (count < 10) {
      this.getAndConsoleLogGraphData(e, count + 1)
    }
    this.getColumnNames()
  }

  handleClick(e) {
    e.preventDefault()
    this.props.history.push(`/graphs/${e.target.id}`)
  }

  getColumnNames() {
    let labelsArray = [];
    let dataArray = [];
    let columns = [];
    let theFile = document.getElementById("fileUpload");
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(theFile.value.toLowerCase())) { // if it's a .csv
      if (typeof (FileReader) !== "undefined") { // if the browser supports FileReader
        let fileReader = new FileReader();
        fileReader.onload = async function (e) {
          let text = await fileReader.result;
          let optionsArray = text.split('\n')[0].split(',');
          for (let count = 1; count < 50; count++) {
            let singleRowText = text.split('\n')[count].split(',')
            labelsArray.push(singleRowText[optionsArray.indexOf('age')]) // using indexOf so that we can select two columns
            dataArray.push(Number(singleRowText[optionsArray.indexOf('hui3_score')]))
            columns.push(optionsArray[count])
          }
        }
        fileReader.readAsText(theFile.files[0]); // only after the function is actually called, is the dataArray populated.
        this.setState({ columnsArray: columns }) // this just re-renders things
      }
      else {
        console.error("This browser doesn't support FileReader!")
      }
    }
    else {
      console.error("Not a valid .csv file!");
    }
    return false;
  }

  processFile() { // need to use arrow function to access this.state
    let labelsArray = [];
    let dataArray = [];
    let columns = [];
    let selectedColumnLabels = this.state.selectedColumnLabels;
    let selectedColumnData = this.state.selectedColumnData;
    let theFile = document.getElementById("fileUpload");
    let dataTable = document.getElementById("dataTable");
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(theFile.value.toLowerCase())) { // if it's a .csv
      if (typeof (FileReader) !== "undefined") { // if the browser supports FileReader
        let fileReader = new FileReader();
        fileReader.onload = async function (e) {
          let text = await fileReader.result;
          let lines = text.split('\n')
          let optionsArray = text.split('\n')[0].split(',');
          for (let count = 1; count < 50; count++) {
            let singleRowText = text.split('\n')[count].split(',')
            labelsArray.push(singleRowText[optionsArray.indexOf(selectedColumnLabels)]) // using indexOf so that we can select two columns
            dataArray.push(Number(singleRowText[optionsArray.indexOf(selectedColumnData)]))
            columns.push(optionsArray[count])
          }
          for (let count = 0; count < 50; count++) { // for all the rows we want to render
            let row = document.createElement("tr"); // create a row element
            let rowText = lines[count].split(","); // split the string into an array
            for (let i = 0; i < rowText.length; i++) { // for all elements of the row
              let dataCell = document.createElement("td");
              if (count === 0) {
                dataCell = document.createElement("th");
              } else {
                dataCell = document.createElement("td");
              }
              let cellText = document.createTextNode(rowText[i]);
              dataCell.appendChild(cellText);
              row.appendChild(dataCell); // append the created row element
            }
            dataTable.appendChild(row); // append the row to the table
          }
        }

        //call file reader onload
        fileReader.readAsText(theFile.files[0]); // only after the function is actually called, is the dataArray populated.
        this.setState({ dataArray: dataArray, labelsArray: labelsArray }) // this just re-renders things
      }
      else {
        console.error("This browser doesn't support FileReader!")
      }
    }
    else {
      console.error("Not a valid .csv file!");
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
    let theLabel = ''
    labelsArray = this.state.labelsArray
    dataArray = this.state.dataArray
    if (dataArray && labelsArray && this.state.count < 10) {
      this.props.post(dataArray, labelsArray)
    }// want to post it here

    let lineDataObject = {
      // labels: ["55", "59", "70", "55", "51", "55", "52", "69", "72"],
      labels: this.state.labelsArrayForRender,
      datasets: [
        {
          label: '',
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
          label: '',
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
          label: '',
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
          data: this.state.dataArrayForRender,
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

    let polarDataObject = {
      datasets: [
        {
          label: '',
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
          label: '',
          pointStyle: 'star',
          rotation: 0,
          radius: 3
        }
      ]
    }

    let scatterDataObject = {
      datasets: [
        {
          label: '',
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


    let optionColumns = this.state.columnsArray
      .filter((element) => {
        return element !== undefined
      }) // at first, the column names come back as the same length as the number of rows rendered
      .map((element) =>
        <option key={element} value={element}>{element}</option>
      );

    return (
      <div>





        <div className='graphAndChat'>
          <div>
            <MessagesList />
          </div>
          <div>
            Select a file: <input type="file" id="fileUpload" onChange={this.getAndConsoleLogGraphData} />
            {/* <button type='button' onClick={this.getAndConsoleLogGraphData}>Show data/labels options</button> */}
            <select name="columnSelect" onChange={this.selectColumnData}>
              <option value="" defaultValue>
                Data
          </option>
              {optionColumns}
            </select>
            <select name="columnSelect" onChange={this.selectColumnLabels}>
              <option value="" defaultValue>
                Labels
          </option>
              {optionColumns}
            </select>
            <button type='button' onClick={this.processFile}>Read File</button>
            <button type='button' onClick={this.getAndConsoleLogGraphData}>Re-Render</button>

            <button type='button' onClick={this.resetGraph}>Reset</button>
            <table id="dataTable"></table>
            <select name="selectName" className="chartType" onChange={this.handleChange}>
              <option value="" defaultValue>
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
    reset: () => {
      dispatch(resetGraphDataThunk())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphs)
