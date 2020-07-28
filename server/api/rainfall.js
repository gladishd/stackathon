const router = require('express').Router()
const {Rainfall} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const rainfallValues = await Rainfall.findAll({
      attributes: ['value']
    })
    res.json(rainfallValues)
  } catch (err) {
    next(err)
  }
})
