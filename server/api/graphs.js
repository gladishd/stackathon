const router = require('express').Router()
const { Graphs } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('did we reach the router.get route?')
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
    console.log("On the post route for /api/graphs, the req.body labels and data are ", req.body.data, req.body.labels)
    const graphs = await Graphs.create({
      data: req.body.data,
      labels: req.body.labels
    })
    console.log("the graphs on the server/api/graphs.js route are ", graphs)
    res.json(returnMessage)
  } catch (err) {
    next(err)
  }
})
