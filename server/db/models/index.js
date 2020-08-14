const User = require('./user')
const Rainfall = require('./rainfall')

const Message = require('./message')
const Channel = require('./channel')
const Author = require('./author')
const Graphs = require('./Graphs')

Channel.hasMany(Message, {
  onDelete: 'cascade',
  hooks: true
})

Author.hasMany(Message)

Message.belongsTo(Channel)
Message.belongsTo(Author)

module.exports = {
  Channel,
  Message,
  Author,
  User,
  Rainfall,
  Graphs // need to export it here so we can get it through the api request
}

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
