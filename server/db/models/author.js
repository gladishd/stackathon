const Sequelize = require('sequelize')
const db = require('../db')

const images = [
  'https://static.thenounproject.com/png/1527496-200.png'
]

const getRandomImage = () => images[Math.floor(Math.random() * images.length)]

module.exports = db.define('author', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return getRandomImage()
    }
  }
})
