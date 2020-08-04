'use strict'

const db = require('../server/db')
const { User, Rainfall } = require('../server/db/models')
const Author = require('../server/db/models/author');
const Message = require('../server/db/models/message');
const Channel = require('../server/db/models/channel');
const channels = [
  { name: 'really_random' },
  { name: 'generally_speaking' },
  { name: 'dogs_of_fullstack' },
  { name: 'lunch_planning' }
];

const authors = [{
  name: 'Cody',
  image: '/images/cody.jpg'
}, {
  name: 'Ben',
  image: '/images/ben.jpg'
}, {
  name: 'Star',
  image: '/images/star.jpg'
}, {
  name: 'Batman',
  image: '/images/batman.jpg'
}, {
  name: 'Elliott',
  image: '/images/elliott.jpg'
}, {
  name: 'Fira',
  image: '/images/fira.jpg'
}, {
  name: 'Henry',
  image: '/images/henry.jpg'
}, {
  name: 'Marcy',
  image: '/images/marcy.jpg'
}, {
  name: 'Milton',
  image: '/images/milton.jpg'
}, {
  name: 'Murphy',
  image: '/images/murphy.jpg'
}, {
  name: 'Raffi',
  image: '/images/raffi.jpg'
}, {
  name: 'Tulsi',
  image: '/images/tulsi.jpg'
}, {
  name: 'Pork Chop',
  image: '/images/pork_chop.jpg'
}, {
  name: 'Ribs',
  image: '/images/ribs.jpg'
}, {
  name: 'Stacey',
  image: '/images/stacey.jpg'
}, {
  name: 'JD',
  image: '/images/jd.jpg'
}, {
  name: 'BenBen',
  image: '/images/benben.png'
}, {
  name: 'Odie',
  image: '/images/odie.jpg'
}];

const id = () => Math.round(Math.random() * (authors.length - 1)) + 1;

const messages = [
  { authorId: id(), content: 'I like React!', channelId: 1 },
  { authorId: id(), content: 'I like Redux!', channelId: 1 },
  { authorId: id(), content: 'I like React-Redux!', channelId: 1 },
  { authorId: id(), content: 'I like writing web apps!', channelId: 2 },
  { authorId: id(), content: 'You should learn JavaScript!', channelId: 2 },
  { authorId: id(), content: 'JavaScript is pretty great!', channelId: 2 },
  { authorId: id(), content: 'Dogs are great!', channelId: 3 },
  { authorId: id(), content: 'Cats are also great!', channelId: 3 },
  { authorId: id(), content: 'Why must we fight so?', channelId: 3 },
  { authorId: id(), content: 'I want to get tacos!', channelId: 4 },
  { authorId: id(), content: 'I want to get salad!', channelId: 4 },
  { authorId: id(), content: 'I want a taco salad!', channelId: 4 }
];

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  Promise.all(authors.map(author =>
    Author.create(author))
  )
    .then(() =>
      Promise.all(channels.map(channel =>
        Channel.create(channel))
      ))
    .then(() =>
      Promise.all(messages.map(message =>
        Message.create(message))
      )
    );

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ])
  const rainfall1 = await Promise.all([
    Rainfall.create({ value: 84, month: "July '19", source: 'U.K. (Statista)' })
  ])

  const rainfall = await Promise.all([
    Rainfall.create({
      value: 132.7,
      month: "August '19",
      source: 'U.K. (Statista)'
    }),
    Rainfall.create({
      value: 126,
      month: "September '19",
      source: 'U.K. (Statista)'
    }),
    Rainfall.create({
      value: 139.8,
      month: "October '19",
      source: 'U.K. (Statista)'
    }),
    Rainfall.create({
      value: 118.9,
      month: "November '19",
      source: 'U.K. (Statista)'
    }),
    Rainfall.create({
      value: 139.7,
      month: "December '19",
      source: 'U.K. (Statista)'
    }),
    Rainfall.create({
      value: 121.7,
      month: "January '20",
      source: 'U.K. (Statista)'
    }),
    Rainfall.create({
      value: 209.1,
      month: "February '20",
      source: 'U.K. (Statista)'
    }),
    Rainfall.create({ value: 78, month: "March '20", source: 'U.K. (Statista)' }),
    Rainfall.create({
      value: 29.1,
      month: "April '20",
      source: 'U.K. (Statista)'
    }),
    Rainfall.create({ value: 32.7, month: "May '20", source: 'U.K. (Statista)' }),
    Rainfall.create({
      value: 105.7,
      month: "June '20",
      source: 'U.K. (Statista)'
    })
  ])

  const rainfallSource2 = await Promise.all([
    Rainfall.create({
      value: 68.326,
      month: "July '19",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 69.596,
      month: "August '19",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 61.468,
      month: "September '19",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 79.756,
      month: "October '19",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 47.244,
      month: "November '19",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 64.262,
      month: "December '19",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 68.58,
      month: "January '20",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 60.96,
      month: "February '20",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 71.882,
      month: "March '20",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 62.738,
      month: "April '20",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 77.216,
      month: "May '20",
      source: 'Contiguous U.S. (NOAA)'
    }),
    Rainfall.create({
      value: 69.088,
      month: "June '20",
      source: 'Contiguous U.S. (NOAA)'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(
    `seeded ${rainfall1.length +
    rainfall.length +
    rainfallSource2.length} rainfall values`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
