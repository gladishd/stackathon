const Sequelize = require('sequelize')
const db = require('../db')

const Rainfall = db.define('rainfall', {
  value: {
    type: Sequelize.FLOAT
  },
  month: {
    type: Sequelize.STRING
  },
  source: {
    type: Sequelize.STRING
  }
})

module.exports = Rainfall
