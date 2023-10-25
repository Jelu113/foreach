const { Thought, User } = require("../../Models");
const data= require('./data')

const db = require('../config/connection');

db.on('error',(err) => err)

db.once('open',async()=> {
  // all database creating
})