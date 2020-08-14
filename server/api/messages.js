const router = require('express').Router()
const { Message, Author, User } = require('../db/models')

module.exports = router

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    console.log('did we reach the get api route')
    const messages = await Message.findAll()
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

// POST /api/messages
router.post('/', async (req, res, next) => {
  // We don't have proper users yet (we'll get there soon, though!).
  // Instead, we'll findOrCreate an author by name, for simplicity.
  // Of course, you wouldn't want to do this in a real chat app!
  console.log('do we reach the post route')
  try {
    console.log('the req.body object is ', req.body)
    const imageUrl = await User.findAll({
      where: {
        displayName: req.body.name
      }
    })

    console.log('does the imageUrl exist? ', !imageUrl[0])

    // if (!imageUrl[0]) {
    //   imageUrl = 'https://images.macrumors.com/t/CynyMmV320sxD-tHY9kdnlFNnBc=/400x0/filters:quality(90)/article-new/2019/04/guest-user-250x250.jpg?lossy'
    // }

    const [author] = await Author.findOrCreate({ // when we sign up, we want the author to already exist so that it doesn't create a new one with the default image.
      where: {
        name: req.body.name, // always req.body.name, not hardcoded here as was done before (name: req.body.name || 'Cody')
        image: !imageUrl[0] ? 'https://images.macrumors.com/t/CynyMmV320sxD-tHY9kdnlFNnBc=/400x0/filters:quality(90)/article-new/2019/04/guest-user-250x250.jpg?lossy' : imageUrl[0].dataValues.displayImage
      }
    })
    const message = Message.build(req.body)
    message.setAuthor(author, { save: false })
    await message.save()
    const returnMessage = message.toJSON()
    returnMessage.author = author
    res.json(returnMessage)
  } catch (err) {
    next(err)
  }
})

// PUT /api/messages
router.put('/:messageId', async (req, res, next) => {
  try {
    const messageId = req.params.messageId
    const message = await Message.findById(messageId)
    await message.update(req.body)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

// DELETE /api/messages
router.delete('/:messageId', async (req, res, next) => {
  try {
    const id = req.params.messageId
    await Message.destroy({ where: { id } })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
