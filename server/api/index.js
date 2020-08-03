const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/rainfall', require('./rainfall'))
router.use('/channels', require('./channels'))
router.use('/messages', require('./messages'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
