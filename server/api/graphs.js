const router = require('express').Router()
const { Graphs } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('did we reach the api get route')
    console.log('did we reach the api get route')
    console.log('did we reach the api get route')
    const graphs = await Graphs.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['data', 'labels']
    })
    res.json(graphs)
  } catch (err) {
    next(err)
  }
})

// POST /api/graphs
router.post('/', async (req, res, next) => {
  try {
    const graphs = await Graphs.create({
      data: req.body.data,
      labels: req.body.labels
    })
    res.json(graphs)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    console.log("did we reach the destroy api route ")
    console.log("did we reach the destroy api route ")
    console.log("did we reach the destroy api route ")
    const response = await Graphs.destroy({
      where: {},
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})
