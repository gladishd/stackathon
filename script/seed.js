'use strict'

const db = require('../server/db')
const {User, Rainfall} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const rainfall1 = await Promise.all([
    Rainfall.create({value: 84, month: "July '19"})
  ])

  const rainfall = await Promise.all([
    Rainfall.create({value: 132.7, month: "August '19"}),
    Rainfall.create({value: 126, month: "September '19"}),
    Rainfall.create({value: 139.8, month: "October '19"}),
    Rainfall.create({value: 118.9, month: "November '19"}),
    Rainfall.create({value: 139.7, month: "December '19"}),
    Rainfall.create({value: 121.7, month: "January '20"}),
    Rainfall.create({value: 209.1, month: "February '20"}),
    Rainfall.create({value: 78, month: "March '20"}),
    Rainfall.create({value: 29.1, month: "April '20"}),
    Rainfall.create({value: 32.7, month: "May '20"}),
    Rainfall.create({value: 105.7, month: "June '20"})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${rainfall1.length + rainfall.length} rainfall values`)
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
