'use strict'
const chalk = require('chalk')
const faker = require('faker')

const db = require('../server/db')
const { User, Rainfall } = require('../server/db/models')
const Author = require('../server/db/models/author');
const Message = require('../server/db/models/message');
const Channel = require('../server/db/models/channel');
const Graphs = require('../server/db/models/graphs');
const channels = [
  { name: 'really_random' },
  { name: 'generally_speaking' },
  { name: 'dogs_of_fullstack' },
  { name: 'lunch_planning' }
];

const authors = [{
  name: [faker.name.firstName(), faker.name.lastName()].join(' '),
  image: faker.image.avatar()
}, {
  name: [faker.name.firstName(), faker.name.lastName()].join(' '),
  image: faker.image.avatar()
}, {
  name: [faker.name.firstName(), faker.name.lastName()].join(' '),
  image: faker.image.avatar()
}, {
  name: [faker.name.firstName(), faker.name.lastName()].join(' '),
  image: faker.image.avatar()
}, {
  name: [faker.name.firstName(), faker.name.lastName()].join(' '),
  image: faker.image.avatar()
}, {
  name: [faker.name.firstName(), faker.name.lastName()].join(' '),
  image: faker.image.avatar()
},
{
  name: 'Guest',
  image: '/images/guest.jpeg'
}];

const id = () => Math.round(Math.random() * (authors.length - 1)) + 1;

const messages = [
  { authorId: id(), content: 'Don’t expect a formal university to teach you material applicable to practicing data science in industry. ', channelId: 1 },
  { authorId: id(), content: 'Data science projects, blog posts, or Github repos can get you in the door for a job interview.', channelId: 1 },
  { authorId: id(), content: 'Try a top-down approach to learning. Figure out what problems a technology or algorithm can solve before delving into the details of how the method works.', channelId: 1 },
  { authorId: id(), content: 'Focus on building a portfolio, composed of real-world data science projects, to demonstrate your technical skills. ', channelId: 2 },
  { authorId: id(), content: 'Make learning data science fun by working on projects that personally interest you or solve a problem you or others around you have. ', channelId: 2 },
  { authorId: id(), content: 'Reading, whether technical or for personal learning, is part of a process of becoming less wrong about the world.', channelId: 2 },
  { authorId: id(), content: 'Online courses, which are updated rapidly and often are developed with companies, are more efficient and cost-effective ways to learn the data science skills you need in industry.', channelId: 3 },
  { authorId: id(), content: 'Try to choose books that teach you something and that you also find intriguing.', channelId: 3 },
  { authorId: id(), content: 'I was motivated to keep learning data science not only because of the prospect it would earn me a good job but also because learning data science was inherently enjoyable.', channelId: 3 },
  { authorId: id(), content: 'You come into a book with some background knowledge (priors), learn new information (gather data), and update your beliefs to more closely match reality (a posterior).', channelId: 4 },
  { authorId: id(), content: 'Place emphasis on mastering skills instead of acquiring credentials, which don’t mean a lot in the data science industry.', channelId: 4 },
  { authorId: id(), content: 'Technical and communication skills earn you the job (and continuing success throughout your career).', channelId: 4 }
];

async function seed() {
  await db.sync({ force: true })
  console.log(chalk.magentaBright('db synced!'))

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
    User.create({ email: 'cody@email.com', password: '123', displayName: 'display name 1', displayImage: 'sample image url' }),
    User.create({ email: 'murphy@email.com', password: '123', displayName: 'display name 2', displayImage: 'sample display image 2' })
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

  const graphs = await Promise.all([
    Graphs.create({
      data: [0.88174, 0.78227, 0.50017, 0.7745099999999998, 0.62959, 0.8139299999999999, 0.79392, 0.63674, 0.5269400000000001],
      labels: ["55", "59", "70", "55", "51", "55", "52", "69", "72"]
    }),
  ])

  console.log(chalk.yellow(`seeded ${users.length} users`))
  console.log(chalk.cyan(
    `seeded ${rainfall1.length +
    rainfall.length +
    rainfallSource2.length} rainfall values`
  ))
  console.log(chalk.green(`seeded successfully`))
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log(chalk.red('seeding...'))
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log(chalk.magenta('closing db connection'))
    await db.close()
    console.log(chalk.blue('db connection closed'))
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
