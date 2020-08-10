const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => { // method 1; login and signup are essentially the same up until this point
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      console.log("The user wasn't found!", req.body.email)
      res.status(401).send("The user wasn't found!")
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Although the user was found, the password is incorrect', req.body.email)
      res.status(401).send('Although the user was found, the password is incorrect')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => { // method 2
  try {
    console.log("what's the req.body object when we do a post request in server/auth/index.js? ", req.body)
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
