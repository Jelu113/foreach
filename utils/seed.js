const { Thought, User } = require("../../Models");
const data= require('./data')
const db = require('../config/connection');


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', async () => {
  for (const userData of data) {
    await User.create(userData);
  }

  console.log('Data seeded successfully.');
});