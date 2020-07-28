const router = require('express').Router()
const {Rainfall} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const rainfallValues = await Rainfall.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['value']
    })
    res.json(rainfallValues)
  } catch (err) {
    next(err)
  }
})
