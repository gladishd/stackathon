const Sequelize = require('sequelize')
const db = require('../db')

const Rainfall = db.define('rainfall', {
  value: {
    type: Sequelize.INTEGER
  }
})

module.exports = Rainfall
