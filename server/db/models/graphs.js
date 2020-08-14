const Sequelize = require('sequelize')
const db = require('../db')

const Graphs = db.define('graphs', {
  data: { // adding these two to customize the chat
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
  labels: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Graphs
